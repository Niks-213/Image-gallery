// controllers/userController.js
const User = require('../model/User');

// Controller for creating a new user
const createUser = async (req, res) => {
    try {
        const { user_name, user_email, user_role } = req.body;
        const user = await User.create({ user_name, user_email, user_role });
        return res.json(user);
      } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
};

// Controller for getting all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    return res.json(users);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateUserById = async (req, res) => {
    try {
        
      const userId = req.params.id;
      const { user_name, user_email, user_role } = req.body;
  
      const updatedUser = await User.update(
        { user_name, user_email, user_role },
        { where: { user_id: userId } }
      );
  
      if (updatedUser[0] === 0) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      const user = await User.findByPk(userId);
      return res.json(user);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };


  const deleteUserById = async (req, res) => {
    try {
      const userId = req.params.id;
  
      const deletedUserCount = await User.destroy({ where: { user_id: userId } });
  
      if (deletedUserCount === 0) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      return res.json({ message: 'User deleted successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  const getUserById = async (req, res) => {
    try {
      const userId = req.params.id;
  
      const user = await User.findByPk(userId);
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      return res.json(user);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
module.exports = { createUser, getAllUsers, updateUserById, deleteUserById, getUserById};
