<template>
	<div class="table">
		<slot name="head"></slot>
		<a-table
			:dataSource="$attrs.options.data"
			:columns="$attrs.options.columns"
			:scroll="$attrs.options.scroll || {}"
			:pagination="false"
			:rowSelection="{
				selectedRowKeys: $attrs.options.selectedRowKeys,
				onChange: $listeners.selectChange
			}"
			rowKey="id"
		>
			<!--标题自定义-->
			<div v-for="(item, itemIndex) in tableTitles" :key="itemIndex" :slot="item.title">
				<div>{{ item.des.title[0] }}</div>
				<div>{{ item.des.title[1] }}</div>
			</div>
			<div
				v-for="(item, itemIndex) in $attrs.options.columns"
				:key="itemIndex"
				:slot="item.scopedSlots.customRender"
				slot-scope="text, record"
			>
				<!--多行显示-->
				<div v-if="item.des && item.des.multiRow && item.des.multiRow.isMultiRowDisplay">
					<div class="table-multirow-item">
						<span
							class="table-multirow-name"
							v-if="item.des.multiRow.isDisplayMultiRowName"
							>{{ item.des.multiRow.fieldsOfMultiRow[0]['name'] }}：</span
						>
						{{
							item.des.multiRow.isTime
								? Day(record[item.des.multiRow.fieldsOfMultiRow[0]['key']]).format(
										'YYYY-MM-DD HH:mm'
								  )
								: record[item.des.multiRow.fieldsOfMultiRow[0]['key']]
						}}
					</div>
					<div class="table-multirow-item">
						<span
							class="table-multirow-name"
							v-if="item.des.multiRow.isDisplayMultiRowName"
							>{{ item.des.multiRow.fieldsOfMultiRow[1]['name'] }}：</span
						>
						{{
							item.des.multiRow.isTime
								? Day(record[item.des.multiRow.fieldsOfMultiRow[1]['key']]).format(
										'YYYY-MM-DD HH:mm'
								  )
								: record[item.des.multiRow.fieldsOfMultiRow[1]['key']]
						}}
					</div>
				</div>
				<!--分类展示-->
				<div
					v-else-if="item.des && item.des.various && item.des.various.isVarious"
					:style="{ color: item.des.various[text]['color'] }"
				>
					{{ item.des.various[text]['name'] }}
				</div>

				<!--时间处理-->
				<div v-else-if="item.des && item.des.isTime">
					<div>{{ text ? Day(text).format('YYYY-MM-DD HH:mm') : '暂无数据' }}</div>
				</div>
				<!--图片-->
				<div v-else-if="item.des && item.des.isImg">
					<a-avatar :src="text ? text : require('@/assets/images/logo.png')" />
				</div>
				<!--文字提示-->
				<div v-else-if="item.des && item.des.tooltip">
					<a-tooltip v-if="item.des.tooltip.isMultipe">
						<template slot="title">
							<div v-for="(item, i) in item.des.tooltip.value" :key="i">
								{{ item.name }}：
								<span v-if="record[item.key].length"
									><span v-for="(value, j) in record[item.key]" :key="j"
										>{{ value }}，</span
									></span
								><span v-else>无</span>
							</div></template
						>
						<a-tag color="blue"> 移入查看 </a-tag>
					</a-tooltip>
				</div>
				<!--普通展示-->
				<div v-else>
					<div
						class="diamonds-ellipsis"
						v-if="item.scopedSlots.customRender !== 'action'"
					>
						{{ text || '暂无数据' }}
					</div>
				</div>

				<!--操作-->
				<div v-if="item.scopedSlots.customRender === 'action'">
					<div v-if="item.des && item.des.actionType === 1">
						<a-popconfirm
							title="是否确定?"
							ok-text="是"
							cancel-text="否"
							@confirm="action"
						>
							<span v-if="record.status === 0" class="table-action-item">同意</span
							><span v-else-if="record.status === 1" class="table-action-item"
								>拒绝</span
							>
						</a-popconfirm>
						<span v-if="record.status === 2">暂无</span>
					</div>
					<div v-if="item.des && item.des.actionType === 2">
						<a-button class="table-action-item" type="primary">查看详情</a-button>
						<a-popconfirm title="是否结束?" ok-text="是" cancel-text="否">
							<span class="table-action-item">结束</span>
						</a-popconfirm>
					</div>

					<!--剧本-->
					<div v-if="item.des && item.des.actionType === 3">
						<span class="table-action-item diamonds-green" @click="action(3, 1, record)"
							>开始执行</span
						><span class="table-action-item diamonds-blue" @click="action(3, 2, record)"
							>编辑</span
						>
						<a-popconfirm
							title="是否确定?"
							ok-text="是"
							cancel-text="否"
							@confirm="action(3, 3, record)"
						>
							<span class="table-action-item diamonds-red">删除</span>
						</a-popconfirm>
					</div>
					<!---->
					<div v-if="item.des && item.des.actionType === 4">
						<a-popconfirm
							title="是否确定?"
							ok-text="是"
							cancel-text="否"
							@confirm="action"
						>
							<span class="table-action-item diamonds-red">删除</span>
						</a-popconfirm>
					</div>

					<div v-if="item.des && item.des.actionType === 5">
						<a-button class="table-action-item" type="primary">查看详情</a-button>
						<a-popconfirm title="是否下架?" ok-text="是" cancel-text="否">
							<span class="table-action-item">下架</span>
						</a-popconfirm>
					</div>

					<div v-if="item.des && item.des.actionType === 6">
						<a-button
							class="table-action-item"
							type="primary"
							@click="action(6, 1, record)"
							>编辑</a-button
						>
						<a-popconfirm
							title="是否删除?"
							ok-text="是"
							cancel-text="否"
							@confirm="action(6, 2, record)"
						>
							<span class="table-action-item diamonds-red">删除</span>
						</a-popconfirm>
					</div>

					<!--淘礼金-->
					<div v-if="item.des && item.des.actionType === 7">
						<a-popconfirm
							title="是否发布活动?"
							ok-text="是"
							cancel-text="否"
							@confirm="action(6, 1, record)"
						>
							<a-button class="table-action-item" type="primary">发布活动</a-button>
						</a-popconfirm>

						<span class="table-action-item diamonds-blue" @click="action(6, 2, record)"
							>查看详情</span
						>

						<a-popconfirm
							title="是否结束?"
							ok-text="是"
							cancel-text="否"
							@confirm="action(6, 3, record)"
						>
							<span class="table-action-item diamonds-red">结束</span>
						</a-popconfirm>

						<a-popconfirm
							title="是否删除?"
							ok-text="是"
							cancel-text="否"
							@confirm="action(6, 4, record)"
						>
							<span class="table-action-item diamonds-red">删除</span>
						</a-popconfirm>
					</div>
					<!---->
				</div>
			</div>
		</a-table>
		<div class="pagination" v-if="$attrs.options.pagination.total">
			<a-pagination
				v-model="$attrs.options.pagination.current"
				:total="$attrs.options.pagination.total"
				@change="$listeners.pageChange"
			/>
		</div>
	</div>
