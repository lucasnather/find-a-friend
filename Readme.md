### Api de adoção de animais

### Regras da aplicação

[X] Deve ser possível VISUALIZAR detalhes de um pet para adoção (id)
[X] Deve ser possível LISTAR todos os pets disponíveis para adoção em uma CIDADE (params)
[X] Deve ser possível FILTRAR pets por suas CARACTERISTICAS
[X] Deve ser possível CADASTRAR um pet
[X] Deve ser possível se CADASTRAR como uma ORG
[X] Deve ser possível REALIZAR login como uma ORG

### Requesitos não funcionais

[X] encriptografar a senha
[X] usar um token jwt para as sessões
[X] usar o refresh token para as orgs

### Regras de negócio

[X] Para listar os pets, OBRIGATORIAMENTE precisamos informar a cidade (params)
[X] Todos os filtros, além da CIDADE, são OPCIONAIS (query)
[X] Uma ORG PRECISA ter um endereço e um número de WhatsApp
[X] Um pet deve estar LIGADO a uma ORG (relação)
[X] O usuário que quer adotar, entrará em CONTATO com a ORG via WhatsApp
[X] Para uma ORG ACESSAR a aplicação como ADMIN, ela precisa estar LOGADA

### Tabelas Banco de dados

[X] Pets
    - Id
    - Nome
    - Sobre (max de 300)
    - Idade (filhote, jovem, adulto, idoso)
    - Porte (pequenino, médio, grande)
    - Energia (baixa, média, alta)
    - Nível de dependência (baixo (precisa de companhia sempre), média, alta)
    - Ambiente (amplo, médio, pequeno)
    - Requesito para adoção (opcional)
    - OrgId
[X] Fotos
    - Id
    - PetsId
    - Imagens
[X] Org
    - Id
    - Nome
    - Email 
    - Cep
    - Endereço
    - Telefone
    - Senha

### Bibliotecas 

[X] prisma @prisma/client
[X] typescript tsup tsx @types/node
[X] fastify @fastify/jwt @fastify/cookie
[X] dotenv
[X] eslint
[X] zod
[X] bcryptjs @types/bcryptjs
[X] vitest vite-tsconfig-paths
[X] supertest @types/supertest
[X] npm-run-all
[X] multer

### Organização

- Server.js
- App.js
- Interfaces
- Repository
- Services
- Controller
- Routes
- Factories
- Database
- Erros
- Middlewares
- Env
- Utils
- Vitest-Enviroment-Prisma

### Container Docker

[X] imagem que eu coloquei docker-compose.yml




