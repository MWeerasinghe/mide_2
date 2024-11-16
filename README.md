# middleware_project

# node packages that need 
all are included in package-lock.json file so no need to install manually all are installed when image is running.

# to run the dockerfile
docker-compose up --build
docker-compose up --build -d //run on detached mode

# api will abailable at 
http://localhost:3000

# how to connect db to pgadmin
docker inspect <db image id>
* take the ipv4 address from above command use "sudo" if needed
* add this ip address , uesr name and password from db environment in docker-compose file

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
