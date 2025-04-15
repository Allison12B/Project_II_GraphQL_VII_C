const express = require("express")
const { createHandler } = require("graphql-http/lib/use/express")
const { buildSchema, version } = require("graphql")
const { ruruHTML } = require("ruru/server")

const { schema } = require("./graphql-schema") //Importa los esquema que tenemos preparados en este archivo
const mongoose = require('mongoose'); // Para hacer consultas con mongoDB
const AdminUser = require("./models/adminUser") // Importar el modelo de usuario administradores
const RestrictedUser = require("./models/RetrictedUser") // Importar el modelo de usuario restringidos

//Data Base connection 
mongoose.connect("mongodb+srv://kendall14solr:kolerxx12345@reyes.2qxgc.mongodb.net/project_I", { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
})
  .then(() => {
    console.log("Conexión a MongoDB exitosa");
  })
  .catch((err) => {
    console.error("Error al conectar a MongoDB:", err);
  });


// The root provides a resolver function for each API endpoint (Solución del método al que se consulta)
const root = {
  hello: () => {return "Hello world!"},
  version: () => {return "1.2.0"},

  getAllAdminUsers: async  () => {
    try {
      // Recuperar todos los usuarios desde MongoDB
      const users = await AdminUser.find(); // Usa el modelo para hacer la consulta
      return users; // Retorna los usuarios encontrados
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
      throw new Error("No se pudieron obtener los usuarios.");
    }
  },

  getRestrictedUserByAdmin: async ({ id }) => {
    try {
      // Busca los usuarios restringidos cuyo adminId coincida con el id del administrador
      const restrictedUsers = await RestrictedUser.find({ adminId: id }).populate('adminId');
      return restrictedUsers;
    } catch (err) {
      console.error("Error al obtener los usuarios restringidos:", err);
      throw new Error("No se pudieron obtener los usuarios restringidos.");
    }
  },

  
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