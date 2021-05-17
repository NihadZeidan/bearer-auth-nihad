# bearer-auth

### Author: Nihad Zeidan


### tests report:

[Heroku]()


[GitHub PR](https://github.com/NihadZeidan/bearer-auth-lab07/pull/2)


[GitHub Actions]()

### .env requirements

PORT - Port Number

DataBase_URI=mongodb://localhost:27017/auth


### Running the app
`npm run start`


### Endpoints: 

post `/signin`

post `/signup`

get `/users`

get `/secret`


Returns Object

{
  user {
    "_id": "String",
    "username": "String",
    "password": "String",
  }
}


### Tests
Unit Tests: `npm test`



### UML

![](./assets/basic-auth.png)