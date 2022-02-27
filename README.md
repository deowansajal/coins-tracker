# Final Project Starter

This repository is here to work as a basis for your final project

## Installation and Setup

Install the npm dependencies
````
npm install
````

Setting up environment variables
1. Rename .env.EXAMPLE -> .env in the server folder
2. Update the jwt secret to a random value. This will be used to sign your json web tokens. If someone else knows what this is they will be able to login as anyone!

Rename the following files/folders to your application name
- The name property in package.json, client/package.json and server/package.json
- The root folder name
- In server/config/connection.js change the url database name to something that makes sense for your app. e.g. "mongodb://localhost/meal-tracker-db"
- In client/public/index.html update the \<title> and \<meta> tags to give your site a proper title and description

Change the user seeds if you wish.

## Running the application

If this is the first time running and you would like some test data, seeds can be run with:
````
npm run seed
````

To start in develop mode:
````
npm run develop
````
This will start both the front-end and backend in watch mode

To start the services independently:
Front end:
````
cd client && npm start
````

Back end:
````
cd server && npm watch
````


## Deployment

1. When deploying to heroku, make sure that you add the necessary environment variables (JWT_SECRET and MONGODB_URI) to the heroku settings

## How to get started

When starting to develop your app, it might be difficult to know where to start. This section should give you an idea of a way to start. This process is only one way to start and there may be a different process that works better for you or your app.

- Think about what the user experience of your app will be. What screens will you have, what buttons will be on the screens and what actions will they perform. It can be really helpful to sketch out the screens you have on paper or in a program such as figma.
- Once you know how users will interact with your app, think about what models you will need to integrate with the features of your application. Consider a scenario in which I want to make a todo list app where users are able to add and remove items and mark them as complete. I would need a model for my users, so they're able to login and have specific todos. Users would have properties such as name, email, password etc. I would also need a model for my Todo item, they might have a title, description, completion_status etc. There would also have to be a relation between Todo Items and Users. If you have a complicated model, it might help to draw out your models and how they relate to each other.
- Once you think you know how your models are going to work, create the appropriate model files in the models folder. These will create the database entities that get stored in the database.
- Next think about what information you need to retrieve from the database and how users will effect the information. This will inform what queries and mutations you will need to create for graphql. For the todo example, I might need the following queries: 
    - getMyTodos: a query that returns a list of todo items which you've added.
    - getMyCompleteTodos: a query that returns all the todos you've completed.

    I also might need the following mutations:
    - addNewTodo: a mutation that accepts all necessary parameters to create a new todo item
    - completeTodo: a mutation that takes the id of a todo and marks it as complete.
    - removeTodo: a mutation that takes the id of a todo and deletes it
    - addUser: allow users to signup
    - login: allow users to login and get a token

- Once you know what queries and mutations you will need fill out the typeDefs and then the resolvers. As you add more queries and mutations you should be able to start your server and test the routes as you go in the graphql playground. Start with only a few essential queries and mutations. Other queries and mutations can easily be implemented later.
- Once your queries and mutations are working it's time to start working on the frontend.

- There are a few different ways you could work on the frontend this is one approach that may work for you.
- Start in App.js and add the necessary routes with react router that you will need.
- Build the individual pages paying attention to contain certain UI elements to seperate components where it makes sense.
- When building a page that may display data from the frontend you could replace the api call with some dummy data while you're working on it and configure the api call later. e.g. if you're working on a list of todo items you could add the below code to the top of your component, then replace it with the actual api call when you are happy with the design.
````
const todos = [{id: 123, title: 'todo 1'}, {id: 124, title: 'todo 2'}];
````
- Be sure to define the necessary mutations and queries that your app will be using in the utils/mutations and utils/queries folder.
