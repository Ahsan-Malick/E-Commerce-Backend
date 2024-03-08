const { Cart } = require("../model/CartModel");
const { ObjectId } = require("mongodb");
const { Product } = require("../model/ProductsModel");

exports.postCart = async (req, res) => {
  // this product we have to get from API body.
  const items = new Cart(req.body);
  const id = req.user.id;

  try {
    await items.save();
    let query = await Cart.find({ user: id })
      .populate("product")
      .populate("user");
    res.status(200).json(query);
  } catch (err) {
    // Add the 'err' parameter here
    res.status(400).json({ error: err.message });
  }
};

exports.getCartByUser = async (req, res) => {
  //this product we have to get from API body.
  const id = req.user.id;
  let query = Cart.find({ user: id });
  if (req.query.product) {
    let objId = new ObjectId(req.query.product);
    query = query.findOne({ product: objId });
  }
  try {
    const carts = await query.populate("user").populate("product");
    // const result = await carts.populate('product')
    res.status(200).json(carts);
  } catch (err) {
    // Add the 'err' parameter here
    res.status(400).json({ error: err.message });
  }
};

exports.updateCart = async (req, res) => {
  const userId = req.user.id;
  let prodId = new ObjectId(req.query.product);
  let quantity = req.body.quantity
  let newPrice = req.body.totalPrice;
  console.log(newPrice) // write in notes if possible, made price and total price separately
  try {
    let query =  Cart.findOneAndUpdate({user: userId, product:prodId},{$set: {quantity:quantity,totalPrice: newPrice }},{new: true});
    const cart = await query.populate("user").populate("product");
    res.status(200).json(cart);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteCart = async (req, res) => {
  // this product we have to get from API body.
  const id = req.params.id;
  try {
    const carts = await Cart.findOneAndDelete({ product: id });
    res.status(200).json("Deleted Successfully");
  } catch (err) {
    // Add the 'err' parameter here
    res.status(400).json({ error: err.message });
  }
};

exports.resetCart =async (req, res)=>{

  const id = req.user.id;
  try{
    await Cart.deleteMany({user: id})
    res.status(200).json([])
  }
  catch(err){
    console.log(err)

  }
}
