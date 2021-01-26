<template>
	<div class="items">
		<div class="item" v-for="(item, itemIndex) in $attrs.options" :key="itemIndex">
			<span class="item-name">{{ item.name }}</span
			>：
			<a-input
				class="item-action item-action-inp"
				v-if="item.type === 1"
				v-model.trim="item.value"
				:placeholder="item.placeholder"
			></a-input>

			<a-select
				class="item-action item-action-select"
				v-if="item.type === 2"
				v-model="item.value"
				:placeholder="item.placeholder"
			>
				<a-select-option
					v-for="(selectItem, selectItemIndex) in item.options"
					:key="selectItemIndex"
					:value="selectItem.key"
				>
					{{ selectItem.value }}
				</a-select-option>
			</a-select>
			<a-range-picker
				v-model="item.value"
				class="item-action item-action-range"
				v-if="item.type === 3"
				show-time
				format="YYYY-MM-DD HH:mm"
				:placeholder="item.placeholder"
			/>
		</div>
		<div class="item-btns">
			<a-button type="primary" @click="search">查询</a-button>
			<a-button class="item-btn-reset" @click="reset">重置</a-button>
		</div>
	</div>
</template>

<script>
/**
 * 1: input
 * 2: select
 * 3: range-picker
 */
import Day from 'dayjs'

export default {
	data() {
		return {}
	},
	methods: {
		//转换数值
		transformValue(type, value) {
			//日期选择框
			if (type === 3) {
				return [
					Day(value[0]).format('YYYY-MM-DD HH:mm'),
					Day(value[1]).format('YYYY-MM-DD HH:mm')
				]
			} else {
				return value
			}
		},
		//搜索
		search() {
			//搜索参数
			let params = {}
			for (const item of this.$attrs.options) {
				params = {
					...params,
					...{ [item.field]: this.transformValue(item.type, item.value) }
				}
			}

			this.$listeners.search(params)
		},
		//重置
		reset() {
			//数据重置
			for (let item of this.$attrs.options) {
				//日期选择框
				if (item.type === 3) {
					this.$set(item, 'value', [])
				} else {
					this.$set(item, 'value', '')
				}
			}
			this.$listeners.reset()
		}
	},
	created() {}
}
</script>

<style lang="less" scoped>
.items {
	display: flex;
	align-items: center;
	flex-wrap: wrap;
	padding: 24px 24px 0;
	border-radius: 10px;
	background-color: #fff;
	.item {
		display: flex;
		align-items: center;
		margin-right: 45px;
		margin-bottom: 24px;
		.item-name {
			flex-shrink: 0;
		}
		.item-action {
		}
		.item-action-inp {
			width: 120px;
		}
		.item-action-select {
			width: 250px;
		}
		.item-action-inp {
			width: 200px;
		}
	}
	.item-btns {
		margin-bottom: 24px;
		/deep/ .ant-btn {
			width: 70px;
			margin-right: 20px;
		}
		.item-btn-reset {
			background-color: #e9e9e9;
			color: #fff;
			border: none;
		}
	}
}
</style>