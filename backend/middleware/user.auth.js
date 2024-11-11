import jwt from 'jsonwebtoken'
const isAuthentcated = async (req,resp,next)=>{
 try {
    const token = req.cookies.token;
    if(!token){
        return resp.status(401).json({messsge:"not found token"})
    }
    const decode = await jwt.verify(token, process.env.SECRET_KEY);
    if(!decode){
        return resp.status(401).json({messsge:"not verify"})
    }
    req.id = decode.userId;
    next();
 } catch (error) {
    
 }
}

export default isAuthentcated