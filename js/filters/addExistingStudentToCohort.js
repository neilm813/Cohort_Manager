app.filter("studentsNotInSelectedCohort", function() {
   return function(students, selectedCohort) {
      var includedStudents = [];

      for ( var i = 0; i < students.length; i++ ) {
         if ( students[i].cohortId != selectedCohort.id ) {
            includedStudents.push(students[i]);
         }
      }
      return includedStudents;
   }
});