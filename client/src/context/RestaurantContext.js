import React, {useState, createContext} from 'react';

export const RestaurantsContext = createContext();

export const RestaurantsContextProvider = (props) => {

    const [restaurants, setRestaurants] = useState([]);
    const [selectedRestaurant, setSelectedRestaurant] = useState(null);

    const addRestaurants = (newRestaurant) => {
        console.log("TO ADD\n", newRestaurant); // an array of JSON OBJECTS
        console.log("RESULT\n", [...restaurants, ...newRestaurant]);
        setRestaurants([...restaurants, ...newRestaurant]);
    }

    const deleteRestaurant = (id) => {
        setRestaurants(restaurants.filter((restaurant) => {
            return (restaurant.id !== id);
        }))
    }

    return (
        <RestaurantsContext.Provider value={
            {restaurants, setRestaurants, 
            addRestaurants, deleteRestaurant, 
            selectedRestaurant, setSelectedRestaurant}}>
            {props.children}
        </RestaurantsContext.Provider>
    )
}