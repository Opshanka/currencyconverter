const express = require("express");
const cors = require("cors");
const axios = require('axios')

const app = express();

//middlewares
app.use(express.json());
app.use(cors());

//all currencies
app.get("/getAllCurrencies", async (req, res) => {
    const namesUrl = "https://openexchangerates.org/api/currencies.json?prettyprint=false&show_alternative=false&show_inactive=false&app_id=06114aadc7604cc8b216e7bc19488a24"

    try {
        const namesResponse = await axios.get(namesUrl);
        const nameData = namesResponse.data;
        return res.json(nameData);
    } catch (error) {
        console.error(error)
    }
});

//get the target amount
app.get("/convert", async (req, res) => {
    const { date,
        sourceCurrency,
        targetCurrency,
        amountSourceCurrency } = req.query;
    const namesUrl = `https://openexchangerates.org/api/historical/${date}.json?app_id=dca16a93572c42aca2b4d21d0d567cb5`
    try {
        const dataResponse = await axios.get(namesUrl);
        const rates = dataResponse.data.rates;

        const sourceRate = rates[sourceCurrency];
        const targetRate = rates[targetCurrency];

        const targetAmount = (targetRate / sourceRate) * amountSourceCurrency;
        return res.json(targetAmount.toFixed(2));

    } catch (error) {
        console.error(error)
    }
});

//listen to a port
app.listen(3000, () => {
    console.log("SERVER STARTED");
});

// "AED": 3.672914,
//     "AFN": 48.337601,

// x = (ERN/AED) * 3.672975;


