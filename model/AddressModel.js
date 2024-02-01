const mongoose = require("mongoose");
const { Schema } = mongoose;

const addressSchema = new Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true},
  country: { type: String, required: true },
  street: { type: String, required: true },
  city: { type: String, required: true },
  postcode: { type: String, required: true },
  user: { type: String, required: true },
});

const virtual = addressSchema.virtual('id');
virtual.get(function(){
    return this._id;
})

addressSchema.set('toJSON',{
    virtuals: true,
    versionKey: false,
    transform: function(doc, ret) {delete ret._id}
})

exports.Address = mongoose.model('Address', addressSchema);