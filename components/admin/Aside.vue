<template>
	<el-menu
			router
			:default-active="$route.path"
			class="el-menu-vertical-demo"
			@open="handleOpen"
			@close="handleClose">
		<el-menu-item index="/admin">
			<i class="el-icon-s-data"></i>
			<span>Analytics</span>
		</el-menu-item>
		<el-menu-item index="/admin/create">
			<i class="el-icon-s-management"></i>
			<span>Create post</span>
		</el-menu-item>
		<el-menu-item index="/admin/list">
			<i class="el-icon-s-grid"></i>
			<span>All posts</span>
		</el-menu-item>
		<el-menu-item index="/admin/user">
			<i class="el-icon-user-solid"></i>
			<span>Users</span>
		</el-menu-item>
		<el-menu-item index="/admin/logout">
			<i class="el-icon-caret-left"></i>
			<span>Exit</span>
		</el-menu-item>
	</el-menu>
</template>

<script>
	export default {
		methods: {
			handleOpen(key, keyPath) {
				console.log(key, keyPath);
			},
			handleClose(key, keyPath) {
				console.log(key, keyPath);
			}
		}
	}
</script>

<style lang="sass" scoped>

.el-menu
	height: 100%

</style>
