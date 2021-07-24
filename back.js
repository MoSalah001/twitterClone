const express = require('express');

const  { Pool }  = require("pg")

const morgan = require("morgan")

const pool = new Pool({
  user:"postgres",
  password:"MoSalah@864722",
  host:"localhost",
  port:2020,
  database:"TwitterClone"
});

const app = express();

app.listen(3000);

app.use(express.json());

app.post('/feed',(req,res)=>{
  let id = req.body.id;
  pool.connect();
  pool.query('SELECT * FROM tweets WHERE user_id = $1',[id],(err,result)=>{
    if(err) {
      console.log(err);
    } else {
      let tweets = [];
      for(let i=0; i < result.rows.length; i++) {
        tweets.unshift(result.rows[i])
      }
      res.send(tweets)
    }
  })
})

app.post('/user',(req,res) =>{
  let id = req.body.id
  let loc = "http://localhost:5500/login.html";
  pool.connect()
  pool.query('SELECT uname FROM users WHERE user_id = $1',[id],(err, result)=>{
    if(result !== undefined){
    res.send(JSON.stringify(result.rows[0].uname))
    } else {
      res.redirect(301,loc)
    }
  })
})

app.post('/mew',(req,res)=>{
  let tweet = req.body.body
  let user = req.body.user.id
  pool.connect()
  pool.query("SELECT uname FROM users WHERE user_id = $1",[user],(err, result)=>{
   var userName = result.rows[0].uname;
  pool.query("INSERT INTO tweets(tweet,user_id,uname) VALUES($1, $2, $3) RETURNING *",[tweet, user, userName],(err, result)=>{
    if(err) {res.send(err);}
    else {
      if(result.rows[0] !== undefined) {           
        let refresh = req.headers.origin+'/index.html';
        res.redirect(refresh)
          }
      }
})
})
})

app.post("/login",(req,res)=>{
  let uname = req.body.uname;
  let pass = req.body.pass;
  let loc = "http://localhost:5500/index.html";
  pool.connect()
  pool.query('SELECT * FROM users WHERE uname = $1 AND pass =$2',[uname, pass],(err, result)=> {
  if (err) {
    console.log(err);
  } else {
    if(result.rows[0] !== undefined){
  let url = loc+'?'+result.rows[0].user_id;
  res.redirect(url)
    }else {
      res.status(404).send("wrong username or password please try again or create an account")
    }
  }
})
})

app.post('/reg',(req,res)=>{
  let uname = req.body.uname;
  let pass = req.body.pass;
  let mail = req.body.mail;
  console.log(mail);
  let loc = "http://localhost:5500/index.html";
  pool.connect()
  pool.query('INSERT INTO users(uname,pass,email) VALUES ($1, $2, $3) RETURNING *',[uname, pass, mail],(err, result)=> {
  if (err) {
    console.log(err);
  } else {
    if(result.rows[0] !== undefined){
  let url = loc+'?'+result.rows[0].user_id;
  res.redirect(url)
    }else {
      res.status(404).send("please check again")
    }
  }
})
})

app.put("/data",(req,res)=>{
  pool.query("SELECT tweet,uname,tweet_id,user_id FROM tweets WHERE user_id = $1",[req.body.id],(err,ressult)=>{
    if(err){ console.log(err);}
    else {
      res.send(ressult.rows)
    }
  })
})
