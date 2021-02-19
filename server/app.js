const express = require('express');
const cors = require('cors');
const path = require('path');
const config = require('config');
const app = express();
const info_rout = require('./routes/info.routes')
app.use(function (req, res, next) {
  res.header('Content-Type', 'application/json');
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.header('Access-Control-Allow-Credentials', true);
  next();
},express.json());
app.use(cors());

app.use('/api',info_rout);

if (process.env.NODE_ENV === 'production') {
  console.log(process.env.NODE_ENV)
  app.use('/',express.static(path.join(__dirname,'client','build')))
  app.get('*',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'client','build','index.html'))
  })
}

const PORT = config.get('Server.port') || 80;

app.listen(PORT,()=>{
    console.log(`Start server ${PORT} on port`);
});

//1