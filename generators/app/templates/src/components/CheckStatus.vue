<template>
	<transition name="modal-fade">
		<div class="modal" v-show="modalVisible" :style="modalStyle" ref="modal">
			<div class="modal-close">
				<a-icon type="close" style="font-size: 16px; color: #8c8c8c" @click="close" />
			</div>
			<div class="modal-des">
				<div class="modal-loading" v-if="modalStatus === 0">
					<a-spin /> <span class="modal-loading-text">微信状态检测中...</span>
				</div>
				<div v-else class="modal-loaded">
					<span class="modal-loaded-name">{{ modalText }}</span>
					<span class="modal-loaded-text"
						>当前状态为：
						<span class="modal-loaded-status">
							<a-badge v-if="modalStatus === 1" color="#44D7B6" text="在线" />
							<a-badge v-if="modalStatus === 2" color="#FF415C" text="离线" />
						</span>
					</span>
				</div>
				<div class="modal-btn" v-if="modalStatus === 2">
					<a-button @click="online">上线</a-button>
				</div>
			</div>
		</div>
	</transition>
</template>

<script>
export default {
	props: ['visible', 'name', 'status'],
	data() {
		return {
			// 弹窗显示
			modalVisible: false,
			// 文本
			modalText: '',
			// 状态 0检测中 1在线 2离线
			modalStatus: 1
		}
	},
	computed: {
		// 弹窗宽度
		modalStyle() {
			return {
				height: this.modalStatus === 2 ? '136px' : '98px',
				width: this.modalStatus === 0 ? '220px' : '320px'
			}
		}
	},
	methods: {
		// 弹窗关闭
		close() {
			this.$emit('close')
		},
		// 上线
		online() {
			this.$emit('online')
		},
		// 滚动监听
		scrollListener() {
			// 滚动条距离顶部距离
			const scrollTop = document.body.scrollTop || document.documentElement.scrollTop
			if (scrollTop <= 230) {
				this.$refs.modal.style.top = 230 - scrollTop + 'px'
			} else {
				this.$refs.modal.style.top = 0 + 'px'
			}
		},
		// 绑定scroll监听事件
		bindScrollListener() {
			window.addEventListener('scroll', this.scrollListener)
		},
		// 移除scroll监听事件
		removeScrollListener() {
			window.removeEventListener('scroll', this.scrollListener)
		}
	},
	mounted() {
		this.bindScrollListener()
	},
	destroyed() {
		this.removeScrollListener()
	},
	watch: {
		// 弹窗显示
		visible: {
			handler(val) {
				this.modalVisible = val
			},
			immediate: true
		},
		// 弹窗文本
		name: {
			handler(val) {
				this.modalText = val
			},
			immediate: true
		},
		// 弹窗状态
		status: {
			handler(val) {
				this.modalStatus = val
			},
			immediate: true
		}
	}
}
</script>

<style lang="less" scoped>
.modal-fade-enter-active,
.fade-leave-active {
	transition: opacity 0.8s;
}
.modal-fade-enter,
.fade-leave-to {
	opacity: 0;
}
.modal {
	position: fixed;
	top: 230px;
	display: flex;
	justify-content: center;
	align-items: center;
	right: 278px;
	background-color: #fff;
	border-radius: 8px;
	box-shadow: 0px 12px 48px 16px rgba(0, 0, 0, 0.03), 0px 9px 28px 0px rgba(0, 0, 0, 0.05),
		0px 6px 16px -8px rgba(0, 0, 0, 0.08);
	z-index: 999;
	.modal-close {
		position: absolute;
		right: 8px;
		top: 8px;
	}
	.modal-des {
		.modal-loading {
			display: flex;
			justify-content: center;
			.modal-loading-text {
				margin-left: 10px;
				color: #999;
			}
		}
		.modal-loaded {
			.modal-loaded-name {
				color: #333;
			}
			.modal-loaded-text {
				margin-left: 6px;
				color: #999;
				.modal-loaded-status {
					margin-left: 8px;
					color: #333;
					/deep/ .ant-badge {
						text-align: center;
						.ant-badge-status-dot {
							width: 8px;
							height: 8px;
						}
					}
				}
			}
		}
		.modal-btn {
			display: flex;
			justify-content: center;
			margin-top: 20px;
			/deep/ .ant-btn {
				width: 124px;
				height: 34px;
				line-height: 34px;
				text-align: center;
				color: #fff;
				background-color: #177dff;
				border-radius: 6px;
				border: none;
			}
		}
	}
}
</style>
