import config from "./config";
import mongoose from "mongoose";
import User from "./models/User";
import {randomUUID} from "crypto";
import Task from "./models/Task";

const run = async () => {
    await mongoose.connect(config.database);
    const db = mongoose.connection;

    try {
        await db.dropCollection("users");
        await db.dropCollection("tasks");
    } catch (error) {
        console.log("Skipping drop...");
    }

    const [Suli, Sultan] = await User.create(
        {
            username: "Suli",
            password: "123",
            token: randomUUID(),
        },
        {
            username: "Sultan",
            password: "qwerty123",
            token: randomUUID(),
        }
    );

    await Task.create([
        {
            user: Sultan._id,
            title: "The first Task",
            description: "The task that I have to do",
            status: "in_progress",
        },
        {
            user: Suli._id,
            title: "The task From another acc",
            description: "The task that I already done",
            status: "done",
        },
    ]);
    await db.close();
};

void run();
