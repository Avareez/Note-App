const { MongoClient, ObjectId } = require('mongodb');

const connectToMongoDB = async () => {

    try {
        const mongoClient = new MongoClient("mongodb://127.0.0.1:27017");
        await mongoClient.connect();
        const db = mongoClient.db("test_db_nazwisko_imie");
        return db
    } catch (error) {
        return error.message
    }

}

export { connectToMongoDB }