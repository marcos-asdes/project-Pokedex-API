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

#### JSON exemplo

```JSON
  { 
    "email": "ash@email.com",
    "password": "1234568",
    "confirmPassword": "12345678"
  }
```

### Logar com conta de mestre Pokemon

```http
  POST /api/sign-in
```

#### JSON exemplo

```JSON
  { 
    "email": "ash@email.com",
    "password": "1234568"
  }
```

### Obter todos os Pokemons do banco de dados da Pokedex

```http
  GET /api/pokemons
```

| Parâmetro | Tipo     | Descrição                |
| :-------- | :------- | :------------------------- |
| `token` | `string` | **Requerido**. Chave de usuário logado passada através do _headers_ com valor `Bearer ${token}`|


### Adicionar um Pokemon ao Pokedex pessoal do usuário

```http
  POST /api/my-pokemons/:id/add
```

| Parâmetro | Tipo     | Descrição                |
| :-------- | :------- | :------------------------- |
| `token` | `string` | **Requerido**. Chave de usuário logado passada através do _headers_ com valor `Bearer ${token}`|
| `id` | `integer` | **Requerido**. Id do Pokemon passado como _queryParams_ no lugar de `:id`|

### Remover um Pokemon do Pokedex pessoal do usuário

```http
  POST /api/my-pokemons/:id/remove
```

| Parâmetro | Tipo     | Descrição                |
| :-------- | :------- | :------------------------- |
| `token` | `string` | **Requerido**. Chave de usuário logado passada através do _headers_ com valor `Bearer ${token}`|
| `id` | `integer` | **Requerido**. Id do Pokemon passado como _queryParams_ no lugar de `:id`|



## Autor

[@marcos-asdes](https://www.github.com/marcos-asdes)

