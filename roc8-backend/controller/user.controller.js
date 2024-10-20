
import jwt from 'jsonwebtoken'
import User from '../model/user.model.js'
import bcryptjs from 'bcryptjs'


const  jwtTokenGenerator = (user) => {
  //delete the password from the token as anyone can see the user details from JWT token
  if (user.password) {
    delete user.password;
  }
  return jwt.sign(user, "roc8_analytics_dashboard_backend");
}

export const signup = async ({ name, email, password }) => {
  const isExistingEmail = await User.findOne({ email });
  if (isExistingEmail) {
    throw new Error("Email already exists !");
  }
  password = bcryptjs.hashSync(password);

  let user = await User.create({
    name,
    email,
    password,
  });
  user = user.toJSON();
  delete user.password;
  return user;
};

export const login = async ({ email, password }) => {
  const userData = await User.findOne({
    email,
  }).select("_id name email password");

  if (!userData) {
    throw new Error("Email not registered !");
  }
  const match = bcryptjs.compareSync(password, userData.password);

  if (!match) {
    throw new Error("Wrong password !");
  }
  const token = jwtTokenGenerator(userData.toJSON());
  return token;
};

