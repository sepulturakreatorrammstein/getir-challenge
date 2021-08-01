# getir-challenge

This is a sample Node.js(Express) backend.

To run server on the local machine;
1) Clone the code `git clone https://gitlab.com/capan/getir-challenge.git`
2) Create a .env file and write 3 lines for *PORT*, *NODE_ENV*, *DB_CONNECTION*. Default values are PORT=4000, NODE_ENV="development" and DB_CONNECTION="mongodb://localhost:27017/getir-case-study". Change the environment variable entries according to your workspace.
3) Run `yarn`
4) To start server on local machine run `yarn start`.
5) Make a **POST** request to localhost:4000 (change the port according to your .env) with the following body object;
`{
  startDate: "2016-07-06",
  endDate: "2016-07-07",
  minCount: "650",
  maxCount: "700"
}` to test the application.
6) Postman documentation link: https://www.getpostman.com/collections/d7346a2308938a09ee6d
7) In order to run unit and integration tests use `yarn test` command

App deployed to Heroku use the following link to reach application; https://my-getir-challenge.herokuapp.com/