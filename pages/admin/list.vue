<template>
	<div>
		<el-table
				:data="posts"
				style="width: 100%"
		>
			<el-table-column
				prop="title"
				label="Name"
			/>
			<el-table-column
					label="Date">
				<template slot-scope="{row: {date}}">
					<i class="el-icon-time"></i>
					<span style="margin-left: 10px">{{ new Date(date).toLocaleString() }}</span>
				</template>
			</el-table-column>
			<el-table-column prop="views" label="Views">
				<template slot-scope="{row: {views}}">
					<i class="el-icon-view"></i>
					<span style="margin-left: 10px">{{ views }}</span>
				</template>
			</el-table-column>
			<el-table-column prop="comments" label="Comments">
				<template slot-scope="{row: {comments}}">
					<i class="el-icon-chat-line-square"></i>
					<span style="margin-left: 10px">{{ comments.length }}</span>
				</template>
			</el-table-column>
			<el-table-column
					label="Operations">
				<template slot-scope="{row}">
					<el-tooltip effect="dark" content="Edit post" placement="top">
						<el-button
								icon="el-icon-edit"
								type="primary"
								circle
								@click="open(row._id)"
						>
						</el-button>
					</el-tooltip>
					<el-tooltip effect="dark" content="Delete post" placement="top">
						<el-button
								icon="el-icon-delete"
								type="danger"
								circle
								@click="remove(row._id)"
						>
						</el-button>
					</el-tooltip>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>

<script>
	export default {
		layout: 'admin',
		middleware: ['admin-auth'],
		head: {
			title: `All posts | ${process.env.appName}`
		},
		async asyncData({store}) {
			const posts = await store.dispatch('post/fetchAdmin')
			return {posts}
		},

		methods: {
			open(id) {
				this.$router.push(`/admin/post/${id}`)
			},
			async remove(id) {
				try {
					await this.$confirm('Do you want to delete this post?', {
						confirmButtonText: 'Yes',
						cancelButtonText: 'Cancel',
						type: 'warning'
					})

					await this.$store.dispatch('post/remove', id)
					this.posts = this.posts.filter(p => p._id !== id)

					this.$message.success('Post was deleted')
				} catch (e) {

				}

			}
		}
	}
</script>
