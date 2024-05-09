
import { Router } from "express";
import userRoutes from "./user.routes";
import postRoutes from "./post.routes";
import commentRoutes from "./comment.routes";
import { errorHandler } from "../middleware/errorHandler.middleware";

const routes = Router();

routes.use("/users", userRoutes);
routes.use("/posts", postRoutes)
routes.use("/comments", commentRoutes)

const apiRouter = Router();

apiRouter.use("/api/v1", routes);

apiRouter.use(errorHandler)

export default apiRouter;