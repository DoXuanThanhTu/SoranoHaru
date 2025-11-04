import express, { json, NextFunction, Request, Response } from "express";
import cors from "cors";
import connectDB from "./db";
import "./utils/cronJobs";
import movieRoute from "./routes/movie.routes";
import categoryRoute from "./routes/category.routes";
import episodeRoute from "./routes/episode.routes";
import userRoute from "./routes/user.routes";
import commentRoutes from "./routes/comment.routes";
// import { clerkMiddleware, getAuth } from "@clerk/express";
// import { shouldBeUser } from "./middleware/authMiddleware.js";
// import productRouter from "./routes/product.route";
// import category from "./routes/category.route";
const app = express();
// app.use(clerkMiddleware());

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(express.json());
app.get("/health", (req: Request, res: Response) => {
  return res.status(200).json({
    status: "ok",
    uptime: process.uptime(),
    timestamp: Date.now(),
  });
});
// app.get("/test", shouldBeUser, (req, res) => {
//   res.json({
//     message: "Product service is authenticated!",
//     userId: req.userId,
//   });
// });
// app.use("/products", productRouter);
// app.use("/categories", category);
connectDB();

app.use("/movies", movieRoute);
app.use("/categories", categoryRoute);
app.use("/episodes", episodeRoute);
app.use("/users", userRoute);
app.use("/comments", commentRoutes);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.log(err);
  return res
    .status(err.status || 500)
    .json({ message: err.message || "Internal Server Error!" });
});
app.listen(5000, () => {
  console.log("Product service is running on port 5000");
});
