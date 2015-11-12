var clint = require('clint')();
var glob = require('glob');
var fs = require('fs');

clint.command('--path', '-p', 'path to the project folder')
var output;
clint.on('command', function(name, value) {
	switch(name){
		case '--path':
			output = value
			break
	}
})

clint.on('complete', function(){
	if (!output){
		console.log('No path passed, run with -p ProjectPath')
	} else {
		glob.sync("./Plugins/**/*js").forEach(function(path){
			var to = path.replace('./Plugins/', 'kentaromiura_').replace('/','_');			
			fs.writeFileSync(output + '/js/plugins/' + to, fs.readFileSync(path))
		})		
	}
})

clint.parse(process.argv.slice(2))
