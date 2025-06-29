import mongoose from "mongoose";

export const connectDB = () => {
  mongoose
    .connect(
 "mongodb+srv://aftab7t7:pTssJ4nGDHtEI4dL@cluster0.zzaxhxe.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    )
    .then((c) => console.log(`DB Connected to ${c.connection.host}`))
    .catch((err) => {
      console.log(err);
    });
};
