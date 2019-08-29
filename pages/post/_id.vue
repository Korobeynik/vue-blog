<template>
	<article class="post">
		<header class="post-header">
			<div class="post-title">
				<h1>{{post.title}}</h1>
				<nuxt-link to="/">
					<i class="el-icon-back"></i>
				</nuxt-link>
			</div>
			<div class="post-info">
				<span>
					<i class="el-icon-time"></i>
					<small>{{ new Date(post.date).toLocaleDateString() }}</small>
				</span>
				<span class="post-view">
					<i class="el-icon-view"></i>
					<div>{{post.views}}</div>
				</span>
			</div>
			<div class="post-img">
				<img :src="post.imageUrl" alt="">
			</div>
		</header>
		<main class="post-content">
			<vue-markdown>{{post.text}}</vue-markdown>
		</main>
		<footer>
			<app-comment-form
					v-if="addComment"
					@created="createCommentHandler"
					:postId="post._id"
			></app-comment-form>
			<div class="comments" v-if="post.comments.length">
				<app-comment
					v-for="comment in post.comments"
					:key="comment._id"
					:comment="comment"
				>

				</app-comment>
			</div>
			<div v-else class="text-center">No comments</div>
		</footer>
	</article>
</template>

<script>
	import AppComment from '@/components/main/Comment'
	import AppCommentForm from '@/components/main/CommentForm'
	export default {
		validate({params}) {
			return Boolean(params.id)
		},
		head() {
			return {
				title: `${this.post.title} | ${process.env.appName}`
			}
		},
		async asyncData({store,params}) {
			const post = await store.dispatch('post/fetchById', params.id)
			await store.dispatch('post/addView', post)
			return {post}
		},
		data() {
			return {
				addComment: true
			}
		},
		methods: {
			createCommentHandler() {
				this.addComment = false
			}
		},
		components: {
			AppComment,
			AppCommentForm
		}
	}
</script>

<style lang="sass" scoped>
.post
	max-width: 600px
	margin: auto
.post-title
	width: 100%
	display: flex
	align-items: center
	justify-content: space-between
	margin-bottom: 10px
	i
		font-size: 20px
		color: #409EFF
.post-info
	display: flex
	justify-content: space-between
	padding-bottom: 10px
	span
		display: flex
		align-items: center
	i
		font-size: 20px
		margin-right: 5px
.post-view
	div
		font-size: 14px
.post-img
	margin-bottom: 20px
	img
		max-width: 100%
.post-content
	line-height: 1.4
	margin-bottom: 40px
	p
		margin-bottom: 20px
	img
		width: 100%
		max-width: 100%
</style>
