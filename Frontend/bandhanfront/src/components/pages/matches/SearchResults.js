import React from 'react';
import { useParams } from 'react-router-dom';

import { useSearchUsersQuery } from '../../../services/userAuthApi';




function SearchResults() {
  const { age_min, age_max, religion, mother_tongue } = useParams();

  const { data:users, error, isLoading } = useSearchUsersQuery({
    age_min,
    age_max,
    religion,
    mother_tongue,
  });
  
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const profilePictureStyle = {
    width: '150px', 
    height: '150px',
    //borderRadius: '50%', 
    objectFit: 'cover', 
  };

  return (
    <div>
      {users.map((user) => (
        <div key={user.id}>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <p>Date of Birth: {user.date_of_birth}</p>
          
          {user.profile_picture && (
            <img style={profilePictureStyle} src={user.profile_picture} alt={`${user.name}'s profile`} />
          )}
        </div>
      ))}
    </div>
  );
}

export default SearchResults;
