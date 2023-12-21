import { Response } from "express";

const sendResponse =async <T>(res:Response,data:{success:boolean,statusCode:number,message?:string,meta?:any,data:T}) => {
    return res.status(data?.statusCode).json({
        success:data.success,
        statusCode:data.statusCode,
        message:data.message,
        meta:data.meta,
        data:data.data
    })
}

export default sendResponse