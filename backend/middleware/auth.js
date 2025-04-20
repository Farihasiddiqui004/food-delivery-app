import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
    // Extract token from the Authorization header (it should be in the format "Bearer <token>")
    const token = req.headers.authorization?.split(" ")[1];  // Token will be after the 'Bearer' keyword

    if (!token) {
        return res.status(401).json({ success: false, message: "Not Authorized. Login again." });
    }

    try {
        // Verify the token and decode it
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach the user ID to the request object for access in route handlers
        req.userId = decoded.id; // Use 'id' from the decoded token payload

        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        console.log(error);
        return res.status(401).json({ success: false, message: "Invalid or expired token." });
    }
};

export default authMiddleware;
