<template>
	<div class="container-admin">
		<el-container>
			<el-aside width="250px">
				<app-aside></app-aside>
			</el-aside>
			<el-main>
				<nuxt/>
			</el-main>
		</el-container>
	</div>
</template>

<script>

	import AppAside from '@/components/admin/Aside'
	export default {
		components: {
			AppAside
		},
		computed: {
			error() {
				return this.$store.getters.error
			}
		},
		watch: {
			error(value) {
				this.$message.error(value.response.data.message)
			}
		}
	}
</script>

<style lang="sass" scoped>
.container-admin
	width: 100%
	height: 100vh
	section.el-container
		height: 100%
</style>
