# Watchlist Manager (Docker Microservices App)

A simple **full-stack watchlist application** where users can keep track of **Movies, Books, and Dramas** they want to watch or read.

The project demonstrates **containerized microservices using Docker**, with a **Node.js backend, MongoDB database, and a frontend served through Nginx**.

[Check out the live Demo](https://your-render-url.onrender.com)



---

## Features

* Add items to your watchlist
* Separate lists for **Movies, Books, and Dramas**
* Edit existing items
* Delete items
* Modern responsive UI with Bootstrap
* Counters for each category
* Docker-based microservice architecture

---

## Tech Stack

**Frontend**

* HTML
* CSS
* Bootstrap
* JavaScript

**Backend**

* Node.js
* Express.js
* Mongoose

**Database**

* MongoDB

**DevOps / Infrastructure**

* Docker
* Docker Compose
* Nginx

---

## Project Structure

```text
watchlist-docker
│
├── backend
│   ├── server.js
│   └── package.json
│
├── frontend
│   ├── index.html
│   └── script.js
│
├── Dockerfile
└── README.md
```


---

## Running the Project

### 1. Clone the repository

git clone https://github.com/abhipandey11/watchlist-docker.git

cd watchlist-docker

---

### 2. Start the application using Docker

docker compose up --build

---

### 3. Open the application on your local system (localhost as of now)

http://localhost:8080

---

## Stopping the Application

docker compose down

---
