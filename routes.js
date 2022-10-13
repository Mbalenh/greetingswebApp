const routes=dbFunction =>{

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
let username = req.body.fullname[0].toUpperCase()+fullname.slice(1).toLowerCase();
let language = req.body.language

 if(!username && !language){
     req.flash("error","please select language and enter your username")
     res.redirect("back")
    }
     else if (!username ) {

      req.flash("error", "please enter username")
      res.redirect("back")
    }
   else if (!/^[a-zA-Z]+$/.test(username)) {

      req.flash("error", "invalid username")
      res.redirect("back")
    }
    else if(!language) {
      req.flash("error", "please select language")
      res.redirect("back")
    }else{
       let username = req.body.fullname[0].toUpperCase()+fullname.slice(1).toLowerCase();
          await dbFunction.greets(username)
          res.redirect('/')
    }
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