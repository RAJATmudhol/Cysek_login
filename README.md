cd backend 
    >npm install
    >create a .env file in backend/
         add        MONGO_URI=Your mongourl
    > npm start


cd frontend
   npm install
   npm start
    

->OTP expiry: 5 minutes and can view in console were max of 3 attempts after 3 invalid attempts will block for 10 min
->Token is stored in UUID 
-> Users are auto-created on first login attempt
