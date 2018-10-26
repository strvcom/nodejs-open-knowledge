# Node.js Nights vol. 2


## Architecture
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

... rest was because of time constraints only presented during 4th lecture and didn't make it here.
