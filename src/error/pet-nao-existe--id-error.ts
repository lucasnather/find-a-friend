export class PetNotExistsWithIdError extends Error {
	constructor() {
		super('Pet não existe com esse id')
	}
}