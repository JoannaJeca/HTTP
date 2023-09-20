    import { log } from 'console'
import http, { IncomingMessage, ServerResponse } from 'http'

    interface iData{
        id:number
        name:string
        age:number
        stack:string
    }
    interface iResponse{
        
        message:string
        success:boolean
        data:null | {} |{}[]
    }

    const userInfo:iData[] =[
        {
            id:1,
            name:"Joan",
            age:78,
            stack:"Front-end"
        },
        {
            id:2,
            name:"Chisom",
            age:48,
            stack:"Front-end"
        },
        {
            id:3,
            name:"Ada",
            age:8,
            stack:"Front-end"
        },
        {
            id:1,
            name:"Ewuzie",
            age:78,
            stack:"Front-end"
        },
    
    ]

    const port = 2005
    const server= http.createServer((req:IncomingMessage, res:ServerResponse<IncomingMessage>)=>{
        res.setHeader("Content-type", "application/json")
        const{method, url} = req

        let status = 404

        let response:iResponse ={
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
              if(url === "/" && method==="GET"){
                status = 200
                response.message = "Successfull!"
                response.success = true,
                response.data = userInfo,
                res.write(JSON.stringify({response, status})),
                res.end()
              }
           })

        
    });

    server.listen(port, ()=>{
        console.log("Port running on", port)
    })
