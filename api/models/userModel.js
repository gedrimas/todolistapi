'use strict'

var mongoose = require('mongoose'),
  bcrypt = require('bcrypt'),
  Schema = mongoose.Schema;

 var UserSchema = new Schema({
   name: {
     type: String,
     unique: true,
     trim: true,
     required: true
   },
   hash_password: {
     type: String,
     required: true
   },
   state: {
    type: Schema.Types.Mixed
   }
 });
 
 UserSchema.methods.comparePassword = function(password) {
   return bcrypt.compareSync(password, this.hash_password);
 }

 mongoose.model('User', UserSchema);