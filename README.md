# The Blog

<img src='https://github.com/run-after/blog-backend/blob/main/public/images/screenshot.png' alt='Blog' width='100%' />

From The Odin Project (https://www.theodinproject.com/paths/full-stack-javascript/courses/nodejs/lessons/blog-api)

- **Built with Node.js and express**
- **Utilized MongoDB as database**
- **Deployed on Heroku**

This is the backend of a blog website. The [frontend](https://github.com/run-after/blog-frontend) makes API calls here.

Using passport-js, this backend has protected routes only usable if the user is logged in and sends the JWT in the header.

Bcrypt is utilized to hash the password for the one user in the DB who is the blog author.

This project was meant to demonstrate the power and flexibility of seperating the backend code from the frontend code. I found this to be a very fun project. When I had my frontend make the first API call, it was a really good feeling. Then implementing the rest of the API calls was a fun and rewarding practice.

I look forward to streamlining this process in further projects.
