//SWAGGER
import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "LogRocket Express API with Swagger",
            version: "0.1.0",
            description: "This is a simple CRUD API application made with Express and documented with Swagger",
        },
        servers: [
            {
                url: "http://dacnpm-test.herokuapp.com/",
            },
        ],
    },
    apis: ['./src/api/modules/brands/routes.js'],
};

export default (app) => {
    const specs = swaggerJsdoc(options);
    app.use(
        "/api-docs",
        swaggerUi.serve,
        swaggerUi.setup(specs)
    );
} 