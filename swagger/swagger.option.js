const swaggerConfig = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: "3.0.3",
    info: {
      title: "NodeJS APIS",
      description: "NodeJS API documentation using Swagger",
      version: "1.0.0"
    },
    servers: [
      {
        url: "http://localhost:5000/api/v1"
      }
    ]
  },
  apis: [
    "./routers/*.js",       // điều chỉnh đường dẫn nếu cần
    "./controllers/*.js"
  ]
};

const swaggerAPIOptions = swaggerConfig(options);

module.exports = swaggerAPIOptions;
