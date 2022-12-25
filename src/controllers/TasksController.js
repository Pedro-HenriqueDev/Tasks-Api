const tasksServices = require("../Services/tasksServices");

const home = async(req,res) => {
    res.status(200).json("API Lista toodos")
}

const getAll = async(req,res) => {
    const tasks = await tasksServices.getAll()
    res.status(200).json(tasks)
}

const createTask = async(req,res) => {
    const task = req.body;
    const createdTask = await tasksServices.createTask(task)

    res.status(createdTask.status).json(createdTask.message);
}

const deleteTask = async(req,res) => {
    const {id} = req.params;
    const removeTask =  await tasksServices.deleteTask(id);

    res.status(removeTask.status).json(removeTask.message);
}

const updateTask = async(req,res) => {
    const {id} = req.params;
    const task = req.body;

    const result = await tasksServices.updateTask(id, task);

    res.status(result.status).json(result.message);
}

const filterTask = async(req,res) => {
    const {conteudo} = req.body;
    const resultFilter = await tasksServices.filterTask(conteudo);

    res.status(resultFilter.status).json(resultFilter.message);
}









module.exports = {
    home,
    getAll,
    createTask,
    deleteTask,
    updateTask,
    filterTask
}