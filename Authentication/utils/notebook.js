const map=new Map;

const setInfo=(id,user)=>{
map.set(id,user)
}

const getInfo=(id)=>{
return map.get(id);
}

module.exports={setInfo,getInfo}


