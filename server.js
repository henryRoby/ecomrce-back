const PORT = process.env.PORT || 8080
//Définition des modules
const cors = require('cors')
// const methodOverride = require('method-override')
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const expressFile = require('express-fileupload')

//Connexion à la base de donnée
mongoose.connect('mongodb://localhost/pretest', {
    useCreateIndex: true,
    useNewUrlParser: true
}).then(() => {
    console.log('Connected to mongoDB')
}).catch(e => {
    console.log('Error while DB connecting');
    console.log(e);
});

//On définit notre objet express nommé app
const app = express();

//Body Parser
const urlencodedParser = bodyParser.urlencoded({
    extended: true
});
app.use(expressFile())
app.use(cors())
app.use(urlencodedParser);
app.use(bodyParser.json());
//Définition du routeur
const router = express.Router();
app.use('/user', router);
require(__dirname + '/route/route')(router);

//Définition et mise en place du port d'écoute

app.listen(PORT, () => console.log('server demarre avec port ' + PORT));