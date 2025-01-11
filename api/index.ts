import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import usersRouter from "./routers/users";
import config from "./config";
import tasksRouter from "./routers/tasks";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use('/users', usersRouter);
app.use('/tasks', tasksRouter);



const run = async () => {
    await mongoose.connect(config.database);
    app.listen(port, () => {
        console.log(`Listening on port ${port}`);
    });
    process.on('exit', () => {
        mongoose.disconnect();
    });
};

void run();