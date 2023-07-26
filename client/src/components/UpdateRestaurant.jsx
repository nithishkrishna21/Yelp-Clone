import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import RestaurantFinder from '../apis/RestaurantFinder';

const UpdateRestaurant = (props) => {

    const customStyle = {
        paddingLeft: 10,
        paddingBottom: 5,
        paddingTop: 5, 
    }
  
    const {id} = useParams();
    console.log(id);

    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [priceRange, setPriceRange] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            const response = await RestaurantFinder.get(`/${id}`);
            console.log(response.data.data.restaurant);
            setName(response.data.data.restaurant[0].name);
            setLocation(response.data.data.restaurant[0].location);
            setPriceRange(response.data.data.restaurant[0].price_range);
        }

        fetchData();
    }, [])

    let navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await RestaurantFinder.put(`/${id}`, {
            name: name,
            location: location,
            price_range: priceRange
        });
        console.log(response.data.data.restaurant);
        navigate("/");
    }

    return (
        <form>
            <div className='form-group'>
                <label style={customStyle} htmlFor="name">Name</label>
                <input value={name} onChange={e => setName(e.target.value)} type="text" className="form-control m-2" id="name"></input>
            </div>

            <div className='form-group'>
                <label style={customStyle} htmlFor="location">Location</label>
                <input  value={location} onChange={e => setLocation(e.target.value)} type="text" className="form-control m-2" id="location"></input>
            </div>

            <div className='form-group'>
                <label style={customStyle} htmlFor="price_range">Price Range</label>
                <select 
                    id="price_range"
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

            <button type="submit" onClick={handleSubmit} style={{marginTop: 10, marginLeft: 7}} className='btn btn-primary'>Submit</button>
        </form>
    )
}

export default UpdateRestaurant