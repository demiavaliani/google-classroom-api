<template>
	<div id="main">
		<b-container fluid class="w-75">
			<div id="init-wrapper" class="mb-5">
				<h1>{{ msg }}</h1>
				<p>isInit: {{ isInit }}</p>
				<p v-if="user && isSignedIn">{{ user.getBasicProfile().getName() }}</p>
				<b-button :disabled="!isInit || isSignedIn" @click="signIn">SignIn</b-button>
				<b-button :disabled="!isInit || !isSignedIn" @click="signOut">SignOut</b-button>
				<b-button :disabled="!isInit || !isSignedIn" @click="disconnect">Disconnect</b-button>
			</div>

			<div id="main-wrapper" v-if="isSignedIn">
				<div id="delete-teachers-form" class="mb-5">
					<b-row class="mb-4">
						<b-col>
							<b-button @click="deleteTeachersFormVisible = !deleteTeachersFormVisible">
								Toggle Delete Teachers Form
							</b-button>
						</b-col>
					</b-row>

					<b-form id="delete_teachers_form" v-if="deleteTeachersFormVisible">
						<b-row cols="4" class="d-flex flex-column align-items-center mb-4">
							<label for="course-id">Course ID</label>
							<b-col>
								<b-form-input
									id="course-id"
									class="text-center"
									type="text"
									v-model="courseIdWhereToDelete"
									required
								></b-form-input>
							</b-col>
						</b-row>

						<b-row>
							<b-col>
								<label for="user-id">User ID</label>
								<b-row cols="4" class="d-flex justify-content-center">
									<b-col
										class="mb-3"
										v-for="(input, index) in deleteTeachersFormInputs"
										:key="index"
									>
										<b-form-input
											class="text-center"
											v-model="input.userId"
											type="text"
											id="user-id"
											required
										></b-form-input>
									</b-col>
								</b-row>
							</b-col>
						</b-row>

						<b-row>
							<b-col class="d-flex justify-content-end">
								<b-button id="delete_teachers" style="width: 150px" @click="deleteTeachers"
									>Delete Teachers</b-button
								>
							</b-col>

							<b-col class="d-flex justify-content-start">
								<b-button
									id="delete_teachers"
									style="width: 150px"
									@click="addFieldToDeleteTeachersForm"
									>Add new input</b-button
								>
							</b-col>
						</b-row>
					</b-form>
				</div>

				<div id="add-teachers-form" class="mb-5">
					<b-row class="mb-4">
						<b-col>
							<b-button @click="addTeachersFormVisible = !addTeachersFormVisible">
								Toggle Add Teachers Form
							</b-button>
						</b-col>
					</b-row>

					<b-form v-if="addTeachersFormVisible">
						<b-row cols="4" class="d-flex flex-column align-items-center mb-4">
							<label for="course-id">Course ID</label>
							<b-col>
								<b-form-input
									id="course-id"
									class="text-center"
									type="text"
									v-model="courseIdWhereToAdd"
									required
								></b-form-input>
							</b-col>
						</b-row>

						<b-row>
							<b-col>
								<label for="user-id">User ID</label>
								<b-row cols="4" class="d-flex justify-content-center">
									<b-col
										class="mb-3"
										v-for="(input, index) in addTeachersFormInputs"
										:key="index"
									>
										<b-form-input
											class="text-center"
											v-model="input.userId"
											type="text"
											id="user-id"
											required
										></b-form-input>
									</b-col>
								</b-row>
							</b-col>
						</b-row>

						<b-row>
							<b-col class="d-flex justify-content-end">
								<b-button id="add_teachers" style="width: 150px" @click="addTeachers"
									>Add Teachers</b-button
								>
							</b-col>

							<b-col class="d-flex justify-content-start">
								<b-button
									id="add_teachers"
									style="width: 150px"
									@click="addFieldToAddTeachersForm"
									>Add new input</b-button
								>
							</b-col>
						</b-row>
					</b-form>
				</div>

				<div id="courses-table">
					<b-row>
						<b-col>
							<b-button
								id="toggle_courses_table"
								@click="coursesTableVisible = !coursesTableVisible"
								>Toggle Courses Table</b-button
							>
						</b-col>
					</b-row>

					<b-row>
						<b-col>
							<!-- <b-table striped hover :items="coursesArray" :fields="fields"></b-table> -->
							<b-table-simple
								striped
								hover
								responsive
								class="w-100"
								v-if="coursesTableVisible"
							>
								<b-thead>
									<b-th v-for="field in fields" :key="field.key">{{ field.label }}</b-th>
								</b-thead>
								<b-tbody>
									<b-tr v-for="(item, index) in coursesArray" :key="index">
										<b-td>{{ item.id }}</b-td>

										<b-td>{{ item.name }}</b-td>

										<b-td class="py-0">
											<b-tr class="d-flex justify-content-center">
												<b-td
													v-for="(email, index) in item.teacherEmails"
													:key="index"
													>{{ email }}</b-td
												>
											</b-tr>
										</b-td>

										<b-td class="py-0">
											<b-tr class="d-flex justify-content-center">
												<b-td
													v-for="(teacherId, index) in item.teacherIds"
													:key="index"
													>{{ teacherId }}</b-td
												>
											</b-tr>
										</b-td>

										<!-- below changes the teacher email and id fields
												to flex-column -->
										<!-- <b-td class="py-0">
											<b-tr class="nested-td">
												<b-td
													v-for="(email, index) in item.teacherEmails"
													:key="index"
													>{{ email }}</b-td
												>
											</b-tr>
										</b-td>

										<b-td class="py-0">
											<b-tr class="nested-td">
												<b-td
													v-for="(teacherId, index) in item.teacherIds"
													:key="index"
													>{{ teacherId }}</b-td
												>
											</b-tr>
										</b-td> -->
									</b-tr>
								</b-tbody>
							</b-table-simple>
						</b-col>
					</b-row>
				</div>
			</div>
		</b-container>
	</div>
