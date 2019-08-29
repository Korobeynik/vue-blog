<template>
	<el-card class="comment">
		<div class="comment-header">
			<span>{{comment.name}}</span>
			<span class="comment-time">
				<i class="el-icon-time"></i>
				<small>{{ new Date(comment.date).toLocaleString() }}</small>
			</span>
		</div>
		<div class="comment-text">{{comment.text}}</div>
	</el-card>
</template>

<script>
	export default {
		props: {
			type: Object,
			required: true
		}
	}
</script>

<style lang="sass" scoped>
	.comment
		margin-bottom: 20px
	.comment-header
		display: flex
		align-items: center
		justify-content: space-between
		margin-bottom: 20px
		span
			font-size: 14px
			i
				font-size: 20px
	.comment-text
		white-space: pre-line
		font-size: 14px
	.comment-time
		display: flex
		align-items: center
		i
			margin-right: 5px
			font-size: 15px !important
</style>
