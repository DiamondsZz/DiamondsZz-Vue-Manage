<template>
	<div>
		<a-form class="form" :form="form">
			<a-form-item
				class="form-item"
				v-for="(item, itemIndex) in $attrs.options"
				:key="itemIndex"
				:label="item.label"
				:labelCol="item.labelCol"
				:wrapperCol="item.wrapperCol"
			>
				<a-input v-if="item.type === 1" v-decorator="[item.name, item.config]"></a-input>
				<a-input-number
					v-if="item.type === 2"
					v-decorator="[item.name, item.config]"
				></a-input-number>
				<a-textarea
					v-if="item.type === 3"
					v-decorator="[item.name, item.config]"
				></a-textarea>
			</a-form-item>
		</a-form>
		<slot name="footer"></slot>
	</div>
</template>

<script>
export default {
	props: {
		//是否校验表单
		isChecked: {
			type: Boolean
		},
		//是否重置表单
		isReset: {
			type: Boolean
		}
	},
	data() {
		return {
			form: this.$form.createForm(this)
		}
	},
	watch: {
		//是否校验
		isChecked() {
			this.form.validateFields((err, values) => {
				if (!err) {
					this.$emit('formCheckSuccess', values)
				}
			})
		}, //是否重置
		isReset() {
			this.form.resetFields()
		}
	},
	created() {}
}
</script>

<style lang="less" scoped>
.form-item {
	/deep/ .ant-input-number {
		width: 100%;
	}
	&:nth-last-child(1) {
		margin-bottom: 0;
	}
}
</style>