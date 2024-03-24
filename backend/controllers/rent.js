import Rents from '../models/rents.js';

export const createRent = async (req, res) => {
  try {
    const { datestart, datefinish, User_name, book_name, User_Address, User_realname } = req.body;
    await Rents.create({ datestart, datefinish, User_name, book_name, User_Address, User_realname, is_finished: false });
    res.status(200).json({ message: 'Rent created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const getRents = async (req, res) => {
  try {
    const rents = await Rents.findAll();
    res.json({ rents });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};