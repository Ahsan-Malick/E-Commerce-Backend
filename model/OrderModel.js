const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderSchema = new Schema({
  Address: {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    street: { type: String, required: true },
    city: { type: String, required: true },
    postcode: { type: String, required: true },
    country: { type: String, required: true },
  },
  productdetail: { type: [Object], required: true },
  payment: { type: String, required: true },
  subtotal: { type: Number, required: true },
  date: {
    type: Date,
    default: Date.now,
  },
  user: { type: String, required: true },
});
const virtual = orderSchema.virtual("id");
virtual.get(function () {
  return this._id;
});

orderSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

exports.Order = mongoose.model("Order", orderSchema);
