<template>
	<div class="container">
		<h2 class="heading">Schools & institutions</h2>
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
				<tr v-repeat="school in schools" track-by="id">
					<td class="td-check"><input type="checkbox" v-model="school.checked"></td>
					<td><a href="">{{ school.name }}</a></td>
					<td>
						<div class="label-group">
							<label v-repeat="gearup in school.gearups" class="label {{ gearup.bgcolor }}">
								<input type="checkbox" v-model="gearup.checked">
								{{ gearup.label }}
							</label>
						</div>
					</td>
					<td>
						<div class="label-group">
							<label v-repeat="speedup in school.speedups" class="label {{ speedup.bgcolor }}">
								<input type="checkbox" v-model="speedup.checked">
								{{ speedup.label }}
							</label>
						</div>
					</td>
					<td><button v-if="school.changed" class="btn btn-danger">Save <i class="glyphicon glyphicon-edit"></i></button></td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
export default {
	data() {
		return {
			schools: [
				{
					id: 0,
					name: "School 1",
					checked: false,
					gearups: [
						{ id: 0, label: "1", checked: false, bgcolor: 'bg-red-800' },
						{ id: 1, label: "2", checked: false, bgcolor: 'bg-red-700' },
						{ id: 2, label: "3", checked: false, bgcolor: 'bg-red-600' },
						{ id: 3, label: "4", checked: false, bgcolor: 'bg-red-500' },
						{ id: 4, label: "5", checked: false, bgcolor: 'bg-red-400' },
						{ id: 5, label: "6", checked: false, bgcolor: 'bg-red-300' },
					],
					speedups: [
						{ id: 0, label: "A1+", checked: false, bgcolor: 'bg-yellow-300' },
						{ id: 1, label: "A2", checked: false, bgcolor: 'bg-yellow-400' },
						{ id: 2, label: "A2+", checked: false, bgcolor: 'bg-yellow-500' },
						{ id: 3, label: "B1", checked: false, bgcolor: 'bg-yellow-600' },
						{ id: 4, label: "B1+", checked: false, bgcolor: 'bg-yellow-700' },
						{ id: 5, label: "B2", checked: false, bgcolor: 'bg-yellow-800' },
						{ id: 5, label: "B2+", checked: false, bgcolor: 'bg-yellow-800' },
						{ id: 5, label: "C1", checked: false, bgcolor: 'bg-yellow-800' },
						{ id: 5, label: "C1+", checked: false, bgcolor: 'bg-yellow-800' },
					],
					changed: false
				},
				{
					id: 1,
					name: "School 2",
					checked: false,
					gearups: [
						{ id: 0, label: "1", checked: false, bgcolor: 'bg-red-800' },
						{ id: 1, label: "2", checked: false, bgcolor: 'bg-red-700' },
						{ id: 2, label: "3", checked: false, bgcolor: 'bg-red-600' },
						{ id: 3, label: "4", checked: false, bgcolor: 'bg-red-500' },
						{ id: 4, label: "5", checked: false, bgcolor: 'bg-red-400' },
						{ id: 5, label: "6", checked: false, bgcolor: 'bg-red-300' },
					],
					speedups: [
						{ id: 0, label: "A1+", checked: false, bgcolor: 'bg-yellow-300' },
						{ id: 1, label: "A2", checked: false, bgcolor: 'bg-yellow-400' },
						{ id: 2, label: "A2+", checked: false, bgcolor: 'bg-yellow-500' },
						{ id: 3, label: "B1", checked: false, bgcolor: 'bg-yellow-600' },
						{ id: 4, label: "B1+", checked: false, bgcolor: 'bg-yellow-700' },
						{ id: 5, label: "B2", checked: false, bgcolor: 'bg-yellow-800' },
						{ id: 5, label: "B2+", checked: false, bgcolor: 'bg-yellow-800' },
						{ id: 5, label: "C1", checked: false, bgcolor: 'bg-yellow-800' },
						{ id: 5, label: "C1+", checked: false, bgcolor: 'bg-yellow-800' },
					],
					changed: false
				},
				{
					id: 2,
					name: "School 3",
					checked: false,
					gearups: [
						{ id: 0, label: "1", checked: false, bgcolor: 'bg-red-800' },
						{ id: 1, label: "2", checked: false, bgcolor: 'bg-red-700' },
						{ id: 2, label: "3", checked: false, bgcolor: 'bg-red-600' },
						{ id: 3, label: "4", checked: false, bgcolor: 'bg-red-500' },
						{ id: 4, label: "5", checked: false, bgcolor: 'bg-red-400' },
						{ id: 5, label: "6", checked: false, bgcolor: 'bg-red-300' },
					],
					speedups: [
						{ id: 0, label: "A1+", checked: false, bgcolor: 'bg-yellow-300' },
						{ id: 1, label: "A2", checked: false, bgcolor: 'bg-yellow-400' },
						{ id: 2, label: "A2+", checked: false, bgcolor: 'bg-yellow-500' },
						{ id: 3, label: "B1", checked: false, bgcolor: 'bg-yellow-600' },
						{ id: 4, label: "B1+", checked: false, bgcolor: 'bg-yellow-700' },
						{ id: 5, label: "B2", checked: false, bgcolor: 'bg-yellow-800' },
						{ id: 5, label: "B2+", checked: false, bgcolor: 'bg-yellow-800' },
						{ id: 5, label: "C1", checked: false, bgcolor: 'bg-yellow-800' },
						{ id: 5, label: "C1+", checked: false, bgcolor: 'bg-yellow-800' },
					],
					changed: false
				},
				{
					id: 3,
					name: "School 4",
					checked: false,
					gearups: [
						{ id: 0, label: "1", checked: false, bgcolor: 'bg-red-800' },
						{ id: 1, label: "2", checked: false, bgcolor: 'bg-red-700' },
						{ id: 2, label: "3", checked: false, bgcolor: 'bg-red-600' },
						{ id: 3, label: "4", checked: false, bgcolor: 'bg-red-500' },
						{ id: 4, label: "5", checked: false, bgcolor: 'bg-red-400' },
						{ id: 5, label: "6", checked: false, bgcolor: 'bg-red-300' },
					],
					speedups: [
						{ id: 0, label: "A1+", checked: false, bgcolor: 'bg-yellow-300' },
						{ id: 1, label: "A2", checked: false, bgcolor: 'bg-yellow-400' },
						{ id: 2, label: "A2+", checked: false, bgcolor: 'bg-yellow-500' },
						{ id: 3, label: "B1", checked: false, bgcolor: 'bg-yellow-600' },
						{ id: 4, label: "B1+", checked: false, bgcolor: 'bg-yellow-700' },
						{ id: 5, label: "B2", checked: false, bgcolor: 'bg-yellow-800' },
						{ id: 5, label: "B2+", checked: false, bgcolor: 'bg-yellow-800' },
						{ id: 5, label: "C1", checked: false, bgcolor: 'bg-yellow-800' },
						{ id: 5, label: "C1+", checked: false, bgcolor: 'bg-yellow-800' },
					],
					changed: false
				}
			],
			original: [
				{
					id: 0,
					name: "School 1",
					checked: false,
					gearups: [
						{ id: 0, label: "1", checked: false, bgcolor: 'bg-red-800' },
						{ id: 1, label: "2", checked: false, bgcolor: 'bg-red-700' },
						{ id: 2, label: "3", checked: false, bgcolor: 'bg-red-600' },
						{ id: 3, label: "4", checked: false, bgcolor: 'bg-red-500' },
						{ id: 4, label: "5", checked: false, bgcolor: 'bg-red-400' },
						{ id: 5, label: "6", checked: false, bgcolor: 'bg-red-300' },
					],
					speedups: [
						{ id: 0, label: "A1+", checked: false, bgcolor: 'bg-yellow-300' },
						{ id: 1, label: "A2", checked: false, bgcolor: 'bg-yellow-400' },
						{ id: 2, label: "A2+", checked: false, bgcolor: 'bg-yellow-500' },
						{ id: 3, label: "B1", checked: false, bgcolor: 'bg-yellow-600' },
						{ id: 4, label: "B1+", checked: false, bgcolor: 'bg-yellow-700' },
						{ id: 5, label: "B2", checked: false, bgcolor: 'bg-yellow-800' },
						{ id: 5, label: "B2+", checked: false, bgcolor: 'bg-yellow-800' },
						{ id: 5, label: "C1", checked: false, bgcolor: 'bg-yellow-800' },
						{ id: 5, label: "C1+", checked: false, bgcolor: 'bg-yellow-800' },
					],
					changed: false
				},
				{
					id: 1,
					name: "School 2",
					checked: false,
					gearups: [
						{ id: 0, label: "1", checked: false, bgcolor: 'bg-red-800' },
						{ id: 1, label: "2", checked: false, bgcolor: 'bg-red-700' },
						{ id: 2, label: "3", checked: false, bgcolor: 'bg-red-600' },
						{ id: 3, label: "4", checked: false, bgcolor: 'bg-red-500' },
						{ id: 4, label: "5", checked: false, bgcolor: 'bg-red-400' },
						{ id: 5, label: "6", checked: false, bgcolor: 'bg-red-300' },
					],
					speedups: [
						{ id: 0, label: "A1+", checked: false, bgcolor: 'bg-yellow-300' },
						{ id: 1, label: "A2", checked: false, bgcolor: 'bg-yellow-400' },
						{ id: 2, label: "A2+", checked: false, bgcolor: 'bg-yellow-500' },
						{ id: 3, label: "B1", checked: false, bgcolor: 'bg-yellow-600' },
						{ id: 4, label: "B1+", checked: false, bgcolor: 'bg-yellow-700' },
						{ id: 5, label: "B2", checked: false, bgcolor: 'bg-yellow-800' },
						{ id: 5, label: "B2+", checked: false, bgcolor: 'bg-yellow-800' },
						{ id: 5, label: "C1", checked: false, bgcolor: 'bg-yellow-800' },
						{ id: 5, label: "C1+", checked: false, bgcolor: 'bg-yellow-800' },
					],
					changed: false
				},
				{
					id: 2,
					name: "School 3",
					checked: false,
					gearups: [
						{ id: 0, label: "1", checked: false, bgcolor: 'bg-red-800' },
						{ id: 1, label: "2", checked: false, bgcolor: 'bg-red-700' },
						{ id: 2, label: "3", checked: false, bgcolor: 'bg-red-600' },
						{ id: 3, label: "4", checked: false, bgcolor: 'bg-red-500' },
						{ id: 4, label: "5", checked: false, bgcolor: 'bg-red-400' },
						{ id: 5, label: "6", checked: false, bgcolor: 'bg-red-300' },
					],
					speedups: [
						{ id: 0, label: "A1+", checked: false, bgcolor: 'bg-yellow-300' },
						{ id: 1, label: "A2", checked: false, bgcolor: 'bg-yellow-400' },
						{ id: 2, label: "A2+", checked: false, bgcolor: 'bg-yellow-500' },
						{ id: 3, label: "B1", checked: false, bgcolor: 'bg-yellow-600' },
						{ id: 4, label: "B1+", checked: false, bgcolor: 'bg-yellow-700' },
						{ id: 5, label: "B2", checked: false, bgcolor: 'bg-yellow-800' },
						{ id: 5, label: "B2+", checked: false, bgcolor: 'bg-yellow-800' },
						{ id: 5, label: "C1", checked: false, bgcolor: 'bg-yellow-800' },
						{ id: 5, label: "C1+", checked: false, bgcolor: 'bg-yellow-800' },
					],
					changed: false
				},
				{
					id: 3,
					name: "School 4",
					checked: false,
					gearups: [
						{ id: 0, label: "1", checked: false, bgcolor: 'bg-red-800' },
						{ id: 1, label: "2", checked: false, bgcolor: 'bg-red-700' },
						{ id: 2, label: "3", checked: false, bgcolor: 'bg-red-600' },
						{ id: 3, label: "4", checked: false, bgcolor: 'bg-red-500' },
						{ id: 4, label: "5", checked: false, bgcolor: 'bg-red-400' },
						{ id: 5, label: "6", checked: false, bgcolor: 'bg-red-300' },
					],
					speedups: [
						{ id: 0, label: "A1+", checked: false, bgcolor: 'bg-yellow-300' },
						{ id: 1, label: "A2", checked: false, bgcolor: 'bg-yellow-400' },
						{ id: 2, label: "A2+", checked: false, bgcolor: 'bg-yellow-500' },
						{ id: 3, label: "B1", checked: false, bgcolor: 'bg-yellow-600' },
						{ id: 4, label: "B1+", checked: false, bgcolor: 'bg-yellow-700' },
						{ id: 5, label: "B2", checked: false, bgcolor: 'bg-yellow-800' },
						{ id: 5, label: "B2+", checked: false, bgcolor: 'bg-yellow-800' },
						{ id: 5, label: "C1", checked: false, bgcolor: 'bg-yellow-800' },
						{ id: 5, label: "C1+", checked: false, bgcolor: 'bg-yellow-800' },
					],
					changed: false
				}
			]
		}
	},
	watch: {
		schools: {
			handler: function(after, before) {
				this.diffSchools(after, this.original)
            },
            deep: true
		}
	},
	methods: {
		diffSchools(after, before) {
			after.forEach(function(after_school, index1) {
				if (after_school.checked != before[index1].checked)
					after[index1].changed = true;

				after_school.gearups.forEach(function(afterschool_gearup, index2) {
					if (afterschool_gearup.checked != before[index1].gearups[index2].checked)
						after[index1].changed = true;
				})

				after_school.speedups.forEach(function(afterschool_speedup, index2) {
					if (afterschool_speedup.checked != before[index1].speedups[index2].checked)
						after[index1].changed = true;
				})
			});

			// this.schools = after;
		}
	}
}
</script>
