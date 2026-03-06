const socket = io()

socket.on("message",(data)=>{

if(data.phone === currentPhone){

appendMessage(data.message)

}

})

socket.on("typing",(data)=>{

if(data.phone === currentPhone){

document.getElementById("typing").innerText="typing..."

setTimeout(()=>{
document.getElementById("typing").innerText=""
},2000)

}

})
