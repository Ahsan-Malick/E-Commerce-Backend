const mongoose = require("mongoose");
const { Schema } = mongoose;

const cartSchema = new Schema({
    title: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    price: {
      type: Number,
      min: [1, "wrong min price"],
      max: [5000, "wrong max price"],
    },
    discountPercentage: {
      type: Number,
      min: [1, "wrong min disount"],
      max: [99, "wrong max discount"],
    },
    rating: {
      type: Number,
      min: [0, "wrong min rating"],
      max: [5, "wrong max price"],
      default: 0,
    },
    stock: { type: Number, min: [0, "wrong stock"], default: 0 },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    thumbnail: { type: String, required: true },
    images: { type: [String], required: true },
    quantity: { type: String, required: true },
    user: { type: String, required: true }
});

const virtual = cartSchema.virtual('id');
virtual.get(function(){
    return this._id;
})

cartSchema.set('toJSON',{
    virtuals: true,
    versionKey: false,
    transform: function(doc, ret) {delete ret._id}
})

exports.Cart = mongoose.model('Cart', cartSchema);