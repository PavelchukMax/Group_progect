export const checkAuth = (req, res, next) => {
  const userId = req.session.userId;

  if (userId) {
    req.userId = userId;
    next();
  } else {
    console.error('Нема сесії в запиті.');
    next(new Error('Нема доступу. Сесія відсутня.'));
  }
};
