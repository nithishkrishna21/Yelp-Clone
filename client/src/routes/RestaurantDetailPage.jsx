import React, { useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import RestaurantFinder from '../apis/RestaurantFinder';
import { RestaurantsContext } from '../context/RestaurantContext';
import Reviews from '../components/Reviews';
import AddReview from '../components/AddReview';
import { StarRating } from '../components/StarRating';

const RestaurantDetailPage = () => {

  const {id} = useParams();
  const {selectedRestaurant, setSelectedRestaurant} = useContext(RestaurantsContext);

  useEffect(() => {
    const fetchData = async () => {
      try{
        const response = await RestaurantFinder.get(`/${id}`);

        console.log(response.data.data);
        setSelectedRestaurant(response.data.data);
      }
      catch(err){
        console.log(err);
      }
    }

    fetchData();
  }, [])
  return (
    <div>
      {selectedRestaurant && (
        <>
          <h2 className="font-weight-light display-1 text-center">{selectedRestaurant.restaurant[0].name}</h2>
          <div className='text-center'>
            <StarRating rating={selectedRestaurant.restaurant[0].average_rating}/>
            <span className='text-warning ml-1'>
              {selectedRestaurant.restaurant[0].count
                ? ` (${selectedRestaurant.restaurant[0].count})`
                : " 0"}
            </span>
          </div>
          <div className='mt-3'>
            <Reviews reviews={selectedRestaurant.reviews}/>
          </div>
          <AddReview/>
        </>
      )}
    </div>
  )
}

export default RestaurantDetailPage;