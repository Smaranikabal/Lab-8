const express = require('express');
const {total} = require("./api");
const fs = require('fs');
const app = express();

const port = 5000;

app.get('/',(req,res)=>{
    // console.log(req.params);
    num = req.params.num;
    const cart = JSON.parse(fs.readFileSync("cart.json"));
    var sum = 0;
    for (var i = 0; i < cart.length; i++) {
            for(var j = 0; j< cart[i].quantity ;j++){
                sum += cart[i].price;
            }
        }
    res.status(200).json({
        Message: "Showing all content of the cart",
        data: cart,
        total: `total price of the cart is ₹${sum}`
    })
})

app.get('/:num',(req,res)=>{
    num = req.params.num;
    const content = JSON.parse(fs.readFileSync("cart.json"));
    const matcheddata = content.filter(item=>item.num == num);
    // console.log(req.params.matcheddata);
    res.status(200).json({
        message: "Retrieved data",
        data: matcheddata
    })
})

app.listen(port,()=>{
    console.log(`Serving on port: ${port}`);
})  