import { jwtDecode } from 'jwt-decode';

// Function to get user ID from token
const getTeacherIdFromToken = () => {
  const token = localStorage.getItem("vajira_token_teacher"); // Get token from localStorage
  if (!token) {
    return null; // Return null if no token is found
  }

  try {
    const decodedToken = jwtDecode(token); // Decode the token
    return decodedToken.id; // Return the user ID
  } catch (error) {
    console.error("Error decoding token:", error);
    return null; // Return null if token is invalid
  }
};

export default getTeacherIdFromToken;
