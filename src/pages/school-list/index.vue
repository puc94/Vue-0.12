<template>
	<div class="container">
		<h2 class="heading">Schools & institutions</h2>
		<div class="row">
			<div class="col-sm-offset-8 col-sm-4">
				<input type="text" class="form-control" placeholder="Search" v-model="search" v-on="keyup: searchChange()">
			</div>
		</div>
		<table class="table table-bordered table-striped">
			<thead>
				<tr>
					<th class="th-check"></th>
					<th>Program</th>
					<th><img src="/assets/imgs/gearup-small.png"></th>
					<th><img src="/assets/imgs/speedup-small.png"></th>
					<th class="th-save"></th>
				</tr>
			</thead>
			<tbody>
				<tr v-repeat="school in filteredSchools" track-by="id">
					<td class="td-check"><input type="checkbox" v-model="school.checked" v-on="change: school.changed = true"></td>
					<td><a v-link="/schools/{{ school.id }}">{{ school.name }}</a></td>
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
					<td><div class="btn-group" v-if="school.changed"><button class="btn btn-danger" v-on="click: save(school, $index)"><i class="glyphicon glyphicon-ok"></i></button><button class="btn btn-info" v-on="click: cancel(school, $index)"><i class="glyphicon glyphicon-remove"></i></button></div></td>
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
	name: "school-list",
	components: {
		VuetablePagination
	},
	data() {
		return {
			perpage: 3,
			search: "",
			schools: [
				{
					id: 1,
					name: "School 1",
					checked: false,
					gearups: {
						"id1": { id: 1, label: "1", checked: false, bgcolor: 'bg-red-800' },
						"id2": { id: 2, label: "2", checked: false, bgcolor: 'bg-red-700' },
						"id3": { id: 3, label: "3", checked: false, bgcolor: 'bg-red-600' },
						"id4": { id: 4, label: "4", checked: false, bgcolor: 'bg-red-500' },
						"id5": { id: 5, label: "5", checked: false, bgcolor: 'bg-red-400' },
						"id6": { id: 6, label: "6", checked: false, bgcolor: 'bg-red-300' },
					},
					speedups: {
						"id1": { id: 1, label: "A1+", checked: false, bgcolor: 'bg-yellow-300' },
						"id2": { id: 2, label: "A2", checked: false, bgcolor: 'bg-yellow-400' },
						"id3": { id: 3, label: "A2+", checked: false, bgcolor: 'bg-yellow-500' },
						"id4": { id: 4, label: "B1", checked: false, bgcolor: 'bg-yellow-600' },
						"id5": { id: 5, label: "B1+", checked: false, bgcolor: 'bg-yellow-700' },
						"id6": { id: 6, label: "B2", checked: false, bgcolor: 'bg-yellow-800' },
						"id7": { id: 7, label: "B2+", checked: false, bgcolor: 'bg-yellow-800' },
						"id8": { id: 8, label: "C1", checked: false, bgcolor: 'bg-yellow-800' },
						"id9": { id: 9, label: "C1+", checked: false, bgcolor: 'bg-yellow-800' },
					},
					changed: false
				},
				{
					id: 2,
					name: "School 2",
					checked: false,
					gearups: {
						"id1": { id: 1, label: "1", checked: false, bgcolor: 'bg-red-800' },
						"id2": { id: 2, label: "2", checked: false, bgcolor: 'bg-red-700' },
						"id3": { id: 3, label: "3", checked: false, bgcolor: 'bg-red-600' },
						"id4": { id: 4, label: "4", checked: false, bgcolor: 'bg-red-500' },
						"id5": { id: 5, label: "5", checked: false, bgcolor: 'bg-red-400' },
						"id6": { id: 6, label: "6", checked: false, bgcolor: 'bg-red-300' },
					},
					speedups: {
						"id1": { id: 1, label: "A1+", checked: false, bgcolor: 'bg-yellow-300' },
						"id2": { id: 2, label: "A2", checked: false, bgcolor: 'bg-yellow-400' },
						"id3": { id: 3, label: "A2+", checked: false, bgcolor: 'bg-yellow-500' },
						"id4": { id: 4, label: "B1", checked: false, bgcolor: 'bg-yellow-600' },
						"id5": { id: 5, label: "B1+", checked: false, bgcolor: 'bg-yellow-700' },
						"id6": { id: 6, label: "B2", checked: false, bgcolor: 'bg-yellow-800' },
						"id7": { id: 7, label: "B2+", checked: false, bgcolor: 'bg-yellow-800' },
						"id8": { id: 8, label: "C1", checked: false, bgcolor: 'bg-yellow-800' },
						"id9": { id: 9, label: "C1+", checked: false, bgcolor: 'bg-yellow-800' },
					},
					changed: false
				},
				{
					id: 3,
					name: "School 3",
					checked: false,
					gearups: {
						"id1": { id: 1, label: "1", checked: false, bgcolor: 'bg-red-800' },
						"id2": { id: 2, label: "2", checked: false, bgcolor: 'bg-red-700' },
						"id3": { id: 3, label: "3", checked: false, bgcolor: 'bg-red-600' },
						"id4": { id: 4, label: "4", checked: false, bgcolor: 'bg-red-500' },
						"id5": { id: 5, label: "5", checked: false, bgcolor: 'bg-red-400' },
						"id6": { id: 6, label: "6", checked: false, bgcolor: 'bg-red-300' },
					},
					speedups: {
						"id1": { id: 1, label: "A1+", checked: false, bgcolor: 'bg-yellow-300' },
						"id2": { id: 2, label: "A2", checked: false, bgcolor: 'bg-yellow-400' },
						"id3": { id: 3, label: "A2+", checked: false, bgcolor: 'bg-yellow-500' },
						"id4": { id: 4, label: "B1", checked: false, bgcolor: 'bg-yellow-600' },
						"id5": { id: 5, label: "B1+", checked: false, bgcolor: 'bg-yellow-700' },
						"id6": { id: 6, label: "B2", checked: false, bgcolor: 'bg-yellow-800' },
						"id7": { id: 7, label: "B2+", checked: false, bgcolor: 'bg-yellow-800' },
						"id8": { id: 8, label: "C1", checked: false, bgcolor: 'bg-yellow-800' },
						"id9": { id: 9, label: "C1+", checked: false, bgcolor: 'bg-yellow-800' },
					},
					changed: false
				},
				{
					id: 4,
					name: "School 4",
					checked: false,
					gearups: {
						"id1": { id: 1, label: "1", checked: false, bgcolor: 'bg-red-800' },
						"id2": { id: 2, label: "2", checked: false, bgcolor: 'bg-red-700' },
						"id3": { id: 3, label: "3", checked: false, bgcolor: 'bg-red-600' },
						"id4": { id: 4, label: "4", checked: false, bgcolor: 'bg-red-500' },
						"id5": { id: 5, label: "5", checked: false, bgcolor: 'bg-red-400' },
						"id6": { id: 6, label: "6", checked: false, bgcolor: 'bg-red-300' },
					},
					speedups: {
						"id1": { id: 1, label: "A1+", checked: false, bgcolor: 'bg-yellow-300' },
						"id2": { id: 2, label: "A2", checked: false, bgcolor: 'bg-yellow-400' },
						"id3": { id: 3, label: "A2+", checked: false, bgcolor: 'bg-yellow-500' },
						"id4": { id: 4, label: "B1", checked: false, bgcolor: 'bg-yellow-600' },
						"id5": { id: 5, label: "B1+", checked: false, bgcolor: 'bg-yellow-700' },
						"id6": { id: 6, label: "B2", checked: false, bgcolor: 'bg-yellow-800' },
						"id7": { id: 7, label: "B2+", checked: false, bgcolor: 'bg-yellow-800' },
						"id8": { id: 8, label: "C1", checked: false, bgcolor: 'bg-yellow-800' },
						"id9": { id: 9, label: "C1+", checked: false, bgcolor: 'bg-yellow-800' },
					},
					changed: false
				},
				{
					id: 5,
					name: "School 5",
					checked: false,
					gearups: {
						"id1": { id: 1, label: "1", checked: false, bgcolor: 'bg-red-800' },
						"id2": { id: 2, label: "2", checked: false, bgcolor: 'bg-red-700' },
						"id3": { id: 3, label: "3", checked: false, bgcolor: 'bg-red-600' },
						"id4": { id: 4, label: "4", checked: false, bgcolor: 'bg-red-500' },
						"id5": { id: 5, label: "5", checked: false, bgcolor: 'bg-red-400' },
						"id6": { id: 6, label: "6", checked: false, bgcolor: 'bg-red-300' },
					},
					speedups: {
						"id1": { id: 1, label: "A1+", checked: false, bgcolor: 'bg-yellow-300' },
						"id2": { id: 2, label: "A2", checked: false, bgcolor: 'bg-yellow-400' },
						"id3": { id: 3, label: "A2+", checked: false, bgcolor: 'bg-yellow-500' },
						"id4": { id: 4, label: "B1", checked: false, bgcolor: 'bg-yellow-600' },
						"id5": { id: 5, label: "B1+", checked: false, bgcolor: 'bg-yellow-700' },
						"id6": { id: 6, label: "B2", checked: false, bgcolor: 'bg-yellow-800' },
						"id7": { id: 7, label: "B2+", checked: false, bgcolor: 'bg-yellow-800' },
						"id8": { id: 8, label: "C1", checked: false, bgcolor: 'bg-yellow-800' },
						"id9": { id: 9, label: "C1+", checked: false, bgcolor: 'bg-yellow-800' },
					},
					changed: false
				},
				{
					id: 6,
					name: "School 6",
					checked: false,
					gearups: {
						"id1": { id: 1, label: "1", checked: false, bgcolor: 'bg-red-800' },
						"id2": { id: 2, label: "2", checked: false, bgcolor: 'bg-red-700' },
						"id3": { id: 3, label: "3", checked: false, bgcolor: 'bg-red-600' },
						"id4": { id: 4, label: "4", checked: false, bgcolor: 'bg-red-500' },
						"id5": { id: 5, label: "5", checked: false, bgcolor: 'bg-red-400' },
						"id6": { id: 6, label: "6", checked: false, bgcolor: 'bg-red-300' },
					},
					speedups: {
						"id1": { id: 1, label: "A1+", checked: false, bgcolor: 'bg-yellow-300' },
						"id2": { id: 2, label: "A2", checked: false, bgcolor: 'bg-yellow-400' },
						"id3": { id: 3, label: "A2+", checked: false, bgcolor: 'bg-yellow-500' },
						"id4": { id: 4, label: "B1", checked: false, bgcolor: 'bg-yellow-600' },
						"id5": { id: 5, label: "B1+", checked: false, bgcolor: 'bg-yellow-700' },
						"id6": { id: 6, label: "B2", checked: false, bgcolor: 'bg-yellow-800' },
						"id7": { id: 7, label: "B2+", checked: false, bgcolor: 'bg-yellow-800' },
						"id8": { id: 8, label: "C1", checked: false, bgcolor: 'bg-yellow-800' },
						"id9": { id: 9, label: "C1+", checked: false, bgcolor: 'bg-yellow-800' },
					},
					changed: false
				},
				{
					id: 7,
					name: "School 7",
					checked: false,
					gearups: {
						"id1": { id: 1, label: "1", checked: false, bgcolor: 'bg-red-800' },
						"id2": { id: 2, label: "2", checked: false, bgcolor: 'bg-red-700' },
						"id3": { id: 3, label: "3", checked: false, bgcolor: 'bg-red-600' },
						"id4": { id: 4, label: "4", checked: false, bgcolor: 'bg-red-500' },
						"id5": { id: 5, label: "5", checked: false, bgcolor: 'bg-red-400' },
						"id6": { id: 6, label: "6", checked: false, bgcolor: 'bg-red-300' },
					},
					speedups: {
						"id1": { id: 1, label: "A1+", checked: false, bgcolor: 'bg-yellow-300' },
						"id2": { id: 2, label: "A2", checked: false, bgcolor: 'bg-yellow-400' },
						"id3": { id: 3, label: "A2+", checked: false, bgcolor: 'bg-yellow-500' },
						"id4": { id: 4, label: "B1", checked: false, bgcolor: 'bg-yellow-600' },
						"id5": { id: 5, label: "B1+", checked: false, bgcolor: 'bg-yellow-700' },
						"id6": { id: 6, label: "B2", checked: false, bgcolor: 'bg-yellow-800' },
						"id7": { id: 7, label: "B2+", checked: false, bgcolor: 'bg-yellow-800' },
						"id8": { id: 8, label: "C1", checked: false, bgcolor: 'bg-yellow-800' },
						"id9": { id: 9, label: "C1+", checked: false, bgcolor: 'bg-yellow-800' },
					},
					changed: false
				},
				{
					id: 8,
					name: "School 8",
					checked: false,
					gearups: {
						"id1": { id: 1, label: "1", checked: false, bgcolor: 'bg-red-800' },
						"id2": { id: 2, label: "2", checked: false, bgcolor: 'bg-red-700' },
						"id3": { id: 3, label: "3", checked: false, bgcolor: 'bg-red-600' },
						"id4": { id: 4, label: "4", checked: false, bgcolor: 'bg-red-500' },
						"id5": { id: 5, label: "5", checked: false, bgcolor: 'bg-red-400' },
						"id6": { id: 6, label: "6", checked: false, bgcolor: 'bg-red-300' },
					},
					speedups: {
						"id1": { id: 1, label: "A1+", checked: false, bgcolor: 'bg-yellow-300' },
						"id2": { id: 2, label: "A2", checked: false, bgcolor: 'bg-yellow-400' },
						"id3": { id: 3, label: "A2+", checked: false, bgcolor: 'bg-yellow-500' },
						"id4": { id: 4, label: "B1", checked: false, bgcolor: 'bg-yellow-600' },
						"id5": { id: 5, label: "B1+", checked: false, bgcolor: 'bg-yellow-700' },
						"id6": { id: 6, label: "B2", checked: false, bgcolor: 'bg-yellow-800' },
						"id7": { id: 7, label: "B2+", checked: false, bgcolor: 'bg-yellow-800' },
						"id8": { id: 8, label: "C1", checked: false, bgcolor: 'bg-yellow-800' },
						"id9": { id: 9, label: "C1+", checked: false, bgcolor: 'bg-yellow-800' },
					},
					changed: false
				},
				{
					id: 9,
					name: "School 9",
					checked: false,
					gearups: {
						"id1": { id: 1, label: "1", checked: false, bgcolor: 'bg-red-800' },
						"id2": { id: 2, label: "2", checked: false, bgcolor: 'bg-red-700' },
						"id3": { id: 3, label: "3", checked: false, bgcolor: 'bg-red-600' },
						"id4": { id: 4, label: "4", checked: false, bgcolor: 'bg-red-500' },
						"id5": { id: 5, label: "5", checked: false, bgcolor: 'bg-red-400' },
						"id6": { id: 6, label: "6", checked: false, bgcolor: 'bg-red-300' },
					},
					speedups: {
						"id1": { id: 1, label: "A1+", checked: false, bgcolor: 'bg-yellow-300' },
						"id2": { id: 2, label: "A2", checked: false, bgcolor: 'bg-yellow-400' },
						"id3": { id: 3, label: "A2+", checked: false, bgcolor: 'bg-yellow-500' },
						"id4": { id: 4, label: "B1", checked: false, bgcolor: 'bg-yellow-600' },
						"id5": { id: 5, label: "B1+", checked: false, bgcolor: 'bg-yellow-700' },
						"id6": { id: 6, label: "B2", checked: false, bgcolor: 'bg-yellow-800' },
						"id7": { id: 7, label: "B2+", checked: false, bgcolor: 'bg-yellow-800' },
						"id8": { id: 8, label: "C1", checked: false, bgcolor: 'bg-yellow-800' },
						"id9": { id: 9, label: "C1+", checked: false, bgcolor: 'bg-yellow-800' },
					},
					changed: false
				},
				{
					id: 10,
					name: "School 10",
					checked: false,
					gearups: {
						"id1": { id: 1, label: "1", checked: false, bgcolor: 'bg-red-800' },
						"id2": { id: 2, label: "2", checked: false, bgcolor: 'bg-red-700' },
						"id3": { id: 3, label: "3", checked: false, bgcolor: 'bg-red-600' },
						"id4": { id: 4, label: "4", checked: false, bgcolor: 'bg-red-500' },
						"id5": { id: 5, label: "5", checked: false, bgcolor: 'bg-red-400' },
						"id6": { id: 6, label: "6", checked: false, bgcolor: 'bg-red-300' },
					},
					speedups: {
						"id1": { id: 1, label: "A1+", checked: false, bgcolor: 'bg-yellow-300' },
						"id2": { id: 2, label: "A2", checked: false, bgcolor: 'bg-yellow-400' },
						"id3": { id: 3, label: "A2+", checked: false, bgcolor: 'bg-yellow-500' },
						"id4": { id: 4, label: "B1", checked: false, bgcolor: 'bg-yellow-600' },
						"id5": { id: 5, label: "B1+", checked: false, bgcolor: 'bg-yellow-700' },
						"id6": { id: 6, label: "B2", checked: false, bgcolor: 'bg-yellow-800' },
						"id7": { id: 7, label: "B2+", checked: false, bgcolor: 'bg-yellow-800' },
						"id8": { id: 8, label: "C1", checked: false, bgcolor: 'bg-yellow-800' },
						"id9": { id: 9, label: "C1+", checked: false, bgcolor: 'bg-yellow-800' },
					},
					changed: false
				},
			],
			original: [
				{
					id: 1,
					name: "School 1",
					checked: false,
					gearups: {
						"id1": { id: 1, label: "1", checked: false, bgcolor: 'bg-red-800' },
						"id2": { id: 2, label: "2", checked: false, bgcolor: 'bg-red-700' },
						"id3": { id: 3, label: "3", checked: false, bgcolor: 'bg-red-600' },
						"id4": { id: 4, label: "4", checked: false, bgcolor: 'bg-red-500' },
						"id5": { id: 5, label: "5", checked: false, bgcolor: 'bg-red-400' },
						"id6": { id: 6, label: "6", checked: false, bgcolor: 'bg-red-300' },
					},
					speedups: {
						"id1": { id: 1, label: "A1+", checked: false, bgcolor: 'bg-yellow-300' },
						"id2": { id: 2, label: "A2", checked: false, bgcolor: 'bg-yellow-400' },
						"id3": { id: 3, label: "A2+", checked: false, bgcolor: 'bg-yellow-500' },
						"id4": { id: 4, label: "B1", checked: false, bgcolor: 'bg-yellow-600' },
						"id5": { id: 5, label: "B1+", checked: false, bgcolor: 'bg-yellow-700' },
						"id6": { id: 6, label: "B2", checked: false, bgcolor: 'bg-yellow-800' },
						"id7": { id: 7, label: "B2+", checked: false, bgcolor: 'bg-yellow-800' },
						"id8": { id: 8, label: "C1", checked: false, bgcolor: 'bg-yellow-800' },
						"id9": { id: 9, label: "C1+", checked: false, bgcolor: 'bg-yellow-800' },
					}
				},
				{
					id: 2,
					name: "School 2",
					checked: false,
					gearups: {
						"id1": { id: 1, label: "1", checked: false, bgcolor: 'bg-red-800' },
						"id2": { id: 2, label: "2", checked: false, bgcolor: 'bg-red-700' },
						"id3": { id: 3, label: "3", checked: false, bgcolor: 'bg-red-600' },
						"id4": { id: 4, label: "4", checked: false, bgcolor: 'bg-red-500' },
						"id5": { id: 5, label: "5", checked: false, bgcolor: 'bg-red-400' },
						"id6": { id: 6, label: "6", checked: false, bgcolor: 'bg-red-300' },
					},
					speedups: {
						"id1": { id: 1, label: "A1+", checked: false, bgcolor: 'bg-yellow-300' },
						"id2": { id: 2, label: "A2", checked: false, bgcolor: 'bg-yellow-400' },
						"id3": { id: 3, label: "A2+", checked: false, bgcolor: 'bg-yellow-500' },
						"id4": { id: 4, label: "B1", checked: false, bgcolor: 'bg-yellow-600' },
						"id5": { id: 5, label: "B1+", checked: false, bgcolor: 'bg-yellow-700' },
						"id6": { id: 6, label: "B2", checked: false, bgcolor: 'bg-yellow-800' },
						"id7": { id: 7, label: "B2+", checked: false, bgcolor: 'bg-yellow-800' },
						"id8": { id: 8, label: "C1", checked: false, bgcolor: 'bg-yellow-800' },
						"id9": { id: 9, label: "C1+", checked: false, bgcolor: 'bg-yellow-800' },
					}
				},
				{
					id: 3,
					name: "School 3",
					checked: false,
					gearups: {
						"id1": { id: 1, label: "1", checked: false, bgcolor: 'bg-red-800' },
						"id2": { id: 2, label: "2", checked: false, bgcolor: 'bg-red-700' },
						"id3": { id: 3, label: "3", checked: false, bgcolor: 'bg-red-600' },
						"id4": { id: 4, label: "4", checked: false, bgcolor: 'bg-red-500' },
						"id5": { id: 5, label: "5", checked: false, bgcolor: 'bg-red-400' },
						"id6": { id: 6, label: "6", checked: false, bgcolor: 'bg-red-300' },
					},
					speedups: {
						"id1": { id: 1, label: "A1+", checked: false, bgcolor: 'bg-yellow-300' },
						"id2": { id: 2, label: "A2", checked: false, bgcolor: 'bg-yellow-400' },
						"id3": { id: 3, label: "A2+", checked: false, bgcolor: 'bg-yellow-500' },
						"id4": { id: 4, label: "B1", checked: false, bgcolor: 'bg-yellow-600' },
						"id5": { id: 5, label: "B1+", checked: false, bgcolor: 'bg-yellow-700' },
						"id6": { id: 6, label: "B2", checked: false, bgcolor: 'bg-yellow-800' },
						"id7": { id: 7, label: "B2+", checked: false, bgcolor: 'bg-yellow-800' },
						"id8": { id: 8, label: "C1", checked: false, bgcolor: 'bg-yellow-800' },
						"id9": { id: 9, label: "C1+", checked: false, bgcolor: 'bg-yellow-800' },
					}
				},
				{
					id: 4,
					name: "School 4",
					checked: false,
					gearups: {
						"id1": { id: 1, label: "1", checked: false, bgcolor: 'bg-red-800' },
						"id2": { id: 2, label: "2", checked: false, bgcolor: 'bg-red-700' },
						"id3": { id: 3, label: "3", checked: false, bgcolor: 'bg-red-600' },
						"id4": { id: 4, label: "4", checked: false, bgcolor: 'bg-red-500' },
						"id5": { id: 5, label: "5", checked: false, bgcolor: 'bg-red-400' },
						"id6": { id: 6, label: "6", checked: false, bgcolor: 'bg-red-300' },
					},
					speedups: {
						"id1": { id: 1, label: "A1+", checked: false, bgcolor: 'bg-yellow-300' },
						"id2": { id: 2, label: "A2", checked: false, bgcolor: 'bg-yellow-400' },
						"id3": { id: 3, label: "A2+", checked: false, bgcolor: 'bg-yellow-500' },
						"id4": { id: 4, label: "B1", checked: false, bgcolor: 'bg-yellow-600' },
						"id5": { id: 5, label: "B1+", checked: false, bgcolor: 'bg-yellow-700' },
						"id6": { id: 6, label: "B2", checked: false, bgcolor: 'bg-yellow-800' },
						"id7": { id: 7, label: "B2+", checked: false, bgcolor: 'bg-yellow-800' },
						"id8": { id: 8, label: "C1", checked: false, bgcolor: 'bg-yellow-800' },
						"id9": { id: 9, label: "C1+", checked: false, bgcolor: 'bg-yellow-800' },
					}
				},
				{
					id: 5,
					name: "School 5",
					checked: false,
					gearups: {
						"id1": { id: 1, label: "1", checked: false, bgcolor: 'bg-red-800' },
						"id2": { id: 2, label: "2", checked: false, bgcolor: 'bg-red-700' },
						"id3": { id: 3, label: "3", checked: false, bgcolor: 'bg-red-600' },
						"id4": { id: 4, label: "4", checked: false, bgcolor: 'bg-red-500' },
						"id5": { id: 5, label: "5", checked: false, bgcolor: 'bg-red-400' },
						"id6": { id: 6, label: "6", checked: false, bgcolor: 'bg-red-300' },
					},
					speedups: {
						"id1": { id: 1, label: "A1+", checked: false, bgcolor: 'bg-yellow-300' },
						"id2": { id: 2, label: "A2", checked: false, bgcolor: 'bg-yellow-400' },
						"id3": { id: 3, label: "A2+", checked: false, bgcolor: 'bg-yellow-500' },
						"id4": { id: 4, label: "B1", checked: false, bgcolor: 'bg-yellow-600' },
						"id5": { id: 5, label: "B1+", checked: false, bgcolor: 'bg-yellow-700' },
						"id6": { id: 6, label: "B2", checked: false, bgcolor: 'bg-yellow-800' },
						"id7": { id: 7, label: "B2+", checked: false, bgcolor: 'bg-yellow-800' },
						"id8": { id: 8, label: "C1", checked: false, bgcolor: 'bg-yellow-800' },
						"id9": { id: 9, label: "C1+", checked: false, bgcolor: 'bg-yellow-800' },
					}
				},
				{
					id: 6,
					name: "School 6",
					checked: false,
					gearups: {
						"id1": { id: 1, label: "1", checked: false, bgcolor: 'bg-red-800' },
						"id2": { id: 2, label: "2", checked: false, bgcolor: 'bg-red-700' },
						"id3": { id: 3, label: "3", checked: false, bgcolor: 'bg-red-600' },
						"id4": { id: 4, label: "4", checked: false, bgcolor: 'bg-red-500' },
						"id5": { id: 5, label: "5", checked: false, bgcolor: 'bg-red-400' },
						"id6": { id: 6, label: "6", checked: false, bgcolor: 'bg-red-300' },
					},
					speedups: {
						"id1": { id: 1, label: "A1+", checked: false, bgcolor: 'bg-yellow-300' },
						"id2": { id: 2, label: "A2", checked: false, bgcolor: 'bg-yellow-400' },
						"id3": { id: 3, label: "A2+", checked: false, bgcolor: 'bg-yellow-500' },
						"id4": { id: 4, label: "B1", checked: false, bgcolor: 'bg-yellow-600' },
						"id5": { id: 5, label: "B1+", checked: false, bgcolor: 'bg-yellow-700' },
						"id6": { id: 6, label: "B2", checked: false, bgcolor: 'bg-yellow-800' },
						"id7": { id: 7, label: "B2+", checked: false, bgcolor: 'bg-yellow-800' },
						"id8": { id: 8, label: "C1", checked: false, bgcolor: 'bg-yellow-800' },
						"id9": { id: 9, label: "C1+", checked: false, bgcolor: 'bg-yellow-800' },
					}
				},
				{
					id: 7,
					name: "School 7",
					checked: false,
					gearups: {
						"id1": { id: 1, label: "1", checked: false, bgcolor: 'bg-red-800' },
						"id2": { id: 2, label: "2", checked: false, bgcolor: 'bg-red-700' },
						"id3": { id: 3, label: "3", checked: false, bgcolor: 'bg-red-600' },
						"id4": { id: 4, label: "4", checked: false, bgcolor: 'bg-red-500' },
						"id5": { id: 5, label: "5", checked: false, bgcolor: 'bg-red-400' },
						"id6": { id: 6, label: "6", checked: false, bgcolor: 'bg-red-300' },
					},
					speedups: {
						"id1": { id: 1, label: "A1+", checked: false, bgcolor: 'bg-yellow-300' },
						"id2": { id: 2, label: "A2", checked: false, bgcolor: 'bg-yellow-400' },
						"id3": { id: 3, label: "A2+", checked: false, bgcolor: 'bg-yellow-500' },
						"id4": { id: 4, label: "B1", checked: false, bgcolor: 'bg-yellow-600' },
						"id5": { id: 5, label: "B1+", checked: false, bgcolor: 'bg-yellow-700' },
						"id6": { id: 6, label: "B2", checked: false, bgcolor: 'bg-yellow-800' },
						"id7": { id: 7, label: "B2+", checked: false, bgcolor: 'bg-yellow-800' },
						"id8": { id: 8, label: "C1", checked: false, bgcolor: 'bg-yellow-800' },
						"id9": { id: 9, label: "C1+", checked: false, bgcolor: 'bg-yellow-800' },
					}
				},
				{
					id: 8,
					name: "School 8",
					checked: false,
					gearups: {
						"id1": { id: 1, label: "1", checked: false, bgcolor: 'bg-red-800' },
						"id2": { id: 2, label: "2", checked: false, bgcolor: 'bg-red-700' },
						"id3": { id: 3, label: "3", checked: false, bgcolor: 'bg-red-600' },
						"id4": { id: 4, label: "4", checked: false, bgcolor: 'bg-red-500' },
						"id5": { id: 5, label: "5", checked: false, bgcolor: 'bg-red-400' },
						"id6": { id: 6, label: "6", checked: false, bgcolor: 'bg-red-300' },
					},
					speedups: {
						"id1": { id: 1, label: "A1+", checked: false, bgcolor: 'bg-yellow-300' },
						"id2": { id: 2, label: "A2", checked: false, bgcolor: 'bg-yellow-400' },
						"id3": { id: 3, label: "A2+", checked: false, bgcolor: 'bg-yellow-500' },
						"id4": { id: 4, label: "B1", checked: false, bgcolor: 'bg-yellow-600' },
						"id5": { id: 5, label: "B1+", checked: false, bgcolor: 'bg-yellow-700' },
						"id6": { id: 6, label: "B2", checked: false, bgcolor: 'bg-yellow-800' },
						"id7": { id: 7, label: "B2+", checked: false, bgcolor: 'bg-yellow-800' },
						"id8": { id: 8, label: "C1", checked: false, bgcolor: 'bg-yellow-800' },
						"id9": { id: 9, label: "C1+", checked: false, bgcolor: 'bg-yellow-800' },
					}
				},
				{
					id: 9,
					name: "School 9",
					checked: false,
					gearups: {
						"id1": { id: 1, label: "1", checked: false, bgcolor: 'bg-red-800' },
						"id2": { id: 2, label: "2", checked: false, bgcolor: 'bg-red-700' },
						"id3": { id: 3, label: "3", checked: false, bgcolor: 'bg-red-600' },
						"id4": { id: 4, label: "4", checked: false, bgcolor: 'bg-red-500' },
						"id5": { id: 5, label: "5", checked: false, bgcolor: 'bg-red-400' },
						"id6": { id: 6, label: "6", checked: false, bgcolor: 'bg-red-300' },
					},
					speedups: {
						"id1": { id: 1, label: "A1+", checked: false, bgcolor: 'bg-yellow-300' },
						"id2": { id: 2, label: "A2", checked: false, bgcolor: 'bg-yellow-400' },
						"id3": { id: 3, label: "A2+", checked: false, bgcolor: 'bg-yellow-500' },
						"id4": { id: 4, label: "B1", checked: false, bgcolor: 'bg-yellow-600' },
						"id5": { id: 5, label: "B1+", checked: false, bgcolor: 'bg-yellow-700' },
						"id6": { id: 6, label: "B2", checked: false, bgcolor: 'bg-yellow-800' },
						"id7": { id: 7, label: "B2+", checked: false, bgcolor: 'bg-yellow-800' },
						"id8": { id: 8, label: "C1", checked: false, bgcolor: 'bg-yellow-800' },
						"id9": { id: 9, label: "C1+", checked: false, bgcolor: 'bg-yellow-800' },
					}
				},
				{
					id: 10,
					name: "School 10",
					checked: false,
					gearups: {
						"id1": { id: 1, label: "1", checked: false, bgcolor: 'bg-red-800' },
						"id2": { id: 2, label: "2", checked: false, bgcolor: 'bg-red-700' },
						"id3": { id: 3, label: "3", checked: false, bgcolor: 'bg-red-600' },
						"id4": { id: 4, label: "4", checked: false, bgcolor: 'bg-red-500' },
						"id5": { id: 5, label: "5", checked: false, bgcolor: 'bg-red-400' },
						"id6": { id: 6, label: "6", checked: false, bgcolor: 'bg-red-300' },
					},
					speedups: {
						"id1": { id: 1, label: "A1+", checked: false, bgcolor: 'bg-yellow-300' },
						"id2": { id: 2, label: "A2", checked: false, bgcolor: 'bg-yellow-400' },
						"id3": { id: 3, label: "A2+", checked: false, bgcolor: 'bg-yellow-500' },
						"id4": { id: 4, label: "B1", checked: false, bgcolor: 'bg-yellow-600' },
						"id5": { id: 5, label: "B1+", checked: false, bgcolor: 'bg-yellow-700' },
						"id6": { id: 6, label: "B2", checked: false, bgcolor: 'bg-yellow-800' },
						"id7": { id: 7, label: "B2+", checked: false, bgcolor: 'bg-yellow-800' },
						"id8": { id: 8, label: "C1", checked: false, bgcolor: 'bg-yellow-800' },
						"id9": { id: 9, label: "C1+", checked: false, bgcolor: 'bg-yellow-800' },
					}
				},
			],
			paginationData: {
				last_page: 1,
				current_page: 1
			},
			filteredSchools: [],
			total_items: []
		}
	},
	created: function () {
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
			var filteredSchools = this.schools.filter(item => {
				if (this.search != "")
					return item.name.toLowerCase().indexOf(this.search.toLowerCase()) > -1
				else
					return true
			})

			this.total_items = filteredSchools

			var from = (this.paginationData.current_page - 1) * this.perpage
			var to = from + this.perpage

			this.filteredSchools = this.total_items.slice(from, to)
		},
		setTablePagination: function() {
			var vm = this
			
			setTimeout(function() {
				var total_values = vm.total_items.length
				var pages = Math.ceil(total_values / vm.perpage)

				vm.paginationData.last_page = pages

				for (var i = 0; i < vm.$children.length; i++) {
	                if (vm.$children[i].$options.name == 'vuetable-pagination') {
	                    vm.$children[i].setTablePagination(vm.paginationData)
	                }
	            }
			}, 10)
		},
		save: function(school, index) {
			this.original[index] = JSON.parse(JSON.stringify(school))
			delete this.original[index].changed
			school.changed = false
		},
		cancel: function(school, school_index) {
			var vm = this
			school.checked = this.original[school_index].checked
			school.gearups = JSON.parse(JSON.stringify(this.original[school_index].gearups))
			school.speedups = JSON.parse(JSON.stringify(this.original[school_index].speedups))

			school.changed = false
		},
		searchChange: function() {
			this.paginationData.current_page = 1
			this.setTableItems()
			this.setTablePagination()
		}
	}
}
</script>
