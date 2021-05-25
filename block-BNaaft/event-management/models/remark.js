var express = require('express');
var mongoose = require('mongoose');

var Schema = mongoose.Schema

var remarkSchema = new Schema({
    title:String,
    author:String,
    likes:Number,
    events:[{type:Schema.Types.ObjectId,ref:"Event"}]
},{timestamps:true})

var Remark = mongoose.model("Remark",remarkSchema)
module.exports = Remark;