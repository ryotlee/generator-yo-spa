const TYPES = {
  'info': console.log,
  'warn': console.warn,
  'err': console.error
}

exports.log = function(v, type) {
  if (type && TYPES.hasOwnProperty(type)) {
    TYPES[type](v)
  } else {
    console.log(v)
  }
}
