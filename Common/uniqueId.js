var id = 0;

module.exports = Utils.uniqueId || (Utils.uniqueId = function(){
	return (id++).toString(36)
})
