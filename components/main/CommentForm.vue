<template>
	<el-form @submit.native.prevent="onSubmit" :model="controls" :rules="rules" ref="form"  >
		<h1>Add comment</h1>
		<el-form-item label="Your Name" prop="name">
			<el-input v-model="controls.name"></el-input>
		</el-form-item>
		<el-form-item label="Your Comment" prop="text">
			<el-input
					type="textarea"
					v-model="controls.text"
					resize="none"
					:rows="10"
			>

			</el-input>
		</el-form-item>
		<el-form-item>
			<el-button
					type="primary"
					native-type="submit"
					round
					:loading="loading"
			>
				Post comment
			</el-button>
		</el-form-item>
	</el-form>
</template>

<script>
	export default {
		props: {
			postId: {
				type: String,
				required: true
			}
		},
		data () {
			return {
				loading: false,
				controls: {
					name: '',
					text: ''
				},
				rules: {
					name: [
						{ required: true, message: 'Please input Activity name', trigger: 'blur' }
					],
					text: [
						{ required: true, message: 'Please input activity form', trigger: 'blur' }
					]
				}
			}
		},

		methods: {
			onSubmit() {
				this.$refs.form.validate(async valid => {
					if (valid) {
						this.loading = true
						const formData = {
							name: this.controls.name,
							text: this.controls.text,
							postId: this.postId
						}

						try {
							const newComment = await this.$store.dispatch('comment/create', formData)
							this.$message.success('Comment added')
							this.$emit('created', newComment)
						} catch (e) {
							this.loading = false
						}

					}
				});
			}
		}
	}
</script>

<style lang="sass" scoped>

</style>
