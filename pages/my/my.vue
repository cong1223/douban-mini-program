<template>
	<view>
		<view id="aa">
			<graceStar :value="5" :canTap="false"></graceStar>
		</view>
	</view>
</template>

<script>
	import graceStar from "../../graceUI/components/graceStar.vue";
	export default {
		components: {
			graceStar
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">


</style>
