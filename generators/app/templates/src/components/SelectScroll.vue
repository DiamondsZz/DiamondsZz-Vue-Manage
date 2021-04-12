<template>
	<a-select
		class="select"
		@popupScroll="selectScroll"
		@select="getValue"
		:dropdownMenuStyle="{
			height: obj.list.length >= 10 ? '160px' : 'auto'
		}"
		><a-select-option v-for="item in obj.list" :key="item.key">{{
			item.value
		}}</a-select-option></a-select
	>
</template>

<script>
export default {
	props: {
		list: {
			type: Array,
			required: true
		},
		total: {
			type: Number
		}
	},
	data() {
		return {
			obj: {
				selectScrollCurrentPage: 1,
				listLast: [],
				list: [],
				total: 0
			}
		}
	},
	methods: {
		//下拉框滚动事件
		selectScroll(e) {
			//滚动距离顶部的高度
			let scrollTop = e.target.scrollTop
			//滚动区域高度
			let scrollHeight = e.target.scrollHeight
			//滚动可视区域高度
			let height = parseInt(e.target.style.height.replace('px', ''))

			//是否滚动到底部
			if (scrollTop + height === scrollHeight) {
				if (this.obj.listLast.length !== this.obj.list.length) {
					this.$set(
						this.obj,
						'selectScrollCurrentPage',
						++this.obj.selectScrollCurrentPage
					)
					//根据页数请求（限制一波）
					if (this.obj.selectScrollCurrentPage <= Math.ceil(this.obj.total / 10)) {
						this.$emit('scroll', this.obj.selectScrollCurrentPage)
					}
				}
			}
		},

		//获取选中值
		getValue(value) {
			this.$emit('getValue', value)
		}
	},
	watch: {
		list(data) {
			if (data.length) {
				//记录上次滚动获取数据
				this.$set(this.obj, 'listLast', this.obj.list)
				this.$set(this.obj, 'list', [...this.obj.list, ...data])
			} else {
				//状态重置
				this.obj = {
					selectScrollCurrentPage: 1,
					listLast: [],
					list: [],
					total: this.obj.total
				}
			}
		},
		total(val) {
			this.$set(this.obj, 'total', val)
		}
	}
}
</script>

<style lang="less" scoped>
.select {
	width: 100%;
}
</style>