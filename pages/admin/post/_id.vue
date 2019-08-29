<template>
	<div class="page-wrap">
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item to="/admin/list">Posts</el-breadcrumb-item>
			<el-breadcrumb-item>{{post.title}}</el-breadcrumb-item>
		</el-breadcrumb>
		<div class="edit-post-form">
			<el-form @submit.native.prevent="onSubmit" :model="controls" :rules="rules" ref="form"  >
				<!--<h1>Login to admin panel</h1>-->
				<el-form-item label="Edit content in format .md or .html" prop="text">
					<el-input
							type="textarea"
							resize="none"
							:rows="10"
							v-model.trim="controls.text
					"></el-input>
				</el-form-item>
				<div class="form-item">
					<small>
						<i class="el-icon-time"></i>
						<span>{{ new Date(post.date).toLocaleString() }}</span>
					</small>
				</div>
				<div class="form-item">
					<small>
						<i class="el-icon-view"></i>
						<span>{{ post.views }}</span>
					</small>
				</div>
				<el-form-item>
					<el-button
							type="primary"
							native-type="submit"
							round
							:loading="loading"
					>
						Update
					</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script>
	export default {
		layout: 'admin',
		middleware: ['admin-auth'],
		head() {
			return {
				title: `${this.post.title} | ${process.env.appName}`
			}
		},
		validate({params}) {
			return Boolean(params.id)
		},
		data () {
			return {
				loading: false,
				controls: {
					text: ''
				},
				rules: {
					text: [
						{ required: true, message: 'Field does not be empty!', trigger: 'blur' }
					]
				}
			}
		},

		async asyncData({store, params}) {
			const post = await store.dispatch('post/fetchAdminById', params.id)
			return {post}
		},
		mounted() {
			this.controls.text = this.post.text
		},
		methods: {
			onSubmit() {
				this.$refs.form.validate(async valid => {
					if (valid) {
						this.loading = true
						const formData = {
							text: this.controls.text,
							id: this.post._id
						}
						try {
							await this.$store.dispatch('post/update', formData)
							this.$message.success('Post was updated')
							this.loading = false
						} catch (e) {
							this.loading = false
						}
					}
				})
			}
		}

	}
</script>

<style lang="sass" scoped>
.page-wrap
	max-width: 700px

.edit-post-form
	padding-top: 30px

.form-item
	margin-bottom: 20px
	small
		span
			margin-left: 0
</style>
