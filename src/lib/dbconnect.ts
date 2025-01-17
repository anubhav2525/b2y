import mongoose from "mongoose";
import {config} from "@/lib/config";

type ConnectionObject = {
    isConnected?: number;
};

const connection: ConnectionObject = {};
if (!config.mongodb.uri) {
    throw new Error(
        "Please define the MONGODB_URI environment variable inside .env.local"
    );
}

async function dbConnect(): Promise<void> {
    if (connection.isConnected) {
        console.log("Already connected to the database");
        return;
    }

    try {
        const db = await mongoose.connect(config.mongodb.uri || "", {});
        connection.isConnected = db.connections[0].readyState;
        console.log("Database connected successfully");
    } catch (error) {
        console.error("Database connection failed:", error);
        process.exit(1);
    }
}

export default dbConnect;
