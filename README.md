# URL shortener

Hobby application to play with Express, Nuxt and MongoDB. It creates shorthands for long URLs, somethink like Bitly does, and redirects back to the original URL when hashed URL is opened.

Application is hosted on [Heroku](https://www.heroku.com) and Mongo database is on free plan of [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).

## Used technologies

- [Heroku](https://www.heroku.com) for deployment
- [MongoDB](https://www.mongodb.com) as a database
- [Docker](https://www.docker.com) to run it all locally
- [Node](https://nodejs.org) for application backend
- [Express](https://expressjs.com) as a web server framework
- [Mongoose](https://mongoosejs.com) to communicate with MongoDB
- [Nuxt](https://nuxtjs.org) for Vue server-side rendering
- [Bulma](https://bulma.io) to give it some style

## What it does?

When you paste some URL and create short version of it, unique hash is created for that URL, it's stored in Mongo database and returned back over API. Also, cookie is created so your link shortening history is preserved (until you remove that cookie, or it expires after one year of no action).
