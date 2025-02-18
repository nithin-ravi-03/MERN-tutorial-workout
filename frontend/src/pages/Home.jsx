import { useEffect, useState } from "react"
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"
import {useAuthContext} from "../hooks/useAuthContext"

// components
import WorkoutForm from "../components/WorkoutForm"
import WorkoutDetails from "../components/WorkoutDetails"

const Home = () => {
  const { workouts, dispatch } = useWorkoutsContext()
  const{user}=useAuthContext()

  useEffect(() => {
    const fetchWorkouts = async () => {
        const response = await fetch('http://localhost:5000/api/workouts',{
          headers:{
            'Authorization': `Bearer ${user.token}`
          },
        });
        
        const json = await response.json(); // Parse JSON data
        console.log(json); // Log the parsed data
        if (response.ok){
          dispatch({type:'SET_WORKOUTS',payload:json})
        }
    }
    if(user){
      fetchWorkouts()
    }

}, [dispatch,user])

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