interface ViaCepProps {
    localidade: string
    uf: string
}

export class ViaCep {
    cep: string

    constructor(cep: string) {
        this.cep = cep
    }

    async consumeApiViaCep(): Promise<ViaCepProps> {
        this.formatCep(this.cep)
        const urlApi = await fetch(`https://viacep.com.br/ws/${this.cep}/json/`)
        const dataCep = await urlApi.json()

        return {
            localidade: dataCep.localidade,
            uf: dataCep.uf
        }
    }

    formatCep(cep: string) {
        const cepWithoutHifen = cep.substring(5,7)

        return cepWithoutHifen
    }
}