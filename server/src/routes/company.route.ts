import { CompanyController } from "../controller/CompanyController";
import { checkAuth } from "../middlewares/auth.middleware";
import { CheckRequestCompany } from "../middlewares/validation";

export const CompanyRoutes = [{
    method: "get",
    route: "/company",
    controller: CompanyController,
    action: "all",
    middlewares:[
        checkAuth
    ]
}, {
    method: "get",
    route: "/company/:id",
    controller: CompanyController,
    action: "one",
    middlewares:[
        checkAuth
    ]
}, {
    method: "put",
    route: "/company",
    controller: CompanyController,
    action: "update",
    middlewares:[
        
    ]
},
 {
    method: "post",
    route: "/company",
    controller: CompanyController,
    action: "save",
    middlewares:[
        CheckRequestCompany
    ]
}, {
    method: "delete",
    route: "/company/:id",
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