// install express with `npm install express` 
const express = require('express')
const fetch = require('node-fetch')

const app = express()
app.use(express.static(__dirname + '/views'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => res.render('index'))


const PORT = process.env.PORT || 3000

app.listen(PORT,()=>{
    if(PORT===3000){
        console.log('listening to port 3000')
    }
})

// export 'app'
//module.exports = app