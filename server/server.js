require('dotenv').config()
const express = require('express');
const db = require('./db');
const queries = require('./queries');
const cors = require('cors');

const morgan = require('morgan');

const app = express();
const port = process.env.PORT;

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

// get all restaurants
app.get("/api/v1/restaurants", async function (req, res){

    try{
        const result = await db.query(queries.getAllRestaurants)
        const restaurantsRatingsData = await db.query(queries.getAllRestaurantsRatingsData);

        // console.log(result.rows);
        console.log(restaurantsRatingsData.rows);
        res.status(200).json({
            status: "success",
            // results: result.rowCount,
            results: restaurantsRatingsData.rowCount,
            data: {
                // restaurant: result.rows
                restaurant: restaurantsRatingsData.rows
            }
        });
    }
    catch(err){
        console.log(err);
    }
});

// Get a restaurant
app.get("/api/v1/restaurants/:id", async function (req, res){
    try{
        // const restaurant = await db.query(queries.getRestaurant, [req.params.id]);
        const restaurant = await db.query(queries.getRestaurantRatingsData, [req.params.id]);
        console.log(restaurant.rows);

        const reviews = await db.query(queries.getReviewsOfRestaurant, [req.params.id]);
        console.log(reviews.rows);

        res.status(200).json({
            status: "Success",
            results: {
                restaurantCount: restaurant.rowCount,
                reviewCount: reviews.rowCount
            },
            data: {
                restaurant: restaurant.rows,
                reviews: reviews.rows
            }
        });
    }
    catch(err){
        console.log(err);
    }
});

// Create a restuarant
app.post("/api/v1/restaurants", async function (req, res){
    try{
        const {name, location, price_range} = req.body;
        const result = await db.query(queries.createRestaurant, [name, location, price_range]);
        console.log(result.rows);
        res.status(201).json({
            status: "Success",
            results: result.rowCount,
            data: {
                restaurant: result.rows
            }
        })
    }
    catch(err){
        console.log(err);
    }
});

// Update a restuarant
app.put("/api/v1/restaurants/:id", async function(req, res){
    try{
        const {name, location, price_range} = req.body;
        const result = await db.query(queries.updateRestaurant, [name, location, price_range, req.params.id]);
        res.status(200).json({
            status: "Success",
            results: result.rowCount,
            data: {
                restaurant: result.rows
            }
        });
    }
    catch (err){
        console.log(err);
    }
});

// Delete a restuarant
app.delete("/api/v1/restaurants/:id", async function(req, res){
    try{
        const result = await db.query(queries.deleteRestaurant, [req.params.id]);
        res.status(204).json({
            status: "Success",
            results: result.rowCount,
            data: {},
        })
    }
    catch(err){
        console.log(err);
    }
});


app.post("/api/v1/restaurants/:id/addReview", async (req, res) => {
    try{
        const {name, rating, review} = req.body;
        const result = await db.query(queries.addReview, [req.params.id, name, review, rating]);
        res.status(201).json({
            status: "Success",
            data: {
                reviews: result.rows, 
            }
        })
    }
    catch(err){
        console.log(err);
    }
});

app.listen(port, () => {
    console.log("Server is up and listening on port " + port);
});