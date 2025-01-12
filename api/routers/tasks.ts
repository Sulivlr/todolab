import express from 'express';
import Task from "../models/Task";
import mongoose from "mongoose";
import auth, {RequestWithUser} from "../middleware/auth";

const tasksRouter = express.Router();

tasksRouter.post('/', auth, async (req, res, next) => {
    try {
        let expressReq = req as RequestWithUser;
        const user = expressReq.user
        const taskData = {
            user,
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
        }
        const task = new Task(taskData);
        await task.save();
        res.send(task);
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            res.status(400).send(error);
            next(error);
        }
    }
});

tasksRouter.get('/', auth, async (req, res, next) => {
    const user = req.query.user;
    try {
        let tasks;
        if (user) {
            tasks = await Task.find({user}).populate('user', 'user');
        } else {
            tasks = await Task.find().populate('user', 'user');
        }
        res.send(tasks);
    } catch (error) {
        next(error);
    }
});

export default tasksRouter;