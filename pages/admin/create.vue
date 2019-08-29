<template>
	<div class="create-post">
		<el-form @submit.native.prevent="onSubmit" :model="controls" :rules="rules" ref="form"  >
			<h1>Create new  post</h1>
			<el-form-item label="Enter post title" prop="title">
				<el-input
						v-model="controls.title"
				></el-input>
			</el-form-item>
			<el-form-item label="Create content in format .md or .html" prop="text">
				<el-input
						type="textarea"
						resize="none"
						:rows="10"
						v-model="controls.text"
				></el-input>
			</el-form-item>

			<div class="preview-button">
				<el-button type="success" plain @click="previewContent = true">Preview</el-button>
			</div>

			<el-dialog
				title="Preview" :visible.sync="previewContent">
				<div :key="controls.text">
					<vue-markdown>{{controls.text}}</vue-markdown>
				</div>
			</el-dialog>

			<div class="upload-image">
				<el-upload
						drag
						action="https://jsonplaceholder.typicode.com/posts/"
						:on-change="handleImageChange"
						:auto-upload="false"
						ref="upload"
						>
					<i class="el-icon-upload"></i>
					<div class="el-upload__text">Drop file here or <em>click to upload</em></div>
					<div class="el-upload__tip" slot="tip">jpg/png files with a size less than 500kb</div>
				</el-upload>
			</div>

			<el-form-item>
				<el-button
						type="primary"
						native-type="submit"
						round
						:loading="loading"
				>
					Create post
				</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	export default {
		layout: 'admin',
		middleware: ['admin-auth'],
		head: {
			title: `Create new post | ${process.env.appName}`
		},
		data () {
			return {
				image: null,
				previewContent: false,
				loading: false,
				controls: {
					text: '',
					title: ''
				},
				rules: {
					text: [
						{ required: true, message: 'Field does not be empty!', trigger: 'blur' }
					],
					title: [
						{ required: true, message: 'Field does not be empty!', trigger: 'blur' }
					]
				}
			}
		},
		methods: {
			onSubmit() {
				this.$refs.form.validate(async valid => {
					if (valid && this.image) {
						this.loading = true

						const formData = {
							title: this.controls.title,
							text: this.controls.text,
							image: this.image
						}

						try {
							await this.$store.dispatch('post/create', formData)
							this.controls.text = ''
							this.controls.title = ''
							this.image = null
							this.$refs.upload.clearFiles()
							this.$message.success('Post was created')
						} catch (e) {} finally {
							this.loading = false
						}

					} else {
						this.$message.warning('Form not valid')
					}
				})
			},

			handleImageChange(file, fileList) {
				this.image = file.raw
			}
		}
	}
</script>

<style lang="sass" scoped>
h1
	margin-bottom: 20px
.create-post
	max-width: 700px

.preview-button
	margin-top: 30px
	margin-bottom: 20px

.upload-image
	margin-bottom: 30px
</style>
