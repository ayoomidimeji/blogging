const express = require('express')
const mongoose = require('mongoose')
const port = 3020

//import router
const postRoutes = require('./routes/postRoutes')

//middleware


//connect to database
mongoose.connect(mongouri)
    .then(() => {
        console.log("Connected to mongodb database")

        //express app instance
        const app = express();

        //middleware
        app.use(express.json())

        //setting up the home endpoint
        app.get('/', (req, res) => {
            res.send("Hello World from our server")
        })

        // use post routes
        app.use('/api', postRoutes)

        //listen to the port
        app.listen(port, () => console.log(`Listening on port http://localhost:${port}`))
    })
    .catch((error) => {
        console.log("Error connecting to database", error)
    })