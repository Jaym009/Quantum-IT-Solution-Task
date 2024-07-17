import React, {useState, useEffect} from 'react'
import './user.css'
import {request} from '../../util/fetchApi'
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { FaTrash,FaEdit } from 'react-icons/fa';

const User = () => {
  const [userDetail, setUserDetail] = useState(null)

  useEffect(() => {
    
    fetchAllDetails();
}, []);

const fetchAllDetails = async () => {
  try {
      const data = await request('/auth/getAll', 'GET');
      setUserDetail(data); // Assuming `data` is an array of user details
  } catch (error) {
      console.log('Error fetching user details:', error);
  }
};

const handleDelete = async (userId) => {
  try {
      const token = localStorage.getItem('accessToken'); // Fetch JWT token from localStorage or sessionStorage
      const headers = {
          Authorization: `Bearer ${token}`,
      };

      // Make the DELETE request using your `request` function
      const response = await request(`/auth/${userId}`, headers, 'DELETE');
      
      // Check if response status is valid
      if (!response || response.status !== 204) {
          throw new Error('Delete request did not return a successful status');
      }

      // Log the delete response status
      console.log('Delete response:', response.status);

      // Fetch updated user details after successful delete
      fetchAllDetails();
  } catch (error) {
      console.log('Error deleting user:', error.message);
  }
};





  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toISOString().split('T')[0];
  };



  return (
    <div className="user-table-container">
            <h2>User Data</h2>
            <table className="user-table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Date of Birth</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {userDetail && userDetail.map((user, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>{formatDate(user.dateofbirth)}</td>
                            <td className="actions">
                                <button><FaEdit/></button>
                                <button onClick={() => handleDelete(user._id)}><FaTrash /></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
  )
}

export default User
