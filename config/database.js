const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/calorie', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  family: 4
});

const db = mongoose.connection;

db.on('connected', () => {
  console.log(`Connected to MongoDB at ${db.host}:${db.port}`);
}); 