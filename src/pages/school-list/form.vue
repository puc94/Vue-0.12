<template>
	<form class="form-horizontal">
		<div class="form-group">
			<label for="name" class="col-sm-2 control-label">Name</label>
			<div class="col-sm-10">
				<input type="text" class="form-control" id="name" placeholder="Name" v-model="school.name">
			</div>
		</div>
		<div class="form-group">
			<label for="location" class="col-sm-2 control-label">Location</label>
			<div class="col-sm-10">
				<input type="text" class="form-control" id="location" placeholder="Location" v-model="school.location">
			</div>
		</div>
		<div class="form-group">
			<label for="timezone" class="col-sm-2 control-label">Timezone</label>
			<div class="col-sm-10">
				<select class="form-control" id="timezone" v-model="school.timezone" options="timezones">
				</select>
			</div>
		</div>
		<div class="form-group">
			<label for="notes" class="col-sm-2 control-label">Notes</label>
			<div class="col-sm-10">
				<textarea rows="5" placeholder="Notes" id="notes" class="form-control" v-model="school.notes"></textarea>
			</div>
		</div>
		<div class="form-group">
			<div class="col-sm-offset-2 col-sm-10">
				<button type="submit" class="btn btn-info" v-on="click: submit($event)">Save</button>
				<button type="submit" class="btn" v-link="/schools/">Cancel</button>
			</div>
		</div>
	</form>
</template>

<script type="text/javascript">
	import axios from 'axios'
	export default {
		props: {
			school: {
				type: Object,
				required: true
			}
		},
		data() {
			return {
				timezones: []
			}
		},
		created: function () {
			axios.get('/api/schools/getTimezones')
				.then(response => {
					this.timezones = response.data.map(function(value) {
						return { value: value.abbr, text: value.text }
					})
				})
				.catch(err => {
					console.log(err)
				})
		},
		methods: {
			submit(e) {
				e.preventDefault()
				this.$parent.$emit('submit', this.school)
			}
		}
	}
</script>