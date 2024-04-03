require('dotenv').config();
const express = require('express');
const {fetchdata} = require("./public/api")

const path = require('path');
const app = express()

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', async (req, res) => {
   const data = await fetchdata()
    console.log(data)

    res.render("index", { 
       ...data
         }
 );
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });
  
 
  
  