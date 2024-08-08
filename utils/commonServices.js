const returnResponse = (status,statusCode,msg,data) => {
    return {
        status : status,
        statusCode : statusCode,
        msg : msg,
        data : data
    }
} 
const response = (response,status,statusCode,msg,data) => {
    const res = {
        status : status,
        statusCode : statusCode,
        msg : msg,
        data : data
    }
    response.status(statusCode).json(res);
}

module.exports ={
    returnResponse,
    response
}