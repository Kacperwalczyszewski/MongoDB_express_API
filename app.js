const express = require("express");
const createError = require('http-errors');
const dotenv = require('dotenv').config();
const ProductRoute = require('./Routes/Product.route');
const createHttpError = require("http-errors");
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const app = express();
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

//Initialize db
require('./initDB')();

app.all('/test', (req, res) => {
    // console.log(req.query);
    // console.log(req.query.name);
    // res.send(req.query);
    // console.log(req.params);
    // res.send(req.params);
    console.log(req.body);
    res.send(req.body);
});

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'Moje zjebane API',
            description: 'Lubie małpki -> te procentowe'
        }
    },
    apis: [
        "./Routes/Product.route.js"
    ]
}

app.use('/products', ProductRoute);

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use((req, res, next) => {
    // const err = new Error("not found")
    // err.status = 404
    // next(err)
    next(createError(404, 'not found'));
})

//error handler
app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.send({
        error: {
            status: err.status || 500,
            message: err.message
        }
    })
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("sterter on port " + PORT + "....");
});