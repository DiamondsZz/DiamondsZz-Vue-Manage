<template>
	<div class="upload">
		<div class="items" v-if="fileList.length">
			<div class="item" v-for="(item, i) in fileList" :key="i">
				<a-avatar shape="square" :size="64" :src="item.src"> </a-avatar>
				<a-icon type="close-circle" class="item-delete" @click="imgDelete(i)" />
			</div>
		</div>

		<a-upload
			v-if="fileList.length < 6"
			name="file"
			:action="config.upSite"
			:data="{ token: config.token }"
			:showUploadList="false"
			:beforeUpload="beforeUpload"
			@change="uploadChange"
		>
			<a-icon :type="loading ? 'loading' : 'plus'" style="color: #d5d4d4; fontsize: 14px" />
		</a-upload>
	</div>
</template>

<script>
import { handleSevenCattleToken } from '@/api/send'
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
			// 七牛云配置
			config: {},
			loading: false,
			fileList: []
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
			if (!fileType.includes('image')) {
				this.$message.warning('只支持图片上传')
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
					this.fileList.push({
						src: `${this.config.site}/${info.file.response.hash}`
					})
					this.$emit('uploadSuccess', this.fileList)
				}
			}
		},
		//图片删除
		imgDelete(i) {
			this.fileList.splice(i, 1)
		},
		initial() {
			this.fileList = this.initialValue.value || []
		}
	},
	watch: {
		//监听初始值
		initialValue(initial) {
			this.fileList = initial.value
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
	display: flex;
	.items {
		display: flex;
		align-items: center;
		/deep/ .ant-avatar {
			margin-right: 20px;
		}
		.item {
			position: relative;
			.item-delete {
				position: absolute;
				top: -5px;
				right: 15px;
			}
		}
	}
	/deep/ .ant-upload-select {
		border: 1px solid #d5d4d4;
	}
	/deep/ .ant-upload {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 68px;
		height: 68px;
		border-radius: 6px;
	}
}
</style>