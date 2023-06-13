import { UserController } from "../controller/UserController";
import { checkAuth } from "../middlewares/auth.middleware";
import { CheckRequestLogin, CheckRequestUser } from "../middlewares/validation";

export const UserRoutes = [{
    method: "get",
    route: "/users",
    controller: UserController,
    action: "all",
    middlewares:[
       checkAuth
    ]
}, {
    method: "get",
    route: "/users/:id",
    controller: UserController,
    action: "one",
    middlewares:[
        checkAuth
    ]
}, {
    method: "put",
    route: "/users",
    controller: UserController,
    action: "update",
    middlewares:[
        checkAuth
    ]
},
 {
    method: "post",
    route: "/users",
    controller: UserController,
    action: "save",
    middlewares:[
        CheckRequestUser
    ]
}, {
    method: "delete",
    route: "/users/:id",
    controller: UserController,
    action: "remove",
    middlewares:[
    ]
}, {
    method: "post",
    route: "/login",
    controller: UserController,
    action: "login",
    middlewares:[
        CheckRequestLogin
    ]
},
{
    method: "get",
    route: "/account/activation/:id",
    controller: UserController,
    action: "activation",
    middlewares:[]
        
}, {
    method: "get",
    route: "/users-clerks",
    controller: UserController,
    action: "allClerks",
    middlewares:[
       checkAuth
    ]
},
{
    method: "post",
    route: "/save-clerk",
    controller: UserController,
    action: "saveClerk",
    middlewares:[
        CheckRequestUser
    ]
}
]