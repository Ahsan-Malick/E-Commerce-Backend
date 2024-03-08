const { Order } = require("../model/OrderModel");

exports.getOrderDetail = async (req, res) => {
  let query = Order.find({});
  try {
    if (req.query.user) {
      query = query.find({ user: req.query.user });
    }
    const items = await query.exec();
    res.status(200).json(items);
  } catch (error) {
    res.status(400).json({ Alert: error });
  }
};

exports.postOrderDetail = async (req, res) => {
  let order = new Order(req.body);
  let id = req.user.id;
  try {
    await order.save();
    const items = await Order.find({ user: id });
    res.status(200).json(items);
  } catch (error) {
    res.status(400).json({ Alert: error });
  }
};
