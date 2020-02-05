// similar to hello.js, is this for running directly on node?
// https://medium.com/codingthesmartway-com-blog/rest-vs-graphql-418eac2e3083

// graphql-tools combines a schema string with resolvers.
import { find, filter } from 'lodash';
import { makeExecutableSchema } from 'graphql-tools';
// K: 1 checking makeExecutableSchema see below 
// Construct a schema, using GraphQL schema language
const typeDefs = `
    type Query {
        post(id: Int!): Post
                user(id: Int!): User
    },
        type Post {
            id: Int
            user: User
            title: String
            body: String
        },
        type User {
            id: Int
            name: String
            email: String
            posts: [Post]
        },
`;
// K: 3 checking typeDefs, this creates a string schema that has the schema for query and the Post and the User
// K: 4 checking post([search by id]) or user([search by id]), calls to Post & User
var postsData = [
    {
    id: 1,
    userId: 1,
    title: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
    body: 'quia et suscipitsuscipit recusandae consequuntur expedita et cumreprehenderit molestiae ut ut quas totamnostrum rerum est autem sunt rem eveniet architecto'
  },
  {
    userId: 2,
    id: 2,
    title: 'qui est esse',
    body: 'est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla'
  },
  {
    userId: 1,
    id: 3,
    title: 'ea molestias quasi exercitationem repellat qui ipsa sit aut',
    body: 'et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut'
  },
  {
    userId: 2,
    id: 4,
    title: 'eum et est occaecati',
    body: 'ullam et saepe reiciendis voluptatem adipisci\nsit amet autem assumenda provident rerum culpa\nquis hic commodi nesciunt rem tenetur doloremque ipsam iure\nquis sunt voluptatem rerum illo velit'
  }
];
var usersData = [
  {
    id: 1,
    name: 'Leanne Graham',
    email: 'Sincere@april.biz'
  },
  {
    id: 2,
    name: 'Ervin Howell',
    email: 'Shanna@melissa.tv'
  }
];
var getPost = function(root, {id}) { 
    // this is similar to resolver(parent, args)
    return postsData.filter(post => {
        return post.id === id;
    })[0]; // ??? What is this? index 0?
};
var getUser = function(root, {id}) {
      return usersData.filter(user => {
          return user.id === id;
    })[0];
};
// Provide resolver functions for your schema fields
const resolvers = {
  // K: 5 the post: Execute getPost function, same for user
  Query: {
    post: getPost,
    user: getUser,
  },
    User: {
    posts: (user) => filter(postsData, { userId: user.id }),
  },
  Post: {
    user: (post) => find(usersData, { id: post.userId }),
  },
};
// Required: Export the GraphQL.js schema object as "schema"
export const schema = makeExecutableSchema({
  typeDefs,
  // K: 2 check typeDefs move up
  resolvers,
});