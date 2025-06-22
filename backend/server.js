import express from "express";
import authUserRoutes from "./routes/auth.user.route.js";
import authAdminRoutes from "./routes/auth.admin.route.js";
import userRoutes from "./routes/user.route.js";
import { envVars } from "./config/envVars.js";
import { connectDB } from "./config/db.js";
import cookieParser from "cookie-parser";
import { protectRoute } from "./middleware/protectRoute.js";
import path from "path";
import adminRoutes from "./routes/admin.route.js";
import cors from "cors";

const app = express();
const PORT = envVars.PORT || 10000; // Default to 5000 if no PORT is defined in envVars
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/auth/user", authUserRoutes);
app.use("/api/v1/auth/admin", authAdminRoutes);
app.use("/api/v1/dashboard", protectRoute, userRoutes);
app.use(
  "/api/v1/admin/dashboard",
  protectRoute,
  adminRoutes
);

app.use(cors({
  origin: "https://ticket-app-frontend-six.vercel.app/", // ✅ Add your real frontend URL
  credentials: true, // ✅ Needed if you're using cookies/auth
}));

const __dirname = path.resolve();

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server started on port ${PORT}`); // Log the actual port
  connectDB(); // Connect to the database
});
