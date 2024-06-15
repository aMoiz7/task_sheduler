import express from 'express'
import dotenv from 'dotenv'
import { dot } from 'node:test/reporters'
import { dbconnect } from './db/connection'
import userRoute from "./routes/user"
import taskRoute from "./routes/task"
import cors from 'cors'

dotenv.config()

const app = express()
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

app.use(express.urlencoded({extended:true}))
app.use(express.json())


dbconnect()

app.use("/api/v1/user" , userRoute)
app.use("/api/v1/task" , taskRoute)


app.listen(process.env.PORT ,()=>{
    console.log(`app running on port ${process.env.PORT}`)
})


