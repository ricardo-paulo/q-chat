import { configs } from './configs.mjs'
const config = await configs.get()


export async function init (rl) {

    if (config.username.length < 1) {

        await rl.question('Insira o seu username (Ele será visível a todos): ')
        .then(username => {

            config.username = username

        })

        await configs.save(config)

    }

    return await rl.question('Insira o ip do dispositivo-alvo: ')
    .then(ip => {

        return ip

    })


}