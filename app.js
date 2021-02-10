'use strict';

const http = require('http'),
    hostname = '127.0.0.1',
    port = 3001;

const express = require('express'),
    app = express();


app.use(express.json());
app.use(express.urlencoded({ extended:false }))


const Sequelize = require('sequelize');
const { User } = require('./models');

const server = http.createServer(app);

server.listen(port, hostname, () => {
    console.log(`Server is running at http://${hostname}:${port}`)
});

app.get('/', (req, res) => {
    res.sendStatus(200);
})

app.get('/users', async (req, res) => {
    const users = await User.findAll();
    res.json(users);
});

app.get('/users/:id', async (req, res) => {
    const oneUser = await User.findByPk(req.params.id);
    res.json(oneUser);
})

app.post('/users', async (req, res) => {
    const { firstName, lastName, email } = req.body;
    const newUser = await User.create({
        firstName,
        lastName,
        email
    });
    

    res.json({
        id: newUser.id
    });
})

app.delete('/users/:id', async(req, res) => {
    const { id } = req.params;
    const deleteUser = await User.destroy ({
        where: {
            id
        }
    })
    res.json(deleteUser)
})


app.post('/users/:id', async(req, res) => {
    const { id } = req.params;
    const { email } = req.body;

    const updatedUser = await User.update(email, {
        where: {
            id
        }
    })
    res.json(updatedUser);
});