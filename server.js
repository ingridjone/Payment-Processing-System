//Express framework constants to host server
const express = require('express'); 
const app = express();

//NeDB, an API mongoDB, acts as the database of the app
const path = require('path');
const Datastore = require('nedb');
const crypto = require('crypto');

//Algorithm that encrypts the data
let algorithm = 'aes-256-cbc'
let secret = 'superSecretKey'
let key = crypto.createHash('sha256').update(String(secret)).digest('base64').substr(0, 32)

//Server runs on port 3000
app.listen(3000, () => { console.log("Application running on //localhost:3000/"); });

//Serves static files inside public folder: index.html, styles.css, etc
app.use(express.static('public'));

//Parses the incoming JSON string from each user field input
app.use(express.json({limit: '1mb'})); //User cannot send more than 1mb worth of data

//Creating the database
const database = new Datastore({
  filename: path.join("database.db"),
  autoload: true,

  //Encrypts the incoming data
  afterSerialization(plaintext) {
    const iv = crypto.randomBytes(16)
    const aes = crypto.createCipheriv(algorithm, key, iv)
    let ciphertext = aes.update(plaintext)
    ciphertext = Buffer.concat([iv, ciphertext, aes.final()])
    return ciphertext.toString('base64')
  },

  //Decrypts the queried data
  beforeDeserialization(ciphertext) {
    const ciphertextBytes = Buffer.from(ciphertext, 'base64')
    const iv = ciphertextBytes.slice(0, 16)
    const data = ciphertextBytes.slice(16)
    const aes = crypto.createDecipheriv(algorithm, key, iv)
    let plaintextBytes = Buffer.from(aes.update(data))
    plaintextBytes = Buffer.concat([plaintextBytes, aes.final()])
    return plaintextBytes.toString()
  },
})

//Restores the database
database.loadDatabase();

//GET method route
app.get('/api', (request, response) => {

  //Queries all the data from the database and sends it to the client
  database.find({}, (err, data) => {
    if (err) {
      response.end();
      return;
    }

    response.json(data);
  });
});

// POST method route
app.post('/api', (request, response) => {

  //Logs and stores into a constant all JSON information submitted by the user
  console.log(request.body);
  const data = request.body;

  //Records time of the transaction and stores it into the database
  const timestamp = Date.now();
  data.timestamp = timestamp;

  //Inserts JSON data into the database
  database.insert(data);

  //Sends response to client
  response.json(data);
})