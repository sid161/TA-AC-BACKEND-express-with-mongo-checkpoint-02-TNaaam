var express = require('express');
var router = express.Router();

var Event = require('../models/event');
var Remark = require('../models/remark');

router.get('/:id/edit',(req,res,next) => {
    var id = req.params.id;
    Remark.findById(id,(err,remark) => {
        if(err) return next(err)
        res.render('updateRemark',{remark})
    })
})

router.post("/:id/edit",(req,res,next) => {
    var id = req.params.id;
    Remark.findByIdandUpdate(id,req.body,(err,updatedRemark) => {
        if(err) return next(err)
        res.redirect('/events/'+ updatedRemark.events);
    })
})

//likes and dislike in remark
router.get('/:id/likes',(req,res,next) => {
    Remark.findByIdandUpdate(id,{$inc: {likes:1}},(err,updatedRemark) => {
        if(err) return next(err)
        res.redirect('/events/' + updatedRemark.events);
    })
})

router.get('/:id/dislikes',(req,res,next) => {
    Remark.findByIdandUpdate(id,{inc: {likes:-1}},(err,updatedRemark) => {
        if(err) return next(err)
        res.redirect('/events/' + updatedRemark.events);
    })
})

router.get('/:id/delete', (req, res, next) => {
    let id = req.params.id;
    Remark.findByIdAndDelete(id, (err, deletedremark) => {
      if (err) next(err);
      res.redirect('/events/' + deletedremark.events);
    });
  });

  module.exports = router;
