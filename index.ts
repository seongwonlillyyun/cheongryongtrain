import express from 'express'
import cors from 'cors'
import axios from 'axios'
import http from 'http'
import path from 'path'
import WebSocket from 'ws'

const app = express()
const port = 8080;

app.use(cors());

const server = http.createServer(app);

// WebSocket 서버 생성
const wss = new WebSocket.Server({ server, path: '/ws' });

// WebSocket 연결 처리
wss.on('connection', (ws) => {
  console.log('Client connected');
  
  // 클라이언트에서 메시지를 받았을 때
  ws.on('message', (message) => {
    console.log('Received message:', message);
  });

  // 연결된 클라이언트에게 메시지 보내기
  ws.send('Hello from WebSocket server!');
});
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, 'build')));


app.get('/',(req,res)=>{
    res.send('Welcome to cheongryongtrain server')
})
app.get('/api/subway',async(req:any,res:any)=>{
    const {stname} = req.query
    const api:string = `http://swopenapi.seoul.go.kr/api/subway/67675459757973773536796a5a4569/xml/realtimeStationArrival/0/7/${stname}`
    try {
        const response:any = await axios.get(api)
        res.setHeader('Content-Type', 'application/xml');
        res.send(response.data)
    } catch (error) {
        console.error(error)
        res.status(500).send('실패')
    }
})
app.get('/api/station',async(req:any,res:any)=>{
    const {stname} = req.query
    const stationName = stname.split(' ')[0];
    const api:string = `http://openAPI.seoul.go.kr:8088/584a4c534179737737386656667562/xml/SearchInfoBySubwayNameService/1/5/${stationName}/`
    try {
        const response:any = await axios.get(api)
        res.setHeader('Content-Type', 'application/xml');
        res.send(response.data)
    } catch (error) {
        console.error(error)
        res.status(500).send('실패')
    }
});

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
  });

 server.listen(port,'0.0.0.0',()=>{
    console.log(`Server running on port ${port}`)
})

