let currentPhone=null

function appendMessage(text){

let div=document.createElement("div")

div.className="msg"

div.innerText=text

document.getElementById("messages").appendChild(div)

}

fetch("/contacts")
.then(r=>r.json())
.then(data=>{

data.forEach(c=>{

let li=document.createElement("li")

li.innerText=c.phone

li.onclick=()=>openChat(c.phone)

document.getElementById("contacts").appendChild(li)

})

})

function openChat(phone){

currentPhone=phone

document.getElementById("number").innerText=phone

fetch("/history/"+phone)
.then(r=>r.json())
.then(data=>{

document.getElementById("messages").innerHTML=""

data.messages.forEach(m=>appendMessage(m.message))

})

}

function send(){

let msg=document.getElementById("msg").value

if(msg.startsWith("/")){

fetch("/send-template",{
method:"POST",
headers:{ "Content-Type":"application/json" },
body:JSON.stringify({
phone:currentPhone,
template:msg.replace("/","")
})
})

return

}

fetch("/send-text",{
method:"POST",
headers:{ "Content-Type":"application/json" },
body:JSON.stringify({
phone:currentPhone,
message:msg
})
})

}
