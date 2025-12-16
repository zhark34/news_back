import useragent from "express-useragent";

export const getDeviceInfo = (req) => {
    return useragent.parse(req.headers['user-agent']);
};