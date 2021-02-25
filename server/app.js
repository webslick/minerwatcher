const express = require('express');
const { Router } = require('express');
const cors = require('cors');
const path = require('path');
const config = require('config');
const app = express();
const info_rout = require('./routes/info.routes')
const { serverGet,serwerWorker } = require('./services/serverupdater');
let newData = {};
let oldData = {};
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.setHeader("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods","GET, POST, PATCH, DELETE, OPTIONS");
  res.header('Access-Control-Allow-Credentials', true);
  next();
},express.json());
app.use(cors());

app.use('/api',info_rout);
app.use('/server',Router().get('/getdata',(req,res,next) => {
  res.status(200).send(oldData)
}));
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
if (process.env.NODE_ENV === 'production') {
  app.use('/',express.static(path.join(__dirname,'..','client','build')))
  app.get('*',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'..','client','build','index.html'))
  })
}

const PORT = config.get('Server.port') || 80;

app.listen(PORT,()=>{
    serverGet().then(res => {
      oldData = res;
      serwerWorker(res).then((resWorker) => {
        console.log(oldData.rigs,'olddata')
        oldData.rigs.map((item,i) => {
          // item.temp_arr = resWorker.answer[i].temp_arr
          item.last_update = resWorker.answer[i].last_update
          item.online_time = resWorker.answer[i].online_time
          // item.last_offline = resWorker.answer[i].last_offline
        })
      })
    })
    
    const interval = setInterval(() => {
      console.log('Запрашиваю базу каждые 2 минуты');
      serverGet().then(res => {
        newData = res;
        serwerWorker(res).then((resWorker) => {
          console.log(oldData.rigs,'newdata')
          newData.rigs.map((item,i) => {
            // item.temp_arr = resWorker.answer[i].temp_arr
            item.last_update = resWorker.answer[i].last_update
            item.online_time = resWorker.answer[i].online_time
            // item.last_offline = resWorker.answer[i].last_offline
          })
        })
      })
    }, 60000*2); 
    
    const changeData = setInterval(() => {
      oldData = newData;
    }, 61000*9); 

    console.log(`Start server ${PORT} on port`);
    console.log(`process.env.NODE_ENV = ${process.env.NODE_ENV}`);
});

