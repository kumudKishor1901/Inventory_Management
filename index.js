const express = require('express');
const app = express();

app.get('/',(req,res)=>{
    return res.send('Welcome to inventory app');
})


const port = 3100;
app.listen(port,()=>{
    console.log('server is running on port ',port);
});