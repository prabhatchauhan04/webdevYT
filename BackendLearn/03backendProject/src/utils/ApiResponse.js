// yha pe hum ek standard response structure bna rhe hai jo har jagah use kr skte hai
// taki har jagah same format mein response bheje
// jaise kya message ya kya variables honge in response or anything woh har jagah same honge

class ApiResponse {
    constructor(statusCode, data, message = "Success"){
        this.statusCode = statusCode
        this.data = data
        this.message = message
        this.success = statusCode < 400
    }
}

export { ApiResponse }