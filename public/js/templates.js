let templates=[]

fetch("/templates")
.then(r=>r.json())
.then(data=>{
templates=data
})
