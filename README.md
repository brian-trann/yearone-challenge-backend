
# Movie App - YearOne challenge - Backend

This portion of the app is a part of a take home challenge for [YearOne](https://www.joinyearone.io/)

You will need and `API_KEY` from [https://www.omdbapi.com/](https://www.omdbapi.com/) in order for this app to properly work.
## Demo

See the [frontend repo here](https://github.com/brian-trann/yearone-challenge-frontend). 
## Environment Variables

To run this project, you will need to add the following environment variables to your `.env` file

`API_KEY`

and optionally: 

`NODE_ENV`
`SECRET_KEY`


## Run Locally

Clone the project

```bash
  git clone https://github.com/brian-trann/yearone-challenge-backend.git
```

Go to the project directory

```bash
  cd yearone-challenge-backend
```

Install dependencies

```bash
  npm install
```

Initialize the PostgreSQL Database
* Make sure you have [PostgreSQL](https://www.postgresql.org/) installed
* NOTE: running the next command will DROP `yearone_takehome` and `yearone_takehome_test` databases, if they exist.

```bash
  psql < yearone.sql
```

Start the server

```bash
  npm run start
```


## API Reference

#### Get movie by search

```http
  GET /movies/search
```

| Query | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `title`   | `string` | **Required**. A title to search for|

#### Example:
```
movies/search/?title=${title}
```

#### Get movie by ID

```http
  GET /movies/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. ID of item to fetch |



#### Like / Dislike a movie
  
```http
  POST /movies/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. ID of item to fetch |

| Query | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `command`      | `string` | **Required**. `like` or `dislike`|

#### Example:
```
movies/${id}?command=dislike
movies/${id}?command=like
```

## PostgreSQL Schema

### Movie Table
| Column | Type     | Description                          | Default |
| :-------- | :------- | :-------------------------------- | :------ |
|`id`       | `string` | **PRIMARY KEY**. ID of movie |         |
| `likes`   | `integer`| Number of likes                   |   0     |
| `dislikes`| `integer`| Number of dislikes                |   0     |


## Tech Stack

**Client:** React

**Server:** Node, Express

  