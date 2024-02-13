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
- npm install prisma typescript ts-node @types/node --save-dev
- npx prisma init
- add prisma extension
- npx prisma migrate dev --name Initialize the schema (to run create table)
- npx prisma generate
- create index file and write crud
- for migerations run command

- add command in scripts "build:run": "concurrently \"tsc --watch\" \"nodemon ./dist/index\""
- run command to auto build tsc and run index. 
