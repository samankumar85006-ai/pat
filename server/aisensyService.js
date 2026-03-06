const axios = require("axios")

const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5YTk0YTllZTVkMThiMGRhNTFmZDAxYyIsIm5hbWUiOiJubyAxMTUxIiwiYXBwTmFtZSI6IkFpU2Vuc3kiLCJjbGllbnRJZCI6IjY5YTk0YTllZTVkMThiMGRhNTFmZDAxNyIsImFjdGl2ZVBsYW4iOiJGUkVFX0ZPUkVWRVIiLCJpYXQiOjE3NzI3MDIzNjZ9.WvMIdsVvoc_iYd8znSlXQz6t8y0OO4ktrMhHTpAXYMg"

exports.getContacts = async () => {

 const res = await axios.get(
 "https://backend.aisensy.com/api/v1/contacts",
 { headers:{ apiKey:API_KEY } }
 )

 return res.data

}

exports.getHistory = async (phone) => {

 const res = await axios.get(
 https://backend.aisensy.com/api/v1/chat-history/${phone},
 { headers:{ apiKey:API_KEY } }
 )

 return res.data

}

exports.getTemplates = async () => {

 const res = await axios.get(
 "https://backend.aisensy.com/api/v1/templates",
 { headers:{ apiKey:API_KEY } }
 )

 return res.data

}

exports.sendText = async (phone,message) => {

 await axios.post(
 "https://backend.aisensy.com/campaign/t1/api/v2",
 {
  apiKey:API_KEY,
  campaignName:"chat",
  destination:91${phone},
  templateParams:[message]
 })

}

exports.sendTemplate = async (phone,template,params=[]) => {

 await axios.post(
 "https://backend.aisensy.com/campaign/t1/api/v2",
 {
  apiKey:API_KEY,
  campaignName:template,
  destination:91${phone},
  templateParams:params
 })

}

exports.sendMedia = async (phone,url,type) => {

 await axios.post(
 "https://backend.aisensy.com/campaign/t1/api/v2",
 {
  apiKey:API_KEY,
  campaignName:"media",
  destination:91${phone},
  media:{
   url:url,
   type:type
  }
 })

}
