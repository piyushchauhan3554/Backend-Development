const mongoose = require("mongoose");

main = async () => {
  await mongoose.connect("mongodb://127.0.0.1:27017/relation");
};

main()
  .then(() => console.log("DB Connect"))
  .catch((err) => console.log(err))

const createrSchema=new mongoose.Schema({
  name:{
    type:String
  },
  email:{
    type:String
  }
})

const Creater=mongoose.model("Creater",createrSchema)

const insertCreater=async ()=>{
  const c1=new Creater({
    name:"piyush chauhan",
    email:"piyush@gmail"
  })
   await c1.save()

  Creater.insertMany([
    {
      name:"priya chauhan",
      email:"priya@123"
    },{
      name:"preeti chauhan",
      email:"preeti@999"
    }
  ])
}

insertCreater()

module.exports=Creater;