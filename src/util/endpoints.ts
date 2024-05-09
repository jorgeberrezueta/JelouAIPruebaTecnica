import { Router } from "express";
import expressListEndpoints from "express-list-endpoints";

export const logEndpoints = (app: Router) => {
    const endpoints = expressListEndpoints(app).map(({ path, methods, middlewares}) => (
        {methods,path}
    ));
    console.table(endpoints);
};