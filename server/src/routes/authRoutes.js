import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

const users = [
  {
    id: 'u-admin',
    name: 'Aisha Rahman',
    email: 'admin@college.edu',
    password: bcrypt.hashSync('admin123', 10),
    role: 'ADMIN',
  },
  {
    id: 'u-faculty',
    name: 'Rahul Sharma',
    email: 'teacher@college.edu',
    password: bcrypt.hashSync('teacher123', 10),
    role: 'FACULTY',
  },
  {
    id: 'u-student',
    name: 'Meher Khan',
    email: 'student@college.edu',
    password: bcrypt.hashSync('student123', 10),
    role: 'STUDENT',
  },
];

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = users.find((entry) => entry.email.toLowerCase() === email.toLowerCase());

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  const token = jwt.sign({ id: user.id, email: user.email, role: user.role, name: user.name }, process.env.JWT_SECRET || 'devsecret', { expiresIn: '8h' });

  res.json({
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});

router.get('/me', authenticate, (req, res) => {
  const match = users.find((user) => user.id === req.user.id);
  if (!match) return res.status(404).json({ message: 'User not found' });

  res.json({
    id: match.id,
    name: match.name,
    email: match.email,
    role: match.role,
  });
});

export default router;
