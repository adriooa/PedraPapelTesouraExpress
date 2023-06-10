# PedraPapelTesouraExpress
Jogo pedra papel tesoura com tabela de lideres apenas backend com node e express, docker 

# Como rodar:
## (1) NPM

1. ```npm install```
2. ```node server.js``` ou ```npx nodemon server.js```


## (2) docker

1. ```docker build -t ppt .```
3. ```docker run -d -p 3000:3000 ppt```

# Funcionalidades
1. **POST Jogada:** uma jogada é feita fazendo um POST no qual o body é um json do tipo:

```
{
  "jogador1": {
    "nome": "Nome1",
    "jogada": "tesoura"
  },
  "jogador2": {
    "nome": "Nome2",
    "jogada": "pedra"
  }
}
```
Feito isso o servidor armazena a jogada nos dados dos jogadores (apresenta o número de jogadas/vitórias de cada jogador) e também retorna o código 200 e quem ganhou. Vale lembrar que retornasse o código 400 caso haja erro.

2. **GET Ranking:** o placar de líderes é obtido fazendo uma requisição GET à página ```/rank```.

4. **GET Jogador:** é possível acessar o score (número de jogadas/ vitórias/ empates/ derrotas) de um jogador na rota ```/jogador/:nomeJogador```.

6. **POST Jogador:** é possível adicionar um jogador e seu score sem precisar fazer jogadas, isso é possível com o post na mesma rota da anterior. Vale lembrar que aqui há o tratamento de erros para verificar se o JSON passado no body da requisição é válido (ou seja, contém apenas o score).

8. **PUT Jogador:** é possível modificar o score de um jogador já existente fazendo um put na mesma rota das duas anteriores.



# Exemplos de testes (requisições) em /images

![exemplo de post](images/3%20post%20eva%20vence.png)
