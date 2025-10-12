import bcrypt from 'bcrypt';
import { getUserByEmail, createUser } from '../repositories/userRepository.js';

export const registerUser = async (email, password) => {
  // gọi 1 resposi check xem email, đã tồn tại chưa nếu có gửi lỗi về lại client
  const existingUser = await getUserByEmail(email);
  if (existingUser) throw new Error('Email đã tồn tại');

  // chưa tồn tại , gửi thông tin và thông báo về controllers
  const hashedPassword = await bcrypt.hash(password, 10);

  // gọi 1 resposi để lưu vào database
  const newUser = await createUser({ email, password: hashedPassword });

  return {
    message: 'Đăng ký thành công',
    user: { id: newUser.id, email: newUser.email }
  };
};