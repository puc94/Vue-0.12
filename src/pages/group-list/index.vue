<template>
	<div class="container">
		<h2 class="heading">Teachers groups</h2>
		<label class="label bg-primary full-width">
			Working with teams within your organization
		</label>
		<div>
			Teams are group of teachers that are able to share content, Quiz, classes
		</div>
		<table class="table table-stripped">
			<thead>
				<tr>
					<th colspan="2" class="text-center">Group List</th>
				</tr>
			</thead>
			<tbody>
				<tr v-repeat="group in filteredGroups" track-by="id">
					<td class="text-center">{{ group.name }}</td>
					<td>
						<button class="btn">Edit</button>
						<button class="btn">Remove</button>
					</td>
				</tr>
			</tbody>
		</table>
		<vuetable-pagination class="pull-right"></vuetable-pagination>
	</div>
</template>
<script>
import Vue from 'vue'
import VuetablePagination from '../../components/vuetable-pagination.vue'

export default {
	name: "group-list",
	components: {
		VuetablePagination
	},
	data() {
		return {
			perpage: 3,
			groups: [
				{id: 1, name: "School 001 (Professors)"},
				{id: 2, name: "School 002 (Professors)"},
				{id: 3, name: "School 003 (Professors)"},
				{id: 4, name: "School 004 (Professors)"},
				{id: 5, name: "School 005 (Professors)"},
				{id: 6, name: "School 006 (Professors)"},
				{id: 7, name: "School 007 (Professors)"},
				{id: 8, name: "School 008 (Professors)"},
				{id: 9, name: "School 009 (Professors)"},
				{id: 10, name: "School 010 (Professors)"},
				{id: 11, name: "School 011 (Professors)"},
				{id: 12, name: "School 012 (Professors)"},
				{id: 13, name: "School 013 (Professors)"},
				{id: 14, name: "School 014 (Professors)"},
				{id: 15, name: "School 015 (Professors)"},
				{id: 16, name: "School for Tests (Professors)"},
				{id: 17, name: "All Schools (Professors)"}
			],
			filteredGroups: [],
			paginationData: {
				last_page: 1,
				current_page: 1
			}
		}
	},
	created: function() {
		this.setTableItems()
		this.setTablePagination()
	},
	events: {
		onChangePage: function(page) {
			if (page == "prev")
				this.paginationData.current_page = this.paginationData.current_page - 1
			else if (page == "next")
				this.paginationData.current_page = this.paginationData.current_page + 1
			else
				this.paginationData.current_page = page

			this.setTableItems()
		}
	},
	methods: {
		setTableItems: function() {
			var from = (this.paginationData.current_page - 1) * this.perpage
			var to = from + this.perpage

			this.filteredGroups = this.groups.slice(from, to)
		},
		setTablePagination: function() {
			var vm = this
			
			setTimeout(function() {
				var total_values = vm.groups.length
				var pages = Math.ceil(total_values / vm.perpage)

				vm.paginationData.last_page = pages

				for (var i = 0; i < vm.$children.length; i++) {
	                if (vm.$children[i].$options.name == 'vuetable-pagination') {
	                    vm.$children[i].setTablePagination(vm.paginationData)
	                }
	            }
			}, 10)
		}
	}
}
</script>
