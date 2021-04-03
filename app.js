const express=require('express');
const mongoose=require('mongoose');
const bodyParser = require('body-parser');
const {recipeModel}=require('./model/recipe');
//const{userModel}=require('./model/recipe');


var app=express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

mongoose.connect("mongodb+srv://shaji:ponnu123@cluster1.u2cuq.mongodb.net/recipeDb?retryWrites=true&w=majority",{ useNewUrlParser: true},{ useUnifiedTopology: true });

app.post('/adddish',async (req,res)=>{ 
    try
    {
     var data=req.body;
     console.log(data);
     var data=new recipeModel(req.body);
     var result= await data.save();
     res.json(result);
    }
    catch(error){res.status(500).send(error)}
})


app.get('/viewall', async(req,res)=>{
    try
    {
        var result=await recipeModel.find().exec();
        res.json(result);
    }
    catch(error){res.status(500).send(error)};
})

app.post('/search', async (req,res)=>{
    try
    {
        recipeModel.find(req.body, (error,data)=>{
            if(error){throw error}
            else{res.json(data)};
        })
    }
    catch(error){res.status(500).send(error)};
})

app.post('/delete', async(req,res)=>{
    try
    {
        recipeModel.findByIdAndDelete(req.body.id,(error,data)=>{
            if(error){throw error}
            else{
                res.json({'Status':"Success"});
            }
        })
    }
    catch(error){res.status(500).send(error)}
})

app.post('/deleteruser', async(req,res)=>{
    try
    {
        recipeModel.findByIdAndDelete(req.body.id,(error,data)=>{
            if(error){throw error}
            else{
                res.json({'Status':'Success'});
            }
        })
    }
    catch(error){res.status(500).send(error)}
})

app.put('/update',async(req,res)=>{
    try
    {
        recipeModel.findByIdAndUpdate(req.body.id,
            {
                recipeName:req.body.recipeName,recipeCode:req.body.recipeCode,
                ingredients:req.body.ingredients,hotelName:req.body.hotelName
            },(error,data)=>{
                if(error){throw error}
                else{
                    res.json({'Status':'Success'}); 
                }
            }
            )
    }
    catch(error){res.status(500).send(error)}
})




app.listen(process.env.PORT||3000,{ useUnifiedTopology: true } ,function()
{
    console.log("node server is OK");
}
)