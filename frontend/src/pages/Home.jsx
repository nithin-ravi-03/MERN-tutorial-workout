import { useEffect, useState } from "react"
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"
// components
import WorkoutForm from "../components/WorkoutForm"
import WorkoutDetails from "../components/WorkoutDetails"

const Home = () => {
  const { workouts, dispatch } = useWorkoutsContext()

  useEffect(() => {
    const fetchWorkouts = async () => {
        const response = await fetch('http://localhost:5000/api/workouts');
        
        if (!response.ok) {
            console.error('Failed to fetch workouts');
            return;
        }
        
        const json = await response.json(); // Parse JSON data
        console.log(json); // Log the parsed data
        if (response.ok){
          dispatch({type:'SET_WORKOUTS',payload:json})
        }
    };

    fetchWorkouts();
}, [dispatch]);

  return (
    <div className="home">
      <div className="workouts">
        {workouts && workouts.map(workout => (
          <WorkoutDetails workout={workout} key={workout._id} />
        ))}
      </div>
      <WorkoutForm/>
    </div>
  )
}

export default Home