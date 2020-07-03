// install express with `npm install express` 
const express = require('express')
const fetch = require('node-fetch')

const app = express()
app.use(express.static(__dirname + '/views'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => res.render('index'))


const PORT = 3000

if(!process.env.DETA_RUNTIME){
    app.listen(PORT,()=>{
        console.log('Listening to local port')
    })
}

// export 'app'
module.exports = app