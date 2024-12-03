# middleware_project

# warnings
.env file and docker files are public here keep in mind that

# node packages that need 
all are included in package-lock.json file so no need to install manually all are installed when image is running.

# to run the dockerfile
docker-compose up --build
docker-compose up --build -d //run on detached mode

# to stop running
docker-compose down

# api will abailable at 
http://localhost:3000

# how to connect db to pgadmin
docker inspect <db image id> # mostlye :-172.19.0.2
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

# to check any node containers console

docker-compose logs <app>

# How to get a Backup from the postgres container

*sudo docker exec -i postgres_container pg_dump -U username yourdb > backup.sql

# How to restore a DB to postgres container

*first through UI of pg admin delete the current db
*then make a new db named "yourdb"
*then use below command to restore the db
   docker exec -i postgres_container psql -U your_username -d yourdb < ./backup.sql

# How to restore a DB to postgres container(Windows)
docker cp C:\Users\ishan\OneDrive\Desktop\mide_2\mydb2.sql mide_2-db-1:/tmp/mydb2.sql
docker exec -it mide_2-db-1 psql -U zeus -d yourdb
\i '/tmp/mydb2.sql';
