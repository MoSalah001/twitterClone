const myEnv = require('dotenv')

/*** only for developement purpose to get secret credintals from env files in a local environment
const envo = myEnv.config()
if (envo.error){
  throw envo.error
}
****/

const express = require('express');

const  { Pool }  = require("pg")

const path = require("path")

const bcrypt = require("bcrypt");
const { json } = require('body-parser');

const uri = __dirname+'/public/js/'

const saltRounds = 10

var serverHost = process.env.HOST || '0.0.0.0'

var serverPort = process.env.PORT || 3000

let directory ="../"

const pool = new Pool
(
  {
  host: process.env.DB_HOST ,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port:process.env.DB_PORT
  }
);

const app = express();

app.engine('html',require('ejs').renderFile)

app.use(express.static('public'))
// const cors = require('cors');  only for developement purpose
//app.use(cors());                only for developement purpose

app.listen(serverPort,serverHost,function()
{
  console.log("listening on port %d",serverPort,serverHost);
});

app.use(express.json());

app.get('/',(req,res)=>
{
  res.sendFile(uri+'index.html')
})

app.post('/feed',(req,res)=>
{
  let uname = req.body.user;
  pool.connect();
  pool.query('SELECT * FROM tweets WHERE tweet_author = $1',[uname],(err,result)=>
  {
    if(err) 
    {
      res.send(err);
    } 
    else 
    {
      let tweets = [];
      for(let i=0; i < result.rows.length; i++) 
      {
        tweets.unshift(result.rows[i])
      }
      res.send(tweets)
    }
  })
})

app.post('/user',(req,res) => // getting username from DB 
{ 
  let uname = req.body.user
  directory+"/main.html";
  pool.connect()
  pool.query('SELECT uname FROM users WHERE uname = $1',[uname],(err, result)=>
  {
    if(result !== undefined && result.rowCount > 0)
    {
      res.send(JSON.stringify(result.rows[0].uname))
    } 
    else
    {
      res.redirect(301,directory)
    }
  })
})

app.post('/mew',(req,res)=>
{
  let tweet = req.body.body
  let user = req.body.user
  pool.connect()
  pool.query("SELECT uname , un_id FROM users WHERE uname = $1",[user],(err, result)=>
  {
   var userName = result.rows[0].uname;
    pool.query("INSERT INTO tweets(tweet_body,tweet_author,tweettime) VALUES($1, $2, $3) RETURNING *",[tweet, userName,Date()],(err, result)=>
    {
      if(err) 
      {
        res.send(err);
      }
      else 
      {
        if(result.rows[0] !== undefined) 
        {        
          let refresh = directory+'js/main.html';
          res.redirect(refresh)
        }
      }
    })
  })
})

app.post("/login",(req,res)=> // getting typed username and password for auth from DB;
{
  let uname = req.body.uname;
  let password = req.body.pass.toString()

      pool.query('SELECT pass,uname FROM users WHERE uname = $1',[uname],(err, result)=> 
      {
        if (err) 
        {
          res.status(404).send('query based error');
        } 
        else if(!result.rows[0]) 
        {
          res.status(404).send("you entered a wrong username, please try again");
        } 
        else if(result.rows[0].pass)
        {
        pass = result.rows[0].pass
        bcrypt.compare(password,pass,(err,isMatch)=>
        {
          if(err)
          {
            res.status(404).send("bcrypt check error")
          }
          else if(isMatch) 
          {
            let data =
            {
              user:result.rows[0].uname,
              url:directory+'./js/main.html'
            }
            res.status(200).send(data)
          }
          else if(!isMatch)
          {
            res.status(404).send("you entered a wrong password, please try again")
          }
        })
      }
    })
  }
)

app.post('/reg',(req,res)=>
{
  let uname = req.body.uname;
  let password = req.body.pass;
  let mail = req.body.mail;
  directory+"./js/main.html";
  bcrypt.genSalt(saltRounds,function (err,salt)
  {
    bcrypt.hash(password,saltRounds,function(err,hash)
    {
      if(err) 
      {
        res.send(err)
      }
      else 
      {
        pool.connect()
        pool.query('INSERT INTO users(uname,pass,email,joinDate) VALUES ($1, $2, $3, $4) RETURNING *',[uname, hash, mail,Date()],(err, result)=> 
        {
          if (err) 
          {
            console.log(err);
          } 
          else 
          {
            if(result.rows[0] !== undefined)
            {
              let data =
              {
                uname:result.rows[0].uname,
                url:directory+"./js/main.html"
              }
              res.send(data)
            }
            else
            {
              res.status(404).send("please check again")
            }
          }
        })
      }
    })
  })
})

app.put("/data",(req,res)=>
{
  pool.query("SELECT tweet,tweet_author,tweet_id FROM tweets WHERE tweet_author = $1",[req.body.user],(err,ressult)=>
  {
    if(err)
    { 
      console.log(err);
    }
    else 
    {
      res.send(ressult.rows)
    }
  })
})

app.post("/getHome",(req,res)=>
{
  res.redirect(directory+'./js/main.html')
})

app.post("/delete",(req,res)=>
{
  let data = 
  {
    tweetID:req.body.tweetID,
    uname:req.body.userName
  }
  pool.query('DELETE FROM tweets WHERE tweet_author = $1 AND tweet_id = $2',[data.uname,data.tweetID],(error,result)=>
  {
    if(error) 
    {
      console.log(error);
    } else {
      res.status(200).send()
    }
  })
})


app.get("/logout",(req,res,next)=>
{
  res.status(200).send("/")
})