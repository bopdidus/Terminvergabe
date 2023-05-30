import * as express from "express"
import * as bodyParser from "body-parser"
import { Request, Response } from "express"
import { AppDataSource } from "./data-source"
import { Routes } from "./routes/routes"
import { User } from "./entity/User"

AppDataSource.initialize().then(async () => {

    // create express app
    const app = express()
    app.use(bodyParser.json())

    // register express routes from defined application routes
    Routes.forEach(route => {
        (app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
            const result = (new (route.controller as any))[route.action](req, res, next)
            if (result.data instanceof Promise) {
                result.then(resp => resp !== null && resp !== undefined ? res.status(result.code).send(resp) : res.sendStatus(500))

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
