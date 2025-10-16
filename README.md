got to the main folder of the project where it contains client and server


# Install dependencies
```terminal
cd server
npm install
cd ..
cd client
npm install
cd ..

```
# make .env file in /server folder and these values
```terminal
PORT=8000
MONGO_URL="Your_mongo_url/mern" # make database called mern and collections of posts, users, tickets in mongodb ex mongodb:localhost:201322/mern
JWT_SECRET="your_jwt_secret" # you can generate this in base 64 or just add random values
```

# Running the website with the server 

When all it's setted up enter this:

```terminal
cd client
npm run dev
cd ..
cd server
npx nodemon index.js
```


# Final step is just checkout around the website **Enjoy!**
