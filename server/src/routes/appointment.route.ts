import { AppointmentController } from "../controller/AppointmentController";
import { checkAuth } from "../middlewares/auth.middleware";

export const AppointmentRoutes = [
{
    method: "get",
    route: "/appointments",
    controller: AppointmentController,
    action: "all",
    middlewares: [        
        checkAuth
    ]
}, {
    method: "get",
    route: "/appointments/:id",
    controller: AppointmentController,
    action: "one",
    middlewares: [        
        checkAuth
    ]
}, {
    method: "post",
    route: "/appointments",
    controller: AppointmentController,
    action: "save",
    middlewares: [        
        checkAuth
    ]
}, {
    method: "put",
    route: "/appointments",
    controller: AppointmentController,
    action: "update",
    middlewares: [        
        checkAuth
    ]
}, {
    method: "delete",
    route: "/appointments/:id",
    controller: AppointmentController,
    action: "remove",
    middlewares: [        
        checkAuth
    ]
}, {
    method: "get",
    route: "/appointments-user/:id/all",
    controller: AppointmentController,
    action: "getUsersAppointments",
    middlewares: [        
        checkAuth
    ]
},
{
    method: "get",
    route: "/appointments-clerk/:id/all",
    controller: AppointmentController,
    action: "getClerkAppointments",
    middlewares: [        
        checkAuth
    ]
},
{
    method: "get",
    route: "/appointment/:id",
    controller: AppointmentController,
    action: "getAvailability",
    middlewares: [        
        checkAuth
    ]
}
]