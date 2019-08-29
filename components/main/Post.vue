<template>
	<el-card
		shadow="hover"
		:body-style="{padding: 0}"
		class="post"
	>
		<header slot="header" class="post-header">
			<h3>{{post.title}}</h3>
			<span>
				<i class="el-icon-time"></i>
				<small>{{ new Date(post.date).toLocaleDateString() }}</small>
			</span>
		</header>
		<div class="post-body">
			<img :src="post.imageUrl" alt="post-image" class="post-img">
		</div>
		<footer class="post-footer">
			<el-button @click="openPost" type="primary" round>Read more</el-button>
			<span>
				<i class="el-icon-s-comment"></i>
				{{post.comments.length}}
			</span>
		</footer>
	</el-card>
</template>

<script>
	export default {
		props: {
			post: {
				type: Object,
				required: true
			}
		},
		methods: {
			openPost() {
				const id = this.post._id
				this.$router.push(`/post/${id}`)
			}
		}
	}
</script>

<style lang="sass" scoped>
	.post
		min-height: 300px
		border: 1px solid #eee
		margin-bottom: 2rem
	.post-header
		display: flex
		align-items: center
		span
			margin-left: auto
			display: flex
			align-items: center
			i
				font-size: 20px
				display: inline-block
				margin-right: 5px
	.post-body
		height: 100%
		max-height: 420px
		img
			display: inline-block
			max-width: 100%
			width: 100%
			height: auto
	.post-footer
		padding: 20px
		display: flex
		align-items: center
		span
			margin-left: auto
			display: flex
			align-items: center
			i
				font-size: 20px
				display: inline-block
				margin-right: 5px
</style>
