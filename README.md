
# Red Social

RedSocial es un proyecto formado por dos partes principales. Una API en NodeJS y un frontend en VUE.

Incluye distintas funciones, como un CRUD de usuarios y posts, login, registro y un chat global.

## Instalación

Instalar los paquetes de npm

```bash
  npm install
```

Iniciar contenedor de Docker

```bash
  docker-compose up
```

## Documentación de la API

Es necesario estar identificado para  todas las peticiones, excepto para login y register.

### Get all Users

Devuelve todos los usuarios

```http
  GET /api/users
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. Your API key |

### Get user

Devuelve el usuario con la ID especificada

```http
  GET /api/users/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |

## Autores

- [@sesnaola](https://github.com/sesnaola)
- [@persa26](https://github.com/persa26)
- [@drafaelc](https://github.com/drafaelc)
