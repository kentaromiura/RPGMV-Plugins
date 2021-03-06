var clint = require('clint')()
var glob = require('glob')
var fs = require('fs')
var wrapup = require('wrapup')

clint.command('--path', '-p', 'path to the project folder')
var output
clint.on('command', function(name, value) {
	switch(name){
		case '--path':
			output = value
			break
	}
})

clint.on('complete', function(){
	var REQUIRE_NW_HACK = '__REQUIRE_NW_GUI__'
	var REQUIRE_NW = 'require(\'nw.gui\')'
	if (!output){
		console.log('No path passed, run with -p ProjectPath')
	} else {
		glob.sync("./Plugins/**/*js").forEach(function(path){
			var to = path.replace('./Plugins/', 'kentaromiura_').replace('/','_')
			var source = ''+ fs.readFileSync(path)
			
			var wrap = new wrapup({
				compress: true,
				transforms: [{
					src: function(module, callback){
						module.src = module.src.replace(REQUIRE_NW, REQUIRE_NW_HACK)
						callback(null, module)
					}
				}]
			})
			wrap.require(path)
			wrap.up(function(error, result){
				result = result.replace(REQUIRE_NW_HACK, REQUIRE_NW)
				var comment = source.slice(0, source.indexOf('*/'))
				comment = comment + '* released under MIT, see https://github.com/kentaromiura/RPGMV-Plugins/blob/master/LICENSE\n */\n'
				fs.writeFileSync(output + '/js/plugins/' + to, comment + result)	
			})
		})		
	}
})

clint.parse(process.argv.slice(2))
