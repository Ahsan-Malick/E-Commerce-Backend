const {Order} = require('../model/OrderModel');


exports.getOrderDetail=async(req, res)=>{
    let query = Order.find({});
    try{
    if(req.query.user){
        query=query.find({user:req.query.user})
    }
    const items = await query.exec();
    res.status(200).json(items)
} catch(error){
    res.status(400).json({Alert:error})
}
}

exports.postOrderDetail=async(req, res)=>{
    let order = new Order(req.body);
    try{
    const items = await order.save();
    res.status(200).json('save successfully')
} catch(error){
    res.status(400).json({Alert:error})
}
}