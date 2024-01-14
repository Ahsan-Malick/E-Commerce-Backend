const express = require ('express');
const server = express();
const mongoose = require('mongoose');
const { createProduct } = require('./controller/ProductsController');
const Router = require('./routes/ProductRoute')




//middlewares

server.use(express.json()); //to parse req.body
server.use('/products', Router);
// server.use('/check', Router);

main().catch(err=>console.log(err));

async function main () {
    await mongoose.connect('mongodb://127.0.0.1:27017/e-commerce');
};


server.get('/',(req, res)=>{
    res.json('success')
});

// server.post('/products', createProduct);


server.listen(1010, ()=>{
    console.log('server working')
});