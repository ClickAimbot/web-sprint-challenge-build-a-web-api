const express = require('express');
const Actions = require('./actions-model.js');
const router = express.Router();
const {
    validateAction,
    validateActionId,
} = require('./actions-middlware.js');


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

router.post('/', validateAction, (req, res) => {
    // const {project_id, description, notes} = req.body;
    // if (!project_id || !description || !notes) {
    //     res.status(400).json({ message: 'Project ID, description, and notes are required' })
    // }
    Actions.insert(req.body)
        .then(action => {
            res.status(201).json(action)
            console.log(action)
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed to create new action',
            err: err.message,
            stack: err.stack,
            });
        });
});

router.put('/:id', validateActionId, validateAction, async (req, res, next) => {
    try {
        const updatedAction = await Actions.update(req.params.id, req.body);
        res.status(200).json(updatedAction); 
    } catch (err) {
        next(); 
    }
});


router.delete('/:id', (req, res) => {
    Actions.remove(req.params.id)
        .then(count => {
            if (count > 0) {
                res.status(200).json({ message: 'The action has been deleted' })
            } else {
                res.status(404).json({ message: 'The action could not be found' })
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed to delete action',
            err: err.message,
            stack: err.stack,
            });
        });
});

module.exports = router;