<template>
	<div class="container">
		<h2 class="heading">Create School</h2>
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
				url: '/api/schools/create',
				school: {
					id: -1,
					"name": "",
					"location": "",
					"timezone": "",
					"notes": "",
					"gearups": {
						"id1": { "id": 1, "label": "1", "checked": false, "bgcolor": "bg-red-800" },
						"id2": { "id": 2, "label": "2", "checked": false, "bgcolor": "bg-red-700" },
						"id3": { "id": 3, "label": "3", "checked": false, "bgcolor": "bg-red-600" },
						"id4": { "id": 4, "label": "4", "checked": false, "bgcolor": "bg-red-500" },
						"id5": { "id": 5, "label": "5", "checked": false, "bgcolor": "bg-red-400" },
						"id6": { "id": 6, "label": "6", "checked": false, "bgcolor": "bg-red-300" }
					},
					"speedups": {
						"id1": { "id": 1, "label": "A1+", "checked": false,"bgcolor": "bg-yellow-300" },
						"id2": { "id": 2, "label": "A2", "checked": false, "bgcolor": "bg-yellow-400" },
						"id3": { "id": 3, "label": "A2+", "checked": false, "bgcolor": "bg-yellow-500" },
						"id4": { "id": 4, "label": "B1", "checked": false, "bgcolor": "bg-yellow-600" },
						"id5": { "id": 5, "label": "B1+", "checked": false, "bgcolor": "bg-yellow-700" },
						"id6": { "id": 6, "label": "B2", "checked": false, "bgcolor": "bg-yellow-800" },
						"id7": { "id": 7, "label": "B2+", "checked": false, "bgcolor": "bg-yellow-800" },
						"id8": { "id": 8, "label": "C1", "checked": false, "bgcolor": "bg-yellow-800" },
						"id9": { "id": 9, "label": "C1+", "checked": false, "bgcolor": "bg-yellow-800" }
					}
				}
			}
		},
		created() {
			this.$on('submit', this.submit)
		},
		beforeDestroy() {
			this.$off('submit', this.submmit)
		},
		methods: {
			submit(school) {
				axios.post(this.url, school)
					.then(response => {
						this.$dispatch('create_school')
						this.$route.router.go('/schools')
					})
					.catch(err => {
						console.log(err)
					})
			},
		}
	}
</script>