module.exports = function(){
  return /([^\/]+)\.js$/.exec(document.currentScript.src)[1]
}