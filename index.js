const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const app = express();

const dataSource = require("./db/db");

app.set("view engine", "ejs");

//Middleware to parse JSON request bodies
app.use(bodyParser.json());
app.use(express.static("public"));

const PORT = 4000;


app.get("/fetch-data", async (req, res) => {
    try {

        const response = await axios.get("https://api.wazirx.com/api/v2/tickers");

        const results = response.data;
        const first10Members = Object.entries(results)
    .slice(0, 10)
    .reduce((obj, [key, value]) => {
        obj[key] = value;
        return obj;
    }, {});

    const resultRepo = dataSource.getRepository('Result');
    if(await resultRepo.find()){
        await resultRepo.delete({});
    }
        for(const result in first10Members){
            
            const singleResult = first10Members[result];
        const resultSave = {
            name: singleResult.name,
            last: singleResult.last,
            buy: singleResult.buy,
            sell: singleResult.sell,
            volume: singleResult.volume,
            base_unit: singleResult.base_unit
        }
        await resultRepo.save(resultSave);
        }
        
        res.redirect("/");
    } catch (err) {
        console.error('Error fetching and storing data:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
})
app.get('/', async (req, res) => {
    try {
      const resultRepo = dataSource.getRepository('Result');
      const allResult = await resultRepo.find();

      res.render("index",{results:allResult});
    } catch (error) {
      console.error('Error fetching books:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });



dataSource
    .initialize()
    .then(() => {
        console.log('Database Connected');
        app.listen(PORT, () => {
            console.log(`App is running on Port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error('Error initializing database:', err);
    });