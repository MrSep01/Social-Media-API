const router = require('express').Router();
const { User, Thought } = require('../models');

// GET all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find({});
    res.json({ message: 'Successfully retrieved all users', data: users });
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving users', error: err.message });
  }
});

// GET a single user by ID
router.get('/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).populate('thoughts').populate('friends');
    if (!user) {
      return res.status(404).json({ message: 'No user found with this id!' });
    }
    res.json({ message: 'User found successfully', data: user });
  } catch (err) {
    res.status(500).json({ message: 'Error finding user', error: err.message });
  }
});

// POST a new user
router.post('/', async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.json({ message: 'User created successfully', data: newUser });
  } catch (err) {
    res.status(500).json({ message: 'Error creating user', error: err.message });
  }
});

// PUT to update a user by ID
router.put('/:userId', async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: 'No user found with this id to update!' });
    }
    res.json({ message: 'User updated successfully', data: updatedUser });
  } catch (err) {
    res.status(500).json({ message: 'Error updating user', error: err.message });
  }
});

// DELETE a user by ID
router.delete('/:userId', async (req, res) => {
  try {
    const userToDelete = await User.findByIdAndDelete(req.params.userId);
    if (!userToDelete) {
      return res.status(404).json({ message: 'No user found with this id to delete!' });
    }
    // Bonus: Remove user's associated thoughts
    await Thought.deleteMany({ username: userToDelete.username });
    res.json({ message: 'User and associated thoughts deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting user', error: err.message });
  }
});

// GET to get all friends of a user
router.get('/:userId/friends', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).populate('friends');
    if (!user) {
      return res.status(404).json({ message: 'No user found with this id to retrieve friends!' });
    }
    res.json({ message: 'Friends list retrieved successfully', data: user.friends });
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving friends list', error: err.message });
  }
});

// POST to add a new friend to a user's friend list (URL version)
router.post('/:userId/friends/:friendId', async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      { $addToSet: { friends: req.params.friendId } },
      { new: true }
    );
    res.json({ message: 'Friend added successfully', data: updatedUser });
  } catch (err) {
    res.status(500).json({ message: 'Error adding friend', error: err.message });
  }
});

// POST to add a new friend to a user's friend list (Body version)
router.post('/:userId/friends', async (req, res) => {
  try {
    const { friendId } = req.body; // Extracting friendId from request body

    if (!friendId) {
      return res.status(400).json({ message: 'Friend ID is required in the request body.' });
    }

    // Check if the friend ID corresponds to an existing user
    const friendExists = await User.exists({ _id: friendId });
    if (!friendExists) {
      return res.status(404).json({ message: 'Friend user not found.' });
    }

    // Update the user document by adding the friend's ID to their friends array
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      { $addToSet: { friends: friendId } }, // Use $addToSet to avoid duplicate entries
      { new: true, runValidators: true } // Return the updated document and run schema validators
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found.' });
    }

    res.json({ message: 'Friend added successfully', data: updatedUser });
  } catch (err) {
    res.status(500).json({ message: 'Error adding friend', error: err.message });
  }
});


// DELETE to remove a friend from a user's friend list
router.delete('/:userId/friends/:friendId', async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      { $pull: { friends: req.params.friendId } },
      { new: true }
    );
    res.json({ message: 'Friend removed successfully', data: updatedUser });
  } catch (err) {
    res.status(500).json({ message: 'Error removing friend', error: err.message });
  }
});

// DELETE to remove a friend from a user's friend list (Body version)
router.delete('/:userId/friends', async (req, res) => {
  try {
    const { friendId } = req.body; // Extracting friendId from request body

    if (!friendId) {
      return res.status(400).json({ message: 'Friend ID is required in the request body.' });
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      { $pull: { friends: friendId } },
      { new: true }
    );
    res.json({ message: 'Friend removed successfully', data: updatedUser });
  } catch (err) {
    res.status(500).json({ message: 'Error removing friend', error: err.message });
  }
});

module.exports = router;
