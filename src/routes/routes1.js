const JogoController = require('../controllers/controller1');
module.exports = (app) => {
   app.get('/jogador/:jogador', JogoController.getJogadorByNome);
   app.get('/rank', JogoController.getRanking);
   app.post('/', JogoController.postJogada);
   app.post('/jogador/:jogador', JogoController.postJogador);
   app.put('/jogador/:jogador', JogoController.putJogador);
}