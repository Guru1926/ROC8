import express from 'express';
import cors from 'cors';
const port = process.env.PORT || 3005;
 import {connect} from "./db/connect.js"
import userRouter from "./routes/user.routes.js"
import analyticsRouter from "./routes/analytics.routes.js"

const app = express();
app.use(express.json());
app.use(cors());
app.use("/user", userRouter);
app.use("/analytics",analyticsRouter );


(async () => {
    try {
      await connect(); // Connect to MongoDB
      // Start your server after successful connection
      const PORT = process.env.PORT || port;
      app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
      });
    } catch (error) {
      console.error("Failed to start server due to database connection error:", error);
    }
  })();