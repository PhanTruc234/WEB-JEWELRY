import { verifyToken } from "../services/token.service.js";
const authUser = async (req, res, next) => {
    try {
        const authHeader = req.headers["authorization"];
        const accessToken = authHeader.split(" ")[1];
        console.log(">>> accessToken", accessToken)
        const decode = await verifyToken(accessToken);
        // console.log(">>> decode", decode)
        req.user = decode;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorize" });
    }
};
export default authUser;