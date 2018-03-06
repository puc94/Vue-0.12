<template>
	<div class="container">
		<h2 class="heading">Edit Group</h2>
		<group-form group="{{ group }}"></group-form>
	</div>
</template>

<script type="text/javascript">
	import axios from 'axios'
	import GroupForm from './form.vue'

	export default {
		components: { GroupForm },
		data() {
			return {
				url: '/api/groups/update',
				group: {}
			}
		},
		created() {
			this.$on('submit', this.submit)

			axios.get('/api/groups/' + this.$route.params.id)
				.then(response => {
					this.group = response.data
				})
				.catch(err => {
					console.log(err)
				})
		},
		beforeDestroy() {
			this.$off('submit', this.submmit)
		},
		methods: {
			submit(group) {
				axios.post(this.url, group)
					.then(response => {
						this.$route.router.go('/schools/' + this.$route.params.school_id +'/groups')
					})
					.catch(err => {
						console.log(err)
					})
			},
		}
	}
</script>