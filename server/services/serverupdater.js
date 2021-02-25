const { Admin_users,My_rigs,Temp_rigs } = require('../models');
const moment = require('moment');



const serverGet = async () => {
  let erraray = [];
  let objResult = {
    rigs: [],
    err: null
  };
  let erritem = ['Admin_users','My_rigs','Temp_rigs'];
  const NowBDformat = moment(moment().add(7, 'hours').format("YYYY-MM-DD HH:mm"));
  try {
    let results = await Promise.all([
      Admin_users.findOne({where: { id: '1' }}),
      My_rigs.findAll(),
      Temp_rigs.findOne({where: { id: '1' }})
    ]);

    results.map((item,i) => {

      if (!item || item === null || item === "" || item.length === 0) {
        erraray.push(`Not elem in table for: ${erritem[i]}`);
      }

      if (Array.isArray(item)) {
        item.map((elem) => {
          objResult.rigs.push({
            id: elem.dataValues.id,
            token: elem.dataValues.token,
            email: elem.dataValues.email,
            status: elem.dataValues.status,
            name_rig: elem.dataValues.name_rig,
            temp_min: elem.dataValues.temp_min,
            temp_max: elem.dataValues.temp_max,
            temp_arr: elem.dataValues.temp_arr,
            last_online: elem.dataValues.last_online,
            online_time: elem.dataValues.online_time,
            last_update: elem.dataValues.last_update,
            last_offline: elem.dataValues.last_offline,
            offline_time: elem.dataValues.offline_time
          })
        })
      } else {
        if (item !== null && item.dataValues !== undefined && item.dataValues.login !== undefined) {
          objResult.login = item.dataValues.login,
          objResult.password = item.dataValues.password,
          objResult.email_admin = item.dataValues.email
        }
  
        if (item !== null && item.dataValues !== undefined && item.dataValues.toogle_total_temp !== undefined) {
          objResult.toogle_total_temp = item.dataValues.toogle_total_temp,
          objResult.total_temp_min = item.dataValues.total_temp_min,
          objResult.total_temp_max = item.dataValues.total_temp_max
        }
      }
    });
    objResult.err = erraray;
    return objResult;
  } catch(error) {
    if(error.original !== undefined && error.original.code === 'ER_ACCESS_DENIED_ERROR') {
      erraray.push(`Произошла ошибка: ${error.original.sqlMessage}`);
      objResult.err = erraray;
      return objResult;
    }
    erraray.push(`Произошла ошибка: ${error.msg}`);
    objResult.err = erraray;
    return objResult;
  }
}



const getRndInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

const generationTempArr = (toggle,temp_min,temp_max) => {
  let arr = [];
  for(let i=0 ;i < 6; i++) {
    arr.push(toggle ? getRndInteger(temp_min,temp_max) : getRndInteger(60,75))
  }
  return arr
}

const convertSeconds = (time) => {
  const milliseconds = time%1000;
  const seconds     = parseInt(time=time/1000)%60;
  const minutes     = parseInt(time=time/60)%60;
  const hours       = parseInt(time=time/60)%24;
  const days        =  parseInt(time=time/24);
  return {
    seconds,
    minutes,
    hours,
    days,
  }
}

const differentsTimeOff = (now,last) => {
  return convertSeconds(moment(last).diff(now));
}

const serwerWorker = async obj => {
  const { rigs } = obj;
  let answer = {}
  let erraray = [];
  let hui = [];
  const NowBDformat = moment(moment().add(7, 'hours').format("YYYY-MM-DD HH:mm"));
  let objResult = {
    err: null,
    msg: null,
    answer: []
  };

  try {
    rigs.map(async(item,i) => {

      if (obj.toogle_total_temp === "true") {
        item.temp_arr = generationTempArr(obj.toogle_total_temp,obj.total_temp_min,obj.total_temp_max);
      } else {
        item.temp_arr = generationTempArr(obj.toogle_total_temp,item.temp_min,item.temp_max);
      }

      if(item.status === 'off') {
        answer = {
          temp_arr: rigs[i].temp_arr.toString(),
          last_update: item.last_online, // последнее обновление было тогда когда карта была онлайн последний раз
          offline_time: NowBDformat, // офлайн карта находится в данный момент
          last_online: item.online_time, // последний раз карта была в сети когда она была офлайн
          
        }
      } else {
        answer = {
          temp_arr: rigs[i].temp_arr.toString(),
          last_update: NowBDformat,
          // last_update: NowBDformat.subtract(getRndInteger(1,2),'minutes'),
          online_time: NowBDformat,
          last_offline: item.online_time,
          last_online: item.offline_time,
        }
      }

      let results =  My_rigs.update(answer, { where: {id: item.id} });
      if ((results === null || results.length === 0) && results[0] === 0)  {
        erraray.push(`Произошла ошибка база не была перезаписана :(`);
      }

      objResult.answer.push(answer);
      objResult.err = erraray;
      objResult.msg = "Completed update base";
    })
    return objResult;
  } catch(error) {
    if(error.original !== undefined && error.original.code === 'ER_ACCESS_DENIED_ERROR') {
      erraray.push(`Произошла ошибка: ${error.original.sqlMessage}`);
      objResult.err = erraray;
      return objResult;
    }
    erraray.push(`Произошла ошибка: ${error.msg}`);
    objResult.err = erraray;
    return objResult;
  }

  // console.log()
  // rigs.map(async (item,i) => {
  //   My_rigs.update(req.body, {
  //     where: {
  //       id: idRig,
  //     }
  //   })
  //   .then(res => {
  //     if (!res || res === null || res === "" || res.length === 0) {
  //       erraray.push(`Not elem in table for: ${erritem[i]}`);
  //     }
  //   res.status(200).send({msg: "Update base succes"})
  //   })
  //   .catch(error => {
  //     if(error.original !== undefined && error.original.code === 'ER_ACCESS_DENIED_ERROR') {
  //       erraray.push(`Произошла ошибка: ${error.original.sqlMessage}`);
  //       objResult.err = erraray;
  //       return objResult;
  //     }
  //     erraray.push(`Произошла ошибка: ${error.msg}`);
  //     objResult.err = erraray;
  //     return objResult;
  //   }) 
  //   // await axios.put(`/api/putRig?id=${i+1}`, answer)
  // })
}

module.exports = { serverGet,serwerWorker }

