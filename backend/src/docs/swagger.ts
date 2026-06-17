import swaggerJsdoc from "swagger-jsdoc";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "FuteVôlei Radar API",
      version: "1.0.0",
      description: "API para gerenciamento de torneios de futevôlei",
    },
  },
  apis: ["./src/routes/*.ts"], // onde o swagger vai procurar os comentários
};

export const swaggerSpec = swaggerJsdoc(options);
