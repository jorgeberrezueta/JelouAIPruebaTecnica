
# Jelou AI Technical Interview - Backend Developer by Jorge Berrezueta

## Coding Exercise 1

### Problem

Given an array of integers, keep a total score based on the following:
1. Add 1 point for every even number in the array
2. Add 3 points for every odd number in the array except for the number 5
3. Add 5 points every time the number 5 appears in the array

Note that 0 is considered even.

**Examples:**

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

### Solution

> Program entrypoint: `npm run exercise1 <input>`

Example:
```shell
$ npm run exercise1 [17, 19, 21]
Input: [17, 19, 21]
Output: 9
```
Relevant code

```javascript
function calculateScore(arr) {
    return arr.reduce((acc, elem) => {
        // Only using return as a break statement
        if (elem === 5) return acc + 5;
        if (elem % 2 === 0) return acc + 1;
        if (elem % 2 !== 0) return acc + 3;
        // Other values default to no behavior (no points)
    }, 0);
}
```
___

## Coding Exercise 2

### Problem

Develop a REST API in Node.js that manages a basic blogging system.
It should include authentication, CRUD operations for posts and comments, and
functionality to tag and filter posts by categories and tags.
The quality of the code, error handling and project organization will be assessed.

**Scenario Analysis**

**Question:** Given a distributed system that experiences latencies and occasional
failures in one of its microservices, how would you optimize it?

Describe your approach to identifying the problem, possible solutions, and how
you would ensure high availability and resilience

```plaintext
My Answer: 

I believe that a good approach to identifying and understanding the problem would be 
to implement a system for monitoring different aspects of the microservice in real 
time, such as latency and error rates. A system of this sort should allow useful event 
notifications to be sent at any given time to the development team. Other measures 
like detailed logging and tracing can and should be implemented to help identify root 
causes.

Depending on the specific problem, a possibly effective solution to availability issues
could be to implement different restart strategies for the microservice, paired with 
a load balancer to redirect traffic to healthy instances. While a solution like this
wouldn't completely solve the problem, it would help mitigate the effects caused by
the failure of a single instance. 

The design process of a microservice should be heavily taken into account, as it could
be the root cause of many problems that could go unnoticed. A good design of software
should have scalability as one of the priority, and include techniques like a robust 
error handling system and redundancy in the system.  
```

### Solution

> Make sure to run `npm run exercise2:setup` prior to running the program for the first time.
> 
> Program entrypoint: `npm run exercise2`



For this exercise, I have created a simple REST API using Express.js and MongoDB.

The API that was developed contains the following features:
- User registration
  - Password hashing
  - JWT token generation
- User login
  - Session creation and invalidation
  - Token verification
- Post listing (with filtering), creation, update, and deletion
  - Inpuit data validation
- Comment creation, update, and deletion
  - Input data validation

The API has the following endpoints:

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

Alongside the code for the API, I included a docker compose file to run the MongoDB instance with replica sets for easy deployment of a development environment.

I have also included a Postman collection with the API endpoints for testing as the file `JelouAI_Technical_Interview.postman_collection.json`.

## Technical knowledge questions

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