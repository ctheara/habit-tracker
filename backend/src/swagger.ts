const swaggerDocs = {
  openapi: "3.0.0",
  info: {
    title: "HabitForge API",
    version: "1.0.0",
    description: "API documentation for HabitForge",
  },
  servers: [
    {
      url: "http://localhost:5000",
      description: "Local server",
    },
    {
      url: "https://habit-tracker-nyif.onrender.com/",
      description: "Production server",
    },
  ],
  components: {
    securitySchemes: {
      cookieAuth: {
        type: "apiKey",
        in: "cookie",
        name: "authToken",
        description: "Session token stored in an HTTP-only cookie",
      },
    },
  },
  paths: {
    "/user/signup": {
      post: {
        summary: "Sign up new user",
        description: "Create a new user in the database",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  firstName: { type: "string", example: "Mary" },
                  lastName: { type: "string", example: "Smith" },
                  email: { type: "string", example: "marysmith@gmail.com" },
                  password: { type: "string", example: "mypassword" },
                },
              },
            },
          },
        },
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
          "400": {
            description: "Required input fields missing",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: {
                      type: "string",
                      example: "Required input fields missing",
                    },
                  },
                },
              },
            },
          },
          "409": {
            description: "Email already exist in system",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: {
                      type: "string",
                      example: "Email already exist in system",
                    },
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
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  email: { type: "string", example: "marysmith@gmail.com" },
                  password: { type: "string", example: "mypassword" },
                },
              },
            },
          },
        },
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
        security: [{ cookieAuth: [] }],
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
        security: [{ cookieAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  habitName: {
                    type: "string",
                    example: "Go to the gym 3 times a week",
                  },
                  description: {
                    type: "string",
                    example: "I want to go to the gymn more to get stronger",
                  },
                  motivation: {
                    type: "string",
                    example: "be healthy and string",
                  },
                  duration: { type: "string", example: "90 days" },
                  targetDate: { type: "string", example: "2025-12-20" },
                },
              },
            },
          },
        },
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
        security: [{ cookieAuth: [] }],
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
        security: [{ cookieAuth: [] }],
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
        security: [{ cookieAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  habitName: {
                    type: "string",
                    example: "Go to the gym 3 times a week",
                  },
                  description: {
                    type: "string",
                    example: "I want to go to the gymn more to get stronger",
                  },
                  motivation: {
                    type: "string",
                    example: "be healthy and string",
                  },
                  duration: { type: "string", example: "90 days" },
                  targetDate: { type: "string", example: "2025-12-20" },
                },
              },
            },
          },
        },
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
        security: [{ cookieAuth: [] }],
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
