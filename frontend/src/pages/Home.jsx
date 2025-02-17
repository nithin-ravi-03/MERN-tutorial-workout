import { useEffect, useState } from "react"

// components
import WorkoutDetails from "../components/WorkoutDetails"

const Home = () => {
  const [workouts, setWorkouts] = useState(null)

  useEffect(() => {
    const fetchWorkouts = async () => {
        const response = await fetch('http://localhost:5000/api/workouts');
        
        if (!response.ok) {
            console.error('Failed to fetch workouts');
            return;
        }

        const json = await response.json(); // Parse JSON data
        console.log(json); // Log the parsed data

        setWorkouts(json);
    };

    fetchWorkouts();
}, []);

  return (
    <div className="home">
      <div className="workouts">
        {workouts && workouts.map(workout => (
          <WorkoutDetails workout={workout} key={workout._id} />
        ))}
      </div>
    </div>
  )
}

export default Home