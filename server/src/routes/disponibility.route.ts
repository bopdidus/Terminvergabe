import { DisponibilityController } from "../controller/DisponibilityController";
import { checkAuth } from "../middlewares/auth.middleware";

export const DisponibilityRoutes = [{
    method: "get",
    route: "/disponibilities",
    controller: DisponibilityController,
    action: "all",
    middlewares:[
       // checkAuth
    ]
}, {
    method: "get",
    route: "/disponibilities/:id",
    controller: DisponibilityController,
    action: "one",
    middlewares:[
        checkAuth
    ]
}, {
    method: "put",
    route: "/disponibilities",
    controller: DisponibilityController,
    action: "update",
    middlewares:[
        
    ]
},
 {
    method: "post",
    route: "/disponibilities",
    controller: DisponibilityController,
    action: "save",
    middlewares:[
        
    ]
}, {
    method: "delete",
    route: "/disponibilities/:id",
    controller: DisponibilityController,
    action: "remove",
    middlewares:[
        
    ]
}
]