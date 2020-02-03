function validateUser() {
  return (req, res, next) => {
    if (!req.body) {
      return res.status(400).json({ message: 'Missing user data' });
    } else if (!req.body.username) {
      return res.status(400).json({ message: 'Username is required' });
    } else if (!req.body.password) {
      return res.status(400).json({ message: 'Password is required' });
    }
    next();
  };
}

module.exports = { validateUser };
