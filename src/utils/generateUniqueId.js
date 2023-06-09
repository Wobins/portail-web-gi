const generateUniqueId = () => {
    const timestamp = Date.now().toString(36); // Convert current time to base36 string
    const random = Math.random().toString(36).substring(2, 9); // Generate a random string
  
    return `${timestamp}-${random}`;
};

export default generateUniqueId;
  
  