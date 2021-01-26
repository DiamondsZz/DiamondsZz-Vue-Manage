<template>
	<div class="verify-code">
		<a-button class="verify-code-get diamonds-blue" :disabled="!!timer" @click="getCode">{{
			verifyCode.text
		}}</a-button>
	</div>
</template>

<script>
export default {
	data() {
		return {
			//验证码
			verifyCode: {
				text: '获取验证码',
				//验证码
				code: undefined
			},
			//定时器
			timer: null
		}
	},
	methods: {
		//获取验证码
		getCode() {
			//是否开启定时器
			if (!this.timer) {
				//倒计时
				let time = 60

				this.timer = setInterval(() => {
					time--
					//1分钟结束
					if (time <= 0) {
						this.$set(this.verifyCode, 'text', '获取验证码')
						clearInterval(this.timer)
						this.timer = null
						return
					}
					this.$set(this.verifyCode, 'text', `剩余${time}秒`)
				}, 1000)
			}
		}
	},
	beforeDestroy() {
		if (this.timer) {
			clearInterval(this.timer)
			this.timer = null
		}
	}
}
</script>

<style lang="less" scoped>
.verify-code {
	margin-left: 15px;
	.verify-code-get {
	}
}
</style>