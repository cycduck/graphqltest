const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');

const app = express();

// connect to mlab database
// make sure to replace my db string & creds with your own
// mongoose.connect('mongodb://ninja:test@ds161148.mlab.com:61148/graphql-ninja')
// mongoose.connection.once('open', () => {
//     //Mongoose creates a default connection when you call mongoose.connect(). You can access the default connection using mongoose.connection.
//     // Once the default connection is "opened", which is an event
//     // .on https://mongoosejs.com/docs/2.7.x/docs/api.html
//     console.log('conneted to database');
// });
const db = require ("./config/key").mongoURI;
mongoose.connect(db, { dbName: 'graphQL', useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=> console.log('mongodb connected'))
    .catch(err => console.log('error', err));

// bind express with graphql
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(4000, () => {
    console.log('now listening for requests on port 4000');
});
