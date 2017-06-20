/* GLOBAL VARIABLES - accessible by all functions
 ================================================ */

$(document).ready(function() {


	console.log("Look at me");  //this works
	
	$('#budgetSubmit').on('submit', function(event){
		event.preventDefault();
		console.log("Hi");
		//alert("Hi");
		
		console.log("start date: " + $('#start_date').val());
		console.log("end date: " + $("#end_date").val());
		if ($('#end_date').val() <= $('#start_date').val()){
			//$('#errors').html('End date must be greater than start date');
			alert("End date must be greater than start date");
			return false
		}
		else {
			console.log("wtf");
			// var x = $('input[name=optRadio1]:checked').val();  // this works
			// console.log("Is radio view checked: " + x);

			// var x = $('input[name=optRadio]:checked').val();
			// console.log("Radio button value: " + x);
			//var z = document.querySelector('input[name = "optRadio"]:checked').size();
			//console.log("Radio button selected length property: " + z);
			// $('#budgetSubmit').action="/budgets/create?_method=POST";
			// console.log("#budgetCreate").action;
			// $('#budgetSubmit').submit;


			var url = '/budgets';
			    $.ajax({
			      url: url,
			      data: {start_date: $('#start_date').val(), end_date: $('#end_date').val()}, //parameters go here in object literal form
			      type: 'GET',
			      datatype: 'json',
			      success: function(data) { alert('got here with data'); },
			      error: function() { alert('something bad happened'); }
			});
		}
		// console.log("wtf");
		// $('budgetCreate').submit;
		// //call route to page for displaying budgets or inputting budget items
	});

	function validateForm(){
		console.log("this: " + this);
		console.log("Form validation in progress");
		console.log("start date: " + $('#start_date').val());
		console.log("end date: " + $("#end_date").val());
		if ($('#end_date').val() <= $('#start_date').val()){
			//$('#errors').html('End date must be greater than start date');
			alert("End date must be greater than start date");
			return false
		}
		//console.log("this: " + this);
		//this.submit(); //now submit the form	
	};
//});

// $('form').on('submit', function(e) {
//     e.preventDefault();
//     $('#hiddenInput').val(someVariable); //perform some operations
//     this.submit(); //now submit the form
});