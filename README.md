# NoSQLInjection
Testing enviornment to learn about NoSQL Injections.

Diving into NoSQL Injections is similar to getting started with SQL Injections.
Read more about [SQL Injections.](https://en.wikipedia.org/wiki/SQL_injection)

Here's a [youtube video from Computerphile](https://www.youtube.com/watch?v=ciNHn38EyRc) which gives a live demo describing the issues with careless practices in coding.

### What you can do with this repo
You can use this repo to start knowing about NoSQL injections. Although I'm also new to this but will try to update this for more depth knowledge.

This is a NodeJS app using MongoDB as database. It has an endpoint at `http://localhost:3000/login` in the first release.

This takes a payload of username and password. Use these fields to exploit the database.

Standard Payload:
```
{
    "username": "test",
    "password": "password"
}
```

Exploiting Payload:
```
{
    "username": "test",
    "password": {"$exists": true}
}
```