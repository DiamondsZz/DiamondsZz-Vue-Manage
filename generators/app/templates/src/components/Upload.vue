<template>
	<div class="upload">
		<a-upload
			name="file"
			:action="config.upSite"
			:data="{ token: config.token }"
			:showUploadList="false"
			:beforeUpload="beforeUpload"
			@change="uploadChange"
		>
			<div
				v-if="asset"
				class="upload-img"
				:style="{
					backgroundImage: `url(${
						isVideo ? require('@/assets/images/video.png') : asset
					})`
				}"
			></div>
			<div class="upload-icon">
				<a-icon
					:type="loading ? 'loading' : 'plus'"
					style="color: #d5d4d4; fontsize: 14px"
				/>
			</div>
		</a-upload>
	</div>
</template>

<script>
import { handleSevenCattleToken } from '@/api/send'
export default {
	props: {
		initialValue: Object
	},
	data() {
		return {
			// 七牛云配置
			config: {},
			loading: false,
			asset: '',
			//是否视频
			isVideo: false
		}
	},
	methods: {
		//获取七牛云token
		getSevenCattleToken() {
			handleSevenCattleToken()
				.then((res) => {
					if (res.status === 200) {
						this.config = res.data
					} else {
						this.$message.error(res.msg || '获取七牛云token失败')
					}
				})
				.catch((res) => {
					this.$message.error(res.msg || '获取七牛云token失败')
				})
		},
		//图片上传之前
		beforeUpload(file, fileList) {
			//文件大小
			const fileSize = file.size / 1024 / 1024
			//文件类型
			const fileType = file.type


			//文件大小限制
			if (fileSize > 20) {
				this.$message.warning('文件大小应在20M以内')
				return false
			}
			//文件类型限制
			if (!(fileType.includes('image') || fileType.includes('video'))) {
				this.$message.warning('只支持图片和视频上传')
				return false
			}

			return true
		},
		// 图片上传
		uploadChange(info) {
			// 图片正在上传
			if (info.file.status === 'uploading') {
				this.loading = true
				return
			}
			// 图片上传完成
			if (info.file.status === 'done') {
				this.loading = false
				if (info.file.response && info.file.response.hash) {
					this.isVideo = info.file.type === 'video/mp4'
					this.asset = `${this.config.site}/${info.file.response.hash}`
					this.$emit('uploadSuccess', { asset: this.asset, isVideo: this.isVideo })
				}
			}
		},
		initial() {
			this.isVideo = this.initialValue.isVideo
			this.asset = this.initialValue.value
		}
	},
	watch: {
		//监听初始值
		initialValue(initial) {
			this.isVideo = initial.isVideo
			this.asset = initial.value
		}
	},
	created() {
		//获取七牛云token
		this.getSevenCattleToken()
		this.initial()
	}
}
</script>

<style lang="less" scoped>
.upload {
	position: relative;
	width: 82px;
	height: 82px;
	border-radius: 6px;
	border: 1px solid #d5d4d4;
	/deep/ .ant-upload {
		.upload-img {
			background-size: cover;
			background-repeat: no-repeat;
			background-position: center;
			width: 80px;
			height: 80px;
			padding: 2px;
		}
		.upload-icon {
			position: absolute;
			top: 40%;
			left: 40%;
			cursor: pointer;
		}
	}
}
</style>