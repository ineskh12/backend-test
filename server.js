const express = require('express');
//const http = require('http');
const connectDB = require('./config/DB');
const app= express();
const {create, login} = require('./Controllers/UserControllers');
const User = require('./Models/User');

//const router = express.Router();

//Connect DB
connectDB();

app.use(express.json({limit: '20mb'}));
app.use(express.urlencoded({ extended: false }));
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,authorization,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.get('/', function(req, res, next) {
  res.end('Home page');
});

app.post('/post-test', (req, res) => {
    console.log('Got body:', req.body);
    res.sendStatus(200);
});

app.post("/register", async (req, res) => {
    try {
        const { nom , prenom , email , password ,direction} = req.body;
        const user = await create(nom, prenom, email, password ,direction);
        

    return res.json(user);

} catch (e) {
    return res.send(e);
}
})

app.post("/login", async(req, res) => {
    try {
        const {email, password} = req.body;
        const user = await login(email, password);
        
        return res.json(user);
    } catch (e) {
        return res.send(e);
    }
})
app.get("/get", async (req, res) => {
    try {
      const getUsers = await User.find({ deleted: false } );
      res.json(getUsers);
    } catch (error) {
      res.json({ message: error });
    }
  })
  app.patch("/test/:id", (req, res) => {
    User.updateOne({ _id: req.params.id }, { $set: req.body })
      .then((resp) => res.status(200).json(resp))
      .catch((err) => res.status(400).json("Request Failed"));
  });
  app.patch("/delete/:id", (req, res) => {
    User.updateOne({ _id: req.params.id }, { $set: req.body })
      .then((resp) => res.status(200).json(resp))
      .catch((err) => res.status(400).json("Request Failed"));
  });
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})