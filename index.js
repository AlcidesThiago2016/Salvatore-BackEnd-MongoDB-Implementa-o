const express = require("express")
const app = express()

app.get("/", function (req, res) {
    res.send("Hello World!!")
})

const lista = ['Java', 'Kotlin', 'Android']

// Endpoint Real All [GET] /personagem
app.get('/personagem', function (req, res){
    res.send(lista.filter(Boolean))
})

// Endpoint Ready By ID [GET] /personagem/:id
app.get('/personagem/:id', function(req, res) {
    // Acessar o parametro ID
    const id = req.params.id

    // Acessar o item na lista usando o ID - 1
    const item = lista[id - 1]

    // Checando se o item foi encontrado
    if (!item){
        return res.status(404).send('Item não encontrado.')
    }

    // Enviando o item com resposta
    res.send(item)
})

app.get('/personagem/count', function (req, res) {
    const totalItens = lista.length
    res.send('Numero total de itens: ${totalItens}' )
})

// Sinalizando para o express que utilizaremos JSON no Body
app.use(express.json())

// Endpoint Create (POST) /personagem
app.post('/personagem', function (req , res) {
    //Acessando o Body da Requisição
    const body = req.body

    //Acessando a propriedade 'nome' do body
    const novoItem = body.nome

    //Checa se o nome esta presente no Body
    if (!novoItem){
        return res.status(400).send('Corpo da requisição deve conter a propriedade nome. ')
    }

    //Checa se o novo item esta na lista
    if (lista.includes(novoItem)){
        return res.status(409).send('Esse item já eciste na lista.')
    }

    //Adicionando na lista
    lista.push(novoItem)

    //Exibindo uma mensagem de sucesso
    res.status(201).send('Item adicionado com sucesso!' + novoItem)
})

// Endpoint Update [PUT] /personagem/id:
app.put('/personagem/:id', function (req, res) {
    const id = req.params.id

    // Checando se o item existe na lista
    if (!lists[id - 1]){
        return res.status(404).send('Item não encontrado.')
    }

    // Acessando o Body da requisição
    const body = req.body

    // Acessando a propriedade 'nome' do body
    const novoItem = body.nome

    //Checa se o nome esta presente no Body
    if (!novoItem){
        return res.status(400).send('Corpo da requisição deve conter a propriedade nome. ')
    }

    //Checa se o novo item esta na lista
    if (lista.includes(novoItem)){
        return res.status(409).send('Esse item já eciste na lista.')
    }

    // Atualizando a lista com o novoItem peli ID -1
    lista[id - 1] = novoItem

    // Enviando uma msg de Sucesso
    res.send('Item Atualizado com Sucesso: ' + id + ' - ' + novoItem )
})

// Endpoint Delete [DELETE] /personagem/:id
app.delete('/personagem/:id', function(req, res) {
    // Acessando o parametro de rota
    const id = req.params.id

    // Removendo o item da lista usando o ID - 1
    delete lista[id - 1]

    // Enviando um Messagem de sucesso
    res.send('Item removido com sucesso: ' + id)
})

app.listen(3000)