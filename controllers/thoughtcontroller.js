const Thought = require('../models/Thought');
const User = require('../models/User');

exports.getAllThoughts = async (req, res) => {
    try {
        const thoughts = await Thought.find();
        res.json(thoughts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getThoughtById = async (req, res) => {
    try {
        const thought = await Thought.findById(req.params.id);
        if (!thought) {
            return res.status(404).json({ message: 'Thought not found' });
        }
        res.json(thought);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createThought = async (req, res) => {
    try {
        const newThought = new Thought(req.body);
        const savedThought = await newThought.save();

        await User.findByIdAndUpdate(req.body.userId, { $push: { thoughts: savedThought._id } });

        res.status(201).json(savedThought);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.updateThought = async (req, res) => {
    try {
        const thought = await Thought.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!thought) {
            return res.status(404).json({ message: 'Thought not found' });
        }
        res.json(thought);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.deleteThought = async (req, res) => {
    try {
        const thought = await Thought.findByIdAndDelete(req.params.id);
        if (!thought) {
            return res.status(404).json({ message: 'Thought not found' });
        }
        res.json({ message: 'Thought deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.addReaction = async (req, res) => {
    try {
        const thought = await Thought.findByIdAndUpdate(req.params.thoughtId, 
            { $push: { reactions: req.body } }, 
            { new: true });
        if (!thought) {
            return res.status(404).json({ message: 'Thought not found' });
        }
        res.json(thought);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.removeReaction = async (req, res) => {
    try {
        const thought = await Thought.findByIdAndUpdate(req.params.thoughtId, 
            { $pull: { reactions: { reactionId: req.body.reactionId } } }, 
            { new: true });
        if (!thought) {
            return res.status(404).json({ message: 'Thought not found' });
        }
        res.json(thought);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
