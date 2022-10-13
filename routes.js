const routes=dbFunction =>{
  const greeting = Greeting();
	const getIndex= async(req,res)=>{

 let name = greeting.username
 let language = greeting.language
let message= greeting.greet(name,language)

  greeting.username =""
  greeting.language=""
    res.render('index' ,{
    message: message,
      count: await dbFunction.getCounter()
})
}

const greeted= async (req,res)=>{

   let error = greeting.errorMessage(req.body.fullname,req.body.language)
    if (error) {
       req.flash('info', error)
    }else{
      greeting.username = req.body.fullname[0].toUpperCase()+fullname.slice(1).toLowerCase();
      greeting.language = req.body.language
      // username= fullname[0].toUpperCase()+fullname.slice(1).toLowerCase();
      await dbFunction.greets(greeting.username)
    }
res.redirect('/');


}
    const clearName=  async (req,res)=>{
    await dbFunction.clearNames()
  res.redirect('/');
    }
  

    const getName = async (req,res)=>{

 let names= await dbFunction.getNames()
  
   console.log(names)
res.render('greeted',{
  names
})
}

const getUserCounters=  async (req,res)=>{
 let user = req.params.username;
  let counter= await dbFunction.getUserCounter(user)
// await dbFunction.getCounter(user)
  res.render('counter',{user, counter})


}
return{
	getIndex,
	greeted,
	clearName,
	getName,
	getUserCounters,
  Greeting
}
}
module.exports = routes