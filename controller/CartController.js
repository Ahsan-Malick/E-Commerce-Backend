const { Cart } = require("../model/CartModel");

exports.postCart = async (req, res) => {
    // this product we have to get from API body.
    const items = new Cart(req.body);

    try {
        const carts = await items.save();
      res.status(200).json(carts);
    } catch (err) {
      // Add the 'err' parameter here
      res.status(400).json({ error: err.message });
    }
  };

  exports.getCartById = async (req, res) => {
    // this product we have to get from API body.
    const id=req.params.id;

    try {
        const carts = await Cart.findById(id);
      res.status(200).json(carts);
    } catch (err) {
      // Add the 'err' parameter here
      res.status(400).json({ error: err.message });
    }
  };


  exports.getCart = async (req, res) => {
    // this product we have to get from API body.
    let query = Cart.find({})
    if(req.query.user){
      query=query.find({user:req.query.user});
    }
    if(req.query.title){
      query=query.find({title:req.query.title});
    }

    try {
        const carts = await query.exec();
      res.status(200).json(carts);
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