var express = require('express');
var router = express.Router();

var Event = require('../models/event');
var Remark = require('../models/remark');

/* GET users listing. */


router.get('/',(req,res,next) => {
  Event.find({},(err,events) =>{
    if(err) return next(err)
    res.render('events.ejs',{events});
  })
})


router.get('/new',(req,res) => {
  res.render('createEvent.ejs');
})

router.post('/',(req,res,next) => {
  console.log(req.body);
  Event.create(req.body, (err,event) => {
    if(err) return next(err)
    res.redirect('/events')
  })
})

router.get("/:id",(req,res,next) => {
  var id = req.params.id;
  Event.findById(id).populate('remarks').exec((err,event)=> {
    if(err) return next(err)
    res.render('singleEvent.ejs', {event})
  })
})


router.get("/:id/edit",(req,res,next) => {
  var id = req.params.id;
  Event.findById(id,(err,event) => {
    if(err) return next(err)
    res.render('editEvent.ejs',{event})
  })
})

router.post("/:id/edit",(req,res,next) => {
  var id = req.params.id;
  Event.findByIdAndUpdate(id,req.body,(err,updatedevent) => {
    if(err) return next(err)
    res.redirect('/events.ejs/', + id);
  })
})

router.get("/:id/delete",(req,res,next) => {
  var id = req.params.id;
  Event.findByIdAndDelete(id,(err,event) => {
    if(err) return next(err)
    res.redirect('/events');
  })
})

// for likes in event

router.get("/:id/likes",(req,res,next) => {
  var id = req.params.id;
  Event.findByIdAndUpdate(id,{$inc: {likes:1}}, (err,updatedevent) => {
    if(err) return next(err)
    res.redirect('/events/' + id)
  })
})

// for dislike in events
router.get('/:id/dislike',(req,res,next) => {
  var id = req.params.id;
  Event.findByIdAndUpdate(id,{$inc: {likes:-1}},(err,updatedevent) => {
    if(err) return next(err)
    res.redirect('/events/' + id);
  })
})

router.post('/:articleId/remarks',(req,res,next) => {
  var eventId = request.params.eventId;
  req.body.events = eventId;
  Remark.create(req.body,(err,remark) => {
    if(err) next (err)
    Event.findByIdAndUpdate(eventId,{$push: {remarks: remark_id}},(err,event) => {
      if(err) return next (err);
      res.redirect('/events/' + eventId);
    })
  })

})
module.exports = router;
