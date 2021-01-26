<template>
	<div>
		<a-cascader
			v-model="area"
			:options="areaOptions"
			expand-trigger="hover"
			placeholder="请选择地区"
		/>
	</div>
</template>

<script>
import { area as areas } from './areas'
export default {
	props: {
		//是否触发
		isTrigger: {
			type: Boolean
		}
	},
	data() {
		return {
			//地区选项
			areaOptions: [],
			area: []
		}
	},
	watch: {
		//是否触发
		isTrigger() {
			this.$emit('getData', this.area)
		}
	},
	methods: {
		//转换地区格式
		transformArea() {
			areas.forEach((province, provinceItem) => {
				this.areaOptions.push({
					label: province.name,
					value: province.name,
					children: []
				})
				//市
				if (province.city) {
					province.city.forEach((city, cityItem) => {
						this.areaOptions[provinceItem].children.push({
							label: city.name,
							value: city.name,
							children: []
						})
						//区
						if (city.area) {
							city.area.forEach((area, areaItem) => {
								this.areaOptions[provinceItem].children[cityItem].children.push({
									label: area,
									value: area
								})
							})
						}
					})
				}
			})
		}
	},
	created() {
		this.transformArea()
	}
}
</script>

<style>
</style>