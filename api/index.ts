import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import usersRouter from "./routers/users";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use('/users', usersRouter);



const run = async () => {
    await mongoose.connect('mongodb://localhost/todolab');
    app.listen(port, () => {
        console.log(`Listening on port ${port}`);
    });
    process.on('exit', () => {
        mongoose.disconnect();
    });
};

void run();