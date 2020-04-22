

##This Project is Deployed using,
- Angular
- Node.js(express)
- Rest API
- MySQL Database



##Included in this submission folder is,
1. Assignment Folder - Contains the code implementation of both the backend and frontend of the application.

2. Video Folder - contains "C16448216_video.mov" shows how the application works on larger screens
                - contains "Responsive_Site.mov" shows how the application is responsive and works on smaller screens such as mobile devices.
                
3. Database Contents Folder - contains a dump of the contents in my MySQL database.

4. This readme.txt file, explaining how to run the applications backend and frontend.
                



##Launching The Project,
- Open the contents of the Assignment folder in an IDE.



##BACKEND
1. Start the MySQL database and import the dumped data from the Database Contents Folder.

2. Next we connect to the local MySQL database
    - The database credentials can be found in "db.config.js" (these can be changed to suit credentials of the lecturer marking project)
    - They are 
                  HOST: "localhost",
                  USER: "root",
                  PASSWORD: "password",
                  DB: "Enterprise",
                  dialect: "mysql",
                  
                  
3. Navigate to the backend folder

4. Run the following command "node server.js" to connect the application to the database and create the tables needed (if not already created).
   -- The database connection is now listening on port 8080




##FRONTEND
1. The Angular application can be compiled and run on port 8081 by running the following command "ng serve --port 8081"

(if step 1 does not work, them some extra steps may need to be taken to start my Angular project)
  - Install node.js
  - Type "npm install" ,This will download and install all the dependencies of my project.
  - Navigate to the project root folder.
  - Run the project using "ng serve --port 8081"
  - If ng cannot be found, you may need to install it. To do so, execute "npm install --save-dev @angular/cli"
  - Run "ng serve --port 8081" again.(hopefully the application will compile and load)
  (if for some reason the project still can't be loaded, try compiling and running using an Angular CLI.)



##BROWSER
1. Navigate to http://localhost:8081/ to use the application.


***** CODE FOR THIS PROJECT CAN ALSO BE ACCESSED AT https://github.com/AdamNoone/EnterpriseAssignment *****
