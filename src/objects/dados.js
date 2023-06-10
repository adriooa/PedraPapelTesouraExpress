
var dados = {};

// checa se o jogador esta nos diciomario dos dados dado seu nome (chave do dicionario), se nao tiver, ele é criado
const checarJogador = (nomeJogador) => {
	if (!dados[nomeJogador]) {
		dados[nomeJogador] = {
			jogadas: 0,
			vitorias: 0,
			empates: 0,
			derrotas: 0
		};
	}
}

exports.addEmpate = (nomeJogador) => {
	checarJogador(nomeJogador);
	dados[nomeJogador].jogadas ++;
	dados[nomeJogador].empates ++;
}

exports.addDerrota = (nomeJogador) => {
	checarJogador(nomeJogador);
	dados[nomeJogador].jogadas ++;
	dados[nomeJogador].derrotas ++;
}

exports.addVitoria = (nomeJogador) => {
	checarJogador(nomeJogador);
	dados[nomeJogador].jogadas ++;
	dados[nomeJogador].vitorias ++;
}


// retorna os dados do jogador, isso é feito para o controler nao acessar diretamente os dados
exports.getJogador = (nomeJogador) => {
	if(dados[nomeJogador]) {
		return dados[nomeJogador];
	}
	else {
		throw 'Jogador inexistente';

	}
}


exports.getRanking = () => {
	// Mapeia o dicionario para um array e ordena
	return Object.entries(dados)
  		.map(([nome, { jogadas, empates, vitorias, derrotas }]) => ({ nome, vitorias }))
  		.sort((a, b) => b.vitorias - a.vitorias);
}


exports.addJogador = (nomeJogador, dict) => {
	dados[nomeJogador] = dict;
}


exports.modJogador = (nomeJogador, dict) => {
	// verifica se o jogador ja existe, se nao existir retorna -1
	if(dados[nomeJogador]) {
		// passa por todas chaves do dicionario de entrada e vai modificando o dicionario dos dados
		for (let propriedade in dict) {
			dados[nomeJogador][propriedade] = dict[propriedade];
		}
	}
	else
		return -1;
}