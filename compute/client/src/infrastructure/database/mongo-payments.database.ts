import { Payment as PaymentDomain } from '@/domain/model/Payment'
import mongoose, { Model } from 'mongoose'
const { Schema, model } = mongoose

const PaymentSchema = new Schema<PaymentDomain>({
    userId: { type: Schema.Types.ObjectId, ref: 'User'},
    amount: Number,
    currency: String,
    priceId: String,
    created: Number,
    city: String,
    address: String,
})

const Payment: Model<PaymentDomain> = mongoose.models?.Payment|| model('Payment', PaymentSchema)

export default Payment