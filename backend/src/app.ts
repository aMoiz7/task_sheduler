import express from 'express'
import dotenv from 'dotenv'
import { dot } from 'node:test/reporters'

dotenv.config()

const app = express()


app.listen(process.env.PORT ,()=>{
    console.log(`app running on port ${process.env.PORT}`)
})