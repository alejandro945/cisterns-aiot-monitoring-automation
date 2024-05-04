import { dbConnect } from "@/infrastructure/database/mongo-client.database";

export function withDatabaseConnection<T extends Function>(fn: T): T {
    return async function (...args: any[]) {
        await dbConnect();
        return await fn(...args);
    } as any;
}