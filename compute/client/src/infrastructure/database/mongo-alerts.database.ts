import { Alert as AlertDomain } from '@/domain/model/Alert'
import mongoose, { Model } from 'mongoose'
const { Schema, model } = mongoose

const AlertSchema = new Schema<AlertDomain>({
  type: String,
  description: String,
})

const Alert: Model<AlertDomain> = mongoose.models?.Alert|| model('Alert', AlertSchema)

export default Alert