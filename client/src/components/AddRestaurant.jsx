import React, { useState, useContext } from 'react'
import RestaurantFinder from '../apis/RestaurantFinder'
import { RestaurantsContext } from '../context/RestaurantContext'

const customStyle = {
    "paddingRight": 20
}

const AddRestaurant = () => {

    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [priceRange, setPriceRange] = useState("Price Range");
    // const { restaurants, setRestaurants} = useContext(RestaurantsContext);
    const { addRestaurants } = useContext(RestaurantsContext);

    const handleClick = async function(e){

        e.preventDefault();
        const response = await RestaurantFinder.post("/", {
            name: name,
            location: location,
            price_range: priceRange
        })

        const newRestaurant = response.data.data.restaurant;
        // above result is an ARRAY of JSON OBJECTS, NOT A JSON OBJECT
        
        // const newRestaurant = {
        //     name: name,
        //     location: location,
        //     price_range: priceRange
        // }
        // console.log(newRestaurant);
        // console.log(typeof(newRestaurant));
        // console.log([...restaurants, ...newRestaurant]);
        addRestaurants(newRestaurant);
    }

    return (
        <div style={customStyle}>
            <div className='row'>
                <div className='form-group col'>
                    <input 
                    value={name}
                    onChange = {e => setName(e.target.value)}
                    className='form-control m-2' type='text' placeholder='Name'>
                    </input>
                </div>

                <div className='form-group col'>
                    <input 
                    value={location}
                    onChange={e => setLocation(e.target.value)}
                    className='form-control m-2' type='text' placeholder='Location'>
                    </input>
                </div>

                <div className='form-group col'>
                    <select 
                    value={priceRange} 
                    onChange={e => setPriceRange(e.target.value)} 
                    className='form-select m-2'>
                        <option defaultValue>Price Range</option>
                        <option value="1">$</option>
                        <option value="2">$$</option>
                        <option value="3">$$$</option>
                        <option value="4">$$$$</option>
                        <option value="5">$$$$$</option>
                    </select>
                </div>

                <div className="form-group col">
                    <button onClick={handleClick} type="submit" className="btn btn-primary form-control m-2">Add</button>
                </div>
            </div>
        </div>
    )
}

export default AddRestaurant