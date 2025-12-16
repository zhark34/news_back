import requestIp from "request-ip";
import geoip from "geoip-lite";

export const getIp = (req) =>{

    const ip = requestIp.getClientIp(req);

    const geo = geoip.lookup(ip);

    if (!geo) {
        return { ip, country: "null", province: "null", city: "null" };
    }

    const country = geo?.country;

    const regionCode = geo?.region;

    const city = geo?.city;

    const province = geoip.pretty(regionCode);

    return {ip, country, province, city}

}
