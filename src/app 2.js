let express=require('express');
let path=require('path');
let app=express();
let hbs=require('hbs')
require('./db/connection')
let loin_data_Collection=require('./model/login')
let PORT=process.env.PORT || 8000;
// for static path
let staticPath=path.join(__dirname,"../public")
// use middle wear for connect static web site

//1.problenb  for staticpath by default /rout a static ar index .thtml asch???????????
app.use(express.static(staticPath));

// for view engine
app.set('view engine','hbs');

// for partial
hbs.registerPartials(path.join(__dirname,'../views/partials'))

// html file taka data take er janno
// postman through
app.use(express.json());
// but index.html page to data
app.use(express.urlencoded({extended:false,}))


app.get('/',(req,res)=>{
    res.render('index.hbs',{
        url2:"https://plus.unsplash.com/premium_photo-1686063712972-e5f1c72a25e1?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
     url:'https://plus.unsplash.com/premium_photo-1714589991638-235c15633f59?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyNXx8fGVufDB8fHx8fA%3D%3D',
               url1:'https://images.unsplash.com/photo-1714498988220-d6783c81a2a2?q=80&w=3088&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    })
    })
//     // dynamic fail hola backp janno static rkha hoa cha top to button exiqut hoi
// app.get('/',(req,res)=>{
// res.sendFile(path.join(staticPath,'index.html','index.html'));
// })


// dynamic render
app.get('/home',(req,res)=>{
    res.render('index.hbs',{
        url2:"https://plus.unsplash.com/premium_photo-1686063712972-e5f1c72a25e1?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
     url:'https://plus.unsplash.com/premium_photo-1714589991638-235c15633f59?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyNXx8fGVufDB8fHx8fA%3D%3D',
               url1:'https://images.unsplash.com/photo-1714498988220-d6783c81a2a2?q=80&w=3088&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
});
    })


    // api vale pass from server to hbs file
app.get('/about',(req,res)=>{
    fetch('https://dummyjson.com/products')
.then(res => res.json())
.then((data)=>{
      res.render('about.hbs',{
        url:'https://plus.unsplash.com/premium_photo-1714589991638-235c15633f59?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyNXx8fGVufDB8fHx8fA%3D%3D',
        url1:'https://images.unsplash.com/photo-1714498988220-d6783c81a2a2?q=80&w=3088&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        url2:"https://plus.unsplash.com/premium_photo-1686063712972-e5f1c72a25e1?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
         data:data.products
    });
});

  
})
app.get('/contact',(req,res)=>{
    // that way easyly we pass props api also pass from hera
    res.render('contact.hbs',{
        url:'https://images.unsplash.com/photo-1715427345776-b3c07159c12f?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    url2:"https://images.unsplash.com/photo-1713494500139-a0d182b60cb8?q=80&w=2000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    });
})
app.get('/cart',(req,res)=>{
    res.render('cart.hbs');
})

app.get('/login',async(req,res)=>{
    res.render('login.hbs');
})
app.post('/login', async(req,res)=>{
try{
    let email=req.body.email;
    let password=req.body.password;
    if(loin_data_Collection.find({email:email})){
    if(loin_data_Collection.find({password:password})){
        res.status(200).render('index',{
            url2:"https://plus.unsplash.com/premium_photo-1686063712972-e5f1c72a25e1?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
     url:'https://plus.unsplash.com/premium_photo-1714589991638-235c15633f59?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyNXx8fGVufDB8fHx8fA%3D%3D',
               url1:'https://images.unsplash.com/photo-1714498988220-d6783c81a2a2?q=80&w=3088&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    });
 
}
else{
    res.send('invaliid email or pass')
}
}
else{
    res.send('invaliid email or pass')
}

}catch(e){
    res.status(400).render('Error404.hbs',{
        error:'opps page not found'
    });
}
})

app.get('/register',async(req,res)=>{
    res.render('Registers.hbs');
})

app.post('/register',async(req,res)=>{
    try{
        let pass=req.body.password;
        let cpass=req.body.confirmPassword;
        if(pass===cpass){
const formData=new loin_data_Collection({
      name:req.body.Name,
      email:req.body.email,
      password:pass,
      confirmPassword:cpass,
      phone:req.body.phone

})
console.log(req.body.name,req.body.email,pass,cpass,req.body.phone)
const register=await formData.save();
res.status(200).render('index',{
    url2:"https://plus.unsplash.com/premium_photo-1686063712972-e5f1c72a25e1?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
 url:'https://plus.unsplash.com/premium_photo-1714589991638-235c15633f59?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyNXx8fGVufDB8fHx8fA%3D%3D',
           url1:'https://images.unsplash.com/photo-1714498988220-d6783c81a2a2?q=80&w=3088&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
});

        }
        else{
            res.send('pass not match')
        }

      }
    catch(e){
        res.status(400).render('Error404.hbs',{
            error:'opps page not found'
        });
    }
})
 
// static and Dynamic both same time not exiquit only one exiqiiut at same becaues 1.render
// and 2.sendFile terminate rout if sendFile exiquit then render not exiquited.
// app.get('/login',(req,res)=>{
//     res.render('login.hbs');
//     res.sendFile(path.join(staticPath,'template.html'));
    
// })




app.get('*',(req,res)=>{
    res.render('Error404.hbs',{
        error:'opps page not found 404 error'
    });

})

app.listen(PORT,()=>{
    console.log('ok')
})