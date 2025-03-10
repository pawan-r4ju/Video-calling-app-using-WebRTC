// server/server.js
import dotenv from 'dotenv';
import './utils/socketUtils.js'; // Import Socket.IO logic
import server from './app.js';

// Load environment variables
dotenv.config();

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});