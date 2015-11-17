var slice = require('./slice')

module.exports = function dispatchWhenDone(fn, event){
  return function(){
    var args = slice(arguments)
    var result = fn.apply(this, args)
    
    global.dispatchEvent(new CustomEvent(event, {'detail': {
      args: args,
      result: result,
      context: this 
    }}))
    
    return result
  }
}
