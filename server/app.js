const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema'); // 31:15
// install graphql and express graphql
const app = express();

// bind express with graphql
app.use('/graphql', graphqlHTTP({
    // schema: schema 
    schema, // use this because both names are the same, ES6 feature
    graphiql: true // use graphiql tool when this path is called, so now the Graphiql interface is called 55:25
    // use graphical to check the data
}))

// stopped at 1:???:45

app.listen(4000, () => {
    console.log('now listening for requests on port 4000');
});
