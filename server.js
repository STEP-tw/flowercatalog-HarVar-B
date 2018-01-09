const fs = require('fs');
const timeStamp = require('./time.js').timeStamp;
const http = require('http');
const WebApp = require('./webapp');

let app = WebApp.create();
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
app.get('/css/master.css',(req,res)=>{
  res.setHeader('Content-type','text/css');
  // if(req.cookies.logInFailed) res.write('<p>logIn Failed</p>');
  res.write(fs.readFileSync('./css/master.css'));
  res.end();
});
app.get('/css/ageratum.css',(req,res)=>{
  res.setHeader('Content-type','text/css');
  // if(req.cookies.logInFailed) res.write('<p>logIn Failed</p>');
  res.write(fs.readFileSync('./css/ageratum.css'));
  res.end();
});
app.get('/css/abeliophyllum.css',(req,res)=>{
  res.setHeader('Content-type','text/css');
  // if(req.cookies.logInFailed) res.write('<p>logIn Failed</p>');
  res.write(fs.readFileSync('./css/abeliophyllum.css'));
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
