
# YouSearch

To make an API to fetch latest videos sorted in reverse chronological order of their publishing date-time from YouTube for a given tag/search query in a paginated response.


## Authors

- [@jevesh_pratap_singh](https://www.github.com/jp8042)


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

Check .env.template file

## Run Locally

Clone the project

```bash
  git clone https://github.com/jp8042/yousearch.git
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```

## API Reference

#### Get videos by keyword (v1)

```http
  GET /v1/search
```
| Query     |
| Parameter | Type     | Description                            | Default
| :-------- | :------- | :------------------------------------- | :----------
| `keywords`| `string` | **Required**. Search Query String      |
| `page`    | `string`  | Page Number                           |   1
| `size`    | `string` |  Page Size                             |   10
| `sort`    | `string` | Publishing Sort Direction (asc, desc)  |   desc


#### Get videos by keyword (v1)

```http
  GET /v2/search/
```

| Query                |
| Parameter            | Type     | Description                                 | Default
| :------------------- | :------- | :------------------------------------------ | :----------
| `keywords`           | `string` | **Required**. Search Query String           |
| `lastPublishedAt`    | `string`  | last published at video from previous response | 
| `size`               | `string` |  Page Size                                  |   10
| `sort`               | `string` | Publishing Sort Direction (asc, desc)       |   desc

## Roadmap

- Add multiple api keys support (PROGRESS: waiting for limit to exhaut)

- Make query more meaningful.

- Add cahcing layer for faster response


