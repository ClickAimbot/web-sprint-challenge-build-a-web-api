const Action = require('./actions-model')

function validateAction(req, res, next) {
    const { project_id, description, notes, completed } = req.body;
    console.log(project_id, description, notes, completed)
    if (!project_id || !description || !notes || !completed) {
        res.status(400).json({ message: 'Project ID, description, and notes are required' })
    } else {
        next();
    }
}

async function validateActionId(req, res, next) {
    try {
        const { id } = req.params;
        const action = await Action.get(id);
        if (!action) {
            res.status(404).json({ message: 'Action not found' })
        } else {
            next();
        }
    } catch (err) {
        res.status(500).json({ message: 'Server not found' })
    }
}

module.exports = {
    validateAction,
    validateActionId,
}
