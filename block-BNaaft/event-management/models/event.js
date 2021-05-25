var express = require('express');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var eventSchema = new Schema({
    title:String,
    summary:String,
    host:String,
    start_date:Date,
    end_date:Date,
    category:[String],
    location:String,
    likes:{type:Number,default:0},
    remarks:[{type:Schema.Types.ObjectId,ref:"Remark"}]

},{timestamps:true});

var Event = mongoose.model('Event',eventSchema);

module.exports = Event;