# Massdrop-Coding-Challenge
Massdrop job queue coding challenge using javascript and a RESTful API.

# Setup
- This application uses Node.js version 7.x.x. You can download Node.js using `brew install node` if you have brew installed. 
- This application uses Mongodb. You can download Mongodb using `brew install mongodb` if you have brew installed. 
  - Unfortunately Mongodb does not add in the necessary /data/db folder, run ```sudo mkdir -p ~/data/db``` to make the appropiate folder." (http://stackoverflow.com/questions/7948789/mongodb-mongod-complains-that-there-is-no-data-db-folder)
  - We need to change the access of the folder by running ```sudo chown -R `id -u` ~/data/db``` (http://stackoverflow.com/questions/15229412/unable-to-create-open-lock-file-data-mongod-lock-errno13-permission-denied)
- Run `npm install` in the root of the project to install all the necessary dependencies.<br />
- For testing, download the chrome app Postman at https://chrome.google.com/webstore/detail/postman/fhbjgbiflinjbdggehcddcbncdddomop?hl=en. <br />

# Running the Application
Step 1: Run `mongod` in root of the project.<br />
Step 2: In a new terminal run `npm run start` in the root of the project.<br />
Step 3: Open Postman<br />
Step 4: Copy `http://localhost:3000/jobs` into "Enter request URL" field<br />
step 5: Set to "GET" and press "Send" and `[]` should be returned since database is initially empty.<br />

# Using the Application and REST API
There are four main feautres of this application.<br />
- POST<br />
  - Step 1: Have "Enter request URL" field set to `http://localhost:3000/jobs`.<br />
  - Step 2: Change setting to "POST"<br />
  - Step 3: Go to the "BODY" tab<br />
  - Step 4: Check the x-www-form-urlencoded setting<br />
  - Step 5: Make "New key" field equal `url` and the "value" field equal to the desired website URL in the form of https://www.google.com/<br />
  - Step 6: Click "Send" and the below console will return "Job ID: xxxxxxxxxxxxxxx"<br />
  
 - GET all<br />  
   - Step 1: Change setting to "GET"<br />
   - Step 2: Change "Enter request url" field to `http://localhost:3000/jobs`<br />
   - Step 3: Click "Send" and the below console will return the job in the JSON fomrat <br />
    ```
     {
      _id: JOB_ID,
      url: WEBSITE_URL,
      status: [PARSING_STATUS],
      source_code: SOURCE_CODE
     }
     ```
     where `PARSING_STATUS = IN-PROGRESS, FAILED, or COMPLETED`<br />
     
 - GET by ID<br />
   - Step 1: Change setting to "GET"<br />
   - Step 2: Change "Enter request url" field to `http://localhost:3000/jobs/idNumber` where idNumber is the returned job ID when posted.<br />
   - Step 3: Click "Send" and the below console will return the job in the JSON fomrat <br />
    ```
    {
      _id: JOB_ID,
      url: WEBSITE_URL,
      status: [PARSING_STATUS],
      source_code: SOURCE_CODE
     }
     ```
     where `PARSING_STATUS = IN-PROGRESS, FAILED, or COMPLETED`<br />
     
  - DELETE by ID<br />
    - Step 1: Change setting to "DELETE"<br />
    - Step 2: Change "Enter request url" field to `http://localhost:3000/jobs/idNumber` where idNumber is the returned job ID when posted.<br />
    - Step 3: Click "Send" and the below console will return:<br />
    ```
     {
      "message": "Job successfully deleted"
     }
     ```
      
# Next Steps
  - Make application runnable through command line using cURL. <br />
  - Add more extensive error checking<br />
  - Usable even with malformed url<br />
    - Currently https://www.google.com/ will work but www.google.com will not<br />
  - Handle cases where source code is not instantly parsed (make use of IN-PROGRESS status)
