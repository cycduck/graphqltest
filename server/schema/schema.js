const graphql = require('graphql');
const _ = require('lodash'); //51:42    

// a library of functions ie. Math.random will be called ran or something

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList } = graphql;

// dummy data
var books = [
    { name: 'Name of the Wind', genre: 'Fantasy', id: '1', authorId: '1' },
    { name: 'The Final Empire', genre: 'Fantasy', id: '2', authorId: '2' },
    { name: 'The Hero of Ages', genre: 'Fantasy', id: '4', authorId: '2' },
    { name: 'The Long Earth', genre: 'Sci-Fi', id: '3', authorId: '3' },
    { name: 'The Colour of Magic', genre: 'Fantasy', id: '5', authorId: '3' },
    { name: 'The Light Fantastic', genre: 'Fantasy', id: '6', authorId: '3' },
];

// use the authorid to query the author list

var authors = [
    { name: 'Patrick Rothfuss', age: 44, id: '1' },
    { name: 'Brandon Sanderson', age: 42, id: '2' },
    { name: 'Terry Pratchett', age: 66, id: '3' },
];

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({ //34:40 why does this need to be a function, 39:00
        // to ensure everything is defined when they are called 
        // https://youtu.be/ZQL7tL2S0oQ?t=1910
        // Because it's a call back function, so it runs to the end and then goes runs the call back??? https://youtu.be/ed8SzALpx1Q?t=4976
        id: {type: GraphQLID}, // special GQL ID type, if you console.log args.id it is still a string,  the ID type is for GQL 1:00:00
        name: {type: GraphQLString},// special GQL type
        genre: {type: GraphQLString},
        author: {
            type: AuthorType, // ??? the Type is a call from the schema?
            resolve(parent, args) {
                // looking at the actual data to see what's needed and sends back the data
                console.log('the parent', parent)
                return _.find(authors, {id:parent.authorId})
                // look into the authors array, and find id of the author that matches the parent.authorIdnwhich is the book array, and get its id
            }
            // 1:17:41 with this you can search the book and it's author
            // but you want to search the author and his list of books
        }
    })
})

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({ 
        id: {type: GraphQLID}, 
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
        books: {
            type: new GraphQLList(BookType), // Not BookType, cuz it's a list of books
            // list are created WITHIN the context of defining the fields of an object type https://graphql.org/graphql-js/type/#graphqllist
            resolve(parent, args) {
                console.log(parent)
                return _.filter(books, {authorId: parent.id})
                // filter returns array, within the books array, find the authorId that is the same as the id (reversed)
            }
        }
    })
})

const RootQuery = new GraphQLObjectType({
    name:'RootQueryType',
    // a compiliation of every single field type that can be queried
    // 38:30 ???
    fields: { // no need to be in a function cuz we dont need to worry about the order since there will be a rootquery for different things
        book: {
            type: BookType,
            args: {id:{type:GraphQLID}}, // when they look up the book, i exepct them to pass an argument, here you can only look up by id
            resolve(parent, args){
                // when it's queried, execute the resolve function using the args object containing the id
                // what is parent?
                return _.find(books, {id:args.id}) // use loadash to find in the books array dummy data, with the id property inside args
            }
        },
        author: {
            type: AuthorType,
            args: {id:{type: GraphQLID}},
            resolve(parent, args){
                return _.find(authors, {id:args.id});
            }
        },
        books: {
            // find a list of books
            type: new GraphQLList(BookType),
            resolve(parent, args){
                return books;
            }
        },
        // {
        //     books{
        //         name
        //         author{
        //         name
        //         }
        //     }
    //     }
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args){
                return authors
            }
        }
    }
})


module.exports = new GraphQLSchema({
    query: RootQuery
});