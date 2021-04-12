<template>
	<div class="select-element">
		<span class="diamonds-blue" @click="handleElementSelect">点击选择>>></span>

		<!-- 元素选择-->
		<a-modal
			id="select-modal"
			class="select-modal"
			:title="'选择' + $attrs.tag"
			:width="810"
			:centered="true"
			v-model="elementSelectVisible"
			:getContainer="() => mountModal('.select-element')"
		>
			<div class="select-modal-action" v-if="$attrs.isDisplaySearch">
				<div class="select-modal-action-search">
					<a-input
						v-model="searchVal"
						:placeholder="'请输入' + $attrs.tag + '名称'"
						@change="searchInput"
					></a-input>
				</div>

				<div class="select-modal-action-btns">
					<a-button @click="search">搜索</a-button
					><a-button @click="reset">重置</a-button>
				</div>
			</div>

			<div
				class="select-modal-item"
				v-for="(element, elementIndex) in elements"
				:key="elementIndex"
			>
				<div v-if="element.value.length > 0">
					<div class="select-modal-item-til">
						{{ element.key }}
						<a-checkbox
							:checked="element.checked"
							@change="elementChange($event, elementIndex)"
						>
							全选
						</a-checkbox>
					</div>
					<div class="select-modal-item-elements">
						<a-tag
							class="select-modal-item-elements-item diamonds-ellipsis"
							:class="{
								'select-modal-item-elements-item-active': elementItem.checked
							}"
							v-for="(elementItem, elementItemIndex) in element.value"
							:key="elementItemIndex"
							@click="elementSelect(elementItem, elementItemIndex, elementIndex)"
							>{{ elementItem.name }}</a-tag
						>
					</div>
				</div>
			</div>

			<div slot="footer" class="select-modal-footer">
				<a-button class="select-modal-footer-btn" @click="confirmElementSelect"
					>确定</a-button
				>
			</div>
		</a-modal>
	</div>
</template>

<script>
import { mountModal } from '@/utils/common'
export default {
	props: {
		data: {
			type: Array,
			required: true
		},
		initialValue: {
			type: Array
		}
	},
	data() {
		return {
			elementSelectVisible: false,
			// 搜索条件
			searchVal: '',
			//元素  [{key,value:[{id,name}]}]
			elements: [],
			//被选择的
			elementsSelected: []
		}
	},
	methods: {
		mountModal,

		// 元素选择
		handleElementSelect() {
			this.$emit('select')
		},
		//获取到数据后
		afterGetData() {
			//元素选择状态设置
			for (let element of this.elements) {
				if (element.value.length > 0) {
					for (let elementItem of element.value) {
						for (let elementSelect of this.elementsSelected) {
							if (elementSelect.id === elementItem.id) {
								const elementIndex = this.elements.findIndex(
									(item) => item.key === element.key
								)
								this.$set(elementItem, 'checked', true)
								// 监听元素选中
								this.watchElementsChecked(elementIndex)
							}
						}
					}
				}
			}
		},
		// 监听元素选中
		watchElementsChecked(elementIndex) {
			// 是否元素被全部选中
			const isCheckedAll = this.elements[elementIndex].value.every(
				(element) => element.checked
			)
			this.$set(this.elements[elementIndex], 'checked', isCheckedAll)
		},
		// 元素选择
		elementSelect(elementItem, elementItemIndex, elementIndex) {
			if (!elementItem.checked) {
				this.$set(elementItem, 'checked', true)
			} else {
				this.$set(elementItem, 'checked', !elementItem.checked)
			}
			// 监听元素选中
			this.watchElementsChecked(elementIndex)
		},
		// 元素全选
		elementChange(checkedValue, elementIndex) {
			this.$set(this.elements[elementIndex], 'checked', checkedValue.target.checked)
			for (const element of this.elements[elementIndex].value) {
				this.$set(element, 'checked', checkedValue.target.checked)
			}
		}, // 输入搜索条件时
		searchInput() {
			this.elementReset()
		},
		// 搜索
		search() {
			this.$emit('search', this.searchVal)
		},
		// 重置
		reset() {
			this.searchVal = ''
			this.elementReset()
			this.search()
		},
		// 全选状态重置
		elementReset() {
			for (const element of this.elements) {
				this.$set(element, 'checked', false)
				if (element.value.length > 0) {
					for (const elementItem of element.value) {
						this.$set(elementItem, 'checked', false)
					}
				}
			}
		}, // 确认元素选择
		confirmElementSelect() {
			for (const element of this.elements) {
				if (element.value.length > 0) {
					for (const elementItem of element.value) {
						//是否已经添加
						let isAlreadyPush
						isAlreadyPush = this.elementsSelected.some(
							(item) => item.id === elementItem.id
						)
						//保存已选元素
						if (elementItem.checked && !isAlreadyPush)
							this.elementsSelected.push(elementItem)
						//清除未选元素
						if (!elementItem.checked && isAlreadyPush) {
							let elementIndex
							elementIndex = this.elementsSelected.findIndex(
								(item) => item.id === elementItem.id
							)
							this.elementsSelected.splice(elementIndex, 1)
						}
					}
				}
			}
			this.elementSelectVisible = false

			//提交数据
			this.$emit('confirmSelect', this.elementsSelected)
		}
	},
	watch: {
		data(data) {
			this.elements = data
			this.elementSelectVisible = true
		},
		//初始值
		initialValue: {
			handler(val) {
				this.elementsSelected = val
				this.afterGetData()
			},
			immediate: true
		}
	},
	created() {}
}
</script>

