const doc = `
-- Pokedex API --

endpoints: 

- method post - sign up 
https://project21r-pokedex-api.herokuapp.com/sign-up
expect json on format:
{
  "email": "email@example.com",
  "password": "password_example",
  "confirmPassword": "password_example"
}

- method post - sign in 
https://project21r-pokedex-api.herokuapp.com/sign-in
expect json on format: 
{
  "email": "email@example.com",
  "password": "password_example"
}

- method get - get all pokemons in database, user token required
https://project21r-pokedex-api.herokuapp.com/pokemons

- method post - add pokemon in user's collection, user token required and pokemon id required
https://project21r-pokedex-api.herokuapp.com/my-pokemons/:id/add

- method post - remove pokemon from user's collection, user token required and pokemon id required
https://project21r-pokedex-api.herokuapp.com/my-pokemons/:id/remove
` 