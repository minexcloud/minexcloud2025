module.exports = {
  mongoURI: process.env.MONGO_URI || 'mongodb://localhost:27017/minexcloud',
  jwtSecret: process.env.JWT_SECRET || 'supersecretkey',
};
