# MyScrapBook

## Description

MyScrapBook is a website where you can record how your day went. Basically, like a diary.

For backend,

npm init(creates package.json file)

npm install express mongoose dotenv cors (or install whatever package you want)

npm install --save-dev nodemon



or use npm install -g express-generator

## API Endpoints 

| Http Method | URL                           | Request Body                           | Success Status | Error Status | Description                                                  |
| ----------- | ----------------------------- | -------------------------------------- | -------------- | ------------ | ------------------------------------------------------------ |
| GET         | `/auth/me`                    | Saved session                          | 200            | 404          | Checks if user is logged in and return profile page          |
| POST        | `/auth/signup`                | {name, email, password}                | 201            | 404          | Checks if fields not empty (422) and user not exists (409), then create user with encrypted password, and store user in session |
| POST        | `/auth/logout`                | (empty)                                | 204            | 400          | Logs out the user                                            |
| GET         | `/{category}`                 |                                        |                | 400          | Lists all the problems related to specific category          |
| POST        | `/problem`                    | {category, title, body, solved, email} | 201            | 404          | Checks if fields not empty (422) and user not exists (409), then post the problem |
| PUT         | `/problem`                    | {category, title, body, solved, email} | 201            | 404          | Updates the posted problem                                   |
| GET         | `/problem/:problemid`         |                                        |                | 400          | Lists the details of specific problem with the help of id    |
| POST        | `/problem/:problemid/comment` | {email, body}                          | 201            | 404          | Checks if fields not empty (422) then post the comment on the problem |
| GET         | `/helpers`                    |                                        |                | 400          | Lists the information of a helper                            |

 

## Server

### Models

```javascript
User = {
    username: {type: String, required: true},
 	email: {type: String, required: true, unique: true},
 	password: {type: String, required: true, unique: true},
  	myLog: [{type: Schema.Types.Object, ref: 'Log'}]
}

Log = {
    title: {type: String, default: "no title"},
    date: {type: Date, default: Date.now},
    body: {type:String, required: true}
}
```