# Mern stack help desk react app
Let's just cut to the chase and just get instructions up

## Step 1
Create a folder on windows

Or

on Command prompt

```terminal
cd desktop
```
Then 
```terminal
mkdir "mern-stack-help-desk-app"
cd "mern-stack-help-desk-app"
```
Clone repo:
```terminal
git clone https://github.com/zekScript/support-ticket-mern-stack.git
cd "support-ticket-mern-stack"
```
Then its time to install the dependencies
Paste these in order:
```terminal
cd client
npm install
cd ..
cd server
npm install
cd ..
npm install

```


## Step 3 
When you finish write `code .` in the terminal
and then
Press CTRL + SHIFT + ` in vscode

Open 3 terminals in bottom right with a "+" icon

On the first terminal, run the client with vite + react
Paste this:
```terminal
cd client
npm run dev
```


## Step 4 
Let's connect database with the client now

first of all create a `.env` file in the `/server` folder

And in the `.env` file

enter these values:
```terminal
PORT=8000
MONGO_URL="your url" // When your done add /mern route to url ex: localhost:21707/mern
JWT_SECRET="your_secret"

```
To get the JWT_SECRET you can enter this in the terminal and copy it and give it to the JWT secret
```terminal
python -c "import base64,os; print(base64.b64encode(os.urandom(32)).decode())"
```

To get the mongodb url open up your mongodb compass
press + to make a new connect on the top left

copy the mongo url and press "save & connect"

## Step 5
Lets configure mongodb now

near localhost press + icon and create a database name

on both inputs just write mern

When your done press near mern + icon to create a collection 
make 2 collections
 **tickets and users**
## Step 6
All you have to do is run the database now
```terminal
cd server
npx nodemon index.js
```
All you have to do now is just use the website and test if it works
When it works **Enjoy!**




