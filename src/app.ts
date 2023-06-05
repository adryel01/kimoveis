import "reflect-metadata"
import "express-async-errors"
import express, {Application} from "express"
import { handleErrors } from "./errors"
import { usersRouter } from "./routes/users.routes"
import { loginRouter } from "./routes/login.routes"
import { categoriesRouter } from "./routes/categories.routes"
import { realEstateRouter } from "./routes/realEstate.routes"
import { schedulesRouter } from "./routes/schedules.routes"


const app: Application = express()
app.use(express.json())
app.use('/users', usersRouter)
app.use('/login', loginRouter)
app.use('/categories', categoriesRouter)
app.use('/realEstate', realEstateRouter)
app.use('/schedules', schedulesRouter)
app.use(handleErrors)


export default app