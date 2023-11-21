export class PetWithoutAnyCharactersError extends Error {
	constructor() {
		super('Pets sem essas caractetísticas')
	}
}