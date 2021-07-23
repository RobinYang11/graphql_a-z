### how to use

run code in terminal

```shell
  yarn install
  yarn dev
```

### 查询条件

- 1. 查询所有 book,所有字断

```json
{
 books{
   name,
   id,
   aid
 }
}
```

结果

```json
{
  "data": {
    "books": [
      {
        "name": "bckde",
        "id": 1,
        "aid": 1
      },
      {
        "name": "adsf",
        "id": 2,
        "aid": 2
      },
      {
        "name": "asdf",
        "id": 3,
        "aid": 3
      }
    ]
  }
}
```

- 2. 查所有 books，只查 name 字断

```json
 {
  books{
    name
  }
}
```

结果

```json
{
  "data": {
    "books": [
      {
        "name": "bckde"
      },
      {
        "name": "adsf"
      },
      {
        "name": "asdf"
      }
    ]
  }
}
```

- 3. 查所一个 book ,带所有字断

```json
{
  book(id: 1) {
    name
    id,
    author{
      name
    }
  }
}
```

结果

```json
{
  "data": {
    "book": {
      "name": "bckde",
      "id": 1,
      "author": {
        "name": "j"
      }
    }
  }
}
```

- 4. 查询所有 book，查询所有 author,查询一个 book，查询一个 author

```json
{
  books {
    name
  }
  authors {
    id
    name
  }
  book(id: 1) {
    name
    id
    author {
      name
    }
  }
  author(id: 1) {
    name
  }
}

```

结果

```json
{
  "data": {
    "books": [
      {
        "name": "bckde"
      },
      {
        "name": "adsf"
      },
      {
        "name": "asdf"
      }
    ],
    "authors": [
      {
        "id": 1,
        "name": "j"
      },
      {
        "id": 2,
        "name": "k"
      },
      {
        "id": 3,
        "name": "l"
      }
    ],
    "book": {
      "name": "bckde",
      "id": 1,
      "author": {
        "name": "j"
      }
    },
    "author": {
      "name": "j"
    }
  }
}
```
