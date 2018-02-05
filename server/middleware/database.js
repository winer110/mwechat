import mongoose from 'mongoose'
import config from '../config'
import fs from 'fs'
import { resolve } from 'path'

const models = resolve(__dirname, '../database/schema')
// 同步读取模型文件
fs.readdirSync(models)
	.filter(file => ~file.search(/^[^\.].*js$/)) //筛选js结尾的
	.forEach(file => require(resolve(models,file)))

export const database = app => {
	// 存储日志
	mongoose.set('debug', true)

	mongoose.connect(config.db)
	// 中断、重连
	mongoose.connection.on('disconnected',() => {
		mongoose.connect(config.db)
	})

	mongoose.connection.on('error',err => {
		console.log(err)
	})

	mongoose.connection.on('open', async => {
		console.log('connected to mongoDB',config.db)
	})
}