import { Device as DeviceDomain } from "@/domain/model/Device";
import mongoose, { Model } from "mongoose";
const { Schema, model } = mongoose;

const DeviceSchema = new Schema<DeviceDomain>({
  _id: String,
  hostname: String,
  ip: String,
  status: Boolean,
});

const Device: Model<DeviceDomain> =
  mongoose.models.Device || model("Device", DeviceSchema);

export default Device;
