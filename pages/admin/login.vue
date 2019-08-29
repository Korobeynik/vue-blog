<template>
	<el-card
		shadow="always"
		:style="{width: '500px'}"
	>
		<el-form @submit.native.prevent="onSubmit" :model="controls" :rules="rules" ref="form"  >
			<h1>Login to admin panel</h1>
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
					Log in
				</el-button>
			</el-form-item>
		</el-form>
	</el-card>
</template>

<script>
	export default {
		layout: 'empty',
		head: {
			title: `Login | ${process.env.appName}`
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
		mounted() {
			const {message} = this.$route.query

			switch (message) {
				case 'login':
					this.$message.info('First log in admin panel')
					break
				case 'logout':
					this.$message.success('You logged out of the admin panel')
					break
				case 'session':
					this.$message.warning('Session timed out')
					break
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

							await this.$store.dispatch('auth/login', formData)
							this.$router.push('/admin')
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

.el-card__body
	width: 100%
	max-width: 500px

h1
	text-align: center
	padding: 20px 0

.item-password
	margin-bottom: 30px

</style>
