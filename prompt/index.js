// install express with `npm install express` 
const express = require('express')
const app = express()

app.get('/', (req, res) => res.send('Hello World!'))


const PORT = process.env.PORT || 3000

app.listen(PORT,()=>{
    if(PORT===3000){
        console.log('listening to port 3000')
    }
})

// export 'app'
//module.exports = app