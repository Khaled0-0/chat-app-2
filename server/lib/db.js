import mongoose from 'mongoose';






export const connectDB = async () => {

   if (mongoose.connection.readyState === 1) {
      console.log(`Database already connected`);
   } else {
      console.log(`Database not connected`);
   }

   try {
      mongoose.connection.on(`connected`, () => console.log(`Database connected`));
      await mongoose.connect(`${process.env.MONGODB_URI}/chat-app`);

   } catch (error) {
      console.error(`MongoDB connectionError: ${error.message}`);

   }
};