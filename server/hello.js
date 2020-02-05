// https://graphql.org/code/
// Not sure why the response console.log would return this??? { data: [Object: null prototype] { hello: 'Hello world!' } }
var { graphql, buildSchema } = require('graphql');

var schema = buildSchema(`
  type Query {
    hello: String
  }
`);

var root = { hello: () => 'Hello world!' };

graphql(schema, '{ hello }', root).then((response) => {
  // the {hello} is the equivilent to post(id), it's a query, when you change it, the error msg will show:
  // GraphQLError: Cannot query field "hell" on type "Query". Did you mean "hello"?
  // fun fact, the did you mean thing shows if you have 3 letters matching :O
  // root is the resolver(parent, args)
  console.log('response', response);
});