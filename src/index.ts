import express, { Express } from "express";
import dotenv from "dotenv";
import morgan from "morgan";

import routes from "./routes";
import { verifyJWTSecret } from "./util/jwt";
import { logEndpoints } from "./util/endpoints";

dotenv.config();

const PORT = process.env.PORT || 3000;

class Application {

    public server: Express;

    constructor() {

        verifyJWTSecret();

        this.server = express();
        this.plugins();
        this.routes();

        this.server.listen(PORT, () => {
            logEndpoints(this.server);
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    }

    protected plugins(): void {
        this.server.use(express.json());
        this.server.use(express.urlencoded({ extended: true }));
        this.server.use(morgan("combined"));

    }

    protected routes(): void {
        this.server.use(routes)
    }

}

export default new Application().server;