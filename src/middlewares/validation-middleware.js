const validationMiddleware = (req,res,next)=>{
     // server side form validation 

     const {name,price,imageUrl} = req.body;
     let errors = [];
     // validating name
     if(!name || name.trim()==''){
         errors.push('Name is invalid');
     }

     // validating price 
     if(!price || parseFloat(price)< 0){
         errors.push('Price is invalid');
     }
     // validating url
     try{
         const validUrl = new URL(imageUrl);
     }catch(err){
         errors.push('URL is invalid');
     }

     if(errors.length > 0){
         return res.render('new-product',{errorMessage : errors[0]});
     }
     next();
}

export default validationMiddleware;