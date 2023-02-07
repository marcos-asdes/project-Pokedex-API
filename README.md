<div align="center">
  <a href="https://github.com/marcos-asdes/projeto21R-pokedex-API#readme">
    <img src="https://icon-library.com/images/pokedex-icon/pokedex-icon-21.jpg" alt="pokedex logo" width="175px"/>
  </a>
</div>

<div align="center">
<h1 align="center">Pokedex | Back-end</h3>
</div>

Este projeto, que está em sua primeira versão, possui temática do universo Pokemon. Ele consiste numa API REST escrita em Typescript que retorna objetos JSON de acordo com a rota acessada, com o intuito de reproduzir algumas funcionalidades de um Pokedex.

https://project-pokedex-api-production.up.railway.app/

## Tech Stack

**Servidor:** [Typescript] Node, Express, API REST

**Banco de dados:** postgres (SQL) com ORM Prisma

**Deploy:** back-end + banco de dados no railway

**Padronização de código:** Prettier e Eslint

<!--**Testes:** -->

## Rotas da API

### Cadastrar mestre Pokemon

```http
  POST /api/sign-up
```

#### Formato da requisição JSON esperada

```JSON
  { 
    "email": "ash@email.com",
    "password": "12345678",
    "confirmPassword": "12345678"
  }
```

#### Resposta bem-sucedida esperada

```String
    Status Code: 201
    User ash@gmail.com has been registered successfully.
```

### Logar com conta de mestre Pokemon

```http
  POST /api/sign-in
```

#### Formato da requisição JSON esperada

```JSON
  { 
    "email": "ash@email.com",
    "password": "12345678"
  }
```

#### Resposta bem-sucedida esperada

```String
    Status Code: 200
    User ash@gmail.com has successfully logged in.

    User token: (JSON web token)
```

O token de autenticação é enviado ao _header Authentication_ se o login for válido.

### Obter todos os Pokemons do banco de dados da Pokedex

```http
  GET /api/pokemons
```

| Parâmetro | Tipo     | Descrição                |
| :-------- | :------- | :------------------------- |
| `token` | `string` | **Requerido**. Chave de usuário logado passada através do _header Authentication_ com valor `Bearer ${token}`|

#### Resposta bem-sucedida esperada

```JSON
[
  {
    "id": 1,
    "name": "bulbasaur",
    "number": 1,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
    "weight": 69,
    "height": 7,
    "baseExp": 64,
    "description": "no description available",
    "inMyPokemons": false
  }, ...
]
```

### Adicionar um Pokemon ao Pokedex pessoal do usuário

```http
  POST /api/my-pokemons/:id/add
```

| Parâmetro | Tipo     | Descrição                |
| :-------- | :------- | :------------------------- |
| `token` | `string` | **Requerido**. Chave de usuário logado passada através do _header Authentication_ com valor `Bearer ${token}`|
| `id` | `integer` | **Requerido**. Id do Pokemon passado como _queryParams_ no lugar de `:id`|

#### Resposta bem-sucedida esperada

```String
    Status Code: 200
    The (pokemon_name) has been successfully added to your Pokedex.
```

### Remover um Pokemon do Pokedex pessoal do usuário

```http
  POST /api/my-pokemons/:id/remove
```

| Parâmetro | Tipo     | Descrição                |
| :-------- | :------- | :------------------------- |
| `token` | `string` | **Requerido**. Chave de usuário logado passada através do _header Authentication_ com valor `Bearer ${token}`|
| `id` | `integer` | **Requerido**. Id do Pokemon passado como _queryParams_ no lugar de `:id`|

#### Resposta bem-sucedida esperada

```String
    Status Code: 200
    The (pokemon_name) has been successfully removed from your Pokedex.
```

## Adições de conteúdo e funcionalidades planejadas

- Scripts de testes unitários e de integração para cada uma das rotas criadas.
- Estrutura de armazenamento de memória cache para requisições repetidas, porém sem atualização de dados, utilizando o Redis.
- Uma rota que retorne apenas os Pokemons adicionados na Pokedex pessoal do mestre Pokemon.
- Uma rota alternativa para adição de Pokemon pelo seu nome.
- Uma rota que, ao fornecer uma lista de características, retorne todos os Pokemons registrados no Pokedex global que sejam compatíveis.
- Uma rota que, ao fornecer uma lista de características, retorne todos os Pokemons registrados no Pokedex pessoal que sejam compatíveis.


## Testes manuais

Para a execução dos testes manuais, é necessário o auxílio de uma extensão de testes, como por exemplo, Insomnia, ThunderClient, entre outras.

De posse de uma extensão de testes, seguindo as instruções e métodos habilitados para cada rota e complementando o URL da rota com o link de deploy da API, é possível utilizar as rotas da API apresentadas anteriormente, conforme exemplo a seguir:

#### Exemplo

```url
  https://project-pokedex-api-production.up.railway.app/api/sign-up

  Uma requisição, em método POST, carregando um objeto JSON dentro das regras da rota.
```


## Variáveis de ambiente

Para executar este projeto numa máquina pessoal, após clonar o projeto, é necessário adicionar as seguintes variáveis de ambiente ao seu arquivo .env: 

- Para conexão com o banco de dados necessita-se da variável `DATABASE_URL`, com valor `postgres://<postgres_user>:<postgres_password>@<url_host>:<url_port>/<postgres_database>`, substituindo os campos conforme os dados pessoais do seu postgres. Em localhost, o trecho `<url_host>:<url_port>` fica como `localhost:5432`.

- A variável `SALT`, com valor numérico inteiro e positivo, auxilia na encriptação de senha.

- As variáveis `JWT_SECRET`, `JWT_EXPIRES_IN` e `JWT_ALGORITHM`, onde a primeira variável é uma senha pessoal para geração de token de formato jwt encriptado, e as demais variáveis são configurações que constam na documentação da biblioteca jwt, nas quais recomenda-se utilizar os valores `1d` para expiração do token após 1 dia e `HS256` como padrão de criptografia, respectivamente.


## Rodando localmente

Abra o seu terminal e clone o projeto.

```bash
  git clone https://github.com/marcos-asdes/project-Pokedex-API.git
```

O projeto se encontrará na pasta padrão de usuário da sua máquina.

Entre na pasta do projeto.

```bash
  cd project-Pokedex-API
```

Instale as dependências do projeto.

```bash
  npm install
```

Insira as variáveis de ambiente no seu arquivo .env.

Chame o ORM Prisma para que ele crie as tabelas do banco de dados.

```bash
  npm run migrate

  or
  
  npx prisma migrate dev
```

Inicie o servidor.

```bash
  npm run build
  npm run start

  or

  npm run ts:start

  or

  npm run dev
```


## License

[MIT](https://github.com/marcos-asdes/project-Pokedex-API/blob/main/LICENSE)


## Autor

[@marcos-asdes](https://www.github.com/marcos-asdes)

