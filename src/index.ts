import express, {Request,Response} from 'express';
import conn from './config/db.connect'
var bodyparser = require('body-parser')
import log from './Router/auth.routs';
import jwtvelidater  from './Middleware/jwtToken.validater'

const app = express();
const port = 5000;
conn()
app.use(bodyparser.urlencoded({ extended: true }))
app.use(bodyparser.json())


app.use("/auth/api",log)



app.listen(port, () => {
  return console.log(`Express is listenng at http://localhost:${port}`);
});