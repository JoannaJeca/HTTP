import http,{ IncomingMessage, ServerResponse } from "http"

interface iData{
    id:number
    name:string
    stack:string
    num:number
}
interface iMessage{
    message:string
    success:boolean
    data: null | {} |{}[]
    
}

const Data:iData[] =[
    {
        id:1,
        name:"Peters",
        stack:"Full-stack",
        num:4759574982 
    },
    {
    id:1,
    name:"Samuel",
    stack:"Full-stack",
    num:474884646782 
   },
   {    id:1,
    name:"Adisa",
    stack:"Full-stack",
    num:475489753 
   },
   {
    id:4,
    name:"Francis",
    stack:"Full-stack",
    num:4759574982 
   },
] 

const port = 2005

const server = http.createServer((req:IncomingMessage, res:ServerResponse<IncomingMessage>)=>{
    res.setHeader("Content-type", "application/json")
    const {method, url} = req

    let status = 404

    let response:iMessage ={
        message: "failed",
        success: false,
        data:null
    }

    let container:any = []

    req
       .on("data", (chunk:any)=>{
        container.push(chunk)
       })
       .on("end", ()=>{
        if(url === "/" && method === "GET"){
            status= 200
            response.message= "Successfully compiled"
            response.success = true
            response.data = Data
            res.write(JSON.stringify({response, status}))
            res.end()
        }

        //post method
        if(url ==="/" && method === "GET"){
            const body = JSON.parse(container)
            Data.push(body)
        }
       })
})