import { Measurement as MeasurementDomain } from '@/domain/model/Measurement'
import mongoose, { Model } from 'mongoose'
const { Schema, model } = mongoose

const MeasurementSchema = new Schema<MeasurementDomain>({
  value: String
})

const Measurement: Model<MeasurementDomain> = mongoose.models?.Measurement|| model('Measurement', MeasurementSchema)

export default Measurement