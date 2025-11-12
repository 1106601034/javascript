import { rateLimit } from 'express-rate-limit';

export default rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
  limit: parseInt(process.env.RATE_LIMIT_REQUESTS_PER_WINDOW) || 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  skip: () => process.env.NODE_ENV === 'development',
});
