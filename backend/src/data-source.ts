import "reflect-metadata";
import { DataSource } from "typeorm";
import * as dotenv from "dotenv";
import { User } from "./entities/User";

// Check if .env exists, otherwise fallback to .env.example
dotenv.config();

// Configure the TypeORM DataSource
export const AppDataSource = new DataSource({
    type: "postgres", // Change to your database type (e.g., mysql, sqlite, etc.)
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT || "5432"),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true, // Set to false in production
    logging: true,
    entities: [User],
    migrations: ["src/migrations/**/*.ts"],
    subscribers: ["src/subscribers/**/*.ts"],
});