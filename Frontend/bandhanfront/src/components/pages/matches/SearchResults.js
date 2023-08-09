import React from 'react';
import { useParams } from 'react-router-dom';

import { useSearchUsersQuery } from '../../../services/userAuthApi';




function SearchResults() {
  const { age_min, age_max, religion, gender } = useParams();

  const { data:users, error, isLoading } = useSearchUsersQuery({
    age_min,
    age_max,
    religion,
    gender,
  });
  
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const profilePictureStyle = {
    width: '200px', 
    height: '200px',
    //borderRadius: '50%', 
    objectFit: 'cover', 
  };
  console.log("profile picture is",users)

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {users.map((user) => (
        <div key={user.id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
            <img
            style={profilePictureStyle}
            src={`http://127.0.0.1:8000${user.profile_picture}`}
            alt={`${user.name}'s profile`}
          />

          <p>{user.name} , {user.date_of_birth} Years , {user.religion}</p>
          {/* <p>{user.gender}     </p> */}
         
        </div>
      ))}
    </div>
  );
}

export default SearchResults;
