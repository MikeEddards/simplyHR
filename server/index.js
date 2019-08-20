require('dotenv').config()
const express = require('express')
const mysql = require('mysql')


const { SERVER_PORT, 
    DB_HOST,
    USER,
    DATABASE,
    PASSWORD
    } = process.env

const app = express()    


app.use(express.json())
// app.use( express.static( `${__dirname}/../build` ) );

const db = mysql.createPool({
    host: DB_HOST,
    user: USER,
    password: PASSWORD,
    database: DATABASE
});


db.getConnection((err) => {
    if(err){
      console.log('Error connecting to Db');
      return;
    }
    console.log('db connected');
  });
 
app.get('/api/employees', (req, res) => {
      db.query("SELECT * FROM employees", (err, result) => {
        if(err) console.log(err);
      res.status(200).send(result);
    });
})
app.post('/api/employee', (req, res) => {
    const {first_name,
        last_name,
        email,
        phone} = req.body
    
    db.query(`INSERT INTO employees (first_name, last_name, email, phone) VALUES ( '${first_name}', '${last_name}','${email}', '${phone}')`  , (err, result) => {
        if(err) console.log(err);
        res.sendStatus(200)
    })    
    
})
app.delete('/api/employee/:id', (req, res) => {
    db.query(`DELETE from employees WHERE id = ${req.params.id}`, (err, result) => {
        if(err) console.log(err)
        res.sendStatus(200)
    })
})
app.put('/api/employee/:id', (req, res) => {
    const {first_name,
        last_name,
        email,
        phone} = req.body
    db.query(`UPDATE employees SET first_name = '${first_name}', last_name = '${last_name}', email = '${email}', phone = '${phone}' WHERE id = ${req.params.id}`, (err, result) => {
        if(err) console.log(err)
        res.sendStatus(200)
    })
}) 




app.listen(SERVER_PORT, () => console.log(`Listening on port: ${SERVER_PORT}`))