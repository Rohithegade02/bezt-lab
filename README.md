# Full Stack Engineer Assignment

This repository contains two separate projects: **Backend** and **Frontend**, both built using modern web development technologies. The backend is powered by **NestJS**, **TypeScript**, **Prisma ORM**, and **PostgreSQL**. The frontend uses **Next.js**, **TypeScript**, **TailwindCSS**, **react-hook-form**, and **Redux** for state management.

## Project Structure

- **Backend**: Running on port `3001`, this is a RESTful API built with NestJS that connects to a PostgreSQL database and handles user and profile management.
- **Frontend**: Running on port `3000`, this is a Next.js-based web application that interacts with the backend API to perform CRUD operations on users and their profiles.

## Table of Contents
- [Features](#features)
- [Technologies](#technologies)
- [Setup Instructions](#setup-instructions)


## Features

### Backend
- 🖐️ **CRUD operations** for managing `Users` and `Profiles`.
- 🖐️ **NestJS** for building scalable and efficient server-side applications.
- 🖐️ **Prisma ORM** for easy database handling with **PostgreSQL**.
- 🖐️ Unique constraints on username and email to ensure data integrity.
- 🖐️ Endpoints to handle:
  - Create, Read, Update, Delete users and their associated profiles.
  
### Frontend
- 🖐️ **Next.js** for a modern React-based web framework with server-side rendering.
- 🖐️ **react-hook-form** for seamless form handling and validation.
- 🖐️ **TailwindCSS** for a fully responsive and styled UI.
- 🖐️ **Redux** for managing the application state.

## Technologies

### Backend
- **NestJS** (TypeScript framework)
- **Prisma ORM** (Database handling)
- **PostgreSQL** (Relational database)
- **TypeScript** (Static type-checking)

### Frontend
- **Next.js** (React-based framework)
- **TypeScript** (Static type-checking)
- **TailwindCSS** (Utility-first CSS framework)
- **react-hook-form** (Form management)
- **Redux** (State management)

## Setup Instructions

### Backend Setup
1. Clone the backend repository:
   ```bash
   git clone <backend-repo-url>
   cd backend
2.Install Dependencies:
  ```bash
  npm install
```
3.Set Up PostgreSQL:

Create a new PostgreSQL database.
Update your .env file with the following variables:
```bash
DATABASE_URL="postgresql://username:password@localhost:5432/database"

```
4.Run Prisma Migrations:

```bash
npx prisma migrate dev
```
5. Start the Backend Server:
```bash
npm run start

```
### Frontend Setup (Next.js + TailwindCSS)
1.Clone the Frontend Repository:

```bash

git clone <frontend-repo-url>
cd frontend
```
2.Install Dependencies:

```bash

npm install
```
3.Configure Backend API URL:

Ensure that the API routes in your frontend point to http://localhost:3001 (the backend server).
Update any necessary environment variables in .env.local if applicable.
Start the Frontend Server:

```bash

npm run dev
```
The frontend server will run on http://localhost:3000.
