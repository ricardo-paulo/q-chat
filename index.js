import express from 'express'
import axios from 'axios'
import { createInterface } from 'readline/promises'
import colors from 'colors'
import { init } from './func/init.mjs'
import { configs } from './func/configs.mjs'
const rl = createInterface(process.stdin, process.stdout, )
const app = express()

console.clear()
console.log('BEM VINDO AO HTTPMSG!'.cyan)
const target = await init(rl)
const config = await configs.get()
//? const port = config.port

//! Apenas para fins de teste, a porta de listen vai ser definida dinamicamente:
const port = await rl.question('Insira a porta de envio: ').then(port => { return port })
//! E a porta de envio também
const portListen = await rl.question('Insira a porta de listen: ').then(port => { return port })

const username = config.username

app.use(express.json())
app.use(express.urlencoded({extended: true}))

//*Recepção da menssagem
app.post('/', (req, res) => {
    
    process.stdout.cursorTo(0)
    process.stdout.clearLine(1)
    console.log(`> ${req.body.msg}`.yellow)
    rl.prompt(true)
    
})

//! Porta de listen definida dinamicamente para testes
app.listen(portListen)

let exit

while (!exit) {

    await rl.question('> '.green)
    .then((input) => {
        
        input = input.trim()
        
        if (input.length > 0) {

            const obj = {

                msg: input,
                username: username

            }
            //* Envio da menssagem
            axios.post(`http://${target}:${port}`, obj)
            .catch((err) => {
            
                console.log(err.cause)
                rl.prompt(true)

            })
            
            }
            
        })   

}