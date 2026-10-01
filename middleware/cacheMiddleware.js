const cacheService = require("../services/cache");

function cacheMiddleware(req, res, next) {
  if (req.method !== "GET") {
    return next();
  }

  const key = cacheService.getCacheKey(req);
  const cachedData = cacheService.get(key);

  if (cachedData !== null) {
    res.setHeader("X-Cache", "HIT");
    return res.status(200).json(cachedData);
  }

  res.setHeader("X-Cache", "MISS");

  const originalJson = res.json.bind(res);
  const originalSend = res.send.bind(res);

  res.json = function (body) {
    if (res.statusCode >= 200 && res.statusCode < 300) {
      cacheService.set(key, body);
    }
    return originalJson(body);
  };

  res.send = function (body) {
    if (res.statusCode >= 200 && res.statusCode < 300) {
      try {
        const parsed = typeof body === "string" ? JSON.parse(body) : body;
        cacheService.set(key, parsed);
      } catch {
        cacheService.set(key, body);
      }
    }
    return originalSend(body);
  };

  next();
}

function invalidateCacheMiddleware(req, res, next) {
  const originalJson = res.json.bind(res);
  const originalSend = res.send.bind(res);

  const handleInvalidation = () => {
    if (res.statusCode >= 200 && res.statusCode < 300) {
      cacheService.clear();
    }
  };

  res.json = function (body) {
    handleInvalidation();
    return originalJson(body);
  };

  res.send = function (body) {
    handleInvalidation();
    return originalSend(body);
  };

  next();
}

module.exports = {
  cacheMiddleware,
  invalidateCacheMiddleware,
};
