const validateRequest = (schema)=>{
    return (req, res, next)=>{
        try{
            schema.parse(req.body);
            next();
        }
        catch(except){
            next(except);
        }
    }
}

module.exports = validateRequest;