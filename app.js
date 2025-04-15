const express = require("express")
const { createHandler } = require("graphql-http/lib/use/express")
const { buildSchema, version } = require("graphql")
const { ruruHTML } = require("ruru/server")

const { schema } = require("./graphql-schema");
const mongoose = require('mongoose'); 

const { getRestrictedUserByAdmin, getRestrictedUserById } = require("./controller/restrictedUserController");
const { getPlayListByRestrictedUser, getPlayListByAdminUser } = require("./controller/playListController");

//Data Base connection 
mongoose.connect("mongodb+srv://kendall14solr:kolerxx12345@reyes.2qxgc.mongodb.net/project_I", { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
})
  .then(() => {
    console.log("Data Base connection successfully");
  })
  .catch((err) => {
    console.error("Error Data Base connection:", err);
  });


// The root provides a resolver function for each API endpoint (Solución del método al que se consulta)
const root = {
  //Restricted user´s methods 
  getRestrictedUserByAdmin: getRestrictedUserByAdmin,
  getRestrictedUserById: getRestrictedUserById,

  //Play list´s methods
  getPlayListByRestrictedUser: getPlayListByRestrictedUser,
  getPlayListByAdminUser: getPlayListByAdminUser,
}

const app = express()

// Create and use the GraphQL handler. (Crea una url en donde se relaciona la consulta con su resolver)
app.all(
  "/graphql",
  createHandler({
    schema: schema,
    rootValue: root,
  })
)

// Serve the GraphiQL IDE. (Genera una interfaz para probar mi endpoint)
app.get("/", (_req, res) => {
  res.type("html")
  res.end(ruruHTML({ endpoint: "/graphql" })) //(Cambiar la url para poder probar la consulta)
})

// Start the server at port
app.listen(4000)
console.log("Running a GraphQL API server at http://localhost:4000/graphql")