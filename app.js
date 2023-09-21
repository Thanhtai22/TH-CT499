const express = require('express');
const cors = require('cors');
const ApiError = require("./app/api-error");
const contactsRouter = require("./app/routes/contact.route");
const app = express();

app.use("/api/contacts", contactsRouter);

// handle 404 response
app.use((req, res, next) => {

    return next(new ApiError(404, "Resource not found"));
});
app.use((err, req, res, next) => {
    return res.status(err.statusCode || 500).json({
        message: err.message || "Internal Server Error",
    });
});

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({ messsage: " well com...." });
})



module.exports = app;
