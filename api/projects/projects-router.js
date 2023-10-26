const express = require('express');
const Projects = require('./projects-model.js');
const router = express.Router();

router.get('/', (req, res) => {
    Projects.get()
        .then(projects => {
            res.status(200).json(projects)
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed to get projects',
            err: err.message,
            stack: err.stack,
            });
        });
});

router.get('/:id', (req, res) => {
    Projects.get(req.params.id)
        .then(project => {
            if (project) {
                res.status(200).json(project)
            } else {
                res.status(404).json({ message: 'Project not found' })
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed to get project',
            err: err.message,
            stack: err.stack,
            });
        });
});

router.post('/', (req, res) => {
    Projects.insert(req.body)
        .then(project => {
            res.status(201).json(project)
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed to create new project',
            err: err.message,
            stack: err.stack,
            });
        });
});

module.exports = router;
