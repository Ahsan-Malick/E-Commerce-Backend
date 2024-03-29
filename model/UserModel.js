const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  firstname: { type: String, required: true, unique: true },
  lastname: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: Buffer, required: true},
  // role: { type: String, required: true},
  salt: {type: Buffer}
  
});

const virtual = userSchema.virtual('id');
virtual.get(function(){
    return this._id;
})

userSchema.set('toJSON',{
    virtuals: true,
    versionKey: false,
    transform: function(doc, ret) {delete ret._id}
})

exports.User = mongoose.model('User', userSchema);