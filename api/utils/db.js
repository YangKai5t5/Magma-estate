import mongoose from "mongoose";

export const connectDB = () => {
  mongoose
    .connect(
  "mongodb+srv://aftab7t7:fatblood@cluster0.kp2a8.mongodb.net/MCAminiproject?retryWrites=true&w=majority&appName=Cluster0"
    )
    .then((c) => console.log(`DB Connected to ${c.connection.host}`))
    .catch((err) => {
      console.log(err);
    });
};
