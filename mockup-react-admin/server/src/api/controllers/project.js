const projectQueries = require('../models/project');

async function getAllProjects(req, res) {
    try {
        const projects = await projectQueries.getAllProjects();
        res.status(200).json(projects);
    } catch (error) {
        console.error('Error while getting all projects: ' + error);
        res.status(500).json({ message: 'Internal Server Error'});
    }
}

async function getProject(req, res) {
    try {
        const { id } = req.params;

        const project = await projectQueries.getProject(id);
        if (project.length === 0) {
            res.status(404).json({ message: 'Project not found' });
            return;
        }
        res.status(200).json(project[0]);
    } catch (error) {
        console.error('Error while getting project by id: ' + error);
        res.status(500).json({ message: 'Internal Server Error'});
    }
}

async function addProject(req, res) {
    try {
        let {
            name,
            abbreviation,
            year,
            semester,
        } = req.body;

        const missingParams = [];

        // validate parameters
        if (!name) missingParams.push('name');
        if (!abbreviation) missingParams.push('abbreviation');
        if (!year) missingParams.push('year');
        if (!semester) missingParams.push('semester');

        if (missingParams.length > 0) {
            res.status(400).json({ message: `Missing required parameters: ${missingParams.join(', ')}` });
            return;
        }

        //TODO: verify if project already exists (abbreviation/name)

        const newProject = {name, abbreviation, year, semester};
        await projectQueries.addProject(newProject);
        res.status(201).json({ message: 'Project sucessfully created'});

    } catch (error) {
        console.error('Error while adding new project: ' + error);
        res.status(500).json({ message: 'Internal Server Error'});
    }
}

async function updateProject(req, res) {
    try {
        const { id } = req.params;

        // check if project exists
        const project = await projectQueries.getProject(id);
        if (project.length !== 1) {
            res.status(400).json({ message: 'Project not found' });
            return;
        }

        const {
            name,
            abbreviation,
            year,
            semester,
        } = req.body;

        // create update object
        const update = {
            name: name || project[0].name,
            abbreviation: abbreviation || project[0].abbreviation,
            year: year || project[0].year,
            semester: semester || project[0].semester,
        };

        await projectQueries.updateProject(id, update);
        res.status(200).json({ message: 'Project sucessfully updated'});

    } catch (error) {
        console.error('Error while updating project: ' + error);
        res.status(500).json({ message: 'Internal Server Error'});
    }
}

module.exports = {
    getAllProjects,
    getProject,
    addProject,
    updateProject,
}
