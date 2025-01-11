import config from "./config";
import mongoose from "mongoose";

const run = async () => {
    await mongoose.connect(config.database);
    const db = mongoose.connection;
    try {

    } catch (error) {
        console.log('Skipping drop.....')
    }
};

void run();