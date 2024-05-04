import { withDatabaseConnection } from "@/application/decorators/withDatabaseConnection";
import Device from "../database/mongo-devices.database";



export const getAll = withDatabaseConnection(
    async () => {
        return await Device.find();
    });