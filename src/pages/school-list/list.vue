<style type="text/css">
	.alert {
		display: none;
	}
</style>
<template>
	<div class="container">
		<h2 class="heading">Schools & institutions</h2>
		<div class="alert alert-success create">
			School has been created successfully.
		</div>
		<div class="alert alert-success update">
			School has been updated successfully.
		</div>
		<div class="alert alert-danger error">
			Woops! Something went wrong!
		</div>
		<div class="row">
			<div class="col-xs-9 text-left">
				<button class="btn btn-info" v-link="/schools/create">Create School</button>
			</div>
			<div class="col-xs-3">
				<input type="text" class="form-control" placeholder="Search" v-model="search" v-on="keyup: searchChange()">
			</div>
		</div>
		<table class="table table-bordered table-striped">
			<thead>
				<tr>
					<th>Program</th>
					<th><img src="/assets/imgs/gearup-small.png"></th>
					<th><img src="/assets/imgs/speedup-small.png"></th>
					<th class="th-save"></th>
				</tr>
			</thead>
			<tbody>
				<tr v-repeat="school in schools" v-if="!schools.length > 0" track-by="id">
					<td><a v-link="/schools/{{ school.id }}/groups">{{ school.name }}</a></td>
					<td>
						<div class="label-group">
							<label v-repeat="gearup in school.gearups" class="label {{ gearup.bgcolor }}">
								<input type="checkbox" v-model="gearup.checked" v-on="change: school.changed = true">
								{{ gearup.label }}
							</label>
						</div>
					</td>
					<td>
						<div class="label-group">
							<label v-repeat="speedup in school.speedups" class="label {{ speedup.bgcolor }}">
								<input type="checkbox" v-model="speedup.checked" v-on="change: school.changed = true">
								{{ speedup.label }}
							</label>
						</div>
					</td>
					<td><button v-if="!school.changed" class="btn btn-success" v-link="/schools/{{ school.id }}/edit">Edit</button><div class="btn-group" v-if="school.changed"><button class="btn btn-danger" v-on="click: saveRow(school, $index)"><i class="glyphicon glyphicon-ok"></i></button><button class="btn btn-info" v-on="click: cancelRow(school, $index)"><i class="glyphicon glyphicon-remove"></i></button></div></td>
				</tr>
				<tr>
					<td colspan="4" class="text-center" v-if="schools.length == 0">No data to display</td>
				</tr>
			</tbody>
		</table>
		<vuetable-pagination v-ref="school_table" class="pull-right"></vuetable-pagination>
	</div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import VuetablePagination from '../../components/vuetable-pagination.vue'

export default {
	name: "school-list",
	components: {
		VuetablePagination
	},
	data() {
		return {
			perpage: 3,
			paginationData: {
				last_page: 1,
				current_page: 1
			},
			search: "",
			original: [],
			schools: [],
			total_items: 0
		}
	},
	created() {
		this.getSchools().then(data => {
			this.setTablePagination()
		})
		this.$on('onChangePage', this.onChangePage)
	},
	beforeDestroy() {
		this.$off('onChangePage', this.onChangePage)
	},
	methods: {
		getSchools: function() {
			var data = { current_page: this.paginationData.current_page, perpage: this.perpage, search: this.search }
			return new Promise(resolve => {
				axios.post('/api/schools', data)
				.then(response => {
					this.total_items = response.data.total_items
					var schools = response.data.schools
					this.original = JSON.parse(JSON.stringify(schools))
					schools.forEach(x => {
						x.changed = false
					})
					this.schools = JSON.parse(JSON.stringify(schools))
					resolve(response.data)
				})
				.catch(err => {
					console.log(err)
					resolve([])
				})
			})
		},
		setTablePagination: function() {
			var vm = this
			
			setTimeout(function() {
				var pages = Math.ceil(vm.total_items / vm.perpage)

				vm.paginationData.last_page = pages
				vm.$.school_table.setTablePagination(vm.paginationData)
			}, 10)
		},
		onChangePage: function(page) {
			if (page == "prev")
				this.paginationData.current_page = this.paginationData.current_page - 1
			else if (page == "next")
				this.paginationData.current_page = this.paginationData.current_page + 1
			else
				this.paginationData.current_page = page

			this.getSchools().then(data => {
			})
		},
		saveRow: function(school, index) {
			axios.post('/api/schools/update', school)
				.then(response => {
					this.original[index] = JSON.parse(JSON.stringify(school))
					delete this.original[index].changed
					school.changed = false

					this.showAlert('update')
				})
		},
		cancelRow: function(school, school_index) {
			var vm = this
			school.gearups = JSON.parse(JSON.stringify(this.original[school_index].gearups))
			school.speedups = JSON.parse(JSON.stringify(this.original[school_index].speedups))

			school.changed = false
		},
		searchChange: function() {
			this.paginationData.current_page = 1
			this.getSchools().then(data => {
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