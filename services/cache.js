const cache = new Map();
const TTL_MS = 60 * 1000;

function getCacheKey(req) {
  return req.originalUrl || req.url;
}

function get(key) {
  const entry = cache.get(key);
  if (!entry) {
    return null;
  }

  const isExpired = Date.now() - entry.createdAt > TTL_MS;
  if (isExpired) {
    cache.delete(key);
    return null;
  }

  return entry.data;
}

function set(key, data) {
  cache.set(key, {
    data,
    createdAt: Date.now(),
  });
}

function clear() {
  cache.clear();
}

module.exports = {
  cache,
  TTL_MS,
  getCacheKey,
  get,
  set,
  clear,
};
