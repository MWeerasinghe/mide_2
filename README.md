# middleware_project

# node packages that need 

# to run the dockerfile
docker-compose up --build
docker-compose up --build -d //run on detached mode

# api will abailable at 
http://localhost:3000

# after building the system

# Register a user
POST http://localhost:3000/api/auth/register

eg:-
{
  "email": "testuser@example.com",
  "password": "yourpassword"
}


# User login
POST http://localhost:3000/api/auth/login

eg:-
{
  "email": "testuser@example.com",
  "password": "yourpassword"
}
