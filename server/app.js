require("dotenv").config();

const db = require('./db')
const express = require('express');
const cors = require('cors')
const morgan = require('morgan');

const app = express();

app.use(express.json());
app.use(cors())
app.use(morgan('dev'));

app.get("/api/v1/expenses", async (_, res) => {
    try {
        const response = await db.query("SELECT * FROM expenses");
        res.status(200).json({
            status: "Success",
            data: {
                message: "Query got all rows",
                expense: response.rows
            }
        });
    } catch (err) {
       console.log(err);
    } 
});

app.get("/api/v1/expenses/:id", async (req, res) => {
    try {
        const response = await db.query("SELECT * FROM expenses WHERE id = $1", [req.params.id]);
        if (response.rows.length !== 0) {
            res.status(200).json({
                status: "Success",
                data: {
                    message: "Query got expense",
                    expense: response.rows[0]
                }
            });
        } else {
            res.status(404).json({
                status: "Unsuccesful",
                data: {
                    message: "No expense found with given id",
                    expense: null
                }
            });
        }
    } catch (err) {
       console.log(err);
    } 
});


app.patch("/api/v1/expenses/:id", async (req, res) => {
    try {
        const response = await db.query(
            "UPDATE expenses SET expense=COALESCE($1, expense), cost=COALESCE($2, cost), category=COALESCE($3, category) returning *", 
            [req.body.expense,req.body.cost,req.body.category]);
            res.status(200).json({
                status: "Success",
                data: {
                    message: "expense row updated",
                    expense: response.rows[0]
                }
            });
    } catch (err) {
       console.log(err);
    } 
});


app.post("/api/v1/expenses", async (req, res) => {
    try {
       const response = await db.query(
            "INSERT INTO expenses(expense, cost, category) VALUES($1, $2, $3) returning *", 
            [req.body.expense,req.body.cost,req.body.category]
        );
        res.status(201).json({
            status: "Success",
            data: {
                message: "Row added",
                expense: response.rows[0]
            }
        })
    } catch (err) {
       console.log(err);
    }
});

app.delete("/api/v1/expenses/:id", async (req, res) => {
    try {
       const response = await db.query(
            "DELETE FROM expenses WHERE id = $1", 
            [req.params.id]
        );
        res.status(200).json({
            status: "Success",
            data: {
                message: "Row deleted",
            }
        })
    } catch (err) {
       console.log(err);
    }
});
app.get("/", (req, res) => {
    console.log("hello world!");
});

const port = process.env.PORT | 3007
app.listen(3007, () => {
    console.log("Listening on port 3007");
});
