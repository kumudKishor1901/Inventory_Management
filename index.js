import express from 'express';
import ProductController from'./src/controllers/product.controller.js';
const app = express();

const productController = new ProductController();
app.get('/',productController.getProducts);


const port = 3200;
app.listen(port,()=>{
    console.log('server is running on port ',port);
});