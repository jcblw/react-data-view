function getType (value) {
  const _type = typeof value
  if (_type !== 'object') return _type
  if (!value) return 'null'
  if (Array.isArray(value)) return 'array'
  return _type
}

export {getType}
