import { MongoClient } from 'mongodb';
import 'dotenv/config';

const connectToMongoDB = async () => {
    try {
        const mongoClient = new MongoClient(process.env.MONGO_URI);
        await mongoClient.connect();
        const db = mongoClient.db(process.env.DB_NAME);
        return db;
    } catch (error) {
        console.error(error.message);
        return null;
    }
}

export { connectToMongoDB }