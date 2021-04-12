<template>
	<div class="textarea">
		<a-textarea
			:id="textarea.id"
			:placeholder="'请输入...'"
			v-model="textarea.value"
			:autoSize="{ minRows: 4, maxRows: 4 }"
			@input="change"
		>
		</a-textarea>
		<div class="emotion-container">
			<a-popover placement="topLeft" v-model="textarea.emotionVisible">
				<template slot="content">
					<div class="emotion">
						<div
							class="emotion-item"
							v-for="(emotion, emotionIndex) in 104"
							:key="emotionIndex"
							@click="emotionClick(emotionIndex)"
						>
							<img
								:src="`https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/${emotionIndex}.gif`"
								alt
							/>
						</div>
					</div>
				</template>
				<a-icon type="smile" />
			</a-popover>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		initialValue: {
			type: Object,
			default() {
				return {}
			}
		}
	},
	data() {
		return {
			// 表情
			emotions: [
				'微笑',
				'撇嘴',
				'色',
				'发呆',
				'得意',
				'流泪',
				'害羞',
				'闭嘴',
				'睡',
				'大哭',
				'尴尬',
				'发怒',
				'调皮',
				'呲牙',
				'惊讶',
				'难过',
				'酷',
				'冷汗',
				'抓狂',
				'吐',
				'偷笑',
				'可爱',
				'白眼',
				'傲慢',
				'饥饿',
				'困',
				'惊恐',
				'流汗',
				'憨笑',
				'大兵',
				'奋斗',
				'咒骂',
				'疑问',
				'嘘',
				'晕',
				'折磨',
				'衰',
				'骷髅',
				'敲打',
				'再见',
				'擦汗',
				'抠鼻',
				'鼓掌',
				'糗大了',
				'坏笑',
				'左哼哼',
				'右哼哼',
				'哈欠',
				'鄙视',
				'委屈',
				'快哭了',
				'阴险',
				'亲亲',
				'吓',
				'可怜',
				'菜刀',
				'西瓜',
				'啤酒',
				'篮球',
				'乒乓',
				'咖啡',
				'饭',
				'猪头',
				'玫瑰',
				'凋谢',
				'示爱',
				'爱心',
				'心碎',
				'蛋糕',
				'闪电',
				'炸弹',
				'刀',
				'足球',
				'瓢虫',
				'便便',
				'月亮',
				'太阳',
				'礼物',
				'拥抱',
				'强',
				'弱',
				'握手',
				'胜利',
				'抱拳',
				'勾引',
				'拳头',
				'差劲',
				'爱你',
				'NO',
				'OK',
				'爱情',
				'飞吻',
				'跳跳',
				'发抖',
				'怄火',
				'转圈',
				'磕头',
				'回头',
				'跳绳',
				'挥手',
				'激动',
				'街舞',
				'献吻',
				'左太极',
				'右太极'
			],
			textarea: {
				id: `_textarea_${Date.now()}`,
				value: '',
				emotionVisible: false
			}
		}
	},
	methods: {
		// 表情点击
		emotionClick(emotionIndex) {
			// 当前模板
			const currentTemplate = this.textarea

			// 模板内容
			let templateContent = currentTemplate.value
			// 当前表情
			const currentEmotion = this.emotions[emotionIndex]

			//当前光标位置
			const cursorIndex = document.querySelector(`#${currentTemplate.id}`).selectionStart

			// 表情框隐藏
			currentTemplate.emotionVisible = false
			if (templateContent) {
				templateContent = templateContent.split('')
				templateContent.splice(cursorIndex, 0, `[${currentEmotion}]`)
				currentTemplate.value = templateContent.join('')
			} else {
				currentTemplate.value = `[${currentEmotion}]`
			}
			this.$emit('change', this.textarea.value)
		},
		change() {
			this.$emit('change', this.textarea.value)
		},
		initial() {
			this.$set(this.textarea, 'value', this.initialValue.value)
		}
	},
	watch: {
		//监听初始值
		initialValue(initial) {
			this.$set(this.textarea, 'value', initial.value)
		}
	},
	created() {
		this.initial()
	}
}
</script>

<style lang="less" scoped>
.textarea {
	flex-grow: 1;
}
.emotion {
	width: 240px;
	background-color: #fff;
	display: flex;
	flex-wrap: wrap;
	border-radius: 6px;
	.emotion-item {
		cursor: pointer;
		&:hover {
			border-radius: 4px;
			background-color: rgba(0, 0, 0, 0.2);
		}
	}
}
</style>