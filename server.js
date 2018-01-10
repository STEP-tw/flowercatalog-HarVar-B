const fs = require('fs');
const timeStamp = require('./time.js').timeStamp;
const http = require('http');
const WebApp = require('./webapp');
const registered_users=[{userName:'harshab',name:'Harsha Vardhana'}];
let toS = o=>JSON.stringify(o,null,2);

let logRequest = (req,res)=>{
  let text = ['------------------------------',
    `${timeStamp()}`,
    `${req.method} ${req.url}`,
    `HEADERS=> ${toS(req.headers)}`,
    `COOKIES=> ${toS(req.cookies)}`,
    `BODY=> ${toS(req.body)}`,''].join('\n');
  fs.appendFile('request.log',text,()=>{});
  console.log(`${req.method} ${req.url}`);
}


let app = WebApp.create();
app.use(logRequest);
app.get('/index.html',(req,res)=>{
  res.setHeader('Content-type','text/html');
  // if(req.cookies.logInFailed) res.write('<p>logIn Failed</p>');
  res.write(fs.readFileSync('index.html'));
  res.end();
});
app.get('/abeliophyllum.html',(req,res)=>{
  res.setHeader('Content-type','text/html');
  // if(req.cookies.logInFailed) res.write('<p>logIn Failed</p>');
  res.write(fs.readFileSync('abeliophyllum.html'));
  res.end();
});
app.get('/ageratum.html',(req,res)=>{
  res.setHeader('Content-type','text/html');
  // if(req.cookies.logInFailed) res.write('<p>logIn Failed</p>');
  res.write(fs.readFileSync('ageratum.html'));
  res.end();
});
app.get('/guestbook.html',(req,res)=>{
  res.setHeader('Content-type','text/html');
  // if(req.cookies.logInFailed) res.write('<p>logIn Failed</p>');
  res.write(fs.readFileSync('guestBook.html'));
  res.end();
});
app.post('/guestbook.html',(req,res)=>{
  console.log("***\nrequest body in server\n",req.body);
  // let user = registered_users.find(u=>u.userName==req.cookies.user.userName);
  console.log("***\ncookies in req from guestbook \n",req.cookies);
  if(req.cookies.sessionid){
    fs.appendFile('comments.txt',req.body.comment+"\n");
    res.redirect('/guestbook.html');
  }
  // append comment
  else
  {res.write("please login to comment.");
  res.redirect('/login.html');
  }
  res.end();
})
app.get('/login.html',(req,res)=>{
  console.log("req.cookies:\n",req.cookies);
  res.setHeader('Content-type','text/html');
  if(req.cookies.logInFailed) res.write('<p>logIn Failed</p>');
  res.write('<p>please login to comment</p><form method="POST"> UserName: <input name="userName"><br>place: <input name="place"> <br><input type="submit"></form>');
  // res.write(fs.readFileSync('login.html'));
  res.end();
});
app.post('/login.html',(req,res)=>{
  console.log("***\n",req.body);
  let user = registered_users.find(u=>u.userName==req.body.userName);
  if(!user) {
    res.setHeader('Set-Cookie',`logInFailed=true`);
    res.redirect('/guestbook.html');
    res.end();
    return;
  }
  let sessionid = new Date().getTime();
  user.sessionid = sessionid;
  res.setHeader('Set-Cookie',`sessionid=${sessionid}`);
  res.redirect('/guestbook.html');
  res.end();
});
app.get('/logout.html',(req,res)=>{
  res.setHeader('Set-Cookie',[`sessionid=null;Expires=${new Date(1).toUTCString()}`,`logInFailed=null;Expires=${new Date(1).toUTCString()}`])
  res.redirect('/login.html');
  res.end();
});
app.get('/css/master.css',(req,res)=>{
  res.setHeader('Content-type','text/css');
  // if(req.cookies.logInFailed) res.write('<p>logIn Failed</p>');
  res.write(fs.readFileSync('./css/master.css'));
  res.end();
});
app.get('/css/abeliophyllum.css',(req,res)=>{
  res.setHeader('Content-type','text/css');
  // if(req.cookies.logInFailed) res.write('<p>logIn Failed</p>');
  res.write(fs.readFileSync('./css/abeliophyllum.css'));
  res.end();
});
app.get('/css/ageratum.css',(req,res)=>{
  res.setHeader('Content-type','text/css');
  // if(req.cookies.logInFailed) res.write('<p>logIn Failed</p>');
  res.write(fs.readFileSync('./css/ageratum.css'));
  res.end();
});
app.get('/favicon.ico',(req,res)=>{
  res.setHeader('Content-type','img/ico');
  // if(req.cookies.logInFailed) res.write('<p>logIn Failed</p>');
  res.write(fs.readFileSync('favicon.ico'));
  res.end();
});
app.get('/freshorigins.jpg',(req,res)=>{
  res.setHeader('Content-type','img/jpg');
  // if(req.cookies.logInFailed) res.write('<p>logIn Failed</p>');
  res.write(fs.readFileSync('freshorigins.jpg'));
  res.end();
});
app.get('/abeliophyllum.jpg',(req,res)=>{
  res.setHeader('Content-type','img/jpg');
  // if(req.cookies.logInFailed) res.write('<p>logIn Failed</p>');
  res.write(fs.readFileSync('abeliophyllum.jpg'));
  res.end();
});
app.get('/ageratum.jpg',(req,res)=>{
  res.setHeader('Content-type','img/jpg');
  // if(req.cookies.logInFailed) res.write('<p>logIn Failed</p>');
  res.write(fs.readFileSync('ageratum.jpg'));
  res.end();
});
app.get('/abeliophyllum.pdf',(req,res)=>{
  res.setHeader('Content-type','application/pdf');
  // if(req.cookies.logInFailed) res.write('<p>logIn Failed</p>');
  res.write(fs.readFileSync('abeliophyllum.pdf'));
  res.end();
});
app.get('/ageratum.pdf',(req,res)=>{
  res.setHeader('Content-type','application/pdf');
  // if(req.cookies.logInFailed) res.write('<p>logIn Failed</p>');
  res.write(fs.readFileSync('ageratum.pdf'));
  res.end();
});

const PORT = 8222;
let server = http.createServer(app);
server.on('error',e=>console.error('**error**',e.message));
server.listen(PORT,(e)=>console.log(`server listening at ${PORT}`));
