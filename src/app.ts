import cors from 'cors'
import express, { Application,Request,Response } from 'express'
import router from './app/routes'
import globalErrorHandler from './app/middleware/globalErrorHandler'

const app:Application = express()


app.use(express.json())
app.use(cors())

app.use('/api',router)

//to check api correctly working or not
app.get('/health',(req:Request,res:Response)=>{
    res.status(200).json({
        success:true,
        message:'API health is good'
    })
})

//to check global errors 
app.use(globalErrorHandler)

export default app