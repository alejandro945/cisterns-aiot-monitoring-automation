import { withDatabaseConnection } from "@/application/decorators/withDatabaseConnection";
import Payment from "../database/mongo-payments.database";
import { Payment as PaymentDomain } from '@/domain/model/Payment'


export const createPayment = withDatabaseConnection(
    async (payment: PaymentDomain) => {
        return await Payment.create(payment);
    });

export const getLastPayment = withDatabaseConnection(
    async (userId: string) => {
        return await Payment.findOne({ userId }).sort({ created: -1 });
    })
