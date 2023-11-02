import express from 'express';
import ProductController from'./src/controllers/product.controller.js';
import path from 'path';
import expressLayouts from 'express-ejs-layouts';
import validationMiddleware from './src/middlewares/product-validation-middleware.js';
import { upload } from './src/middlewares/file-upload-middleware.js';
import UserController from './src/controllers/user.controller.js';
const app = express();

//setting up ejs view engine
app.set('view engine','ejs');
app.set('views',path.join(path.resolve(),'src','views'));
app.use(express.static('src/views'));
app.use(express.static('public'));

// using express layouts middleware for all
app.use(expressLayouts);

app.use(express.urlencoded({extended:true}));
const userController = new UserController();
const productController = new ProductController();

// GET Requests

app.get('/',productController.getProducts);
app.get('/new',productController.addNewForm);
app.get('/update-product/:id',productController.getUpdateForm);
app.get('/signup',userController.getRegistrationForm);


//POST REQUESTS

app.post('/',upload.single('imageUrl'),validationMiddleware,productController.addProduct);
app.post('/update-product',validationMiddleware, productController.postUpdateProduct);
app.post('/delete-product/:id',productController.deleteProduct);
app.post('/register',userController.register);




const port = 3200;
app.listen(port,()=>{
    console.log('server is running on port ',port);
});