app.filter("instructorsNotInSelectedCohort", function() {
   return function(instructors, selectedCohort) {
      var includedInstructors = [];

      for ( var i = 0; i < instructors.length; i++ ) {
         if ( instructors[i].cohortIds.indexOf(selectedCohort.id) == -1 ) {
            includedInstructors.push(instructors[i]);
         }
      }
      return includedInstructors;
   }
});