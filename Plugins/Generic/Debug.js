/*:
 * @plugindesc Open the chrome devtool
 * @author Cristian Carlesso <kentaromiura>
 * @param debug
 * @desc if true opens chrome inspector for testing
 * @default false
 */

var getParameters = require('../../Common/getParameters')

if (getParameters().debug === 'true') require('nw.gui').Window.get().showDevTools()
