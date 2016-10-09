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
  locations: String,
  stillNeeded: Number,
  registryType: String
})

// var AddressSchema = new Schema({
//   address1: String,
//   address2: String,
//   city: String,
//   state: String,
//   zip: String
// })

var PartnerSchema = new Schema({
  email: String,
  fullName: {type: String, required: true}
})

var UserSchema = new Schema({
  username: String,
  password: String,
  fullName: {type: String, required: true},
  partner: PartnerSchema,
  createdAt: Date,
  updatedAt: Date,
  registryItems: [ItemSchema],
  address: {
    address1: String,
    address2: String,
    city: String,
    state: String,
    zip: String
  }
});

UserSchema.plugin(passportLocalMongoose);
var User = mongoose.model('User', UserSchema);

module.exports = User;
