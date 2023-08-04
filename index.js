const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');
require('dotenv').config();

// middleware
app.use(cors())
app.use(express.json())

// routes

// create an event
app.post("/events", async (req, res) => {
    try {
        const { title, creator, event_date, voting_deadline, description } = req.body;
        const newEvent = await pool.query(
            "INSERT INTO events (title, creator, event_date, voting_deadline, description) VALUES($1, $2, $3, $4, $5) RETURNING *", 
            [title, creator, event_date, voting_deadline, description]
            );

        res.status(201).json(newEvent.rows[0]);
    } catch (err) {
        console.log(err.message);
    }
})

// get all events
app.get("/events", async (req, res) => {
    try {
        const allEvents = await pool.query("SELECT * FROM events");

        res.status(200).json(allEvents.rows);
    } catch (err) {
        console.error(err.message);
    }
})

// get an event by id
app.get("/events/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const event = await pool.query("SELECT * FROM events WHERE id = $1", [id])

        res.status(200).json(event.rows)
    } catch (err) {
        console.log(err.message);
    }
})

// assign a submission to an event
app.post("/events/:event_id/submissions", async (req, res) => {
    try {
        const { event_id } = req.params;
        const { submission_name, votes_count } = req.body;
        const newSubmission = await pool.query("INSERT INTO submissions (submission_name, votes_count, event_id) VALUES($1, $2, $3) RETURNING *", [submission_name, votes_count, event_id]);

        res.status(201).json(newSubmission.rows[0]);
    } catch (err) {
        console.log(err.message);
    }
})

// get all submissions for an event
app.get("/events/:event_id/submissions", async (req, res) => {
    try {
        const { event_id } = req.params;
        const allSubmissions = await pool.query("SELECT * FROM submissions WHERE event_id = $1", [event_id]);

        res.status(200).json(allSubmissions.rows);
    } catch (err) {
        console.error(err.message);
    }
})

// get a submission by id
app.get("/events/submissions/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const submissions = await pool.query("SELECT * FROM submissions WHERE id = $1", [id]);

        res.status(200).json(submissions.rows);
    } catch (err) {
        console.log(err.message);
    }
})

// delete a submission
app.delete("/:submission_id", async (req, res) => {
    try {
        const { submission_id } = req.params;
        const deleteSubmissions = await pool.query("DELETE FROM submissions WHERE id = $1 RETURNING *", [submission_id]);

        const response = {
            message: "Submission deleted",
            data: deleteSubmissions.rows
        };

        res.status(200).json(response);
    } catch (err) {
        console.log(err.message);
    }
})

// set up port to listen to
app.listen(process.env.PORT, () => {
    console.log('server listening on port 5000...')
})