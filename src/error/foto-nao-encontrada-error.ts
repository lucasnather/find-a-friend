export class FotoNaoEncotradaError extends Error {
	constructor() {
		super('Foto não encontrada')
	}
}