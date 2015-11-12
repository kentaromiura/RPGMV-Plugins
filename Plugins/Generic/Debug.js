/*:
 * @plugindesc Open the chrome devtool
 * @author Cristian Carlesso <kentaromiura>
 * @param debug
 * @desc if true opens chrome inspector for testing
 * @default false
 */

function getFileName(){
	var srcParts = document.currentScript.src.split('/')
	return srcParts[srcParts.length-1].replace('.js', '')
}

if ('' + PluginManager.parameters(getFileName()).debug === 'true') require('nw.gui').Window.get().showDevTools()
