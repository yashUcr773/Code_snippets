## Places to get Postgress
- neonDB
- avianDB
- AWS RDS

## Ways to connect to DB
- psql (cli)
- pg (nodejs)

## What does postgres connection string looks like
- postgresql://username:password@host/database

## Things to do with database
- create database
- create solo tables
- create relational / connected tables
- CRUD operations


## Commands to run to setup project
- npm init -y
- npx tsc --init
    - change src to ./src
    - change dest to ./dist
- npm install pg @types/pg nodemon concurrently
- add command in scripts "build:run": "concurrently \"tsc --watch\" \"nodemon ./dist/index\""
- run command to auto build tsc and run index. 
