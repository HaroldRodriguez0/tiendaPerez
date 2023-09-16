
import mongoose from 'mongoose';

export const dbConnection = async() => {
  try {

    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('DB Inline')
    
  } catch (error) {
    console.log(error);
    throw new Error('Error a la hora de inicializar DB')
  }
}

