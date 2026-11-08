
import express from "express";
import Todo from "../../model/Todo.js";
import auth from "../../middleware/auth.js";

const router = express.Router();
router.post("/create-todo", auth, async (req, res) => {
    try {
        let { task } = req.body;
        let userID = req.userId;

        let newTodo = await Todo.create({
            title: task,
            user: userID
        });

        res.status(201).json({ msg: "Todo created successfully", newTodo});

    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
});

router.get("/get-todos", auth, async (req, res) => {
    try {
        let allTodos = await Todo.find({
            user: req.userId
        });

        res.status(200).json({msg: "All todos fetched successfully", allTodos });

    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
});

router.patch("/update-todo/:id", auth, async (req, res) => {
    try {
        let { id } = req.params;
        let changes = req.body;

        let updatedTodo = await Todo.findOneAndUpdate(
            { _id: id, user: req.userId },
            { $set: changes },
            { new: true }
        );

        if (!updatedTodo) {
            return res.status(404).json({ msg: "Todo not found" });
        }

        res.status(200).json({msg: "Todo updated successfully",updatedTodo });

    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
});

router.delete("/delete-todo/:id", auth, async (req, res) => {
    try {
        let { id } = req.params;

        let deletedTodo = await Todo.findOneAndDelete({
            _id: id,
            user: req.userId
        });

        if (!deletedTodo) {
            return res.status(404).json({ msg: "Todo not found" });
        }

        res.status(200).json({deletedTodo, msg: "Todo deleted successfully"});

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: "Internal Server Error" });
    }
});

export default router;
