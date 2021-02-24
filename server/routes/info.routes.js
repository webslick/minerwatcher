const { Router } = require('express');
const sendmail = require('sendmail')();
const { Admin_users,My_rigs,Temp_rigs } = require('../models');
const infoRouter = Router()

infoRouter.post('/sendMail',(req,res) => {
  const { formForgot } = req.body
  if(formForgot !== undefined) {
    sendmail({
      from: `${formForgot}`,
      // to: 'webdev170291@yandex.ru',
      to: 'Spmain54@mail.ru',
      subject: `Запрос на восстонавление пароля от <${formForgot}>`,
      html: `Пользователь с ником ${formForgot.bold()} запрашивает пароль`,
    }, function(err, reply) {
      res.status(200).send({msg: "Email succes"})
      
    })
  }else {
    res.status(200).send({msg: "Sorry blank page :("})
  }

});

infoRouter.get('/getAdmin',async (req,res) => {
  Admin_users.findOne({where: req.query})
  .then(ress => {
    if (!ress || ress === null || ress === "") return res.status(422).send({msg: "Not user in table"})
    res.send(ress.dataValues)
  })
  .catch(error => {
    if(error.original.code === 'ER_ACCESS_DENIED_ERROR') return res.status(422).send({msg: "ER_ACCESS_DENIED_ERROR"})
   res.status(error.statusCode).json({error:error.msg});
  }) 
});

infoRouter.get('/getRigs',(req,res,next) => {
  My_rigs.findAll()
  .then(ress => {
    if (!ress || ress === null || ress === "") return res.status(422).send({msg: "Not user in table"})
    res.send(ress)
  })
  .catch(error => {
    console.log(error.original.code)
    if(error.original.code === 'ER_ACCESS_DENIED_ERROR') return res.status(422).send({msg: "ER_ACCESS_DENIED_ERROR"})
    res.status(error.statusCode).json({error:error.msg});
  }) 
});

infoRouter.get('/getTempRigs',(req,res,next) => {
  Temp_rigs.findOne({where: req.query})
  .then(ress => {
    if (!ress || ress === null || ress === "") return res.status(422).send({msg: "Not user in table"})
    res.send(ress.dataValues)
  })
  .catch(error => {
    if(error.original.code === 'ER_ACCESS_DENIED_ERROR') return res.status(422).send({msg: "ER_ACCESS_DENIED_ERROR"})
    res.status(error.statusCode).json({error:error.msg});
  }) 
});

infoRouter.put('/putRig',(req,res,next) => {
  const idRig = req.query.id;
  My_rigs.update(req.body, {
    where: {
      id: idRig,
    }
  })
  .then(ress => {
    if (!ress || ress === null || ress === "") return res.status(422).send({msg: "Not user in table"})
  res.status(200).send({msg: "Update base succes"})
  })
  .catch(error => {
    if(error.original.code === 'ER_ACCESS_DENIED_ERROR') return res.status(422).send({msg: "ER_ACCESS_DENIED_ERROR"})
    res.status(error.statusCode).json({error:error.msg});
  }) 
});

infoRouter.get('/createAdmin',(req,res,next) => {
  const errors = validationResult(res);
  if(!errors.isEmpty()) {
    return res.status(422).json({errors:errors.array()})
  }
  Admin_users.findOne({where: { email:req.body.email }}).then(user=> {
    if(user) {
      return Promise.reject({statusCode: 422, msg: "error user"})
    } else {
      const {login, email ,password} = req.body
      return Admin_users.create({ login, email, password })
    }
  })
  .catch(error => {
    res.status(error.statusCode).json({error:error.msg});
  })
});

module.exports = infoRouter;
