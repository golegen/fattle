'use strict'

const path = require('path')
const fs = require('fs')

const Game = require('./game/nes')
const Server = require('./server')

const rom = fs.readFileSync(path.join(__dirname, 'rom.nes'))
const cartridge = new Uint8Array(rom).buffer

const game = new Game(cartridge)
const server = new Server()

server.on('press', (index, button) => game.press(index, button))
server.on('depress', (index, button) => game.depress(index, button))

setInterval((game, server) => {
  server.broadcastScreen(game.screen)
}, 100, game, server)

server.listen(process.env.PORT)
