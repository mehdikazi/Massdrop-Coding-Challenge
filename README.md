# Massdrop-Coding-Challenge
Massdrop job queue coding challenge using javascript and a RESTful API.

# Setup
For the first time run `npm install` in the project root to install all the necessary dependencies.
For testing download the chrome app Postman at https://chrome.google.com/webstore/detail/postman/fhbjgbiflinjbdggehcddcbncdddomop?hl=en.

# Running the Application
Step 1: Run `mongod` in root of the project.
Step 2: In a new project terminal run `npm run start`.
Step 3: Open Postman
Step 4: Copy `http://localhost:3000/jobs` into "Enter request URL" field
step 5: Set to "GET" and press "Send" and `[]` should be returned since database is initially empty.

# Using the Application and REST API
There are four main feautres of this application.
-POST
  -Step 1: Have "Enter request URL" field set to `http://localhost:3000/jobs`.
  -Step 2: Change setting to "POST"
  -Step 3: Go to the "BODY" tab
  -Step 4: Check the x-www-form-urlencoded setting
  -Step 5: Make "New key" field equal `url` and the "value" field equal to desired website URL
  -Step 6: Click "Send" and the below console will return "Job ID: xxxxxxxxxxxxxxx"
  
 -GET all
  -Step 1: Change setting to "GET"
  -Step 2: Change "Enter request url" field to `http://localhost:3000/jobs`
  -Step 3: Click "Send" and the below console will return the job in the JSON fomrat 
    `{
      _id: JOB_ID,
      url: WEBSITE_URL,
      status: [PARSING_STATUS],
      source_code: SOURCE_CODE
     }`
     where `PARSING_STATUS = IN-PROGRESS, FAILED, or COMPLETED`
     
 -GET by ID
  -Step 1: Change setting to "GET"
  -Step 2: Change "Enter request url" field to `http://localhost:3000/jobs/idNumber` where idNumber is the returned job ID when posted.
  -Step 3: Click "Send" and the below console will return the job in the JSON fomrat 
    `{
      _id: JOB_ID,
      url: WEBSITE_URL,
      status: [PARSING_STATUS],
      source_code: SOURCE_CODE
     }`
     where `PARSING_STATUS = IN-PROGRESS, FAILED, or COMPLETED`
     
  -DELETE by ID
   -Step 1: Change setting to "DELETE"
   -Step 2: Change "Enter request url" field to `http://localhost:3000/jobs/idNumber` where idNumber is the returned job ID when posted.
   -Step 3: Click "Send" and the below console will return:
    `{
      "message": "Job successfully deleted"
      }`
