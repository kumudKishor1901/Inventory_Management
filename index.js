import express from 'express';
import ProductController from'./src/controllers/product.controller.js';
import path from 'path';
import expressLayouts from 'express-ejs-layouts';
import validationMiddleware from './src/middlewares/validation-middleware.js';
const app = express();

//setting up ejs view engine
app.set('view engine','ejs');
app.set('views',path.join(path.resolve(),'src','views'));

// using express layouts middleware for all
app.use(expressLayouts);

app.use(express.urlencoded({extended:true}));

const productController = new ProductController();
app.get('/',productController.getProducts);
app.get('/new',productController.addNewForm);

app.get('/update-product/:id',productController.getUpdateForm);

app.post('/',validationMiddleware,productController.addProduct);

app.post('/update-product',validationMiddleware, productController.postUpdateProduct);
app.use(express.static('src/views'));



const port = 3200;
app.listen(port,()=>{
    console.log('server is running on port ',port);
});