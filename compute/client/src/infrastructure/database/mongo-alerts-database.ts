import { Alert as AlertDomain } from "@/domain/model/Alert";
import mongoose, { Model } from "mongoose";
const { Schema, model } = mongoose;

const AlertSchema = new Schema<AlertDomain>({
  _id: String,
  hostname: String,
  type: String,
  value: Boolean,
});

const Alert: Model<AlertDomain> =
  mongoose.models.Alert || model("Alert", AlertSchema);

export default Alert;
