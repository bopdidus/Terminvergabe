import { AppointmentController } from "../controller/AppointmentController";

export const AppointmentRoutes = [
{
    method: "get",
    route: "/appointments",
    controller: AppointmentController,
    action: "all",
    middlewares: [

    ]
}, {
    method: "get",
    route: "/appointments/:id",
    controller: AppointmentController,
    action: "one",
    middlewares:[
        
    ]
}, {
    method: "post",
    route: "/appointments",
    controller: AppointmentController,
    action: "save",
    middlewares:[
        
    ]
}, {
    method: "put",
    route: "/appointments",
    controller: AppointmentController,
    action: "update",
    middlewares:[
        
    ]
}, {
    method: "delete",
    route: "/appointments/:id",
    controller: AppointmentController,
    action: "remove",
    middlewares:[
        
    ]
}, {
    method: "get",
    route: "/appointments-user/:id/all",
    controller: AppointmentController,
    action: "getUsersAppointments",
    middlewares:[
        
    ]
},
{
    method: "get",
    route: "/appointments-clerk/:id/all",
    controller: AppointmentController,
    action: "getClerkAppointments",
    middlewares:[
        
    ]
},
{
    method: "get",
    route: "/appointment/:id",
    controller: AppointmentController,
    action: "getAvailability",
    middlewares:[
        
    ]
}
]