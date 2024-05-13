import { ALERTTYPE } from '@/domain/enums/alert.enum';
import { DatabaseService } from '@/storage/storage.service';
import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';

@Injectable()
export class JobsService {
  private readonly logger = new Logger(JobsService.name);

  constructor(
    private readonly httpService: HttpService,
    private readonly databaserService: DatabaseService,
  ) { }

  /**
   * Function that runs every day at midnight
   * The timezone is set to America/Bogota
   * The main action is to make a request to the device ip (/value?all=true&type=value) to get all the measurements
   * on sd card and save them in the database if they are not already saved
   */
  @Cron(CronExpression.EVERY_30_MINUTES, {
    name: 'measurementsOnDevice',
    timeZone: 'America/Bogota',
  })
  async handleMeasurementsOnDevice() {
    this.logger.log(
      'Running measurementsOnDevice job on date: ' + new Date().toISOString(),
    );
    //Get all devices ips from the database
    const devices = await this.databaserService
      .getDbHandle()
      .collection('devices')
      .find()
      .toArray();
    //Iterate over all devices ips and make a request to get all measurements on sd card
    for (const device of devices) {
      try {
        const response = await firstValueFrom(
          this.httpService.get(`${device.ip}/data`).pipe(
            catchError((error: AxiosError) => {
              this.logger.error(error.response.data);
              throw (
                'ERROR on request to device: ' +
                device.hostname +
                'with ip' +
                device.ip +
                ' with error: ' +
                error.response.data || 'Unknown error'
              );
            }),
          ),
        );
        if (response?.data) {
          //Iterate over all measurements and save them in the database
          const adaptedData = this.formatDataFromLibrary(response.data);
          const bulkOperations = [];

          for (const measurement of adaptedData) {
            bulkOperations.push({
              updateOne: {
                filter: { value: measurement, hostname: device.hostname },
                update: {
                  $setOnInsert: {
                    value: measurement.value,
                    timestamp: measurement.date,
                    hostname: device.hostname,
                  },
                },
                upsert: true,
              },
            });
          }

          if (bulkOperations.length > 0) {
            await this.databaserService
              .getDbHandle()
              .collection('measurements')
              .bulkWrite(bulkOperations);
          }
        }
      } catch (error) {
        this.logger.error(error);
        //Update the device status to false if an error happened and create and alert on database
        await this.databaserService
          .getDbHandle()
          .collection('devices')
          .updateOne({ name: device.name }, { $set: { status: false } });
        await this.databaserService
          .getDbHandle()
          .collection('alerts')
          .insertOne({
            hostname: device.hostname,
            type: ALERTTYPE.ERRORCONN,
            value: error,
          });
      }
    }
  }

  /**
   * Function that formats the data from the library api 
   * @param data - data from the library api
   * @returns - formatted data in an array of strings
   */
  private formatDataFromLibrary(data: any): Array<{ date: string, value: string }> {
    const results = [];
    const splitData = data.split('\n');
    this.logger.log('Split data: ' + splitData);
    for (const line of splitData) {
      // Divide the line into campos
      const fields = line.split(',');
      // Verify that the line has the expected number of fields
      if (fields.length > 2) {
        // Extract the date (first field)
        const date = fields[0];
        // Extraer measurement (third field)
        const value = fields[2];
        // Validate value is a number or float
        if (isNaN(parseFloat(value))) {
          this.logger.error('Value from data ep cron job is not a number: ' + value);
          continue;
        }
        // Add the date and measurement to the results
        results.push({ date, value });
      }
    }
    this.logger.log('Result: ' + results);
    return results;
  }
}
