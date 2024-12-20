export const generateToken = (user, message, statusCode, res) => {
  const token = user.generateJsonWebToken(); // Ensure this method uses `JWT_SECRET_KEY` and `JWT_EXPIRES`
  const cookieExpiresInDays = parseInt(process.env.COOKIE_EXPIRES, 10) || 10; // Default to 10 if not set

  res
    .status(statusCode)
    .cookie("token", token, {
      expires: new Date(Date.now() + cookieExpiresInDays * 24 * 60 * 60 * 1000), // Set cookie expiration
      httpOnly: true, // Protect cookie from client-side access
    })
    .json({
      success: true,
      message,
      user,
      token,
    });
};
