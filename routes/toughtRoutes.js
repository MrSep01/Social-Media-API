const router = require('express').Router();
const { Thought, User } = require('../models');

// GET all thoughts
router.get('/', async (req, res) => {
  try {
    const thoughts = await Thought.find({});
    res.json({ message: 'Successfully retrieved all thoughts', data: thoughts });
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving thoughts', error: err.message });
  }
});

// GET a single thought by ID
router.get('/:thoughtId', async (req, res) => {
  try {
    const thought = await Thought.findById(req.params.thoughtId);
    if (!thought) {
      return res.status(404).json({ message: 'No thought found with this id!' });
    }
    res.json({ message: 'Thought found successfully', data: thought });
  } catch (err) {
    res.status(500).json({ message: 'Error finding thought', error: err.message });
  }
});

// POST to create a new thought
router.post('/', async (req, res) => {
  try {
    const newThought = await Thought.create(req.body);
    await User.findByIdAndUpdate(
      req.body.userId,
      { $push: { thoughts: newThought._id } },
      { new: true }
    );
    res.json({ message: 'Thought created successfully', data: newThought });
  } catch (err) {
    res.status(500).json({ message: 'Error creating thought', error: err.message });
  }
});

// PUT to update a thought by ID
router.put('/:thoughtId', async (req, res) => {
  try {
    const updatedThought = await Thought.findByIdAndUpdate(
      req.params.thoughtId,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedThought) {
      return res.status(404).json({ message: 'No thought found with this id to update!' });
    }
    res.json({ message: 'Thought updated successfully', data: updatedThought });
  } catch (err) {
    res.status(500).json({ message: 'Error updating thought', error: err.message });
  }
});

// DELETE a thought by ID
router.delete('/:thoughtId', async (req, res) => {
  try {
    const thoughtToDelete = await Thought.findByIdAndDelete(req.params.thoughtId);
    if (!thoughtToDelete) {
      return res.status(404).json({ message: 'No thought found with this id to delete!' });
    }
    res.json({ message: 'Thought deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting thought', error: err.message });
  }
});

// GET all reactions for a thought
router.get('/:thoughtId/reactions', async (req, res) => {
  try {
    const thought = await Thought.findById(req.params.thoughtId);
    if (!thought) {
      return res.status(404).json({ message: 'No thought found with this id to retrieve reactions!' });
    }
    res.json({ message: 'Reactions retrieved successfully', data: thought.reactions });
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving reactions', error: err.message });
  }
});

// POST to create a reaction
router.post('/:thoughtId/reactions', async (req, res) => {
  try {
    const updatedThought = await Thought.findByIdAndUpdate(
      req.params.thoughtId,
      { $push: { reactions: req.body } },
      { new: true, runValidators: true }
    );
    res.json({ message: 'Reaction added successfully', data: updatedThought });
  } catch (err) {
    res.status(500).json({ message: 'Error adding reaction', error: err.message });
  }
});

// DELETE to remove a reaction
router.delete('/:thoughtId/reactions/:reactionId', async (req, res) => {
  try {
    const updatedThought = await Thought.findByIdAndUpdate(
      req.params.thoughtId,
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { new: true }
    );
    res.json({ message: 'Reaction removed successfully', data: updatedThought });
  } catch (err) {
    res.status(500).json({ message: 'Error removing reaction', error: err.message });
  }
});

module.exports = router;
