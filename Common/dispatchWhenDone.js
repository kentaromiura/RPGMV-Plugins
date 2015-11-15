var slice = require('./slice')

module.exports = function dispatchWhenDone(fn, event){
  return function(){
    fn.apply(this, slice(arguments))
    global.dispatchEvent(new CustomEvent(event))
  }
}
