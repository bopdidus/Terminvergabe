import { UserController } from "../controller/UserController";
import { CheckRequest } from "../middlewares/validation";

export const UserRoutes = [{
    method: "get",
    route: "/users",
    controller: UserController,
    action: "all",
    validation:[
        
    ]
}, {
    method: "get",
    route: "/users/:id",
    controller: UserController,
    action: "one",
    validation:[
        
    ]
}, {
    method: "put",
    route: "/users",
    controller: UserController,
    action: "update",
    validation:[
        
    ]
},
 {
    method: "post",
    route: "/users",
    controller: UserController,
    action: "save",
    validation:[
        CheckRequest
    ]
}, {
    method: "delete",
    route: "/users/:id",
    controller: UserController,
    action: "remove",
    validation:[
        
    ]
}]