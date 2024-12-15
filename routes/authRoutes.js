const express = require("express");
const { OAuth2Client } = require("google-auth-library");
const router = express.Router();
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const validateGoogleToken = async (token) => {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_CLIENT_ID,
  });

  const payload = ticket.getPayload();
  return payload;
};

// Google login and organization validation
router.post("/login", async (req, res) => {
    const { token } = req.body;
  
    try {
      // Verify the token
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: GOOGLE_CLIENT_ID,  // Replace with your Google Client ID
      });
  
      const payload = ticket.getPayload();
      const userEmail = payload.email;
  
      // Check if the email belongs to the specific organization
      if (!userEmail.endsWith('@yourorganization.com')) {
        return res.status(403).json({ message: "Unauthorized organization" });
      }
  
      // Create or fetch user from the database
      const user = await User.findOneAndUpdate({ email: userEmail }, { name: payload.name }, { upsert: true, new: true });
  
      res.status(200).json({ user });
    } catch (error) {
      console.error('Error verifying Google token:', error);
      res.status(500).json({ message: "Authentication failed" });
    }
});

module.exports = router;
