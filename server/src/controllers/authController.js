import { registerUser } from '../services/authService.js';

export const register = async (req, res) => {
  try {
    const { email, password } = req.body;
    // gửi data về services xử lý rồi nhận kết quả
    const result = await registerUser(email, password);

    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message || 'Đăng ký thất bại' });
  }
};