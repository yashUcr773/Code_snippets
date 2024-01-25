// imports
const express = require("express");
const jwt = require("jsonwebtoken");

// setup variables
const jwtPass = "121212";
const app = express();
const port = 3000;

const USERS = [
    {
        username: "axxa@gmail.com",
        password: "112233",
        name: "axxa",
    },
    {
        username: "bbb@gmail.com",
        password: "334455",
        name: "bbb",
    },
    {
        username: "ccxx@gmail.com",
        password: "456567",
        name: "ccxx",
    },
];

// middlewares
app.use(express.json());

// internal functions

function userExists(name, pass) {
    let userIdx = USERS.findIndex((user) => {
        return user.username == name && user.password == pass;
    });

    return userIdx > -1;
}

// routes
app.post("/signin", function (req, res) {
    const username = req.body.username;
    const password = req.body.password;

    if (!userExists(username, password)) {
        return res.status(403).json({
            message: "User Does not exist",
        });
    }

    let token = jwt.sign({ username }, jwtPass);
    return res.json({
        token,
    });
});

app.get("/users", function (req, res) {
    const token = req.headers.authorization;
    try {
        const decoded = jwt.verify(token, jwtPass);
        const username = decoded.username;
        res.status(200).json({ username, USERS });
    } catch (error) {
        return res.status(403).json({
            message: "Invalid token",
        });
    }
});

// start server
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
