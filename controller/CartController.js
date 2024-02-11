const { Cart } = require("../model/CartModel");
const { Product } = require("../model/ProductsModel");

exports.postCart = async (req, res) => {
    // this product we have to get from API body.
    const items = new Cart(req.body);

    try {
        const carts = await items.save();
      res.status(200).json(result);
    } catch (err) {
      // Add the 'err' parameter here
      res.status(400).json({ error: err.message });
    }
  };

  exports.getCartById = async (req, res) => {
    //this product we have to get from API body.
    const id=req.user.id;
    console.log(id)

    try {
        const carts = await Cart.findOne({user:id}).populate('user').populate('product');
        // const result = await carts.populate('product')
      res.status(200).json(carts);
    } catch (err) {
      // Add the 'err' parameter here
      res.status(400).json({ error: err.message });
    }
  };


  exports.getCart = async (req, res) => {
    // this product we have to get from API body.
    console.log(req.user)
    let query = Cart.find({})
    if(req.query.user){
      query=query.find({user:req.query.user});
    }
    if(req.query.title){
      query=query.find({title:req.query.title});
    }

    try {
        // const carts = await query.exec(); CHECKKKKK!!!!!!!!!!!!
        const result = await query.populate('user').populate('product');
      res.status(200).json(result);
    } catch (err) {
      // Add the 'err' parameter here
      res.status(400).json({ error: err.message });
    }
  };

  exports.deleteCart = async (req, res) => {
    // this product we have to get from API body.
    const id = req.params.id;
    console.log('am here')

    try {
        const carts = await Cart.findByIdAndDelete(id);
      res.status(200).json('Deleted Successfully');
    } catch (err) {
      // Add the 'err' parameter here
      res.status(400).json({ error: err.message });
    }
  };