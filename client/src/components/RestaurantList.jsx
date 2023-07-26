import React, {useEffect, useContext} from 'react'
import RestaurantFinder from '../apis/RestaurantFinder';
import { RestaurantsContext } from '../context/RestaurantContext';
import { useNavigate } from 'react-router-dom';
import { StarRating } from './StarRating';

const customStyle = {
    "paddingTop": 15,
    "paddingLeft": 8,
    "paddingRight": 12
}

const RestaurantList = () => {

    const {restaurants, setRestaurants, deleteRestaurant} = useContext(RestaurantsContext);

    let navigate = useNavigate();

    useEffect(() => {

        const fetchData = async () => {
            try{
                const response = await RestaurantFinder.get("/");
                // console.log(response.data.data.restaurant);
                setRestaurants(response.data.data.restaurant);
            }
            catch(err){
                console.log(err);
            } 
        }  

        fetchData();
    }, []);

    const handleDelete = async (e, id) => {
        e.stopPropagation();
        try{
            const response = await RestaurantFinder.delete(`/${id}`);
            console.log(response);
            deleteRestaurant(id);
        }
        catch(err){
            console.log(err);
        }
    }

    const handleUpdate = (e, id) => {
        e.stopPropagation();
        navigate(`/restaurants/${id}/update`);
    }

    const handleRestaurantSelect = (id) => {
        navigate(`/restaurants/${id}`);
    }

    const renderRating = (restaurant) => {
        if(!restaurant.count){
            return (
                <span className='text-warning'>0 reviews</span>
            )
        }
        return (
            <>
                <StarRating rating={restaurant.average_rating}/>
                <span className='text-warning ml-1'>({restaurant.count})</span>
            </>
        )
        
    }

    return (
    <div style={customStyle}>
        <table className="table table-dark table-hover">
            <thead>
                <tr className="table-primary">
                    <th scope="col">Restauarnt</th>
                    <th scope="col">Location</th>
                    <th scope="col">Price Range</th>
                    <th scope="col">Rating</th>
                    <th scope="col">Edit</th>
                    <th scope="col">Delete</th>
                </tr>
            </thead>
            <tbody>
                {restaurants.map((restaurant) => {
                    return (
                        <tr key={restaurant.id} onClick={() => {handleRestaurantSelect(restaurant.id)}}>
                            <td>{restaurant.name}</td>
                            <td>{restaurant.location}</td>
                            <td>{"$".repeat(restaurant.price_range)}</td>
                            <td>{renderRating(restaurant)}</td>
                            <td><button onClick={(e) => {handleUpdate(e, restaurant.id)}} className='btn btn-warning btn-sm'> Edit </button></td>
                            <td><button onClick={(e) => {handleDelete(e, restaurant.id)}} className='btn btn-danger btn-sm'> Delete </button></td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    </div>
    )
}

export default RestaurantList;
