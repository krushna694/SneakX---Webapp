SneakX

SneakX is a full-stack sneaker platform built with React, Spring Boot, and MySQL.

The goal is to keep the application secure, scalable, clean, and easy to maintain.

//Tech Stack

Frontend: React, Vite, Axios, React Router, Bootstrap

Backend: Java 21, Spring Boot, Spring Security, JWT, JPA/Hibernate

Database: MySQL 8

Migration: Flyway

Build Tools: npm, Maven

Main Features

User registration and login

JWT authentication

Password reset with OTP

Product catalog

Categories

Product variants and stock

Wishlist

Cart

Addresses

Orders

Razorpay payment foundation



//How to Run

//Start MySQL

Check MySQL:

Get-Service MySQL80

If it is stopped:

Start-Service MySQL80

//Start Backend

Open PowerShell 1:

cd "D:\SneakX - Webapp\backend"
mvn spring-boot:run

Backend runs on:

http://localhost:8080

//Start Frontend

Open PowerShell 2:

cd "D:\SneakX - Webapp\frontend"
npm run dev

/Frontend runs on:

http://localhost:5173

If dependencies are not installed:

npm install

//Useful Commands

//Backend

cd "D:\SneakX - Webapp\backend"

mvn clean test
mvn spring-boot:run

//Frontend

cd "D:\SneakX - Webapp\frontend"

npm run dev
npm run lint
npm run build



//System Flow

React
↓
Axios REST API
↓
Spring Boot
↓
JPA / Hibernate
↓
MySQL

Flyway manages database migrations.

