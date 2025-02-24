const swaggerDocs = {
  openapi: "3.0.0",
  info: {
    title: "HabitForge API",
    version: "1.0.0",
    description: "API documentation for HabitForge",
  },
  servers: [
    {
      url: "http://localhost:5000", // Update with your actual API URL
    },
  ],
  paths: {
    "/users": {
      get: {
        summary: "Get all users",
        description: "Fetch all users from the database",
        responses: {
          "200": {
            description: "A list of users",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      id: { type: "integer", example: 1 },
                      firstName: { type: "string", example: "John" },
                      lastName: { type: "string", example: "Doe" },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};

export default swaggerDocs;
