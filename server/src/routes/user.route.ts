import { AppointmentController } from "../controller/AppointmentController";
import { UserController } from "../controller/UserController";
import { checkAuth } from "../middlewares/auth.middleware";
import { CheckRequest } from "../middlewares/validation";

export const UserRoutes = [{
    method: "get",
    route: "/users",
    controller: UserController,
    action: "all",
    validation:[
        //checkAuth
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
},
{
    method: "post",
    route: "/login",
    controller: UserController,
    action: "login",
    validation:[
        
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