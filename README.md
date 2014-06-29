Running the rest Server:
------------------------

1. Install node.js from http://nodejs.org/
2. Add to your path variables, it may already do this for you.
3. start a command prompt or terminal and run the command:
node path_to_picr_server_dir/RestServer.js
4. To test the server, open your broswer and do the test call which is build into the rest server.
localhost/test 

	the server should respond back with your ip and a chessy message.

Basic Files:
---------
bootstrap.js - Runs before all others files, creates Globel variables which can be used throughout the program.
RestServer.js - This is the starting point of the program/server, this just starts the program.
package.json - Used to declare what libs we want to download from node.js
README.md - If you don't know what this file is for you shouldn't be programming?
SidenotesAPI.docx - This is a doc which is used to documnet all api calls.

Project Folder Structure:
--------------------------
/config - This holds the config files for production or development environments.
/Controllers - All controller files are stored here, including the MainController.js, all controllers should validate data before providing it to a model.
/Lib - Currently just holds the wrapper for the logger lib.
/Models - Holds all the model files which controllers can call on to perform work, example models will save,delete,create, and destroy date for the datbase.
/Views - This holds email template view, current the rest servers has no need for a true view file.
/node_modules - This dir is controlled by node.js it houses the node.js controlled libaries which are used throughout this server.

picr error codes:
-----------------
00 - no error is present.
01 - failed to login.
02 - failed to register patron.
03 - failed the verifcation process.
04 - failed to save configurations.
05 - failed to create a poll.
06 - failed to update a poll.

Current API calls:

Register: Create

localhost/register/ 					
Calltype: POST
POST Variables:
email 		= example@gmail.com;
password 	= 1234123;
first_name 	= John;
last_name 	= Doe;
birthday 	= MM-DD-YYYY;
sex 		= 0;
apiKey 		= 23tfwr234f234424;

returned:
[
    {
        "message": "Successfully registered.",
        "success": 1,
        "time_stamp": "06-28-2014 08:59:32"
    }
]

notes:
used to register a new patron.
checks if a user is already registered.
------------------------------------------------

Login: Submit

localhost/login/ 						
Calltype: POST
POST Variables:
email 		= example@gmail.com;
password 	= 1234123;
apiKey 		= 23tfwr234f234424;

returned:
[
    {
        "message": "Login Successfully",
        "success": 1,
        "uuid": "7c8666d0-fedc-11e3-b4d3-bb6cfbffbccc",
        "time_stamp": "06-28-2014 08:54:28"
    }
]

notes:
used to log a patron into the system.
-----------------------------------------------

Verification: Submit 

localhost/verification/ 				
Calltype: PUT
PUT Variables:
email 			= example@gmail.com;
password 		= 1234123;
registrationKey = 12321dqe1231dfqwe123fwe12345t;

returned:
[
    {
        "message": "Verification Successfully",
        "success": 1,
        "uuid": "61c33f20-fedd-11e3-b4d3-bb6cfbffbccc",
        "time_stamp": "06-28-2014 09:00:53"
    }
]

notes:
used to verfiy a new patron.
checks if a user is already verified.
------------------------------------------------

Configuration: Settings 

localhost/configuration/settings 		
Calltype: PUT
PUT Variables:
<name of setting> = <value of setting>

notes:
This will modifify only the settings which you provide in the call.



localhost/configuration/settings 		
Calltype: GET
GET Variables:
<name of setting> = <value of setting>

notes:
This will modifify only the settings which you provide in the call.
------------------------------------------------

Poll: Open

localhost/poll 		
Calltype: POST
POST Variables:
	question 		= 'What should i wear today?'
	picture01 		= <encoded in base64>
	picture02 		= <encoded in base64>
	email 			= hubbertj@gmail.com
	votes_to_close 	= 5 <one or both>
	time_to_close 	= 5000 <in mins>
	uuid 			= 7c8666d0-fedc-11e3-b4d3-bb6cfbffbccc

returned:
[
    {
        "message": "Poll created successfully",
        "success": 1,
        "time_stamp": "06-28-2014 09:03:13"
    }
]


notes:
Creating a new poll.
------------------------------------------------

Poll: Close

localhost/poll/close 		
Calltype: PUT
PUT Variables:
email 	= hubbertj@gamil.com
poll_id = 1
uuid 	= 7c8666d0-fedc-11e3-b4d3-bb6cfbffbccc

returned:
[
    {
        "message": "Poll update successfully",
        "success": 1,
        "time_stamp": "06-29-2014 12:11:05"
    }
]

notes:

This is manual close statment for a poll. Check if this has already been done. 
poll_state close = true. 
Check if they have been logined in.
-------------------------------------------------











Personal notes for project:
----------------------------