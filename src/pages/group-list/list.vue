<style type="text/css">
	.alert {
		display: none;
	}
</style>
<template>
	<div class="container">
		<h2 class="heading">Teachers groups</h2>
		<div class="alert alert-success create">
			Group has been created successfully.
		</div>
		<div class="alert alert-success update">
			Group has been updated successfully.
		</div>
		<div class="alert alert-danger error">
			Woops! Something went wrong!
		</div>
		<div class="row">
			<div class="col-xs-9 text-left">
				<button class="btn btn-info" v-link="/schools/{{ $route.params.school_id }}/groups/create">Create Group</button>
				<button class="btn" v-link="/schools">Back Schools</button>
			</div>
			<div class="col-xs-3">
				<input type="text" class="form-control" placeholder="Search" v-model="search" v-on="keyup: searchChange()">
			</div>
		</div>
		<table class="table table-bordered table-striped">
			<thead>
				<tr>
					<th>Group</th>
					<th><img src="/assets/imgs/gearup-small.png"></th>
					<th><img src="/assets/imgs/speedup-small.png"></th>
					<th class="th-save"></th>
				</tr>
			</thead>
			<tbody>
				<tr v-repeat="group in groups" v-if="!groups.length > 0" track-by="id">
					<td><a>{{ group.name }}</a></td>
					<td>
						<div class="label-group">
							<label v-repeat="gearup in group.gearups" class="label {{ gearup.bgcolor }}">
								<input type="checkbox" v-model="gearup.checked" v-on="change: group.changed = true">
								{{ gearup.label }}
							</label>
						</div>
					</td>
					<td>
						<div class="label-group">
							<label v-repeat="speedup in group.speedups" class="label {{ speedup.bgcolor }}">
								<input type="checkbox" v-model="speedup.checked" v-on="change: group.changed = true">
								{{ speedup.label }}
							</label>
						</div>
					</td>
					<td><button v-if="!group.changed" class="btn btn-success" v-link="/schools/{{ $route.params.school_id }}/groups/{{ group.id }}/edit">Edit</button><div class="btn-group" v-if="group.changed"><button class="btn btn-danger" v-on="click: saveRow(group, $index)"><i class="glyphicon glyphicon-ok"></i></button><button class="btn btn-info" v-on="click: cancelRow(group, $index)"><i class="glyphicon glyphicon-remove"></i></button></div></td>
				</tr>
				<tr>
					<td colspan="4" class="text-center" v-if="groups.length == 0">No data to display</td>
				</tr>
			</tbody>
		</table>
		<vuetable-pagination v-ref="group_table" class="pull-right"></vuetable-pagination>
	</div>
</template>
<script>
import Vue from 'vue'
import axios from 'axios'
import VuetablePagination from '../../components/vuetable-pagination.vue'

export default {
	name: "group-list",
	components: {
		VuetablePagination
	},
	data() {
		return {
			perpage: 3,
			groups: [],
			paginationData: {
				last_page: 1,
				current_page: 1
			},
			search: "",
			original: [],
			groups: [],
			total_items: 0
		}
	},
	created: function() {
		this.getGroups().then(data => {
			this.setTablePagination()
		})
		this.$on('onChangePage', this.onChangePage)
	},
	beforeDestroy() {
		this.$off('onChangePage', this.onChangePage)
	},
	methods: {
		getGroups: function() {
			var data = { school_id: this.$route.params.school_id, perpage: this.perpage, current_page: this.paginationData.current_page, search: this.search }
			return new Promise(resolve => {
				axios.post('/api/groups/', data)
				.then(response => {
					this.total_items = response.data.total_items
					var groups = response.data.groups
					this.original = JSON.parse(JSON.stringify(groups))
					groups.forEach(x => {
						x.changed = false
					})
					this.groups = JSON.parse(JSON.stringify(groups))
					resolve(response.data)
				})
			})
		},
		setTablePagination: function() {
			var vm = this
			
			setTimeout(function() {
				var pages = Math.ceil(vm.total_items / vm.perpage)

				vm.paginationData.last_page = pages
				vm.$.group_table.setTablePagination(vm.paginationData)
			}, 10)
		},
		onChangePage: function(page) {
			if (page == "prev")
				this.paginationData.current_page = this.paginationData.current_page - 1
			else if (page == "next")
				this.paginationData.current_page = this.paginationData.current_page + 1
			else
				this.paginationData.current_page = page

			this.getGroups().then(data => {
			})
		},
		saveRow: function(group, index) {
			axios.post('/api/groups/update', group)
				.then(response => {
					this.original[index] = JSON.parse(JSON.stringify(group))
					delete this.original[index].changed
					group.changed = false

					this.showAlert('update')
				})
		},
		cancelRow: function(group, group_index) {
			var vm = this
			group.gearups = JSON.parse(JSON.stringify(this.original[group_index].gearups))
			group.speedups = JSON.parse(JSON.stringify(this.original[group_index].speedups))

			group.changed = false
		},
		searchChange: function() {
			this.paginationData.current_page = 1
			this.getGroups().then(data => {
				this.setTablePagination()
			})
		},
		showAlert: function(type) {
			var element
			switch(type) {
			case 'create':
				element = '.alert-success.create'
				break
			case 'update':
				element = '.alert-success.update'
				break
			case 'error':
				element = '.alert-danger.error'
				break
			default:
				break
			}

			$(element).slideDown("slow", function() {
				setTimeout(function() {
					$(element).slideUp()
				}, 2000)
			})
		}
	}
}
</script>
