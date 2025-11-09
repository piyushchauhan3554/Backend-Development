// for commonJs
// const sum=require("./Math.js")

// node process object 
// let args=process.argv;
// for(let i=2;i<args.length;i++) console.log(args[i]);

// for es6
// import {sum,mul} from "./Math.js"
// sum(10,10);
// mul(10,10);


import express from "express"

const app=express()

app.get('/:id',(req,res)=>{
  console.log(req.params);
  res.send('hii from piyush');
})
app.listen(5000,()=>{
  console.log('server is listening');
})