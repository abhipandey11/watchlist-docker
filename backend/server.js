const express=require("express");
const mongoose=require("mongoose");
const cors=require("cors");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const axios=require("axios");
const path=require("path");

const auth=require("./middleware/auth");

const app=express();

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log("MongoDB connected"))
.catch(err=>console.log(err));

/* SCHEMAS */

const UserSchema=new mongoose.Schema({
username:{type:String,unique:true},
email:String,
password:String
});

const ItemSchema=new mongoose.Schema({
title:String,
type:String,
poster:String,
userId:String
});

const User=mongoose.model("User",UserSchema);
const Item=mongoose.model("Item",ItemSchema);

/* REGISTER */

app.post("/register",async(req,res)=>{

const hashed=await bcrypt.hash(req.body.password,10);

const user=new User({
username:req.body.username,
email:req.body.email,
password:hashed
});

await user.save();

res.json({message:"User created"});

});

/* LOGIN */

app.post("/login",async(req,res)=>{

const user=await User.findOne({username:req.body.username});

if(!user) return res.status(401).send("User not found");

const valid=await bcrypt.compare(req.body.password,user.password);

if(!valid) return res.status(401).send("Wrong password");

const token=jwt.sign({id:user._id},"secretkey");

res.json({token});

});

/* GET ITEMS */

app.get("/items",auth,async(req,res)=>{
const items=await Item.find({userId:req.userId});
res.json(items);
});

/* ADD ITEM */

app.post("/items",auth,async(req,res)=>{

let poster="";

if(req.body.type==="Movie"){

const response=await axios.get(
`https://www.omdbapi.com/?apikey=${process.env.OMDB_KEY}&t=${req.body.title}`
);

poster=response.data.Poster;

}

const item=new Item({
title:req.body.title,
type:req.body.type,
poster,
userId:req.userId
});

await item.save();

res.json(item);

});

/* DELETE */

app.delete("/items/:id",auth,async(req,res)=>{
await Item.findByIdAndDelete(req.params.id);
res.sendStatus(200);
});

/* UPDATE */

app.put("/items/:id",auth,async(req,res)=>{
await Item.findByIdAndUpdate(req.params.id,req.body);
res.sendStatus(200);
});

/* SERVE FRONTEND */

app.use(express.static(path.join(__dirname,"../frontend")));

app.get("/",(req,res)=>{
res.sendFile(path.join(__dirname,"../frontend/index.html"));
});

const PORT=process.env.PORT||5000;

app.listen(PORT,()=>{
console.log("Server running");
});