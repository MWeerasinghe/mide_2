import { jwtDecode } from 'jwt-decode';

// Function to get user ID from token
const getUserIdFromToken = () => {
  const token = localStorage.getItem("vajira_token"); // Get token from localStorage
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

export default getUserIdFromToken;
