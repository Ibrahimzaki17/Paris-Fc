import swaggerJsdoc from "swagger-jsdoc";

const options = {
    definition: { 
        openapi: "3.0.0",

        info: {
            title: "Paris FC API",
            version: "1.0.0",
            description: "Backend API for Paris FC Management System"
        },

        servers: [
            {
                url: "http://localhost:3000/api"
            }
        ],

        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT"
                }
            } 
        }
    },

    apis: ["src/routes/*.js"]
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;