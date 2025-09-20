import rateLimit from "../config/upstash.js";

const rateLimiter = async (req, res, next) => {
    try {

        const { success } = await rateLimit.limit('my-limit')

        if (!success) {
            return res.status(429).json({ message: 'Too many requests' });
        }
        next();

    } catch(error) {
        return res.status(500).json({ message: 'Rate limiting error', error });
    }
}

export default rateLimiter;