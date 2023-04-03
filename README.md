# Payment-Processing-System
Project created for the MS in IT: Software Design and Development at the University of Denver.

The Payment Processing System allows the user to enter their credit card information, and send it as a JSON string to the processing server. The server encrypts the data and stores it into a MongoDB-based API database. The user can also view the payment history webpage, which displays the decrypted data stored in the database in chronological order The technologies used are: HTML, CSS, Bootstrap, JavaScript, Node.js, Express, and NeDB.

The server.js acts as the processing server, and holds all the JavaScript code that handles the GET and POST requests, as well as the commands to connect with the database.

To be able to run the code, these steps must be followed:
1) Install an IDE such as Visual Studio Code, that allows you to write commands from a built-in terminal.
2) Install Node.js (https://nodejs.org/en/) to be able to run the server.
3) Open the terminal and install the following:
- Install the Express framework by typing npm install express
- Install the NeDB database by typing npm install nedb
4) Open the terminal and type the command node server.js Now the website should be running locally on port 3000. Go into a browser and enter the following local address: //localhost:3000/
5) The payment portal should appear. Enter mock credit card information and click on “Submit payment!”. The information you entered should be logged into the IDE terminal, as a JSON string.
6) If you go back to the client and select “View Payment History…”, the transaction you just submitted should appear on the list. The list shows every transaction that has been submitted through the portal that is stored on the database, although sensitive information such as the actual credit card number, CVV, or expiration date are omitted for security reasons.
