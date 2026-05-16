// Script to seed demo users for BookMyDoc
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from './model/userModel.js';
import Doctor from './model/doctorModel.js';
import mongoose from 'mongoose';

import connectDB from './config/mongodb.js';


// const User = require('./model/userModel');

dotenv.config();

const seedUsers = async () => {
  await connectDB();

  const users = [
    {
      name: 'Himanshu',
      email: 'himanshu@email.com',
      password: await bcrypt.hash('password123', 10),
      role: 'patient',
    }
  ];
  // (No admin seeding included)

  // Seed doctor in Doctor collection
  const doctors = [
    {
      name: 'Dr. Himanshu',
      email: 'dr.himanshu@galaxy.com',
      password: await bcrypt.hash('password123', 10),
      speciality: 'Cardiologist',
      degree: 'MBBS, MD',
      experience: '10 years',
      about: 'Experienced cardiologist.',
      fees: 800,
      address: { line1: 'Apollo Hospital, Delhi', line2: '' },
      date: Date.now(),
      available: true
    }
  ];

  for (const user of users) {
    const exists = await User.findOne({ email: user.email });
    if (!exists) {
      await User.create(user);
      console.log(`Created user: ${user.email}`);
    } else {
      console.log(`User already exists: ${user.email}`);
    }
  }

  // Seed doctors
  for (const doc of doctors) {
    const exists = await Doctor.findOne({ email: doc.email });
    if (!exists) {
      await Doctor.create(doc);
      console.log(`Created doctor: ${doc.email}`);
    } else {
      console.log(`Doctor already exists: ${doc.email}`);
    }
  }

  mongoose.connection.close();
};

seedUsers();
