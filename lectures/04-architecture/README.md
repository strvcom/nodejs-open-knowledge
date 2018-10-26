# Architecture

Each API request typicaly goes through several phases when being handled. These phases would more or less be:

 1. Request data parsing
 2. Request data validation
 3. Permissions validation
 4. Business logic execution
 5. Response data mapping

Some of these phases may interleave or be omitted, but it's good to be able to idetify them and separate them
when our code becomes too complex to conveniently reason about. Different frameworks take different approaches
on how to separate these phases.

Some do so through inheriting from a base class which contains logic to run descendants methods in specified order
typicaly refered to as class lifecycle. So the request handling phases are split into methods and the order
of their execution is handled by the base class. This approach is quite common for UI components, but can also be effectively
utilised on backend.

Another approach to splitting request handlig phases would be separating them out into folders and have a strict order
in which they can be called. The division can be as follows. Each layer uses only the one directly underneath itself.

1. *routes*: definition of API endpoints (each route has it's own controller)
2. *controllers*: data parsing, data validation, calling operation(s), setting response
3. *operations*: business logic execution (doesn't know anything about the server request, handles oly the data it needs)
4. *repositories*: database calls, abstracts from used database and ORM

... rest was because of time constraints only presented during 4th lecture and didn't make it here. Most is written
in the slides attached in this folder.

# Homework

Homework has two parts this time. First one is strongly recomended to get familiar with how stateless authentication would be done in Node.js. Second part is optional for those who realy want to understand the project architecture we discussed. The reason it's optional is mainly because it does take cosiderable amount of time to complete.

## 1. Implement user sign in route

The main branch of this repository now contains the code we wrote during the lecture (and it will until the start of the next lecture). *Please fork this repository and implement route for users sign in.* The new route should have following signature

```json
POST /sessions/user
{
  "email": "zaphod@beeblebrox.me",
  "password": "Password124!"
}
```

To help you a little with the cryptography part, which we haven't had time to go through properly, I prepared the last crypto function you'll need for this task. Basically because we only store hashes of user passwords, we won't be able to compare the password we get from user on sign in directly to his password in database. As hashing is designed as one way process, we also won't be able to decrypt the hash we have in database. Therefore our only option here will be to hash the new acquired password and compare the hash to the one we have in database. We can use the `bcrypt` to do this, but have to remeber to peperify the plaintext password first, as we did with the stored password. To sum up, it's as easy as

```javascript
function comparePasswords(plaintext, ciphertext) {
  return bcrypt.compare(pepperify(plaintext), ciphertext)
}
```

The most important part of this task is to abide the responsibility division we discussed in the lecture. Good luck.

## 2. Refactor your current dogbook project

1. Refactor your current dogbook implementation to match the _routes_, _controllers_, _operations_, _repositories_ layered model.
2. Also don't forget to implement configuration, error handling and validation.
3. And if you're feeling lucky, try reimplementing authorization routes and middleware.

If you're going to try this second optional homework, be prepared it will take you time. Also don't be afraid to heavily inspire yourself by the existing code in this branch. The objective here is to get your hands on how the parts of the system connect one to another, not to reinvent it from the ground up. Therefore even copying parts of files from this repository works fine for this task. Good luck to all you adventurous who will take me up on this challenge.

