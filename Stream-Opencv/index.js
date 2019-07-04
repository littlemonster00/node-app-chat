var cors = require('cors')
const cv = require('opencv4nodejs')
const path = require('path')
const express = require('express')
const app = express()

app.use(cors())

const server = require('http').Server(app)
const io = require('socket.io')(server)

const FPS = 20
const wCap = new cv.VideoCapture(0)
wCap.set(cv.CAP_PROP_FRAME_WIDTH, 300)
wCap.set(cv.CAP_PROP_FRAME_HEIGHT, 300)

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'))
})
let count = 0
const array = []
setInterval(() => {
  const frame = wCap.read()
  const image = cv.imencode('.jpg', frame).toString('base64')
  // array.push(image)
  // console.log(array)
  // while (1) io.emit('image', array[array.length])
  io.emit('image', image)
}, 1000 / FPS)

server.listen(3000, () => console.log('server is running!'))
