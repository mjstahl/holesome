let store = {}
const proxy = new Proxy({}, {
  get: function (_, prop, __) {
    return store[prop]
  },
  set: function (_, prop, value) {
    store = { ...store, [prop]: value }
    return true
  }
})
export default proxy