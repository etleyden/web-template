import { Express } from 'express';
import { z } from 'zod';
import { createEndpoint } from '../utils/createEndpoint.js';

const CreateUserSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  age: z.number().min(0).optional()
});

const GetUserSchema = z.object({
  id: z.string()
});

export function userRoutes(app: Express) {
  // POST /api/users - Create user
  app.post('/api/users', createEndpoint({
    method: 'post',
    path: '/api/users',
    schema: CreateUserSchema,
    handler: async (input) => {
      // Your business logic here
      const user = {
        id: Math.random().toString(36).substr(2, 9),
        ...input,
        createdAt: new Date().toISOString()
      };
      return user;
    }
  }));

  // GET /api/users/:id - Get user by ID
  app.get('/api/users/:id', createEndpoint({
    method: 'get',
    path: '/api/users/:id',
    handler: async (input, req) => {
      const userId = req.params.id;
      // Your business logic here
      return {
        id: userId,
        name: 'John Doe',
        email: 'john@example.com'
      };
    }
  }));
}