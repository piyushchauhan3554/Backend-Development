// wrapAsync is use to reduce the line of try-catch code

function hello(){
  console.log('hello piyush');
}

function wrapAsync(hello){
  return function(){
    hello()
  }
}

const res=wrapAsync(hello)

res()