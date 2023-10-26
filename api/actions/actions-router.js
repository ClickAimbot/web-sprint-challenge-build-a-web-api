const express = require('express');
const Actions = require('./actions-model.js');
const router = express.Router();

router.get('/', (req, res) => {
    Actions.get()
        .then(actions => {
            res.status(200).json(actions)
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed to get actions',
            err: err.message,
            stack: err.stack,
            });
        });
});

router.get('/:id', (req, res) => {
    Actions.get(req.params.id)
        .then(action => {
            if (action) {
                res.status(200).json(action)
            } else {
                res.status(404).json({ message: 'Action not found' })
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed to get action',
            err: err.message,
            stack: err.stack,
            });
        });
});

module.exports = router;