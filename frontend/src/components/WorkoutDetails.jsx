import PropTypes from 'prop-types';

const WorkoutDetails = ({ workout }) => {
  if (!workout) return null; // Prevent rendering if workout is null

  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <p><strong>Load (kg): </strong>{workout.load}</p>
      <p><strong>Number of reps: </strong>{workout.reps}</p>
      {workout.createdAt && (
        <p>{new Date(workout.createdAt).toLocaleString()}</p>
      )}
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
