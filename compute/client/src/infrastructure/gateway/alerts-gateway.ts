import { withDatabaseConnection } from "@/application/decorators/withDatabaseConnection";
import Alert from "../database/mongo-alerts.database";



export const getAll = withDatabaseConnection(
    async () => {
        return await Alert.find();
    });