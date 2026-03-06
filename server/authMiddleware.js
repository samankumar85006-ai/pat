function authMiddleware(req,res,next){

 if(req.cookies.auth === "ok"){
  next()
 }else{
  res.status(401).send("Unauthorized")
 }

}

module.exports = authMiddleware
