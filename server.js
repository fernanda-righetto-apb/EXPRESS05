const express = require("express");
const mysql = require('mysql2');

const mysql_config = require('./mysql_config');

const app = express();

//metodo de entrada pra subir o servidor - internet
app.listen(3000, () => {
    console.log('Servidor em execução');
})

//criação da conexão
const connection = mysql.createConnection(mysql_config);

//definindo uma rota - obs / - root(raiz) do caminho
app.get('/', (req,res) => {
    //criando um objeto result para todos os endpoints(lugar de chegada da rota - ponto de chegada) da API
    let result = {
        status: 'sucesso',
        message: null,
        data: null
    }
    //fazendo a conexão
    // * - ALL
    connection.query('SELECT * FROM tasks', (err, results) => {
        //cuidar do erro
        if(err){
            result.status = 'erro';
            result.message = 'Erro na obteção das tarefas';
            result.data = [];
            // res.send(result);
            res.json(result);
        }else{
            result.status = 'Sucesso';
            result.message = 'Tarefas obtidas com sucesso';
            result.data = results;
            // res.send(result);
            res.json(result);
        }

    })
})