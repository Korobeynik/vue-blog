<template>
	<div class="wrapper">
		<el-form @submit.native.prevent="onSubmit" :model="controls" :rules="rules" ref="form"  >
			<h1>Create new user</h1>
			<el-form-item label="Login" prop="login">
				<el-input v-model.trim="controls.login"></el-input>
			</el-form-item>
			<div class="item-password">
				<el-form-item label="Password" prop="password">
					<el-input
							v-model.trim="controls.password"
							resize="none"
							type="password"
					>
					</el-input>
				</el-form-item>
			</div>
			<el-form-item>
				<el-button
						type="primary"
						native-type="submit"
						round
						:loading="loading"
				>
					Create
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
			title: `Create new user | ${process.env.appName}`
		},
		data () {
			return {
				loading: false,
				controls: {
					login: '',
					password: ''
				},
				rules: {
					login: [
						{ required: true, message: 'Login is required', trigger: 'blur' }
					],
					password: [
						{ required: true, message: 'Password is required', trigger: 'blur' },
						{ min: 6, message: '6 characters minimum',  trigger: 'blur'}
					]
				}
			}
		},
		methods: {
			onSubmit() {
				this.$refs.form.validate(async valid => {
					if (valid) {
						this.loading = true

						try {
							const formData = {
								login: this.controls.login,
								password: this.controls.password
							}

							await this.$store.dispatch('auth/createUser', formData)
							this.$message.success('New user was added!')
							this.controls.login = ''
							this.controls.password = ''
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
.wrapper
	max-width: 500px
</style>
