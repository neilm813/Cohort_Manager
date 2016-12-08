app.controller("cohortController", ["$scope", "$http", "$q", function ($scope, $http, $q, instructorsNotInSelectedCohort) {

	$scope.cohorts = [];
	$scope.students = [];
	$scope.instructors = [];

	var getCohorts = $http.get("http://127.0.0.1:8080/js/data/cohorts.json")
			.then(function(response) {
					$scope.cohorts = response.data.cohorts;
			});

	var getStudents = $http.get("http://127.0.0.1:8080/js/data/students.json")
			.then(function(response) {
					$scope.students = response.data.students;
			});

	var getInstructors = $http.get("http://127.0.0.1:8080/js/data/instructors.json")
			.then(function(response) {
					$scope.instructors = response.data.instructors;
			});

	$q.all([getCohorts, getStudents, getInstructors]).then(function() {

	$scope.currentDate = new Date().toJSON().slice(0,10);


	/* COHORTS
	*****************************************/
	$scope.cohorts;
	$scope.students;
	$scope.selectedCohort = {};
	$scope.selectedCohortIndex;
	$scope.isCohortSelected = false; //for ng-show
	// CREATE:
	$scope.newCohort = {};
	$scope.createNewCohortClick;
	$scope.saveNewCohortClick;
	// UPDATE:
	$scope.editedCohort;
	$scope.editCohortClick;
	$scope.saveEditedCohortClick;
	// DELETE:
	$scope.removeSelectedCohortClick;

	/********** FUNCTIONS **********/
	
	// SET SELECTED COHORT
	$scope.setSelectedCohortClick = function(cohortObject) {
		$scope.selectedCohort = cohortObject;
		console.log('selected cohort id: ' + $scope.selectedCohort.id);
		$scope.isCohortSelected = true;
		for ( var i = 0; i < $scope.cohorts.length; i++ ) {
			if ( cohortObject.id == $scope.selectedCohort.id ) {
				$scope.selectedCohortIndex = i;
			}
		}
	};

	/*** CREATE ***/
	// ADD NEW COHORT btn
	$scope.createNewCohortClick = function() {
		$("#createNewCohortModal").modal()
	}
	// CREATE NEW COHORT OBJECT & PUSH: save btn in modal
	$scope.saveNewCohortClick = function() {
		$scope.newCohort.id = $scope.cohorts.length + 2; // to prevent seed data student's cohortId equaling a new cohort's id
		$scope.newCohort.instructors = [];
		$scope.newCohort.students = [];
		// user input:
		$scope.newCohort.startDate = $scope.createCohort.startDate;
		$scope.newCohort.endDate = $scope.createCohort.endDate;
		$scope.newCohort.year = $scope.createCohort.year;
		$scope.newCohort.season = $scope.createCohort.season;
		$scope.newCohort.holidays = $scope.createCohort.holidays;
		$scope.newCohort.curriculum = $scope.createCohort.curriculum;

		$scope.cohorts.push($scope.newCohort);
	}

	/*** UPDATE ***/
	/* Push students into cohort they are attending. Start by initializing students in cohort as empty so that if a students cohortId was removed they will be removed from cohort */
	$scope.pushStudentsIntoCohort = function() {
		$scope.isStudentSelected = false;
		for ( var i = 0; i < $scope.cohorts.length; i++ ) {
			$scope.cohorts[i].students = [];
			for ( var j = 0; j < $scope.students.length; j++ ) {
				if ( $scope.students[j].cohortId == $scope.cohorts[i].id ) {
					$scope.cohorts[i].students.push($scope.students[j]);
				}
			}
		}
	}; $scope.pushStudentsIntoCohort();

	// EDIT COHORT btn
	$scope.editCohortClick = function() {
		$("#editCohortModal").modal() //triggers modal popup
		$scope.editedCohort = angular.copy($scope.selectedCohort);
	}

	// UPDATE/SAVE EDITED COHORT
	$scope.saveEditedCohortClick = function() {
		// Update in Cohort arr
		$scope.cohorts[$scope.selectedCohortIndex] = $scope.editedCohort;
		$scope.selectedCohort = $scope.cohorts[$scope.selectedCohortIndex];
	}

	/*** DELETE ***/
	// REMOVE SELECTED COHORT FROM cohorts arr
	$scope.removeSelectedCohortClick = function() {
		$scope.isCohortSelected = false;
		$scope.isStudentSelected = false;
		$scope.isInstructorSelected = false;
		
		for ( var i = 0; i < $scope.cohorts.length; i++ ) {
			if ( $scope.selectedCohort.id == $scope.cohorts[i].id ) {
				$scope.cohorts.splice(i, 1);
			}
		}
	}

	/* STUDENTS
	*****************************************/

	// CREATE:
	$scope.newStudent = {};
	$scope.addNewStudentClick;
	$scope.saveNewStudentClick;
	// UPDATE:
	$scope.students;
	$scope.selectedStudent = {};
	$scope.selectedStudentIndex;
	$scope.isStudentSelected = false;
	$scope.studentCohortIndex;
	$scope.isStudentOptionSelected = false;
	$scope.addStudentToCohortClick;

	$scope.editStudentClick;
	$scope.saveEditedStudentClick;
	$scope.editedStudent;

	$scope.setAddStudentOnChange; 
	$scope.addStudentId;
	// DELETE:
	$scope.removeSelectedStudentClick;
	$scope.deleteSelectedStudentClick;

	
	/********** FUNCTIONS **********/
	// SET SELECTED STUDENT
	$scope.setSelectedStudentClick = function(studentId) {
		for ( var i = 0; i < $scope.students.length; i++ ) {
			if ( studentId == $scope.students[i].id ) {
				$scope.selectedStudent = $scope.students[i];
				$scope.selectedStudentIndex = i;
			}
		}
		$scope.isStudentSelected = true;
	};

	/*** CREATE ***/

	// CREATE NEW STUDENT btn
	$scope.createNewStudentClick = function() {
		$("#createNewStudentModal").modal();
	}

	// CREATE NEW STUDENT OBJECT & PUSH: save btn
	$scope.saveNewStudentClick = function() {
		$scope.newStudent.id = $scope.students.length;
		$scope.newStudent.absenteePoints = "0/10";
		$scope.newStudent.payDelinquency = 0;
		$scope.newStudent.graduated = "";
		// user input ng-model:
		$scope.newStudent.fName = $scope.createStudent.fName;
		$scope.newStudent.lName = $scope.createStudent.lName;
		$scope.newStudent.priorExperience = $scope.createStudent.priorExperience;
		$scope.newStudent.phoneNumber = $scope.createStudent.phoneNumber;
		$scope.newStudent.email = $scope.createStudent.email;
		$scope.newStudent.birthday = $scope.createStudent.birthday;
		$scope.newStudent.sex = $scope.createStudent.sex;

		$scope.students.push($scope.newStudent);
	}

	/*** UPDATE ***/

	// EDIT STUDENT btn
	$scope.editStudentClick = function() {
		$("#editStudentModal").modal();
		$scope.editedStudent = angular.copy($scope.selectedStudent);
	}

	// UPDATE/SAVE EDITED STUDENT
	$scope.saveEditedStudentClick = function() {
		if ( $scope.editedStudent.absenteePoints >= 10 ) {
			$scope.editedStudent.graduated = "Dropped Due to Missing Too Many Classes";
			$scope.editedStudent.cohortId = "";
		}
		// Update in students arr and students arr inside of cohort
		$scope.students[$scope.selectedStudentIndex] = $scope.editedStudent;
		$scope.pushStudentsIntoCohort();
		$scope.selectedStudent = $scope.editedStudent;
		$scope.isStudentSelected = true;
	}

	/*** ADD EXISTING STUDENT TO SELECTED COHORT ***/
	// STORE selected student <option> info
	$scope.setAddStudentOnChange = function() {
		for ( var i = 0; i < $scope.students.length; i++ ) {
			if ( $scope.addStudentId == $scope.students[i].id ) {
				$scope.selectedStudent = $scope.students[i];
				$scope.isStudentSelected = true;
			}
		}
	}

	// PUSH selected student <option> into cohort: add student btn
	$scope.addStudentToCohortClick = function() {
		$scope.selectedCohort.students.push($scope.selectedStudent);
		$scope.selectedStudent.cohortId = $scope.selectedCohort.id;
		$scope.selectedStudent.graduated = "In Progress";
		$scope.pushStudentsIntoCohort();
		$scope.isStudentSelected = true;
	}


	// REMOVE SELECTED STUDENT FROM selectedCohort.students
	$scope.removeSelectedStudentClick = function() {
		$scope.selectedStudent.cohortId = null;
		$scope.selectedStudent.graduated = "Removed from " + $scope.selectedCohort.season + " " + $scope.selectedCohort.year + " cohort on " + $scope.currentDate;
		$scope.isStudentSelected = false;
		$scope.pushStudentsIntoCohort();
	}


	/* INSTRUCTORS
	*****************************************/

	/********** INITIALIZED VARIABLES **********/
	$scope.instructors;
	$scope.selectedInstructor = {};
	$scope.isInstructorSelected = false;
	$scope.selectedInstructorIndex;
	$scope.instructorCohortIndex;
	// CREATE:
	$scope.newInstructor = {};
	$scope.createNewInstructorClick;
	$scope.saveNewInstructorClick;
	$scope.createInstructor;
	// UPDATE:
	$scope.editInstructorClick = {};
	$scope.editedInstructor = {}; 
	$scope.addInstructorId;
	$scope.selectedInstructorOption = {};
	$scope.isInstructorOptionSelected = false;
	$scope.setAddInstructorOnChange;
	// DELETE:
	$scope.removeSelectedInstructorClick;

	/********** FUNCTIONS **********/

	// ASSIGN/PUSH INSTRUCTORS TO COHORT THEY ARE TEACHING
	$scope.pushInstructorsIntoCohort = function() {
		for ( var i = 0; i < $scope.cohorts.length; i++ ) {
			$scope.cohorts[i].instructors = [];
			for ( var j = 0; j < $scope.instructors.length; j++ ) {
				for ( var k = 0; k < $scope.instructors[j].cohortIds.length; k++ ) {

					if ( $scope.instructors[j].cohortIds[k] == $scope.cohorts[i].id ) {
						$scope.cohorts[i].instructors.push($scope.instructors[j]);
					}
				}
			}
		}
	}; $scope.pushInstructorsIntoCohort();

	// SET SELECTED INSTRUCTOR
	$scope.setSelectedInstructorClick = function(instructorId) {
		for ( var i = 0; i < $scope.instructors.length; i++ ) {
			if ( instructorId == $scope.instructors[i].id ) {
				$scope.selectedInstructor = $scope.instructors[i];
				$scope.selectedInstructorIndex = i;
			}
		}
		$scope.isInstructorSelected = true;
	};

	/*** CREATE NEW INSTRUCTOR ***/
	// CREATE NEW INSTRUCTOR btn
	$scope.createNewInstructorClick = function() {
		$("#createNewInstructorModal").modal() //triggers modal popup
	}

	// CREATE NEW INSTRUCTOR OBJECT & PUSH: save btn
	$scope.saveNewInstructorClick = function() {
		$scope.newInstructor.id = $scope.instructors.length;
		$scope.newInstructor.cohortIds = [];
		$scope.newInstructor.daysAbsent = 0;
		// user input:
		$scope.newInstructor.fName = $scope.createInstructor.fName;
		$scope.newInstructor.lName = $scope.createInstructor.lName;
		$scope.newInstructor.title = $scope.createInstructor.title;
		$scope.newInstructor.phoneNumber = $scope.createInstructor.phoneNumber;
		$scope.newInstructor.email = $scope.createInstructor.email;
		$scope.newInstructor.birthday = $scope.createInstructor.birthday;
		$scope.newInstructor.sex = $scope.createInstructor.sex;

		$scope.instructors.push($scope.newInstructor);
	}

	/*** ADD EXISTING INSTRUCTOR TO SELECTED COHORT ***/
	// STORE selected instructor <option> info
	$scope.setAddInstructorOnChange = function() {
		for ( var i = 0; i < $scope.instructors.length; i++ ) {
			if ( $scope.addInstructorId == $scope.instructors[i].id ) {
				$scope.selectedInstructorOption = $scope.instructors[i];
				$scope.selectedInstructor = $scope.selectedInstructorOption;
				$scope.isInstructorSelected = true;
			}
		}
	}

	// PUSH selected instructor <option> into cohort: add instructor btn
	$scope.addInstructorToCohortClick = function() {
		$scope.selectedCohort.instructors.push($scope.selectedInstructorOption);
		$scope.selectedInstructorOption.cohortIds.push($scope.selectedCohort.id);
	}

	// EDIT INSTRUCTOR btn
	$scope.editInstructorClick = function() {
		$("#editInstructorModal").modal() //triggers modal popup
		$scope.editedInstructor = angular.copy($scope.selectedInstructor);
	}

	// UPDATE/SAVE EDITED INSTRUCTOR
	$scope.saveEditedInstructorClick = function() {
		// Update in instructors arr and instructors arr inside of cohort
		$scope.instructors[$scope.selectedInstructorIndex] = $scope.editedInstructor;
		$scope.pushInstructorsIntoCohort();
		
		$scope.selectedInstructor = $scope.editedInstructor;
		$scope.isInstructorSelected = true;
	}

	// REMOVE INSTRUCTOR FROM selectedCohort.instructors
	$scope.removeSelectedInstructorClick = function() {
		for ( var i = 0; i < $scope.selectedInstructor.cohortIds.length; i++ ) {
			if ( $scope.selectedInstructor.cohortIds[i] == $scope.selectedCohort.id ) {
				$scope.selectedInstructor.cohortIds.splice(i, 1);
			}
		}
		$scope.isInstructorSelected = false;
		$scope.pushInstructorsIntoCohort();
	}

	}); //END deferred promise chain
}]); //END app.controller