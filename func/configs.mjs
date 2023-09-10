//* Este módulo é responsável por ler e escrever informações no arquivo de configurações (config.json).
//
import fs from 'fs/promises'

export const configs = {

    //A função 'save' salva o conteúdo do objeto passado por 
    async save (obj) {

        obj = JSON.stringify(obj)
        await fs.writeFile(new URL('../config.json', import.meta.url), obj)
        .then(() => console.log('Configurações Salvas!'.green))
    
    },

    async get () {
        
        return await fs.readFile(new URL('../config.json', import.meta.url))
        .then((data) => {

            const json = JSON.parse(data)
            return json

        })


    }

}