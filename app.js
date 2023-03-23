const{Client} = require("pg");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
 
const client = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "admin",
    database: "postgres"
})

client.connect();

app.get('/users', function(req,res){
client.query("SELECT * FROM users",function(err, result){
    if(!err){
        res.send(result.rows);
        }
});
    client.end;
})

app.get('/users/:id', function(request,response){
    client.query(`SELECT * FROM users WHERE id=${request.params.id}`,function(err, result){
        if(!err){
            response.send(result.rows);
            }
    }); 
        client.end;
    })

app.post('/users', function(req,res){
    const now = new Date().toISOString();
    
    client.query(`INSERT INTO users(firstname, lastname, email, password, datecreated, datemodified)
    VALUES('${req.body.firstname}','${req.body.lastname}','${req.body.email}','${req.body.password}', '${now}', '${now}')`, function(err,result){
        if(!err){
            res.send("successfully inserted");
        }
        else{
            console.log(err.message);
        }
    });
    client.end;
})

app.put('/users/:id', function(req,res){
    const now = new Date().toISOString();

    client.query(`UPDATE users
    SET firstname = '${req.body.firstname}',
    lastname = '${req.body.lastname}',
    email = '${req.body.email}',
    password = '${req.body.password}',
    datecreated = '${now}',
    datemodified = '${now}'
    
    WHERE id = ${req.params.id}`, function(err, result){
        if(!err){
            res.send("successfully updated");
        }
        else{
            console.log(err.message);
        }
    });
    client.end;             
})

app.delete('/users/:id', function(req,res){
    
    client.query(`DELETE FROM users WHERE id=${req.params.id} `, (err, result)=>{
        if(!err){
            res.send('successfully deleted')
        }
        else{ console.log(err.message) }
    });
    client.end;

})

app.listen(3000, function(req,res){
    console.log("server is running on port 3000");
})



// let userUpdate = req.body;
// let updateQuery = `UPDATE users
//                    SET firstname = '${userUpdate.firstname}',
//                    lastname = '${userUpdate.lastname}',
//                    email = '${userUpdate.email}',
//                    password = '${userUpdate.password}'
//                    where id = ${userUpdate.id}`
                  
//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

//https://github.com/ShahilJha/e-commerce-backend.git


//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 use this one, newest api key