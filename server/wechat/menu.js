module.exports = {
		  "button": [
			  {
			    "type": "scancode_push",
			    "name": "扫一扫",
			    "key": "V1001_TODAY_MUSIC",
			  },
			  {
			    "name": "提供服务",
			    "type": "view",
			    "url": "http://wechatv1.17kong.com"
			  },
			  {
			    "name": "一帮亿",
			    "sub_button":[
			      {
			        "type": "view",
			        "name": "账号绑定说明",
			        "url": "http://wx.17kong.com/help"
			      },	 
			      {
			        "type": "location_select",
			        "name": "看看我在哪",
			        "key": "location"
			      },  			      
			      {
			        "type": "pic_sysphoto",
			        "name": "拍照",
			        "key": "photo"
			      },          
			      {
			        "type": "view",
			        "name": "看😊看",
			        "url": "https://cn.bing.com/"
			      }
			    ]
			  }
		  ]

}