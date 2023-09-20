import http, { IncomingMessage, ServerResponse } from "http"

interface iData{
    id:number
    name:string
    age:number
    stack:string
}

interface iMessage {
    message:string
    success:boolean
    data:null | {} | {}[]
}

const User:iData[]= [
    {
        id:1,
        name:"Joan",
        age:33,
        stack:"Back-end"
    },
    {
        id:2,
        name:"Jemima",
        age:23,
        stack:"Full-stack"
    },
    {
        id:1,
        name:"Jessica",
        age:55,
        stack:"Back-end"
    },
    {
        id:1,
        name:"Regina",
        age:33,
        stack:"Back-end"
    },
]

const port = 2005

const server = http.createServer((req:IncomingMessage, res:ServerResponse<IncomingMessage>)=>{
    res.setHeader("Content-type", "application/json")
    const {method, url} = req

    let status = 404
    let myResponse:iMessage = {
        message:"Failed",
        success:false,
        data:null

    }

    const container:any = []

    req
       .on("data", (chunk:any)=>{
        container.push(chunk)
       })
       .on("end", ()=>{
        if(url === "/" && method ==="GET"){
        let status = 200
        myResponse.message = "Successful!"
        myResponse.success = true,
        myResponse.data = User,
        res.write(JSON.stringify({myResponse, status}))
        res.end()
        } 
       })

       //Post method
       if(url === "/" && method === "POST"){
       const body = JSON.parse(container)
       User.push(body)
       status = 201
       myResponse.message = "Successfully added"
       myResponse.success = true
       myResponse.data = User
       res.write(JSON.stringify({myResponse, status}))
       res.end()
       }
})

server.listen(port, ()=>{
    console.log("Port running on", port)
})