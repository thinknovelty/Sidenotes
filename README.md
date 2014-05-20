Running the rest Server:
------------------------

1. Install node.js from http://nodejs.org/
2. Add to your path variables, it may already do this for you.
3. start a command prompt or terminal and run the command:
node path_to_SideNoteWebServer_dir/RestServer.js
4. To test the server, open your broswer and do the test call which is build into the rest server.

your_ip:3000/test 

the server should respond back with your ip and a chessy message.


Basic Files:
---------
bootstrap.js - Runs before all others files, creates Globel variables which can be used throughout the program.
RestServer.js - This is the starting point of the program/server, this just starts the program.
package.json - Used to declare what libs we want to download from node.js
README.md - If you don't know what this file is for you shouldn't be programming?


Project Folder Structure:
--------------------------
/config - This holds the config files for production or development environments.

/Controllers - All controller files are stored here, including the MainController.js, all controllers should validate data before providing it to a model.

/lib - Currently just holds the wrapper for the logger lib.

/Models - Holds all the model files which controllers can call on to perform work, example models will save,delete,create, and destroy date for the datbase.

/node_modules - This dir is controlled by node.js it houses the node.js controlled libaries which are used throughout this server.


Personal notes for project:
----------------------------

registration call example:

get:
post:
put:
delete:




