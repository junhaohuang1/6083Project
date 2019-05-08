const express = require('express');
var db = require("../../models");
const url = require('url');
var multer  = require('multer')
const path = require('path');

const {acceptFR, sendFR, rejectFR, deleteFR, listFR} = require('./db')


//Set Storage Engine

const router = new express.Router();

const storage = multer.diskStorage({
  destination: __dirname + '/uploads'
})

const upload = multer({ storage: storage })

router.use('/files/',express.static('uploads'));


router.get('/dashboard', (req, res) => {
    console.log("dashboard")
  res.status(200).json({
    message:"we are at our dashboard"
  });
});


router.post('/createpost',upload.single('file'), (req, res) => {
  console.log(req.file)
  db.Post.create({
    username:req.body.username,
    title:req.body.title,
    textbody:req.body.textbody,
    region: req.body.region,
    country:req.body.country,
    path:req.file.filename,
    mimetype:req.body.filetype
  }).then(function(newPost, created){
    res.status(200);
    res.end();
  })
})






router.post('/editprofile/:userid', (req, res, next) => {
  console.log('updating info')
  db.User.update(
    {
    firstname: req.body.firstname.trim(),
    lastname: req.body.lastname.trim(),
    region: req.body.region.label.trim(),
    country:req.body.country.label.trim(),
    birthday: req.body.birthday,
    privacy: req.body.privacy ? 1 : 0,
    interest: req.body.interest.trim()},
    {
      where:{
        id:req.params.userid
      },
      returning: true
    }
  ).then(function(rowsUpdated){
    res.status(200).json({
      rowsUpdated
    });
  }).catch(next)
});


router.get('/profile/:userid', (req, res, next) => {
  console.log('finding user');
  db.User.findOne({
    where: {
      id:req.params.userid
    }
  }).then(function(dbUser) {
    if(dbUser.dataValues.privacy === 1){
      dbUser.dataValues.privacy = true
    } else {
      dbUser.dataValues.privacy = false
    }

    res.status(200).json(dbUser);
  })
  .catch(next);
});


app.get("/getUsersbyName", (req, res) => {
    getUsersbyName(req.body.name).then(result => {
        res.json({
            users:result.rows
        })
    }).catch(e => {
        console.log(e);
    })
})




router.post("/sendFR", (req, res) => {
    console.log("req.body.otherUserId", req.body.otherUserId);
    sendFR(req.session.user.id, req.body.otherUserId, 1).then(result => {
        res.json({
            success: true,
            status: 1,
            receiver_id: result.rows[0].receiver_id,
            sender_id: result.rows[0].sender_id
        })
    }).catch(e => {
        console.log(e);
    })
})


router.post("/acceptFR", (req, res) => {
    console.log("req.body.otherUserId", req.body.otherUserId);
    acceptFR(req.session.user.id, req.body.otherUserId).then(result => {
        console.log("acceptFR results.rows", result.rows);
        res.json({
            success: true,
            sender_id: result.rows[0] && result.rows[0].sender_id,
            receiver_id: result.rows[0] && result.rows[0].receiver_id,
            status: 2
        })
    }).catch(e => {
        console.log(e);
    })
})

router.post("/rejectFR", (req, res) => {
    console.log("req.body.otherUserId", req.body.otherUserId);
    rejectFR(req.session.user.id, req.body.otherUserId).then(result => {
        console.log("rejectFR results.rows", result.rows);
        res.json({
            success: true,
            sender_id: result.rows[0] && result.rows[0].sender_id,
            receiver_id: result.rows[0] && result.rows[0].receiver_id,
            status: 5
        })
    }).catch(e => {
        console.log(e);
    })
})

router.post("/deleteFR", (req, res) => {
    console.log("req.body.otherUserId", req.body.otherUserId);
    deleteFR(req.session.user.id, req.body.otherUserId).then(result => {
        console.log("deleteFR results.rows", result.rows);
        res.json({
            success: true,
            sender_id: result.rows[0] && result.rows[0].sender_id,
            receiver_id: result.rows[0] && result.rows[0].receiver_id,
            status: 4
        })
    }).catch(e => {
        console.log(e);
    })
})


router.get("/listFR", (req, res) => {
    listFR(req.session.user.id).then(result => {
        console.log("listFR results.rows", result.rows);
        res.json({
            success: true,
            users: result.rows,
            loggedUser: req.session.user.id
        })
    }).catch(e => {
        console.log(e);
    })
})





module.exports = router;
