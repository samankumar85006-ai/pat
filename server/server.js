const express = require("express")
const http = require("http")
const socketio = require("socket.io")
const cors = require("cors")
const cookieParser = require("cookie-parser")

const auth = require("./authMiddleware")
const aisensy = require("./aisensyService")

const app = express()
const server = http.createServer(app)
const io = socketio(server)

app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use(express.static("public"))

const PASSWORD="12345@Raju"

let sockets=[]

io.on("connection",(socket)=>{

 sockets.push(socket)

 socket.on("typing",(data)=>{
  sockets.forEach(s=>s.emit("typing",data))
 })

})

app.post("/login",(req,res)=>{

 if(req.body.password === PASSWORD){

  res.cookie("auth","ok",{maxAge:86400000})

  res.json({success:true})

 }else{
  res.json({success:false})
 }

})

app.get("/contacts",auth,async(req,res)=>{
 const data = await aisensy.getContacts()
 res.json(data)
})

app.get("/history/:phone",auth,async(req,res)=>{
 const data = await aisensy.getHistory(req.params.phone)
 res.json(data)
})

app.get("/templates",auth,async(req,res)=>{
 const data = await aisensy.getTemplates()
 res.json(data)
})

app.post("/send-text",auth,async(req,res)=>{
 await aisensy.sendText(req.body.phone,req.body.message)
 res.json({ok:true})
})

app.post("/send-template",auth,async(req,res)=>{
 await aisensy.sendTemplate(req.body.phone,req.body.template)
 res.json({ok:true})
})

app.post("/send-media",auth,async(req,res)=>{
 await aisensy.sendMedia(req.body.phone,req.body.url,req.body.type)
 res.json({ok:true})
})

app.post("/webhook",(req,res)=>{

 sockets.forEach(s=>s.emit("message",req.body))

 res.sendStatus(200)

})

server.listen(3000,()=>{
 console.log("Server running on port 3000")
})
