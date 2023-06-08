import { CompanyController } from "../controller/CompanyController";
import { checkAuth } from "../middlewares/auth.middleware";
import { CheckRequestCompany } from "../middlewares/validation";

export const CompanyRoutes = [{
    method: "get",
    route: "/company",
    controller: CompanyController,
    action: "all",
    middlewares:[
        //checkAuth
    ]
}, {
    method: "get",
    route: "/companies/:id",
    controller: CompanyController,
    action: "one",
    middlewares:[
        checkAuth
    ]
}, {
    method: "put",
    route: "/companies",
    controller: CompanyController,
    action: "update",
    middlewares:[
        
    ]
},
 {
    method: "post",
    route: "/companies",
    controller: CompanyController,
    action: "save",
    middlewares:[
        CheckRequestCompany
    ]
}, {
    method: "delete",
    route: "/companies/:id",
    controller: CompanyController,
    action: "remove",
    middlewares:[
        
    ]
},
{
    method: "post",
    route: "/login",
    controller: CompanyController,
    action: "login",
    middlewares:[
        
    ]
}
]