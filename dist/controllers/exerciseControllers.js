import dotenv from "dotenv";
import { MongoClient, ObjectId } from 'mongodb';
dotenv.config();
const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);
export const getAllExercises = async (req, res) => {
    try {
        await client.connect();
        const myDB = client.db("recovery_exercises");
        const myColl = myDB.collection("exercises");
        const data = await myColl.find({}).toArray();
        res.json({ status: 200, data: data });
    }
    catch (e) {
        res.json({ status: 500, message: `Error connecting${e}` });
    }
    finally {
        await client.close();
    }
};
export const addOneExercise = async (req, res) => {
    try {
        await client.connect();
        const myDB = client.db("recovery_exercises");
        const myColl = myDB.collection("exercises");
        const query = req.body;
        const objId = await myColl.insertOne(query);
        res.status(201).json({ objectId: objId.insertedId });
    }
    catch (e) {
        res.status(500).json({ message: `Error inserting${e}` });
    }
    finally {
        await client.close();
    }
};
export const updateOneExercise = async (req, res) => {
    try {
        await client.connect();
        const myDB = client.db("recovery_exercises");
        const myColl = myDB.collection("exercises");
        const query = { _id: new ObjectId(req.params.id) };
        const returnedData = await myColl.updateOne(query, { $set: { ...req.body } });
        res.status(204).json({ acknowledged: returnedData.acknowledged, modifiedCount: returnedData.modifiedCount });
    }
    catch (e) {
        res.status(500).json({ message: `Error updating ${e}` });
    }
    finally {
        await client.close();
    }
};
export const deleteOneExercise = async (req, res) => {
    try {
        await client.connect();
        const myDB = client.db("recovery_exercises");
        const myColl = myDB.collection("exercises");
        const query = { _id: new ObjectId(req.params.id) };
        const returnedData = await myColl.deleteOne(query);
        res.status(200).json({ acknowledged: returnedData.acknowledged, deletedCount: returnedData.deletedCount });
    }
    catch (e) {
        res.status(500).json({ message: `Error deleteing${e}` });
    }
    finally {
        await client.close();
    }
};
//# sourceMappingURL=exerciseControllers.js.map