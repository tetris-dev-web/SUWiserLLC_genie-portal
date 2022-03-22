//Require Mongoose
const mongoose = require('mongoose');

//Define a schema
const Schema = mongoose.Schema;

const ProfileModelSchema = new Schema({
  _id : Schema.Types.ObjectId,
  first_name: String,
  middle_name: String,
  last_name: String,
  alias: String,
  mobile_number: String,
  nationality: String,
  kyc: String,
  address: String,
  email: String,
  created_at: { type: Date, default: Date.now() },
  updated_at: { type: Date, default: Date.now() },
});

//Export function to create "ProfileModel" model class
const ProfileModel = mongoose.model('profiles', ProfileModelSchema);

module.exports = ProfileModel;