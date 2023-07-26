// queries

// get all restaurants
const getAllRestaurants = "SELECT * FROM restaurants";

// get one restaurant
const getRestaurant = "SELECT * FROM restaurants where id = $1";

// create a restaurant
const createRestaurant = "INSERT INTO restaurants (name, location, price_range) VALUES ($1, $2, $3) RETURNING *";

// update a restaurant
const updateRestaurant = "UPDATE restaurants SET name = $1, location = $2, price_range = $3 WHERE id = $4 RETURNING *";

// delete a restaurant
const deleteRestaurant = "DELETE FROM restaurants where id = $1";

// get reviews of a restairant
const getReviewsOfRestaurant = "SELECT * FROM reviews where restaurant_id = $1";

// add a review
const addReview = "INSERT INTO reviews (restaurant_id, name, review, rating) VALUES ($1, $2, $3, $4) RETURNING *";

// get ratings data of all restaurants
const getAllRestaurantsRatingsData = "SELECT * FROM restaurants left join (select restaurant_id, COUNT(rating), TRUNC(AVG(rating), 1) AS average_rating FROM reviews GROUP BY restaurant_id) reviews ON restaurants.id = reviews.restaurant_id";

// get ratings data of a restaurant
const getRestaurantRatingsData = "SELECT * FROM restaurants left join (select restaurant_id, COUNT(rating), TRUNC(AVG(rating), 1) AS average_rating FROM reviews GROUP BY restaurant_id) reviews ON restaurants.id = reviews.restaurant_id WHERE id = $1";

module.exports = {
    getAllRestaurants,
    getAllRestaurantsRatingsData,
    getRestaurant,
    getRestaurantRatingsData,
    getReviewsOfRestaurant,
    createRestaurant,
    addReview,
    updateRestaurant,
    deleteRestaurant,
}