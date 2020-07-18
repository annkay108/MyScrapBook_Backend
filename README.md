# MyScrapBook

## Description

MyScrapBook is a website where you can record how your day went. Basically, like a diary.

## API Endpoints

| Http Method | URL                | Request Body            | Success Status | Error Status | Description                                                                                                                     |
| ----------- | ------------------ | ----------------------- | -------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------- |
| GET         | `/auth/me`         | Saved session           | 200            | 404          | Checks if user is logged in and return profile page                                                                             |
| POST        | `/auth/signup`     | {name, email, password} | 201            | 404          | Checks if fields not empty (422) and user not exists (409), then create user with encrypted password, and store user in session |
| POST        | `/auth/logout`     | (empty)                 | 204            | 400          | Logs out the user                                                                                                               |
| POST        | `/auth/login`      | {username, password}    | 201            | 400          | Logs in the user                                                                                                                |
| GET         | `/myscrapbook`     | Saved session           | 200            | 404          | Lists all the logs                                                                                                              |
| PUT         | `/myscrapbook/:id` | {title, body}           | 201            | 404          | Updates the log                                                                                                                 |
| DELETE      | `/myscrapbook/:id` | Saved session           | 200            | 400          | Deletes a specific log                                                                                                          |
| POST        | `/problem/add`     | {title, body,date}      | 201            | 404          | Adds the log                                                                                                                    |

## Server

### Models

```javascript
User = {
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, unique: true },
  myLog: [{ type: Schema.Types.Object, ref: "Log" }],
};

Log = {
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  title: { type: String, default: "no title" },
  date: { type: Date, default: Date.now },
  body: { type: String, required: true },
};
```

For backend,

npm init(creates package.json file)

npm install express mongoose dotenv cors (or install whatever package you want)

npm install --save-dev nodemon

or use npm install -g express-generator

For frontend,

npm i -g create-react-app

and run the command create-react-app

{

npm run build (Bundles the app into static files for production)

}

git

git remote show origin (to show remote url and everything else)
