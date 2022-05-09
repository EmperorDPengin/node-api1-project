// BUILD YOUR SERVER HERE
const express = require('express');
const User = require('./users/model');

const server = express();

server.use(express.json());


server.get('/api/users', (req, res) => {
    User.find()
        .then(users => {
            res.json(users);
        })
        .catch(() => {
            res.status(500).json({message: "The users information could not be retrieved"});
        });
});

server.get('/api/users/:id', (req, res) => {
    let {id} = req.params;

    User.findById(id)
        .then(user => {
            if(!user) {
                res.status(404).json({message: "The user with the specified ID does not exist"})
            } else {
                res.json(user);
            }
        })
        .catch(() => {
            res.status(500).json({message: "The user info could not be found"});
        });
});

server.post('/api/users', (req, res) => {
    const {name, bio} = req.body;
    if (!name || !bio) {
        res.status(400).json({message: "Please provide name and bio for the user"});
    } else {
        User.insert({name, bio})
            .then(newUser => {
                res.status(201).json(newUser);
            })
            .catch(() => {
                res.status(500).json({message: "There was an error while saving the user to the database"});
            });
    }
});

server.put('/api/users/:id' ,(req, res) => {
    const {id} = req.params;
    const {name, bio} = req.body;

    if (!name || !bio) {
        res.status(400).json({message: "Please provide name and bio for the user"});
    } else {
        User.update(id,{name, bio})
            .then(updatedUser => {
                if (updatedUser == null) {
                    res.status(404).json({message: "The user with the specified ID does not exist"});
                } else {
                    res.status(200).json(updatedUser);
                }
            })
            .catch(() => {
                res.status(500).json({message: "The user information could not be modified"});
            });
    }
});

server.delete('/api/users/:id', (req, res) => {
    const {id} = req.params;

    User.remove(id)
        .then(removedUser => {
            if (removedUser == null) {
                res.status(404).json({message: "The user with the specified ID does not exist"});
            } else {
                res.json(removedUser);
            }
        })
        .catch(() => {
            res.status(500).json({message : "The user could not be removed"})
        });
});

module.exports =  server; // EXPORT YOUR SERVER instead of {}
