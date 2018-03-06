<template>
	<form class="form-horizontal">
		<div class="form-group">
			<label for="name" class="col-sm-2 control-label">Name</label>
			<div class="col-sm-10">
				<input type="text" class="form-control" id="name" placeholder="Name" v-model="group.name">
			</div>
		</div>
		<div class="form-group">
			<label for="location" class="col-sm-2 control-label">Location</label>
			<div class="col-sm-10">
				<input type="text" class="form-control" id="location" placeholder="Location" v-model="group.location">
			</div>
		</div>
		<div class="form-group">
			<label for="timezone" class="col-sm-2 control-label">Timezone</label>
			<div class="col-sm-10">
				<select class="form-control" id="timezone" v-model="group.timezone" options="timezones">
				</select>
			</div>
		</div>
		<div class="form-group">
			<label for="members" class="col-sm-2 control-label">
				Members
			</label>
			<div class="col-sm-10">
				<ul v-if="group.users.length > 0">
					<li v-repeat="user_id in group.users" style="margin-bottom: 5px">
						{{ getUserName(user_id) }} <button class="btn" v-on="click: removeUser(user_id, $event)">Remove</button>
					</li>
				</ul>
				<p v-if="group.users.length == 0">No members registered</p>
			</div>
		</div>
		<div class="form-group">
			<label for="add_user" class="col-sm-2 control-label">
				Add a user
			</label>
			<div class="col-sm-10">
				<div class="row">
					<div class="col-sm-10">
						<select class="form-control" id="user" v-model="new_user" options="users">
							<option></option>
						</select>
					</div>
					<div class="col-sm-2">
						<button class="btn btn-primary" v-on="click: addUser($event)">Add</button>
					</div>
				</div>
			</div>
		</div>
		<div class="form-group">
			<div class="col-sm-offset-2 col-sm-10">
				<button type="submit" class="btn btn-info" v-on="click: submit($event)">Save</button>
				<button type="submit" class="btn" v-link="/schools/{{ $route.params.school_id }}/groups/">Cancel</button>
			</div>
		</div>
	</form>
</template>

<script type="text/javascript">
	import axios from 'axios'
	export default {
		props: {
			group: {
				type: Object,
				required: true
			}
		},
		data() {
			return {
				timezones: [],
				users: [],
				new_user: ''
			}
		},
		created: function () {
			axios.get('/api/groups/getTimezonesAndUsers')
				.then(response => {
					this.timezones = response.data.timezones.map(function(value) {
						return { value: value.abbr, text: value.text }
					})

					var text = ""
					this.users = response.data.users.map(function(value) {
						text = value.prenom + ' ' + value.nom + ' (' + value.email + ')'
						return { value: value.id, text: text }
					})
				})
				.catch(err => {
					console.log(err)
				})
		},
		methods: {
			submit(e) {
				e.preventDefault()
				this.$parent.$emit('submit', this.group)
			},
			addUser: function(e){
				e.preventDefault()
				if (this.new_user == '') alert('You must select user')
				else {
					var user_id = Number(this.new_user)
					if (this.group.users.indexOf(user_id) != -1) alert('User already added')
					else {
						this.group.users.push(user_id)
					}
				}
			},
			removeUser: function(user_id, e){
				e.preventDefault()
				var index = this.group.users.indexOf(user_id)
				this.group.users.splice(index, 1)
			},
			getUserName: function(user_id) {
				var user = this.users.filter(function(value) {
					return value.value == user_id
				})[0]
				return user.text
			}
		},
	}
</script>