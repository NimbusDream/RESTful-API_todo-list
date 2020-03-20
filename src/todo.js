const express = require('express')
const fs = require('fs')
const todo = express()
const port = 3000

todo.get('/api/tasks', (req, res) => fs.readFile('./data.json', 'utf-8', (err,data)=>{
    if(err){
        res.status(500).send()
    }else{
        res.json(JSON.parse(data))
    }
}))

todo.listen(port, () => console.log(`Example app listening on port ${port}!`))
