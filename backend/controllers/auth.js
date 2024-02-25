import bcrypt from 'bcryptjs';
import Users  from '../models/Users.js';

export const register = async (req, res) => {
  try {
    const { username, password, confirmPassword} = req.body;
    
    if (password !== confirmPassword) {
      return res.json({ message: 'Паролі не співпадають' });
    }
    if (password.length < 8) {
      return res.json({ message: 'Пароль повинен містити принаймні 8 символів' });
    }
    const specialCharRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    if (!specialCharRegex.test(password)) {
      return res.json({ message: 'Пароль повинен містити принаймні один спеціальний символ' });
    }

    const existingUser = await Users.findOne({ where: { username } });

    if (existingUser) {
      return res.json({ message: 'Даний username зайнятий' });
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const newUser = await Users.create({
      username,
      password: hash
    });

    req.session.userId = newUser.id;

    res.json({ newUser, message: 'Реєстрація успішна' });
  } catch (error) {
    console.error(error);
    res.json({ message: 'Помилка при створені користувача' });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await Users.findOne({ where: { username } });

    if (!user) {
      return res.json({ message: 'Даного користувача не існує' });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.json({ message: 'Неправильний пароль' });
    }

    req.session.userId = user.id;

    res.json({ user, message: 'Ви зайшли в систему' });
  } catch (error) {
    console.error(error);
    res.json({ message: 'Помилка при авторизації' });
  }
};

export const getMe = async (req, res) => {
  try {
    const userId = req.session.userId;

    if (!userId) {
      return res.status(401).json({ message: 'Не авторизований користувач' });
    }

    const user = await Users.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: 'Користувача не знайдено' });
    }

    res.json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Помилка при обробці запиту', error: error.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await Users.findAll();
    const mappedUsers = users.map((user) => ({
      username: user.username,
    }));
    console.log('Список всех пользователей:', mappedUsers);
    res.json({ users:mappedUsers });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Помилка при отриманні списку користувачів', error: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const userId = req.session.userId;
    const { address, password, newUsername } = req.body;

    if (!userId) {
      return res.status(401).json({ message: 'Не авторизований користувач' });
    }

    const user = await Users.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: 'Користувача не знайдено' });
    }

    if (address) {
      user.address = address;
    }

    if (password) {
      if (password.length < 8) {
        return res.json({ message: 'Пароль повинен містити принаймні 8 символів' });
      }
      const specialCharRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
      if (!specialCharRegex.test(password)) {
        return res.json({ message: 'Пароль повинен містити принаймні один спеціальний символ' });
      }

      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);
      user.password = hash;
    }

    if (newUsername) {
      const existingUser = await Users.findOne({ where: { username: newUsername } });
      if (existingUser && existingUser.id !== userId) {
        return res.status(400).json({ message: 'Даний логін уже зайнятий' });
      }
      user.username = newUsername;
    }

    await user.save();

    res.json({ user, message: 'Дані користувача успішно оновлено' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Помилка при оновленні даних користувача', error: error.message });
  }
};
