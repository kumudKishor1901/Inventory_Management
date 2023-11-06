import express from 'express';
import ProductController from'./src/controllers/product.controller.js';
import path from 'path';
import expressLayouts from 'express-ejs-layouts';
import validationMiddleware from './src/middlewares/product-validation-middleware.js';
import { upload } from './src/middlewares/file-upload-middleware.js';
import UserController from './src/controllers/user.controller.js';
import session from 'express-session';
import { auth } from './src/middlewares/auth-middleware.js';
import cookieParser from 'cookie-parser';
import { setLastVisit } from './src/middlewares/lastVisit-middleware.js';

const app = express();

//setting up ejs view engine
app.set('view engine','ejs');
app.set('views',path.join(path.resolve(),'src','views'));
app.use(express.static('src/views'));
app.use(express.static('public'));
app.use(session({
    secret: 'secretKey',
    resave: false,
    saveUninitialized: false,
    cookie : {secure:false}
}));

app.use(cookieParser());


// using express layouts middleware for all
app.use(expressLayouts);

app.use(express.urlencoded({extended:true}));
const userController = new UserController();
const productController = new ProductController();

// GET Requests

app.get('/',auth,productController.getProducts);
app.get('/new',auth,productController.addNewForm);
app.get('/update-product/:id',auth,productController.getUpdateForm);
app.get('/signup',userController.getRegistrationPage);
app.get('/login',setLastVisit,userController.getLoginPage);
app.get('/logout',userController.logout);


//POST REQUESTS

app.post('/',upload.single('imageUrl'),validationMiddleware,productController.addProduct);
app.post('/update-product', productController.postUpdateProduct);
app.post('/delete-product/:id',productController.deleteProduct);
app.post('/register',userController.register);
app.post('/login',userController.postLogin);




const port = 3200;
app.listen(port,()=>{
    console.log('server is running on port ',port);
});