<style lang="less" scoped>
.select-element {
	cursor: pointer;
}

//选择弹窗
#select-modal {
	/deep/ .ant-modal {
		border-radius: 16px;
		.ant-modal-content {
			border-radius: 16px;
			.ant-modal-header {
				border-radius: 16px 16px 0 0;
			}
			.ant-modal-body {
				padding: 28px 20px;
				.select-modal-action {
					display: flex;
					flex-wrap: wrap;
					align-items: center;
					.select-modal-action-search {
						width: 560px;
						margin-right: 20px;
						margin-bottom: 24px;
						/deep/ .ant-input {
							height: 40px;
							background-color: #f8f8f8;
							border: none;
							font-size: 14px;
							border-radius: 6px;
							//ant-design输入框聚焦样式通过box-shadow设置
							&:focus {
								box-shadow: none;
							}
						}
					}
					.select-modal-action-btns {
						/deep/ .ant-btn {
							width: 80px;
							height: 34px;
							text-align: center;
							line-height: 34px;
							background-color: #177dff;
							color: #fff;
							border: none;
							margin-bottom: 24px;
							&:nth-child(1) {
								margin-right: 20px;
							}
						}
					}
				}
				.select-modal-item {
					.select-modal-item-til {
						font-size: 16px;
						color: #333;
						font-weight: 500;
						margin: 0px 0 20px;
						/deep/ .ant-checkbox-wrapper {
							margin-left: 20px;
						}
					}
					.select-modal-item-elements {
						display: flex;
						flex-wrap: wrap;
						.select-modal-item-elements-item {
							width: 176px;
							height: 34px;
							text-align: center;
							line-height: 14px;
							font-size: 13px;
							color: #999;
							padding: 10px;
							background-color: #f6f6f6;
							border: none;
							cursor: pointer;
							margin-bottom: 20px;
						}
						.select-modal-item-elements-item-active {
							border: 2px solid #177dff;
							color: #177dff;
							line-height: 10px;
						}
					}
				}
			}
			.ant-modal-footer {
				padding: 32px 36px;
				.select-modal-footer {
					display: flex;
					justify-content: center;
					.select-modal-footer-btn {
						width: 282px;
						height: 42px;
						padding: 0;
						text-align: center;
						line-height: 42px;
						font-size: 14px;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #fff;
						border: none;
						&:nth-child(1) {
							background-color: #177dff;
						}
					}
				}
			}
		}
	}
}
</style>