// 全剧票据
// mac 下 mongodb 的配置？？？？？？
const mongoose = require('mongoose')
const Schema = mongoose.Schema

// 表上字段的定义
const TokenSchema = new mongoose.Schema({
	name:String,
	access_token:String,
	expires_in:Number,
	meta:{
		createdAt:{
			type:Date,
			default:Date.now()
		},
		updatedAt:{
			type:Date,
			default:Date.now()
		}
	}
})
// 保存之前的中间件
TokenSchema.pre('save', function(next){
	if (this.isNew) {
		this.meta.createdAt = this.meta.updatedAt = Date.now()
	} else {
		this.meta.updatedAt = Date.now()
	}

	next()
})

// 静态方法
TokenSchema.statics = {
	async getAccessToken(){
		const token = await this.findOne({
			name:'access_token'
		}).exec()

		// if (token && token.token) {
		// 	// 增加属性
		// 	token.access_token = token.token
		// }
		return token
	},

	// 别漏传
	async saveAccessToken(data){
		let token = await this.findOne({
			name:'access_token'
		}).exec()
		// 找到说明已经存过了
		if (token) {
			token.access_token = data.access_token
			token.expires_in = data.expires_in
		} else {
			// 新增
			token = new Token({
				name:'access_token',
				// TypeError: Cannot read property 'access_token' of undefined
				access_token:data.access_token,
				expires_in:data.expires_in
			})
		}
		// 无论add、编辑都保存
		try {
			await token.save()			
		} catch (e) {
			console.log('存储失败',e)
		}
		return data
	}

}

const Token = mongoose.model('Token',TokenSchema)





















