const assignment = {
    id: 1, title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-10-10", completed: false, score: 0,
};
const module = {
    id: 1, name: "NodeJS", description: "NodeJS with ExpressJS", course: "Web Development",
};
export default function WorkingWithObjects(app) {
    // Assignments
    app.get("/lab5/assignment", (req, res) => {
        res.json(assignment);
    });
    app.get("/lab5/assignment/title", (req, res) => {
        res.json(assignment.title);
    });
    app.get("/lab5/assignment/title/:newTitle", (req, res) => {
        const { newTitle } = req.params;
        assignment.title = newTitle;
        res.json(assignment);
    });

    // Modules
    app.get("/lab5/module", (req, res) => {
        res.json(module);
    });
    app.get("/lab5/module/name", (req, res) => {
        res.json(module.name);
    });
    app.get("/lab5/module/completed/:isCompleted", (req, res) => {
        const { isCompleted } = req.params;
        module.completed = isCompleted === "true";
        res.json(module);
    });
    app.get("/lab5/module/score/:newScore", (req, res) => {
        const { newScore } = req.params;
        module.score = parseInt(newScore);
        res.json(module);
    });
};
