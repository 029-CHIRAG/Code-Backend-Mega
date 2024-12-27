class ApiError extends Error{
    constructor(statusCode,message='Something Went Wrong',error=[],stack=''){
        super(message)
        this.stack=stack
        this.statusCode=statusCode
        this.data=null
        this.error=error
    }
}

export {ApiError}