const db = require('../../config/database');

function getAllProjects() {
    return new Promise((resolve, reject) => {
        db.query(
            'SELECT * FROM projects;',
            (err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res);
                }
            }
        );
    });
}

function getProject(id) {
    return new Promise((resolve, reject) => {
        db.query(
            'SELECT * FROM projects WHERE id = ?;',
            [id],
            (err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res);
                }
            }
        );
    });
}

function addProject(newProject) {
    const {name, abbreviation, year, semester} = newProject;
    return new Promise((resolve, reject) => {
        db.query(
            'INSERT INTO projects (name, abbreviation, year, semester) VALUES (?, ?, ?, ?);',
            [name, abbreviation, year, semester],
            (err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res);
                }
            }
        );
    });
}

function updateProject(id, updateProject) {
    const {name, abbreviation, year, semester} = updateProject;
    return new Promise((resolve, reject) => {
        db.query(
            `
            UPDATE projects
            SET
                name = ?, abbreviation = ?, year = ?, semester = ?
            WHERE id = ?;
            `,
            [name, abbreviation, year, semester, id],
            (err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res);
                }
            }
        );
    });
}

module.exports = {
    getAllProjects,
    getProject,
    addProject,
    updateProject,
}
