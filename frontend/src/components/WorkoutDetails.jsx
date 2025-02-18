import PropTypes from 'prop-types';
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'; 
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import {useAuthContext} from "../hooks/useAuthContext"


const WorkoutDetails = ({ workout }) => {
  const {dispatch} = useWorkoutsContext()
  const{user}=useAuthContext()
  if (!workout) return null; // Prevent rendering if workout is null
  
  const handleClick = async ()=>{
    if(!user){
      return
    }
    const response = await fetch('http://localhost:5000/api/workouts/'+ workout._id,{
      method: 'DELETE',
      headers:{
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()
    if (response.ok){
          dispatch({type:'DELETE_WORKOUT',payload:json})
    }

  }
  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <p><strong>Load (kg): </strong>{workout.load}</p>
      <p><strong>Number of reps: </strong>{workout.reps}</p>
      <p>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p>
      <span className="material-symbols-outlined" onClick={handleClick}>Delete</span>
    </div>
  );
};

// PropTypes validation
WorkoutDetails.propTypes = {
  workout: PropTypes.shape({
    title: PropTypes.string.isRequired,
    load: PropTypes.number.isRequired,
    reps: PropTypes.number.isRequired,
    createdAt: PropTypes.string, // Optional, to avoid errors if missing
  })
};

export default WorkoutDetails;
