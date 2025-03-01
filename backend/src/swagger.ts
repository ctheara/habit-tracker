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
    "/user/signup": {
      post: {
        summary: "Sign up new user",
        description: "Create a new user in the database",
        responses: {
          "201": {
            description: "User created successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    token: { type: "string", example: "jwt-token" },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/user/login": {
      post: {
        summary: "User login",
        description: "Login and get an authentication token",
        responses: {
          "200": {
            description: "User logged in successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    token: { type: "string", example: "jwt-token" },
                  },
                },
              },
            },
          },
          "401": {
            description: "Unauthorized access",
          },
        },
      },
    },
    "/user/me": {
      get: {
        summary: "Get current user data",
        description: "Fetch the current user's data from the database",
        security: [
          {
            bearerAuth: [],
          },
        ],
        responses: {
          "200": {
            description: "User data retrieved successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    userId: { type: "integer", example: 1 },
                    firstName: { type: "string", example: "John" },
                    lastName: { type: "string", example: "Doe" },
                    email: { type: "string", example: "john.doe@example.com" },
                  },
                },
              },
            },
          },
          "500": {
            description: "Internal server error",
          },
        },
      },
    },
    "/habit/create": {
      post: {
        summary: "Create a new habit",
        description: "Add a new habit for the logged-in user",
        security: [
          {
            bearerAuth: [],
          },
        ],
        responses: {
          "200": {
            description: "Habit created successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: { type: "string", example: "Creation Successful" },
                  },
                },
              },
            },
          },
          "400": {
            description: "Missing required input fields",
          },
        },
      },
    },
    "/habit/list": {
      get: {
        summary: "Get all habits of the current user",
        description: "Fetch all habits for the logged-in user",
        security: [
          {
            bearerAuth: [],
          },
        ],
        responses: {
          "200": {
            description: "List of habits retrieved successfully",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      habitId: { type: "integer", example: 1 },
                      habitName: { type: "string", example: "Morning Jog" },
                      description: {
                        type: "string",
                        example: "Jog every morning for 30 minutes",
                      },
                      motivation: {
                        type: "string",
                        example: "Stay healthy and active",
                      },
                      duration: { type: "integer", example: 30 },
                      targetDate: { type: "string", example: "2025-12-31" },
                    },
                  },
                },
              },
            },
          },
          "500": {
            description: "Internal server error",
          },
        },
      },
    },
    "/habit/{habitId}": {
      get: {
        summary: "Get a specific habit",
        description: "Retrieve a habit by its ID",
        security: [
          {
            bearerAuth: [],
          },
        ],
        parameters: [
          {
            name: "habitId",
            in: "path",
            required: true,
            description: "The ID of the habit to retrieve",
            schema: {
              type: "integer",
              example: 1,
            },
          },
        ],
        responses: {
          "200": {
            description: "Habit data retrieved successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    habitId: { type: "integer", example: 1 },
                    habitName: { type: "string", example: "Morning Jog" },
                    description: {
                      type: "string",
                      example: "Jog every morning for 30 minutes",
                    },
                    motivation: {
                      type: "string",
                      example: "Stay healthy and active",
                    },
                    duration: { type: "integer", example: 30 },
                    targetDate: { type: "string", example: "2025-12-31" },
                  },
                },
              },
            },
          },
          "500": {
            description: "Internal server error",
          },
        },
      },
      put: {
        summary: "Update a habit",
        description: "Update an existing habit by its ID",
        security: [
          {
            bearerAuth: [],
          },
        ],
        parameters: [
          {
            name: "habitId",
            in: "path",
            required: true,
            description: "The ID of the habit to update",
            schema: {
              type: "integer",
              example: 1,
            },
          },
        ],
        responses: {
          "200": {
            description: "Habit updated successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: { type: "string", example: "Update Successful" },
                  },
                },
              },
            },
          },
          "400": {
            description: "No fields to update",
          },
          "500": {
            description: "Internal server error",
          },
        },
      },
      delete: {
        summary: "Delete a habit",
        description: "Delete a habit by its ID",
        security: [
          {
            bearerAuth: [],
          },
        ],
        parameters: [
          {
            name: "habitId",
            in: "path",
            required: true,
            description: "The ID of the habit to delete",
            schema: {
              type: "integer",
              example: 1,
            },
          },
        ],
        responses: {
          "200": {
            description: "Habit deleted successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: { type: "string", example: "Delete Successful" },
                  },
                },
              },
            },
          },
          "500": {
            description: "Internal server error",
          },
        },
      },
    },
  },
};

export default swaggerDocs;
