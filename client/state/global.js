let store = {}
const proxy = new Proxy({}, {
  get: function (_, prop, __) {
    const value = store[prop]
    if (value) return value

    store = { ...store, [prop]: {} }
    return store[prop]
  },
  set: function (_, prop, value) {
    store = { ...store, [prop]: value }
    return true
  }
})
export default proxy
