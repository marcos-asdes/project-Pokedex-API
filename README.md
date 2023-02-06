<div align="center">
  <a href="https://github.com/marcos-asdes/projeto21R-pokedex-API#readme">
    <img src="https://icon-library.com/images/pokedex-icon/pokedex-icon-21.jpg" alt="pokedex logo" width="150"/>
  </a>
</div>

<div align="center">
<h1 align="center">Pokedex | Back-end</h3>
</div>

  Este projeto está em sua primeira versão, na temática do universo Pokemon, é uma API REST escrita em Typescript que retorna objetos JSON de acordo com a rota acessada, com o intuito de reproduzir algumas funcionalidades de um Pokedex.

## Tech Stack

**Servidor:** [Typescript] Node, Express, API REST

**Banco de dados:** postgres (SQL) com ORM Prisma

**Deploy:** back-end + banco de dados no railways

**Padronização de código:** Prettier e Eslint

<!--**Testes:** -->

## Rotas da API

### Cadastrar mestre Pokemon

```http
  POST /api/sign-up
```

#### formato da requisição JSON esperada

```JSON
  { 
    "email": "ash@email.com",
    "password": "12345678",
    "confirmPassword": "12345678"
  }
```

#### resposta bem-sucedida esperada

```String
    Status Code: 201
    User ash@gmail.com has been registered successfully.
```

### Logar com conta de mestre Pokemon

```http
  POST /api/sign-in
```

#### formato da requisição JSON esperada

```JSON
  { 
    "email": "ash@email.com",
    "password": "12345678"
  }
```

#### resposta bem-sucedida esperada

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

#### resposta bem-sucedida esperada

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

#### resposta bem-sucedida esperada

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

#### resposta bem-sucedida esperada

```String
    Status Code: 200
    The (pokemon_name) has been successfully removed from your Pokedex.
```

## Autor

[@marcos-asdes](https://www.github.com/marcos-asdes)

