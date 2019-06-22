const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const PORT = process.env.PORT || 5000;

express()
    .use(express.static(path.join(__dirname, 'public')))
    .use(bodyParser.urlencoded({ extended: false }))
    .set('views', path.join(__dirname, 'views'))
    .set('view engine', 'ejs')
    .get('/', (req, res) => res.sendFile( path.join(__dirname, 'public/postalRate.html')))
    .get('/getRate', handleQuery)
    .listen(PORT, () => console.log(`Listening on ${ PORT }`));

function handleQuery(request, response) {
    const weight = Number(request.query.weight);
    const mailType = request.query.mailType;

    computeRate(response, weight, mailType);
}

function computeRate(response, weight, mailType) {
    let result = 0;
    if(weight === undefined) {
        weight = 0;
    }

    if (mailType == "Letters (Stamped)") {
        if(weight <= 1) {
            result = 0.55;
        } else if (weight > 1 && weight <= 2) {
            result = 0.70;
        } else if (weight > 2 && weight <= 3) {
            result = 0.85;
        } else if (weight > 3 && weight <= 3.5) {
            result = 1.00;
        } else if (weight > 3.5 && weight <= 4) {
            result = 1.45;
        } else if (weight > 4 && weight <= 5) {
            result = 1.60;
        } else if (weight > 5 && weight <= 6) {
            result = 1.75;
        } else if (weight > 6 && weight <= 7) {
            result = 1.90;
        } else if (weight > 7 && weight <= 8) {
            result = 2.05;
        } else if (weight > 8 && weight <= 9) {
            result = 2.20;
        } else if (weight > 9 && weight <= 10) {
            result = 2.35;
        } else if (weight > 10 && weight <= 11) {
            result = 2.50;
        } else if (weight > 11 && weight <= 12) {
            result = 2.65;
        } else if (weight > 12 && weight <= 13) {
            result = 2.80;
        } else {
            result = -1;
        }
    } else if (mailType == "Letters (Metered)") {
        if(weight <= 1) {
            result = 0.50;
        } else if (weight > 1 && weight <= 2) {
            result = 0.65;
        } else if (weight > 2 && weight <= 3) {
            result = 0.80;
        } else if (weight > 3 && weight <= 3.5) {
            result = 0.95;
        } else if (weight > 3.5 && weight <= 4) {
            result = 1.45;
        } else if (weight > 4 && weight <= 5) {
            result = 1.60;
        } else if (weight > 5 && weight <= 6) {
            result = 1.75;
        } else if (weight > 6 && weight <= 7) {
            result = 1.90;
        } else if (weight > 7 && weight <= 8) {
            result = 2.05;
        } else if (weight > 8 && weight <= 9) {
            result = 2.20;
        } else if (weight > 9 && weight <= 10) {
            result = 2.35;
        } else if (weight > 10 && weight <= 11) {
            result = 2.50;
        } else if (weight > 11 && weight <= 12) {
            result = 2.65;
        } else if (weight > 12 && weight <= 13) {
            result = 2.80;
        } else {
            result = -1;
        }
    } else if (mailType == "Large Envelopes (Flats)") {
        if(weight <= 1) {
            result = 1.00;
        } else if (weight > 1 && weight <= 2) {
            result = 1.15;
        } else if (weight > 2 && weight <= 3) {
            result = 1.30;
        } else if (weight > 3 && weight <= 4) {
            result = 1.45;
        } else if (weight > 4 && weight <= 5) {
            result = 1.60;
        } else if (weight > 5 && weight <= 6) {
            result = 1.75;
        } else if (weight > 6 && weight <= 7) {
            result = 1.90;
        } else if (weight > 7 && weight <= 8) {
            result = 2.05;
        } else if (weight > 8 && weight <= 9) {
            result = 2.20;
        } else if (weight > 9 && weight <= 10) {
            result = 2.35;
        } else if (weight > 10 && weight <= 11) {
            result = 2.50;
        } else if (weight > 11 && weight <= 12) {
            result = 2.65;
        } else if (weight > 12 && weight <= 13) {
            result = 2.80;
        } else {
            result = -1;
        }
    } else if (mailType == "First-Class Package Service—Retail") {
        if (weight >= 1 && weight <= 4) {
            result = 3.66;
        } else if (weight > 4 && weight <= 8) {
            result = 4.39;
        } else if (weight > 8 && weight <= 13) {
            result = 5.19;
        } else if (weight > 12 && weight <= 13) {
            result = 5.71;
        } else {
            result = -1;
        }
    } else {
        result = -1;
    }

    const params = {wt: weight, type: mailType, rate: result};

    response.render('pages/result', params);
}