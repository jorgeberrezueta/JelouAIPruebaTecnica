
# Prueba Técnica para Jelou AI - Desarrollador Backend por Jorge Berrezueta

## Coding Exercise 1

### Problema

Dado un array de enteros, mantener un puntaje total basado en lo siguiente:
1. Sumar 1 punto por cada número par en el array.
2. Sumar 3 puntos por cada número impar en el array excepto por el número 5.
3. Sumar 5 puntos cada vez que el número 5 aparece en el array.

Nota: 0 se considera par.

**Ejemplos:**

```
Input: [1, 2, 3, 4, 5]
Output: 13
```

```
Input: [17, 19, 21]
Output: 9
```

```
Input: [5, 5, 5]
Output: 15
```

### Solutción

> Punto de entrada del programa: `npm run exercise1 <input>`

Ejemplo:
```shell
$ npm run exercise1 [17, 19, 21]
Input: [17, 19, 21]
Output: 9
```

Código relevante:

```javascript
function calculateScore(arr) {
    return arr.reduce((acc, elem) => {
        // Solo se utiliza return en lugar de break
        if (elem === 5) return acc + 5;
        if (elem % 2 === 0) return acc + 1;
        if (elem % 2 !== 0) return acc + 3;
        // Los otros valores por defecto no suman puntos
    }, 0);
}
```
___

## Coding Exercise 2

### Problem

Desarrollar una API REST en Node.js que gestione un sistema básico de blogs.
Debería incluir autenticación, operaciones CRUD para publicaciones y comentarios, y
funcionalidad para etiquetar y filtrar publicaciones por categorías y etiquetas.
La calidad del código, el manejo de errores y la organización del proyecto serán evaluados.

**Análisis del Escenario**

**Pregunta:** Dado un sistema distribuido que experimenta latencias y fallas 
ocasionales en uno de sus microservicios, ¿cómo lo optimizarías?

Describe tu enfoque para identificar el problema, posibles soluciones, y cómo
garantizarías alta disponibilidad y resistencia.

```plaintext
Mi respuesta:

Creo que un buen enfoque para identificar y entender el problema sería 
implementar un sistema para monitorear diferentes aspectos del microservicio en tiempo real, 
como la latencia y las tasas de error. Un sistema de este tipo debería permitir 
enviar notificaciones útiles de eventos en cualquier momento al equipo de desarrollo. 
Otras medidas como el registro y el rastreo detallados pueden y deben implementarse para 
ayudar a identificar las causas raíz.

Dependiendo del problema específico, una solución posiblemente efectiva para los problemas 
de disponibilidad podría ser implementar diferentes estrategias de reinicio para el 
microservicio, junto con un balanceador de carga para redirigir el tráfico a instancias 
sanas. Si bien una solución como esta no resolvería completamente el problema, ayudaría a 
mitigar los efectos causados por la falla de una sola instancia.

El proceso de diseño de un microservicio debe tenerse muy en cuenta, ya que podría ser 
la causa raíz de muchos problemas que podrían pasar desapercibidos. Un buen diseño de 
software debe tener la escalabilidad como una de sus prioridades e incluir técnicas 
como un sistema de manejo de errores robusto y redundancia en el sistema.  
```

### Solución

> Asegurarse de ejecutar `npm run exercise2:setup` antes de ejecutar el programa por primera vez.
> 
> Punto de entrada del programa: `npm run exercise2`


Para este ejercicio, he creado una API REST simple utilizando Express.js y MongoDB.

La API desarrollada contiene las siguientes características:

- Registro de usuarios
  - Hashing de contraseñas
  - Generación de tokens JWT
- Inicio de sesión de usuarios
  - Creación e invalidación de sesiones
  - Verificación de tokens
- Listado (con filtrado), creación, actualización y eliminación de publicaciones
  - Validación de datos de entrada
- Creación, actualización y eliminación de comentarios
  - Validación de datos de entrada

La API tiene los siguientes endpoints:

```
┌─────────┬──────────────────────────────┬──────────────────────────┐
│ (index) │           methods            │           path           │
├─────────┼──────────────────────────────┼──────────────────────────┤
│    0    │          [ 'POST' ]          │  '/api/v1/users/login'   │
│    1    │          [ 'POST' ]          │ '/api/v1/users/register' │
│    2    │      [ 'GET', 'POST' ]       │     '/api/v1/posts'      │
│    3    │ [ 'GET', 'PATCH', 'DELETE' ] │   '/api/v1/posts/:id'    │
│    4    │ [ 'GET', 'PATCH', 'DELETE' ] │  '/api/v1/comments/:id'  │
│    5    │          [ 'POST' ]          │    '/api/v1/comments'    │
└─────────┴──────────────────────────────┴──────────────────────────┘
```

Junto con el código para la API, incluí un archivo docker compose para ejecutar la instancia de MongoDB con conjuntos de réplicas para facilitar el despliegue de un entorno de desarrollo.

También incluí una colección de Postman con los puntos finales de la API para pruebas en el archivo `JelouAI_Technical_Interview.postman_collection.json`.

## Preguntas de conocimiento técnico

> 1. You're building a high-throughput API for a cryptocurrency trading platform. For this platform, time is extremely important because microseconds count when processing high-volume trade orders. For communicating with the API, you want to choose the verb that is fastest for read-only operations. What verb should you choose for retrieving trade orders with the API server?

```
a. GET
```

> 2. You work for a Customer Relationship Management (CRM) company. The company's clients gain CRM access through a RESTful API. The CRM allows clients to add contact information for customers, prospects, and related persons (e.g., virtual assistants or marketing directors). You want to choose an appropriate API request path so clients can easily retrieve information for a single contact while also being flexible for future software changes. Which of the following API paths should you use?

```
b. /contacts/{contact_id}
```

> 3. You work for a large social media network, and you've been tasked with error handling for the API. You're trying to decide on an appropriate errorcode for authentication failures based on non-existent users and incorrect passwords. You want to balance security against brute force attacks with providing descriptive and true error codes. Which HTTP error code(s) should you use to keep the system secure and still report that an error occurred?

```plaintext
d. 401 if the user doesn't exist or if the password is wrong.
```

> 4. You're writing documentation for requesting information about a given user in your system. Your system uses UUIDS (universally unique identifiers) as user identifiers. In your documentation, you want to show an example. True or false: You should put a fake UUID into the example code (instead of just the text "UUID") as a placeholder.

```plaintext
a. TRUE
```

> 5. You're building code to handle errors issued from a remote API server. The response may or may not have an error. How much work should your method, handleErrors(response), handle?

```plaintext
b. Check for the presence of an error. If it exists, throw an exception with the
error.
```

> 6. You have two classes: a database driver and an email driver. Both classes need to set errors so that your front-end interface displays any errors that transpire on your platform. Which way should you implement this error handling?

```plaintext
c. Make a driver-based error provider to handle errors in all classes that can
issue errors.
```

> 7. You need to name the private method in your class that handles looping through eCommerce products to collect and parse data. That data gets stored in an array and set as a class property. Which of the following should you use to name your method?

```plaintext
c. parseDataForProducts()
```

> 8. There are multiple places in your codebase that need to access the database. To access the database, you need to supply credentials. You want to balance security with useability. What strategy should you use to store and access these credentials?

```plaintext
d. Put them in a .env file, load data from it into a configuration system, then
request the credentials from a database service provider.
```