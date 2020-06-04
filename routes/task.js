const express = require('express');
const router = express.Router();
const Task = require('../models/task.js');
const passport = require('passport');

router.post('/add', passport.authenticate('jwt', { session: false }), (req, res) => {
    let task = new Task({
        name: req.body.name,
        owner: req.body.owner,
        done: req.body.done,
    })

    task.save((err, tasl) => {
        if (err) {
            return res.send({
                sccess: false,
                message: "ERROR tru agin",
            });

        }
        if (!task) {
            return res.send({
                sccess: false,
                message: "ERROR saved task",
            });
        }

        return res.send({
            success: true,
            message: "task saved",
            task
        });
    });
})
router.post('/list', passport.authenticate('jwt', { session: false }), (req, res) => {
    const owner = req.body.owner;
    Task.find({ owner }, (err, task) => {
        if (err) {
            return res.send({
                success: false,
                message: "ERROR list tasks",
            });
        }
        if (!task) {
            return res.send({
                success: false,
                message: "ERROR non found tasks",
            });
        }

        return res.send({
            success: true,
            task
        });

    });
});
router.delete('/delete/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    const taskID = req.params.id;
    Task.remove({ _id: taskID }, (err) => {
        if (err) {
            return res.send({
                success: false,
                message: "ERROR on delete task"
            });
        }
        return res.send({
            success: true,
            message: "task deleted"
        });
    })


})




module.exports = router; 