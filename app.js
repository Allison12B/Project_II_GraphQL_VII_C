const express = require("express")
const cors = require("cors");
const { createHandler } = require("graphql-http/lib/use/express")
const { buildSchema, version } = require("graphql")
const { ruruHTML } = require("ruru/server")
require('dotenv').config();
const { schema } = require("./graphql-schema");
const mongoose = require('mongoose');

const jwt = require('jsonwebtoken');

const { getRestrictedUserByAdmin, getRestrictedUserById } = require("./controller/restrictedUserController");
const { getPlayListByRestrictedUser, getPlayListByAdminUser, getPlayListById } = require("./controller/playListController");
const { getVideoById, getVideoByPlayList, getAllVideos, searchVideo } = require("./controller/videoController");

//Data Base connection 
mongoose.connect(process.env.DB_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log("Data Base connection successfully");
  })
  .catch((err) => {
    console.error("Error Data Base connection:", err);
  });

const app = express()
app.use(cors({
  origin: "http://127.0.0.1:5500", // o "*" solo para desarrollo
  methods: ["POST", "GET", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));


// Create and use the GraphQL handler. (Crea una url en donde se relaciona la consulta con su resolver)
app.all("/graphql", (req, res) => {
  const authHeader = req.headers.authorization;
  let user = null;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];
    try {
      user = jwt.verify(token, process.env.JWT_SECRET); 
      req.user = user;
    } catch (err) {
      console.warn("Token inválido:", err.message);
    }
  }

  return createHandler({
    schema,
    rootValue: root,
    context: { user }, 
  })(req, res);
});

// The root provides a resolver function for each API endpoint (Solución del método al que se consulta)
const root = {
  //Restricted user´s resolvers 
  getRestrictedUserByAdmin: getRestrictedUserByAdmin,
  getRestrictedUserById: getRestrictedUserById,

  //Play list´s resolvers
  getPlayListByRestrictedUser: getPlayListByRestrictedUser,
  getPlayListByAdminUser: getPlayListByAdminUser,
  getPlayListById: getPlayListById,

  //Video´s resolvers
  getVideoById: getVideoById,
  getVideoByPlayList: getVideoByPlayList,
  getAllVideos: getAllVideos,
  searchVideo: searchVideo,
}




// Serve the GraphiQL IDE. (Genera una interfaz para probar mi endpoint)
app.get("/", (_req, res) => {
  res.type("html")
  res.end(ruruHTML({ endpoint: "/graphql" })) //(Cambiar la url para poder probar la consulta)
})

// Start the server at port
app.listen(4000)
console.log("Running a GraphQL API server at http://localhost:4000/graphql")