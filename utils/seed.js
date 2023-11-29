const mongoose = require('mongoose');
const casual = require('casual');
const { User, Thought } = require('../models');
const db = require('../config/connection');

// A simple shuffle function using the Fisher-Yates algorithm
function shuffle(array) {
  let currentIndex = array.length, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
}

const seedData = async () => {
  await db.once('open', async () => {
    console.log('Connected to the database.');

    await User.deleteMany({});
    await Thought.deleteMany({});

    // Create 10 unique users using casual package to generate random data
    let users = [];
    for (let i = 0; i < 10; i++) {
      const username = casual.username;
      const email = casual.email;
      const user = new User({ username, email });
      await user.save();  // Save to get an _id for reference
      users.push(user);
    }

    // Create unique thoughts for each user
    let thoughts = [];
    for (const user of users) {
      for (let i = 0; i < 3; i++) {
        const thoughtText = casual.sentences(casual.integer(1, 3)); // Generate 1 to 3 sentences
        const thought = new Thought({
          thoughtText,
          username: user.username,
        });
        await thought.save(); // Save each thought to get an _id
        thoughts.push(thought);
        user.thoughts.push(thought._id); // Assign thought's _id to user's thoughts array
      }
      await user.save(); // Save the user's updated thoughts array
    }

    // Assign friends - each user will have a random subset of other users as friends
    for (const user of users) {
      const friendIds = users.filter(u => u._id.toString() !== user._id.toString())
                             .map(u => u._id);
      // Shuffle and select a random number of friends
      user.friends = shuffle(friendIds).slice(0, Math.floor(Math.random() * friendIds.length));
      await user.save();
    }

    console.log('Database seeded!');
    process.exit(0);
  });
};

seedData().catch(console.error);
