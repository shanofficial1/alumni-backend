import 'dotenv/config';
import app from './src/app.js';
import connectDB from './src/config/db.js';

const port = Number(process.env.PORT || 5000);

try {
  await connectDB();

  app.listen(port, '0.0.0.0', () => {
    console.log(`Alumni V1 API listening on port ${port}`);
    console.log(`Local: http://localhost:${port}`);
    console.log(`Network: http://192.168.220.36:${port}`);
  });
} catch (error) {
  console.error('Server startup failed:', error.message);
  process.exit(1);
}