const fs = require("fs")

const{
    asyncReadFile,
    asyncWriteFile
} = require('./dao')

exports.getTodo = async(req, res) => {
    const id = req.params.id
    const file = await asyncReadFile(req.app.locals.dataFilePath)
    const todo = JSON.parse(file).filter(v => v.id == id)
    todo.length == 0 ? res.status(404).send() : res.send(todo[0])
}

exports.getAllTodos = (req, res) => fs.readFile(req.app.locals.dataFilePath, "utf-8", (err, data) => {
    if(err) {
        return res.status(500).send()
    }
    res.send(JSON.parse(data))
})

exports.createTodo = async (req, res) => {
    const newTodo = req.body
    const file = await asyncReadFile(req.app.locals.dataFilePath)
    const Todos = JSON.parse(file)
    if (Todos.filter(v => v.id == newTodo.id).length != 0) {
        res.status(400).send()
    }else{
        Todos.push(newTodo)
        await asyncWriteFile(JSON.stringify(Todos), req.app.locals.dataFilePath)
        res.status(201).send(Todos)
    }
}

exports.deleteTodo = async(req, res) => {
    const id = req.params.id
    const file = await asyncReadFile(req.app.locals.dataFilePath)
    const todos = JSON.parse(file)
    const newtodo = todos.filter(v => v.id !=id)
    if(newtodo.length === todos.length) {
        res.status(404).send()
    }else{
        await asyncWriteFile(JSON.stringify(newtodo), req.app.locals.dataFilePath)
        res.status(204).send()
    }
}