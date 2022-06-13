
# Red Social

RedSocial es un proyecto formado por dos partes principales. Una API en NodeJS y un frontend en VUE.

Incluye distintas funciones, como un CRUD de usuarios y posts, login, registro y un chat global.

## Instalación

Iniciar contenedor de Docker

```bash
  docker-compose up
```

## API

Es necesario estar identificado para  todas las peticiones, excepto para login y register.

### URL
```http
  localhost:3080/api/v1
```

### Swagger
```http
  localhost:3080/swagger
```

## Front


### URL
```http
  localhost:8080
```

<!-- ### Get Users

Devuelve todos los usuarios

```http
  GET /api/users
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `number` | **Required**. Your API key |

### Get user

Devuelve el usuario con la ID especificada

```http
  GET /api/users/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch | -->

## Autores

- [@sesnaola](https://github.com/sesnaola)
- [@persa26](https://github.com/persa26)
- [@drafaelc](https://github.com/drafaelc)
