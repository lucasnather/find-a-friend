export class OrgNotExistsError extends Error {
	constructor() {
		super('Org não existe')
	}
}