## Start and Stop Times
* See date markers in notes.md...

## Deliverables
Once you have completed the test please fill out this Google Form: https://goo.gl/forms/twwHgOOknX71mm113
For the code file, please submit a compressed directory with:
* Code
* Complete Docker Compose file
* Readme documenting your database schema, choice of technologies, any challenges, and the required URLs

## Code
Will be zipped and submitted with the form.

## Docker Compose file
See contents of zipped directory.

## README
 * Database schema is pretty straightforward. Just tables for each of the datatypes and linking tables for the associations.
 * I chose node because that's what I'm currently most comfortable with. I've done Docker before, but this is the first time I've done Docker compose...
 * Challenges: I, obviously, wasn't able to complete the assignment in the required time. I got bogged down getting the api container to connect to the db container. I have the beginnings of the structure in place for the API calls, and (were I to do this differently) I would have gotten those all set up returning static JSON first rather than try to solve the DB connectivity problem. Also, in terms of the DB connectivity problem, my next step would be to set up a local MySQL DB that I could connect to from node on the command line so I could hook up all the connections locally and then just change the connection information in db.js once I had troubleshot the connection issue in Docker.
 * Last thoughts: This was a really fun exercise for me and I plan to keep hacking away at it on my own time until I get further down the path. As an engineering manager, I haven't been responsible for production code for a while but I love coding and really enjoy learning stuff. This gave me some really good material to learn more about. I look forward to discussing this project with someone soon.