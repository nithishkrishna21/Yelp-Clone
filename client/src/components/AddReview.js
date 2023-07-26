import React, { useState } from 'react'
import RestaurantFinder from '../apis/RestaurantFinder';
import { useParams } from 'react-router-dom';

const AddReview = (props) => {

    const {id} = useParams();
    console.log(id);

    const customStyle = {
        paddingLeft: 10,
        paddingBottom: 5,
        paddingTop: 5, 
    }

    const [name, setName] = useState("");
    const [rating, setRating] = useState("");
    const [reviewText, setReviewText] = useState("");

    const handleSubmitReview = async (e) => {
        e.preventDefault();
        const response = await RestaurantFinder.post(`/${id}/addReview`, {
            name: name,
            review: reviewText,
            rating: rating
        })

        // console.log(response);
        window.location.reload();
    }

    return (
        <div className='mb-2 '>
            <form>
                <div className='form-group col-8'>
                    <label style={customStyle} htmlFor="name">Name</label>
                    <input value={name} onChange={(e) => {setName(e.target.value)}} type="text" className="form-control m-2" id="name"></input>
                </div>

                <div className='form-group col-8'>
                    <label style={customStyle} htmlFor="rating">Rating</label>
                    <select 
                        id="rating"
                        value={rating}
                        onChange={(e) => {setRating(e.target.value)}}
                        className='form-select m-2'>
                            <option value="1" defaultValue>1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                    </select>
                </div>

                <div className='form-group col-8'>
                    <label style={customStyle} htmlFor='Review'>Review</label>
                    <textarea value={reviewText} onChange={(e) => {setReviewText(e.target.value)}} style={{marginTop: 10, marginLeft: 10}}id='Review' className='form-control'></textarea>
                </div>

                <button type="submit" onClick={handleSubmitReview} style={{marginTop: 20, marginLeft: 7}} className='btn btn-primary'>Submit</button>
            </form>
        </div>
    )
}

export default AddReview