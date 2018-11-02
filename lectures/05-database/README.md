# Databases

This lecture was meant to talk about databases and how to setup the database connection to your project. For this lecture purpose, we are using [PostgreSQL](https://www.postgresql.org/download/) - a Relational Database Management System (RDBMS) - and we are using the [Objection.js](http://vincit.github.io/objection.js/) module to query the data and create all table structures.

In this repository, I tried to separate each step in a different commit so, if you want to check how the project evolves, you can check the sequence of commits on this branch.

# Homework

The homework for this week will consist basically into setting a database and using it in your project.

## 1. Set a database for your project

You can download PostgreSQL [here](https://www.postgresql.org/download/) or download and install Docker from [this link](https://store.docker.com/search?type=edition&offering=community) and use a PostgreSQL image like [this one](https://hub.docker.com/r/sameersbn/postgresql/).
After setting up your system and creating the database (if needed), you can use this branch as a reference on how to create a connection to the database.

## 2. Setup your ORM

As you can see in this repository, we are already using [Objection.js](http://vincit.github.io/objection.js/) in this branch. You can use the `src/config/default.js` and `src/databases/index.js` here as an example to setup your connection.
Also, don't forget to follow the Objection.js [installation](http://vincit.github.io/objection.js/#installation) steps to ensure that you have installed all your dependencies.

## 3. Create your tables

In this repository you will find the database structure inside the `src/database/migrations` folder. Those migrations are created using [Knex](https://knexjs.org/) module (this module is a dependency to use Objection.js) and, in a nutshell, they will be translated to SQL commands with the table representation.
To create a migration you need to use the following command:
```shell
NODE_ENV=local ./node_modules/.bin/knex migrate:make NAME_OF_THE_MIGRATION_FILE --knexfile ./src/database/knexfile.js
```
If you don't want to create the migration, you can create the tables directly to the database. You can use the [pgAdmin](https://www.pgadmin.org/download/) tool to query and admin the database and run the following query to create the `users` and `dogs` tables:
```sql
CREATE TABLE public.users
(
    id SERIAL PRIMARY KEY,
    email character varying(255) NOT NULL,
    name character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    disabled boolean,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    CONSTRAINT users_email_unique UNIQUE (email)
);

CREATE TABLE public.dogs
(
    id SERIAL PRIMARY KEY,
    name character varying(255) NOT NULL,
    breed character varying(255) NOT NULL,
    birth_year integer NOT NULL,
    photo text,
    user_id integer,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    CONSTRAINT dogs_user_id_foreign FOREIGN KEY (user_id)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
);
```

## 3. Update the repository modules

Now that you have your ORM working in the project and your database and tables were created, you can start to update the code to query the database. Feel free to use this repository as a reference to guide you through your changes.

## 4. [OPTIONAL] Setup a different ORM

This is an optional step, but it will help you get a better understanding of how useful are the abstractions that we did in previous lessons.
I would suggest for you to try to setup and work with [Sequelize](http://docs.sequelizejs.com/) as it's also one of the "big players" when we talk about ORMs for Node.js.


# Useful Links

- PostgreSQL download: [https://www.postgresql.org/download/](https://www.postgresql.org/download/)
- Docker download: [https://store.docker.com/search?type=edition&offering=community](https://store.docker.com/search?type=edition&offering=community)
- PostgreSQL Docker image: [https://hub.docker.com/r/sameersbn/postgresql/](https://hub.docker.com/r/sameersbn/postgresql/)
- pgAdmin download: [https://www.pgadmin.org/download/](https://www.pgadmin.org/download/)
- Objection.js documentation: [http://vincit.github.io/objection.js/](http://vincit.github.io/objection.js/)
- Knex Migrations documentation: [https://knexjs.org/#Migrations](https://knexjs.org/#Migrations)
