export class CidadeNaoExistePetCadastradoError extends Error {
	constructor() {
		super('Não existem pets cadastrados nesta cidade')
	}
}