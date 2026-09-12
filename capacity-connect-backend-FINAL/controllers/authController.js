/**
 * Authentication Controller
 * Capacity Connect LMS (SIH26075)
 * Architecture: routes -> controllers -> services -> PostgreSQL pool
 */

const authService = require("../services/authService");
const { auth } = require("../config/firebaseAdmin");
class AuthController {
  async register(req, res, next) {
    try {
      const { name, email, phoneNumber, password, confirmPassword, role, bio } =
        req.body;

      const result = await authService.register({
        name,
        email,
        phoneNumber,
        password,
        confirmPassword,
        role,
        bio,
      });

      return res.status(201).json({
        success: true,
        message: "User registered successfully",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;

      const result = await authService.login({
        email,
        password,
      });

      return res.status(200).json({
        success: true,
        message: "Login successful",
        data: result,
      });
    } catch (error) {
      // Ensure expected 401 response on invalid credentials
      if (error.statusCode === 401) {
        return res.status(401).json({
          success: false,
          message: error.message || "Invalid email or password",
        });
      }

      next(error);
    }
  }
  async googleLogin(req, res, next) {
    try {
      const { idToken } = req.body;

      if (!idToken) {
        return res.status(400).json({
          success: false,
          message: "Google ID token is required",
        });
      }

      const decodedToken = await auth.verifyIdToken(idToken);

      if (!decodedToken.email || !decodedToken.email_verified) {
        return res.status(401).json({
          success: false,
          message: "Google email is not verified",
        });
      }

      const result = await authService.googleLogin({
        uid: decodedToken.uid,
        email: decodedToken.email,
        name: decodedToken.name || "",
      });

      return res.status(200).json({
        success: true,
        message: "Google login successful",
        data: result,
      });
    } catch (error) {
      console.error("Google login error:", error);

      if (
        error.code === "auth/id-token-expired" ||
        error.code === "auth/argument-error" ||
        error.code === "auth/invalid-id-token"
      ) {
        return res.status(401).json({
          success: false,
          message: "Invalid or expired Google token",
        });
      }

      next(error);
    }
  }
  async getMe(req, res, next) {
    try {
      const user = await authService.getProfile(req.user.id);

      return res.status(200).json({
        success: true,
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AuthController();
