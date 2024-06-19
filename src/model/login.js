let mongoose=require('mongoose')
let validator=require('validator');
// for sequirity
let bcript=require('bcryptjs');
// for jwt
let jwt=require('jsonwebtoken')
 
let loginSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:3
    },
    email:{
        type:String,
        unique:true,
        required:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('wrong email')
            }
        }
    },
    password:{
        type:String,
         required:true
    },
    confirmPassword:{
        type:String,
          
        required:true
    },
     
    phone:{
        type:Number,
     },
    //  must banata hoi for use jwt
        tokons:[{
            tokon:{
                type:String,
                required:true
            }

        }]
     


});

//  ************** jwt work for authentication work as middle wear ******************
  loginSchema.methods.generateAuthToken=async function(){
// this use korta hola normal funtion banata hoba  async()=> banala hoba na
try{
     // this._id ata object id ti toString() add korta hoa ,come from post req tai this._id
    const tokonNo=jwt.sign({_id:this._id.toString()},process.env.SECRET_KEY);
    // 2nd agr secretkey min 32 word ja tui dita paru

    // ar ata akhana korta hoba karon tockonNo akahana generate hocha
// **** now tokon a value assign korta hoba
this.tokons=this.tokons.concat({tokon:tokonNo});
// db ta save
await this.save();

 return tokonNo;

}
catch(e){
    console.log(e);
}

  }

//      ***************bcript *******************
// middewear  arg a next acha, must for bcript ,*** akhana bcript use korla sab rout ai
// pass word sequrity thakaba
//  ***** this keyword use korla normal async funtion banata hoba ()=> not work this**********
loginSchema.pre('save',async function(next){
    // if mana only password opetation a chalba nohole next() hoa continue hoba
    if(this.isModified('password')){
        // this.password mana same password value ta
this.password= await bcript.hash(this.password,12);
this.confirmPassword= await bcript.hash(this.password,12);

// this.confirmPassword=undefined; ->only bcript but for jwt cpassword and password same hote hoba
   

}
 // must na dila website lode hota thak ba
next();

});
// bcript end

let loin_data_Collection=new mongoose.model('loin_data_Collection',loginSchema);

module.exports=loin_data_Collection;