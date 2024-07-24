const express = require("express")
const { MongoClient, ObjectId } = require("mongodb")

// Preparamos as informacoes de acesso ao BD
const dbUrl = 'mongodb+srv://admin:wRTE85269-FDFas@cluster0.7oarkrl.mongodb.net/'
const dbName = 'mongodb-intro-implementacao'

// Declaramos a função main()
async function main() {
    // Realizamos a conexao ao BD
    const client = new MongoClient(dbUrl)
    console.log('Conectando ao banco de dados...')
    await client.connect()
    console.log('Banco de dados conectado com sucesso!')

    const db = client.db(dbName)
    const collection = db.collection('personagem')

    const app = express()

    app.get("/", function (req, res) {
        res.send("Hello World!!")
    })

    const lista = ['Java', 'Kotlin', 'Android']

    // Endpoint Real All [GET] /personagem
    app.get('/personagem',async function (req, res) {
        // Acessando a lista de itens na collection do MongoDB
        const itens = await collection.find().toArray()

        // Enviando a lista de itens como resultado
        res.send(itens)
    })

    // Endpoint Ready By ID [GET] /personagem/:id
    app.get('/personagem/:id', async function (req, res) {
        // Acessar o parametro ID
        const id = req.params.id

        // Acessar o item na collection usando ID
        const item = await collection.findOne({ _id: new ObjectId(id)})

        // Checando se o item foi encontrado
        if (!item) {
            return res.status(404).send('Item não encontrado.')
        }

        // Enviando o item com resposta
        res.send(item)
    })

    app.get('/personagem/count', function (req, res) {
        const totalItens = lista.length
        res.send('Numero total de itens: ${totalItens}')
    })

    // Sinalizando para o express que utilizaremos JSON no Body
    app.use(express.json())

    // Endpoint Create (POST) /personagem
    app.post('/personagem', async function (req, res) {
        //Acessando o Body da Requisição
        const novoItem = req.body

        //Checa se o nome esta presente no Body
        if (!novoItem || !novoItem.nome) {
            return res.status(400).send('Corpo da requisição deve conter a propriedade nome. ')
        }

        //Checa se o novo item esta na lista
        // if (lista.includes(novoItem)) {
        //    return res.status(409).send('Esse item já eciste na lista.')
        //}

        //Adicionando na collection
        await collection.insertOne(novoItem)

        //Exibindo uma mensagem de sucesso
        res.status(201).send(novoItem)
    })

    // Endpoint Update [PUT] /personagem/id:
    app.put('/personagem/:id', async function (req, res) {
        const id = req.params.id

        // Checando se o item existe na lista
        //if (!lists[id - 1]) {
        //    return res.status(404).send('Item não encontrado.')
        //}

        // Acessando o Body da requisição
        const novoItem = req.body

        //Checa se o nome esta presente no Body
        if (!novoItem || !novoItem.nome) {
            return res.status(400).send('Corpo da requisição deve conter a propriedade nome. ')
        }

        //Checa se o novo item esta na lista
        // if (lista.includes(novoItem)) {
        //    return res.status(409).send('Esse item já eciste na lista.')
        //}

        // Atualizando a collection com o novoItem pelo ID 
        await collection.updateOne(
            { _id: new ObjectId(id) },
            { $set: novoItem}
        )

        // Enviando uma msg de Sucesso
        res.send(novoItem)
    })

    // Endpoint Delete [DELETE] /personagem/:id
    app.delete('/personagem/:id', async function (req, res) {
        // Acessando o parametro de rota
        const id = req.params.id

        // Removendo o item da collection usando o ID
        await collection.deleteOne({ _id: new ObjectId(id)})

        // Enviando um Messagem de sucesso
        res.send('Item removido com sucesso: ' + id)
    })

    app.listen(3000)
}
// Fechamos a função main()

main()