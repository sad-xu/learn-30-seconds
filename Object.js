/**
 * deepClone
 * 
 */
const deepClone = obj => {
  let clone = Object.assign({}, obj)
  Object.keys(clone).forEach(key => {
    clone[key] = typeof obj[key] === 'object' ? deepClone(obj[key]) : obj[key] 
  })
  if (Array.isArray(obj) && obj.length) {
    clone.length = obj.length
    return Array.from(clone)
  } else {
    
  }
}
