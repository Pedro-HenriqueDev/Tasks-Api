const connection = require("../models/Tasks");

const getAll = async () => {
    try{
        const [tasks] = await connection.execute('SELECT * FROM tasks');
        return tasks;
    } catch(err){
        console.log(err)
    }
};

const createTask = async(task) => {
    const {title} = task;

        try {
            const query = 'INSERT INTO tasks(title, status) VALUES (?,?)'

            const [createTask] = await connection.execute(query, [title, 'pendente']);

            return {status: 201 ,message: {insertId: createTask.insertId}};
        } catch(err) {
            console.log(err);
            return {status: 500 ,message: "Ocorreu um erro interno"};
        }
};

const deleteTask = async(idTask) => {
    try {
        const [removeTask] = await connection.execute("DELETE FROM tasks WHERE id = ?", [idTask]);

        if(removeTask.affectedRows == 1) {
            return {status: 200, message: `Id: ${idTask} deletado com sucesso`};
        } else if(removeTask.affectedRows == 0) {
            return {status: 204, message: ``};
        }

    } catch(err) {
        console.log(err);
        return {status: 500, message: `Ocorreu um erro`};

    };
};

const updateTask = async(idTask, task) => {
    try {
        const query = "UPDATE tasks SET title = ?, status = ? WHERE id = ? "

        const {title, status} = task;

        const [updateTask] = await connection.execute(query, [title, status, idTask]);

        if(updateTask.affectedRows == 1) {
            return {status: 200, message: "Atualizado com sucesso"};
        } else {
            return {status: 404, message: "Task nao encontrada"};
        }
        
    } catch(err) {
        console.log(err);
        return {status: 500, message: "Ocorreu um erro interno"};
    };
}

const filterTask = async(conteudo) => {
    try {
        const [filter] = await connection.execute(`SELECT * FROM tasks WHERE title LIKE '%${conteudo}%';`);
        return {status: 200, message: filter};
    } catch(err) {
        console.log(err);
        return {status: 500, message: "Ocorreu um erro interno" };
    }
}
module.exports = {
    getAll,
    createTask,
    deleteTask,
    updateTask,
    filterTask
}