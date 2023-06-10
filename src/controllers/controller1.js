// funcionalidades importadas dos dados/ objetos
// lá são armazenados os jogadores, não usei banco de dados aqui
const { addJogada, addEmpate, addVitoria, addDerrota, getJogador, getRanking, addJogador, modJogador } = require('../objects/dados.js');

// dicionario para servir de enum
const Jogadas = {
   "pedra": 0,
   "papel": 1,
   "tesoura": 2
};

exports.postJogada = (req, res, next) => {
   //Jogo -> recebe um body contendo os jogadores (nome e jogada), retorna quem ganhou e muda os dados internamente
   const body = req.body;

   // Verificar se existem exatamente dois jogadores
   const jogadorKeys = Object.keys(body);
   if (jogadorKeys.length !== 2) {
      return res.status(400).send('Body errado. Esperado exatamente dois jogadores.');
   }

   try {

      const jogador1 = body[jogadorKeys[0]];
      const jogador2 = body[jogadorKeys[1]];

      // utiliza o enum para obter o valor da jogada, caso a jogada nao seja "pedra", "papel", ou "tesoura", é um erro
      if (Jogadas.hasOwnProperty(jogador1.jogada)) {
         var val1 = Jogadas[jogador1.jogada];
         if (Jogadas.hasOwnProperty(jogador2.jogada))
            var val2 = Jogadas[jogador2.jogada];
         else
            res.status(400).send('Jogada invalida!');
      }
      else
         res.status(400).send('Jogada invalida!');

      switch (val1 - val2) {
      case 0:
         // empate
         addEmpate(jogador2.nome);
         addEmpate(jogador1.nome);

         res.status(200).send('Empate!');
         break;

      case -1:
      case 2:
         // jogador 2 ganha
         addDerrota(jogador1.nome);
         addVitoria(jogador2.nome);

         res.status(200).send(jogador2.nome + ' vence!');
         break;

      case 1:
      case -2:
         // jogador 1 ganha
         addVitoria(jogador1.nome);
         addDerrota(jogador2.nome);

         res.status(200).send(jogador1.nome + ' vence!');
         break;
      }
   } catch (e) {
      res.status(500).send('Erro inesperado!')
   }
};

exports.getRanking = (req, res, next) => {
   //Placar de lideres
   try {
      const ranking = getRanking();

      // retorna como json
      res.json(ranking);
   } catch(e) {
      res.status(400).send('Erro ao tentar obter ranking!');
   }
};


exports.getJogadorByNome = (req, res, next) => {
   //Retorna informaçoes do jogador
   try {
      let dadosJogador = getJogador(req.params.jogador);

      res.json(dadosJogador);
   } catch (e) {
      res.status(400).send('Jogador inexistente!');
   }

};


exports.postJogador = (req, res, next) => {
   //Adiciona um jogador e suas informaçoes
   const body = req.body;

   var nomeJogador = req.params.jogador;

   const propriedadesDesejadas = ["jogadas", "vitorias", "empates", "derrotas"];

   const propriedadesObjeto = Object.keys(body);

   // verifica se todas as propriedades desejadas estão no body
   const possuiTodasPropriedades = propriedadesDesejadas.every(
      propriedade => propriedadesObjeto.includes(propriedade)
   );

   // verifica se as propriedades estão certas/ não tem nem propriedade a mais nem menos
   if (!possuiTodasPropriedades || !(propriedadesDesejadas.length == propriedadesObjeto.length)) {
      res.status(400).send('Body errado!');
      return;
   }

   try {
      addJogador(nomeJogador, body);
      res.status(200).send('Jogador adicionado!');
   } catch (e) {
      res.status(400).send('Erro ao inserir!');
   }
};


exports.putJogador = (req, res, next) => {
   //Modifica um jogador
   const body = req.body;

   var nomeJogador = req.params.jogador;

   const propriedadesDesejadas = ["jogadas", "vitorias", "empates", "derrotas"];

   const propriedadesObjeto = Object.keys(body);

   //verifica se as propriedades do body estão nas desejadas
   const propriedadesCorretas = propriedadesObjeto.every(
      propriedade => propriedadesDesejadas.includes(propriedade)
   );

   if (!propriedadesCorretas) {
      res.status(400).send('Body errado!');
      return;
   }

   try {
      // usa a funcionalidade dos objetos para modificar o jogador, se ele for inexistente é um erro
      let err = modJogador(nomeJogador, body);
      if (err == -1) 
         res.status(400).send('Jogador inexistente!');
      else
         res.status(200).send('Jogador modificado!');
   } catch (e) {
      res.status(400).send('Erro ao inserir!');
   }
};