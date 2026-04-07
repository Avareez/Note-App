import { connectToMongoDB, ObjectId } from "./dbconnect.js";

// zmienne
let db;
let collection;

//funkcje
const createCollection = async () => {
    let collection = await db.collection('task_collection');
    console.log("+---------------- collection works!")
    return collection
}

//gettasks
const getTasks = async () => {
    const items = await collection.find({}).toArray()
    console.log(items)
    return items
}

//start connection
const connect = async () => {
    db = await connectToMongoDB() // obiekt bazy danych mongo 
    console.log("+---------------- db works!");
    collection = await createCollection() // obiekt kolekcji
}

connect()

export { getTasks }