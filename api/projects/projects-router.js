const express = require('express');
const Projects = require('./projects-model.js');
const router = express.Router();
const {
    validateProject,
    validateProjectId,
} = require('./projects-middleware');


router.get('/', (req, res) => {
    Projects.get()
        .then(projects => {
            res.status(200).json(projects)
            console.log(projects)
        })
        .catch(err => {
            res.status(500).json({
                message: 'Failed to get projects',
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
            res.status(500).json({
                message: 'Failed to get project',
                err: err.message,
                stack: err.stack,
            });
        });
});

router.post('/', (req, res) => {
    const { name, description } = req.body;
    console.log(req.body)
    if (!name || !description) {
        res.status(400).json({ message: 'Project name and description are required' })
    } else {
        Projects.insert(req.body)
            .then(project => {
                if (project) {
                    res.status(201).json(project)
                } else {
                    res.status(400).json({ message: 'Project name is required' })
                }
            })
            .catch(err => {
                res.status(500).json({
                    message: 'Failed to create new project',
                    err: err.message,
                    stack: err.stack,
                });
            });
    }
});

router.put('/:id', validateProjectId, validateProject, async (req, res) => {
    try {
        const updatedProject = await Projects.update(req.params.id, req.body);
        res.status(200).json(updatedProject);
        console.log(req.body)
    } catch (err) {
        res.status(500).json({
            message: 'Failed to update project',
            err: err.message,
            stack: err.stack,
        });
    }
});

router.delete('/:id', (req, res) => {
    Projects.remove(req.params.id)
        .then(count => {
            if (count > 0) {
                res.status(200).json({ message: 'The project has been nuked' })
            } else {
                res.status(404).json({ message: 'Project not found' })
            }
        })
        .catch(err => {
            res.status(500).json({
                message: 'Failed to delete project',
                err: err.message,
                stack: err.stack,
            });
        });
});

router.get('/:id/actions', (req, res) => {
    Projects.getProjectActions(req.params.id)
        .then(actions => {
            res.status(200).json(actions)
        })
        .catch(err => {
            res.status(500).json({
                message: 'Failed to get project actions',
                err: err.message,
                stack: err.stack,
            });
        });
});

module.exports = router;
