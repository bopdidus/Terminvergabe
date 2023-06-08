import { AppointmentController } from "../controller/AppointmentController";
import { UserController } from "../controller/UserController";
import { checkAuth } from "../middlewares/auth.middleware";
import { CheckRequestLogin, CheckRequestUser } from "../middlewares/validation";

export const UserRoutes = [{
    method: "get",
    route: "/users",
    controller: UserController,
    action: "all",
    middlewares:[
       // checkAuth
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
},
{
    method: "post",
    route: "/login",
    controller: UserController,
    action: "login",
    middlewares:[
        CheckRequestLogin
    ]
},

//Appointments
{
    method: "get",
    route: "/appointments",
    controller: AppointmentController,
    action: "all",
    validation: [

    ]
}, {
    method: "get",
    route: "/appointments/:id",
    controller: AppointmentController,
    action: "one",
    validation:[
        
    ]
}, {
    method: "post",
    route: "/appointments",
    controller: AppointmentController,
    action: "save",
    validation:[
        
    ]
}, {
    method: "put",
    route: "/appointments",
    controller: AppointmentController,
    action: "update",
    validation:[
        
    ]
}, {
    method: "delete",
    route: "/appointments/:id",
    controller: AppointmentController,
    action: "remove",
    validation:[
        
    ]
}
]