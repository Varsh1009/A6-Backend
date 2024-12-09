import * as modulesDao from "./dao.js";
export default function ModuleRoutes(app) {
    // update a module
    app.put("/api/modules/:moduleId", async (req, res) => {
        const { moduleId } = req.params;
        const moduleUpdates = req.body;
        // console.log("Updating module with ID", moduleId, "with data", moduleUpdates);
        const status = await modulesDao.updateModule(moduleId, moduleUpdates);
        res.send(status);
    });

    // delete a module
    app.delete("/api/modules/:moduleId", async (req, res) => {
        const { moduleId } = req.params;
        const status = await modulesDao.deleteModule(moduleId);
        res.send(status);
    });


}
