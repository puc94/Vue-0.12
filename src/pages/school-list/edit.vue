<template>
	<div class="container">
		<h2 class="heading">Edit School</h2>
		<school-form school="{{ school }}"></school-form>
	</div>
</template>

<script type="text/javascript">
	import axios from 'axios'
	import SchoolForm from './form.vue'

	export default {
		components: { SchoolForm },
		data() {
			return {
				url: '/api/schools/update',
				school: {}
			}
		},
		created() {
			this.$on('submit', this.submit)

			axios.get('/api/schools/' + this.$route.params.id)
				.then(response => {
					this.school = response.data
				})
				.catch(err => {
					console.log(err)
				})
		},
		beforeDestroy() {
			this.$off('submit', this.submmit)
		},
		methods: {
			submit(school) {
				axios.post(this.url, school)
					.then(response => {
						this.$route.router.go('/schools')
					})
					.catch(err => {
						console.log(err)
					})
			},
		}
	}
</script>