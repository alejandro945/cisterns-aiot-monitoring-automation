import { Measurement as MeasurementDomain } from "@/domain/model/Measurement";
import mongoose, { Model } from "mongoose";
const { Schema, model } = mongoose;

const MeasurementSchema = new Schema<MeasurementDomain>({
  _id: String,
  value: Number,
  hostname: String,
  createdAt: Date,
});

const Measurement: Model<MeasurementDomain> =
  mongoose.models.Measurement || model("Measurement", MeasurementSchema);

export default Measurement;
