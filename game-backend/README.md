## Kitten Game Backend 
This project contains a simple backend implementation of the exploding kitten game
It has the following features -

- We can create a new user
- We can update the score of an existing user
- We can fetch the leaderboard of all the users in sorted form
- We can fetch the details of an existing user


Future Scope - 
- We can implement socket.io for the real time fetching of all the users for creating the leaderboard

Database used: MongoDB
Techstack used: Express.js, Node.js
Postman used for API testing of application

## How to setup the project locally:
```
Using HTTPS
# git clone https://github.com/theAbhishekBaranwal/assignment.git
```

+ Open terminal on your workspace with
```
cd /home/workspace/assignment/game-backend
```
## Install


+ Install NPM

  

Check that you have node and npm installed

To check if you have Node.js installed, run this command in your terminal:
```
node -v
```
To confirm that you have npm installed you can run this command in your terminal:

```
npm -v
```

To confirm that you have MongoDB installed you can run this command in your terminal:

  
  

```
mongo -v
```

  
  

To install all the dependences of the project, run the following command:

```
npm install
```
To run the application got to the client folder and run the following command:
```
npm start
```

### ENV Variables

To run this project, you will need to add the following environment variables to your .env file in server folder

`MONGO_URL:`
`PORT:`