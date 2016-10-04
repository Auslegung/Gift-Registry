var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose= require('passport-local-mongoose');

var ItemSchema = new Schema({
  name: String,
  image: String,
  description: String,
  new: Boolean,
  quantity: Number,
  note: String,
  locations: [String],
  purchased: Boolean,
  registryType: String
})

var PartnerSchema = new Schema({
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  email: {type: String, required: true}
})

var UserSchema = new Schema({
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  partner: [PartnerSchema],
  createdAt: Date,
  updatedAt: Date,
  registryItems: [ItemSchema]
});

UserSchema.plugin(passportLocalMongoose);
var User = mongoose.model('User', UserSchema);

module.exports = User;
