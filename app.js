const express = require("express");
const app = express();
const fsPromises = require('node:fs/promises');
const path = require('node:path');
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const getUsers = async () => {
    const pathToFileWithDb = path.join(__dirname, 'db.txt');
    const data = await fsPromises.readFile(pathToFileWithDb, 'utf-8');
    return await JSON.parse(data);
}

const users = getUsers().then(users => {
        app.get('/users', (req, res) => {
            try {
                res.json(users)
            } catch (e) {
                res.status(500).send(e.message);
            }
        });

        app.get('/users/:id', (req, res) => {
            try {
                const hasNumber = /\d/.test(req.params.id);
                if (hasNumber) {
                    const id = Number(req.params.id)
                    const user = users.find(user => user.id === id);
                    if (!user) {
                        return res.status(404).send('Not found user');
                    }
                    return res.status(200).json(user);
                }
                return res.status(404).send('You enter incorrect params');
            } catch (e) {
                res.status(500).send(e.message);
            }
        });


        app.post('/users', (req, res) => {
            try {
                const {name, email, password} = req.body;
                const pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
                if (name.length > 2 && name.length < 10 && email.match(pattern) && password.length > 10 && password.length < 20) {
                    const id = users[users.length - 1].id + 1;
                    const newUser = {id, name, email, password};
                    users.push(newUser);
                    return res.status(201).send(newUser);
                }
                return res.status(400).send('Not valid data');

            } catch (e) {
                res.status(500).send(e.message);
            }
        });

        app.put('/users/:id', (req, res) => {
            try {
                const hasNumber = /\d/.test(req.params.id);
                if (hasNumber) {
                    const id = Number(req.params.id);
                    const userIndex = users.findIndex(user => user.id === id);
                    if (userIndex === -1) {
                        return res.status(404).send('User not found');
                    }
                    const {name, email, password} = req.body;
                    const pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
                    if (name.length > 2 && name.length < 10 && email.match(pattern) && password.length > 10 && password.length < 20) {
                        users[userIndex].name = name;
                        users[userIndex].email = email;
                        users[userIndex].password = password;
                        return res.status(201).send(users[userIndex]);
                    }
                    return res.status(400).send('Not valid data');
                }
            } catch (e) {
                res.status(500).send(e.message);
            }
        });

        app.delete('/users/:id', (req, res) => {
            try {
                const hasNumber = /\d/.test(req.params.id);
                if (hasNumber) {
                    const id = Number(req.params.id);
                    const userIndex = users.findIndex(user => user.id === id);
                    if (userIndex === -1) {
                        return res.status(404).send('User not found');
                    }
                    users.splice(userIndex, 1);
                    return res.sendStatus(204);
                }
            } catch (e) {
                res.status(500).send(e.message);
            }
        })
    }
);


app.listen(5100, () => {
    console.log('Server is running ');
});