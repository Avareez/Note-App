import { connectToMongoDB } from "./dbconnect.js";

let db;
let collection;

const createCollection = async () => {
    collection = await db.collection('backups');
    console.log("+---------------- collection works!")
    return collection;
}

const getBackups = async () => {
    return await collection.find({}).toArray();
}

const createBackup = async (notes) => {
    const count = await collection.countDocuments();
    if (count >= 2) {
        const oldest = await collection.find({}).sort({ createdAt: 1 }).limit(1).toArray();
        await collection.deleteOne({ _id: oldest[0]._id });
    }

    const backup = {
        notes,
        date: new Date().toLocaleDateString('pl-PL', { day: 'numeric', month: 'short', year: 'numeric' }),
        createdAt: new Date()
    };

    return await collection.insertOne(backup);
}

const deleteBackup = async (id) => {
    const { ObjectId } = await import('mongodb');
    return await collection.deleteOne({ _id: new ObjectId(id) });
}

const connect = async () => {
    db = await connectToMongoDB();
    console.log("+---------------- db works!");
    collection = await createCollection();
}

connect();

export { getBackups, createBackup, deleteBackup }