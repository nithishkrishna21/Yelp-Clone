import React from 'react'
import { StarRating } from './StarRating'

const Reviews = (props) => {

    // console.log("Printing reviews", props.reviews);

    const customStyle = {
        maxWidth: "30%", 
        marginLeft: 20, 
        marginTop: 10
    }

    return (
        <div className='row row-cols-3 mb-2'>
            {props.reviews.map((review) => {
                return (
                    <div key={review.id} className="card text-white bg-primary mb-3" style={customStyle}>
                        <div className="card-header d-flex justify-content-between">
                            <span>{review.name}</span>
                            <span><StarRating rating={review.rating}/></span>
                        </div>
                        <div className="card-body">
                            <p className="card-text">{review.review}</p>
                        </div>
                    </div>
                )
            })}
            {/* <div className="card text-white bg-primary mb-3" style={customStyle}>
                <div className="card-header d-flex justify-content-between">
                    <span>Joan</span>
                    <span><StarRating rating={4}/></span>
                </div>
                <div className="card-body">
                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                </div>
            </div> */}
        </div>
    )
}

export default Reviews