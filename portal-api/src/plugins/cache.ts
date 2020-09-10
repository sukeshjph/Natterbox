export default class Cache {
  memoryCache

  constructor(memoryCache) {
    this.memoryCache = memoryCache
  }

  async get(id) {
    const result = await this.memoryCache.get(id)
    return result
  }

  async set(id, token) {
    const result = await this.memoryCache.set(id, token)
    return result
  }
}