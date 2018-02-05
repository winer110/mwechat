// 经过babel编译，放心使用ES最新语法
require('babel-core/register')({
	'presets':[
		'stage-3',
		'latest-node'
	],
  'plugins': [
    // 'transform-decorators-legacy'
  ]
})

require('babel-polyfill')
require('./server')