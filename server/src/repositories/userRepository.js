import { User } from '../models/User.js';

export const getUserByEmail = async (email) => {
  try{
    const result = await User.find(email)
    if(result){
        return true
    }else{
        return false
    }
  }catch(error){
    return(error)
  }
};

export const createUser = async (  email, password ) => {
  const newUser = new User({email,password})
  await newUser.save();
  return newUser
};