</template>

<script>
import Day from 'dayjs'
export default {
	methods: {
		Day,
		//开始执行
		action(actionType, index, record) {
			//1   同意1拒绝2
			//2   查看详情1结束2
			//3   开始执行1辑2删除3
			//4   删除
			//5   查看详情  下架
			//6   编辑 删除
			//7   发布活动 查看详情 结束 删除
			this.$emit('action', {
				actionType,
				index,
				record
			})
		}
	},
	computed: {
		//表格标题
		tableTitles() {
			return this.$attrs.options.columns
				.filter((item) => item.slots)
				.map((item) => ({ title: item.slots.title, des: item.des }))
		}
	},
	created() {}
}
</script>

<style lang="less" scoped>
.table {
	padding: 15px 15px 0;
	border-radius: 10px;
	background-color: #fff;
	margin: 15px 0;
	.table-multirow-item {
		display: flex;
		justify-content: center;
		margin-bottom: 6px;
		.table-multirow-name {
			flex-shrink: 0;
			display: inline-block;
			width: 48px;
			color: #999999;
			text-align: left;
		}
	}
	.table-action-item {
		font-weight: 500;
		cursor: pointer;
		margin-left: 20px;
	}
	.table-action-agree {
		color: #177dff;
	}
	.table-action-refuse {
		color: #ff415c;
	}
	.table-action-end {
		color: #ff415c;
	}
	.table-action-edit {
	}
	.table-action-sold {
		color: #177dff;
	}
	.table-action-delete {
	}
}

.pagination {
	display: flex;
	justify-content: center;
	padding: 20px;
}
</style>