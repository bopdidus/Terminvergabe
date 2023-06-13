import * as express from "express"
import * as bodyParser from "body-parser"
import { Request, Response } from "express"
import { AppDataSource } from "./data-source"
import * as cors from "cors"
import {UserRoutes} from "./routes/user.route"
import { CompanyRoutes } from "./routes/company.route"
import { DisponibilityRoutes } from "./routes/disponibility.route"
import * as webpush from "web-push";
import { AppointmentRoutes } from "./routes/appointment.route"

AppDataSource.initialize().then(async () => {

    // create express app typeorm
    const app = express()
    app.use(bodyParser.json())
    app.use(cors())

    UserRoutes.forEach(route => {
        (app as any)[route.method](route.route, ...route.middlewares ,(req: Request, res: Response, next: Function) => {
            const result =  (new (route.controller as any))[route.action](req, res, next)
            if (result instanceof Promise) {
                result.then(resp => resp !== null && resp !== undefined ? res.status(resp.code).json(resp.data) : res.sendStatus(500))

            } else if (result.data !== null && result.data !== undefined) {
                res.status(result.code).json(result.data)
            }
        })
    })

    CompanyRoutes.forEach(route => {
        (app as any)[route.method](route.route, ...route.middlewares ,(req: Request, res: Response, next: Function) => {
            const result =  (new (route.controller as any))[route.action](req, res, next)
            if (result instanceof Promise) {
                result.then(resp => resp !== null && resp !== undefined ? res.status(resp.code).json(resp.data) : res.sendStatus(500))

            } else if (result.data !== null && result.data !== undefined) {
                res.status(result.code).json(result.data)
            }
        })
    })

    DisponibilityRoutes.forEach(route => {
        (app as any)[route.method](route.route, ...route.middlewares ,(req: Request, res: Response, next: Function) => {
            const result =  (new (route.controller as any))[route.action](req, res, next)
            if (result instanceof Promise) {
                result.then(resp => resp !== null && resp !== undefined ? res.status(resp.code).json(resp.data) : res.sendStatus(500))

            } else if (result.data !== null && result.data !== undefined) {
                res.status(result.code).json(result.data)
            }
        })
    })

    AppointmentRoutes.forEach(route => {
        (app as any)[route.method](route.route, ...route.middlewares ,(req: Request, res: Response, next: Function) => {
            const result =  (new (route.controller as any))[route.action](req, res, next)
            if (result instanceof Promise) {
                result.then(resp => resp !== null && resp !== undefined ? res.status(resp.code).json(resp.data) : res.sendStatus(500))

            } else if (result.data !== null && result.data !== undefined) {
                res.status(result.code).json(result.data)
            }
        })
    })
   
    // setup express app here
    // ...

    // start express server
    app.listen(3000)

  
    console.log("Express server has started on port 3000. Open http://localhost:3000/users to see results")

}).catch(error => console.log(error))