# Prueba técnica <span style="color: #FFE600;">Habi</span>! [![App](https://img.shields.io/badge/~-Frontend-red)]() [![By](https://img.shields.io/badge/By-Arnold%20Salazar-%)](mailto:arnold.salazar@outlook.com)

###### [Mayo 24, 2021]

## Qué continen?

- Aplicación frontend para sustentar [Prueba técnica]().
- Construido con **React Js**.
- Consume servicios para realizar el seguimiento de ventas de una pizzeria, generación de ventas y craeción de pizzas base e ingredientes.
- Se creo backend con <span style="color: #FFE600;"><b>Google Cloud functions</b></span> para exponer servicios para la manipulación de la información requerida.

## Los servicios ✨:

- Fetch para creación de usuarios:

```bash
  POST /test_createUser

  "data":{
    "rol": <rol>,
    "email": <Email>,
    "name": <Nombre para mostrar>,
    "password": <Contraseña>
    }

  // se requiere rol "admin" si se desea poder ver el seguimiento
```

- Fetch para almacenamiento de información a db:

```bash
  POST /test_setSale
```

- Fetch para obtener información de las pizzas base creadas:

```bash
  POST /test_getPizzas
```

- Fetch para obtener información de los ingredientes extras que pueden adicionarse a una venta:

```bash
  POST /test_getIngredients
```

- Fetch para obtener información paginada del seguimiento de ventas:

```bash
  POST /test_getTracking
```

## ¿Cuál es la lógica detrás?

Mediante el consumo de servicios cloud manejando autenticación y roles de usuarios para dar control a las diferentes vistas del aplicativo 🧐:

- Permitir la creación de pizzas basicas que puedan ser seleccionadas como base para una venta `app/creation/pizzas`
- Permitir la creación de ingredientes para ser usados en la creación de las pizzas base y adicionarlas como extras en la venta si el cliente lo requiere `app/creation/ingredients`
- Realizar ventas de pizzas, incorporando una pizza base, permitiendo la seleccion de extras y adicionando la información del cliente `app/sales`
- Permitir el calculo del precio de venta: `precio = rentabilidad * (base + extras)` donde la rentabilidad se toma de la información del usuario la cual es seteada en la creación del mismo y tomada de la parametrización en db.
- Realizar seguimiento de las ventas de forma página ordenada por fecha.
- Tener un espacio para parametrizar detalles como la rentabilidad y la creación de usuarios.

## Pasos para correr el proyecto en local:

- Clonar repositorio:

```bash
  git clone git@github.com:HackbIade/habi-technical-proof.git
```

- Ir a la rama main:

```bash
  git checkout main
```

- Instalar los paquestes necesarios:

```bash
  npm install
```

## Como correrlo?

Abrir una terminal en la ubicacion del folder y ejecutar:

```bash
  npm start
```

## Otros comandos utiles:

Thinking about my mental peace, build unit tests and integrated linter. May you'd like to check it:

- For running unit tests:

```bash
  npm run test
```

- For running lint check:

```bash
  npm run lint
```

## Alguna pregunta/sugerencia 🤔?

- Si [arnold.salazar@outlook.com](arnold.salazar@outlook.com)
