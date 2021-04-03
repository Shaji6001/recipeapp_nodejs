var mongoose=require('mongoose');


var recipeSchema= new mongoose.Schema(
    {
        recipeCode:{type:String},
        recipeName:{type:String},
        ingredients:{type:String},
        hotelName:{type:String},
       
    }
)

var recipeSchemaUser=new mongoose.Schema(
    {
        userName:{type:String},
        userPassword:{type:String},
        confirmPassword:{type:String},
        userEmail:{type:String}
    }
)

var recipeModel=mongoose.model('recipes',recipeSchema);
//var userModel=mongoose.model('users',recipeSchemaUser);

module.exports={recipeModel};
//module.exports={userModel};