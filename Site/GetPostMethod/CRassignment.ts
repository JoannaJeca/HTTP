import http, { IncomingMessage, ServerResponse } from "http"

interface iData{
    id:number
    name:string
    stack:string
    password:number
}

const userData:iData[] = [
    {
        id: 1,
        name: "Emmanuel",
        stack: "Half-stack",
        password:57829365
    },
    {
        id: 2,
        name: "Favour",
        stack: "Half-stack",
        password:785942856
    },
    {
        id: 3,
        name: "Franklin",
        stack: "Half-stack",
        password:6598567678
    },
    {
        id: 4,
        name: "Emmanuel",
        stack: "Half-stack",
        password:5782278457
    },
]

const port = 2005 

const server = http.createServer((req:IncomingMessage, res:ServerResponse<IncomingMessage>)=>{
    res.setHeader("Content-type", "application/json")
    res.write(JSON.stringify({userData}))
    res.end()
});

server.listen(port, ()=>{
    console.log("Port running on", port)
})