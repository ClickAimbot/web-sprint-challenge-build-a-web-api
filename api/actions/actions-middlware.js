const Action = require('./actions-model')

function validateAction(req, res, next) {
    const { project_id, description, notes, completed } = req.body;
    if (!project_id) {
        res.status(400).json({ message: 'Project ID is required' });
    } else if (!description) {
        res.status(400).json({ message: 'Description is required' });
    } else if (!notes) {
        res.status(400).json({ message: 'Notes are required' });
    } else if (completed === undefined || completed === null) {
        res.status(400).json({ message: 'Completed status is required' });
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
