<template>
	<div class="error-layout">
		<div class="error-content">
			<h1 class="error-title">ERROR 404</h1>
			<nuxt-link to="/">
				<el-button type="primary" round>Go Home</el-button>
			</nuxt-link>
		</div>
	</div>
</template>

<style lang="sass" scoped>
	.error-layout
		display: flex
		align-items: center
		justify-content: center
		width: 100%
		height: 100vh
	.error-content
		width: 100%
		text-align: center
		h1
			margin-bottom: 20px
</style>
