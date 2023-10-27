const Project = require('./projects-model');

function validateProject(req, res, next) {
    const { name, description, completed } = req.body;
    if (!name) {
        res.status(400).json({
            message: 'Project name is required',
        });
    } else if (!description) {
        res.status(400).json({
            message: 'Project description is required',
        });
    } else if (completed === undefined || completed === null) {
        res.status(400).json({
            message: 'Completed status is required',
        });
    } else {
        next();   
    }   
}


async function validateProjectId(req, res, next) {
    try {
        const { id } = req.params;
        const project = await Project.get(id);
        if (!project) {
            res.status(404).json({
                message: 'Project not found',
            })
            } else {
                next();
        }
    } catch (err) {
        res.status(500).json({
            message: 'Server not found',
        })
    }
}

module.exports = {
    validateProject,
    validateProjectId,
}
