const Action = require('./actions-model')

function validateAction(req, res, next) {
    const { project_id, description, notes, completed } = req.body;
    if (!project_id) {
       return res.status(400).json({ message: 'Project ID is required' });
    } else if (!description) {
       return res.status(400).json({ message: 'Description is required' });
    } else if (!notes) {
       return res.status(400).json({ message: 'Notes are required' });
    } else if (completed === undefined || completed === null) {
       return res.status(400).json({ message: 'Completed status is required' });
    } else {
        next();
    }
}

function errorHandler(err, req, res, next) {
    if (res.headersSent) {
        return next(err);
    }
    res.status(500).json({
        message: 'Internal Server Error',
        error: err.message 
    });
}

async function validateActionId(req, res, next) {
    try {
        const { id } = req.params;
        const action = await Action.get(id);
        if (!action) {
            return res.status(404).json({ message: 'Action not found' })
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
    errorHandler,
}
