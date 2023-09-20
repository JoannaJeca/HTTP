import http, { IncomingMessage, ServerResponse } from "http"

interface iData{
    id:number
    name:string
    age:number
    stack:string
}

interface iMessage{
    message : string
    success:boolean
    data: null | [] | {}[]
}

const user:iData[] = [
    {
        id: 1,
        name: "Wisdom",
        age : 55,
        stack : "Full-stack"
    },
    {
        id: 2,
        name: "Sean",
        age : 55,
        stack : "Front-end"
    },
    {
        id: 3,
        name: "Prince",
        age : 55,
        stack : "Full-stack"
    },
    {
        id: 4,
        name: "Jessica",
        age : 55,
        stack : "Back-End"
    },
]

const port = 2005

const server = http.createServer((req:IncomingMessage, res:ServerResponse<IncomingMessage>)=>{
    res.setHeader("Content-type", "application/json")
    const {method, url} = req

    let status:number = 404
    const feedback:iMessage = {
        message:"failed",
        success:false,
        data:null
    }

    const container:any = []

    req
       .on("data", (chunk:any)=>{
        container.push(chunk)
       })
       .on("end", ()=>{
        if(url === "/" && method === "GET"){
            status = 200
            feedback.message = "Successfully licensed and promoted as stacks"
            feedback.success = true
            feedback.data = user
            res.write(JSON.stringify({feedback, status}))
            res.end()
        }

        //POST method
        status = 201
        const body = JSON.parse(container)
        user.push(body)
        feedback.message = "Successfully licensed another Stack"
        feedback.success = true
        feedback.data = user
        res.write(JSON.stringify({feedback, status}))
        res.end()
       })

    
});

server.listen(port, ()=>{
    console.log("Port running at ", port)
}) 