# What is it?

It is CRUD application based on Mongo + Express + React + Node 

# Deployment

Application is ready to be deployed on [heroku](https://www.heroku.com). You can find related script in package.json **heroku-postbuild** section. 

## How to run this code

To run this code you need to connect database first. In this project I use [mlab](https://www.mlab.com) to store my databse, you can change it in .env file stored in /server/ folder. 

Next steps would be to loda all node_modules:

```npm install
cd client 
npm install 
npm run client:install
```

After that you can start development or simply run this code on your local machine with: 

`npm run dev`

# What you can do in this application

* Add new book
* * You can choose author from list of available authors
* * If you didn't find necessary author, just type new author in author field and it will added automatically 

* Delete book 
* * If book used in any podcast, then it will be marked as _Deleted_ in this podcast

* Delete author
* * If author used in any podcast, then it will be marked as _Deleted_ in this podcast
* * If author used in any book, then it author for this book will be "Не задан"

* Add podcast
* * You can fill topic, description and recommendations list 
* * Recommendations list works only with predefined books and authors
* * After choosing author in recommendations list books will be filtered by this author only
* * After choosing book in recommendations list books will other books except selected already

# TODO 

* Main page
* * Filter podcasts by author

* Add podcast
* * Change authors to podcast
* * Add date to podcast

* Add book
* * Clear author after submit

