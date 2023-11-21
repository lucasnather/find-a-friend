export class CityNotRegisterError extends Error {
	constructor() {
		super('Não existem pets cadastrados nesta cidade')
	}
}