</template>

<script>
export default {
	props: {
		msg: String,
	},
	data() {
		return {
			isInit: false,
			isSignedIn: false,
			user: null,

			fields: [
				{ key: "id", label: "Course ID" },
				{ key: "name", label: "Course Name" },
				{ key: "teacherEmails", label: "Teacher Email" },
				{ key: "teacherIds", label: "Teacher ID" },
			],

			deleteTeachersFormVisible: false,
			deleteTeachersFormInputs: [{ userId: "" }],
			courseIdWhereToDelete: "",

			coursesTableVisible: false,

			addTeachersFormVisible: false,
			addTeachersFormInputs: [{ userId: "" }],
			courseIdWhereToAdd: "",

			coursesArray: [],
		};
	},

	methods: {
		addFieldToDeleteTeachersForm() {
			this.deleteTeachersFormInputs.push({ userId: "" });
		},

		addFieldToAddTeachersForm() {
			this.addTeachersFormInputs.push({ userId: "" });
		},

		listCourses() {
			this.$google.api.client.classroom.courses.list({}).then((response) => {
				let courses = response.result.courses;

				if (courses.length > 0) {
					courses.forEach((course) => {
						let newCourse = new Object();

						newCourse.id = course.id;
						newCourse.name = course.name;
						newCourse.teacherEmails = [];
						newCourse.teacherIds = [];

						this.$google.api.client.classroom.courses.teachers
							.list({ courseId: course.id })
							.then((response) => {
								let teachers = response.result.teachers;

								if (teachers.length > 0) {
									teachers.forEach((teacher) => {
										newCourse.teacherEmails.push(teacher.profile.emailAddress);
										newCourse.teacherIds.push(teacher.userId);
									});
								}
							})
							.then(() => {
								this.coursesArray.push(newCourse);
							});
					});
				}
			});
		},

		addTeachers() {
			let courseId = this.courseIdWhereToAdd;
			let userId = this.addTeachersFormInputs;

			if (courseId) {
				userId.forEach((el, index) => {
					if (el) {
						this.$google.api.client.classroom.courses.teachers
							.create({
								courseId: courseId,
								userId: el.userId,
							})
							.then(
								(response) => {
									console.log("Response", response);
									this.addTeachersFormInputs[index].userId = "✔️";
								},
								(err) => {
									console.error("Add teachers error", err);
								}
							);
					} else if (!el.userId) {
						console.log("Please indicate at least one teacher to delete");
					}
				});
			}
		},

		deleteTeachers() {
			let courseId = this.courseIdWhereToDelete;
			let userId = this.deleteTeachersFormInputs;
			if (courseId) {
				userId.forEach((el, index) => {
					if (el.userId) {
						this.$google.api.client.classroom.courses.teachers
							.delete({
								courseId: courseId,
								userId: el.userId,
							})
							.then(
								(response) => {
									console.log("Response", response);
									this.deleteTeachersFormInputs[index].userId = "✔️";
								},
								(err) => {
									console.error("Delete teachers error", err);
								}
							);
					} else if (!el.userId) {
						console.log("Please indicate at least one teacher to delete");
					}
				});
			}
		},

		async signIn() {
			try {
				return await this.$google.api.auth2.getAuthInstance().signIn();
			} catch (e) {
				console.log(e);
			}
		},

		async signOut() {
			try {
				return await this.$google.api.auth2.getAuthInstance().signOut();
			} catch (e) {
				console.log(e);
			}
		},

		async disconnect() {
			return await this.$google.api.auth2.getAuthInstance().disconnect();
		},

		signInListener(status) {
			this.isSignedIn = status;
		},

		userListener(user) {
			this.user = user;
		},
	},

	created() {
		let that = this;
		let checkGALoad = setInterval(function () {
			that.isInit = that.$google.isInit;
			if (that.isInit) {
				that.isSignedIn = that.$google.api.auth2.getAuthInstance().isSignedIn.get();
				that.$google.api.auth2.getAuthInstance().isSignedIn.listen(that.signInListener);
				that.$google.api.auth2.getAuthInstance().currentUser.listen(that.userListener);
				clearInterval(checkGALoad);
			}
		}, 200);

		let interval = setInterval(() => {
			if (this.isSignedIn) {
				this.listCourses();
				clearInterval(interval);
			}
		});
	},
};
</script>

<style>
#main {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}

td {
	vertical-align: middle !important;
	white-space: pre-wrap;
}

/* .nested-td {
	display: flex;
	flex-direction: column;
	align-items: center;
} */
</style>
