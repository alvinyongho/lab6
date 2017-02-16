'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
	$('.project a').click(addProjectDetails);

	$('#colorBtn').click(randomizeColors);
}

/*
 * Make an AJAX call to retrieve project details and add it in
 */
function addProjectDetails(e) {
	// Prevent following the link
	e.preventDefault();

	// Get the div ID, e.g., "project3"
	var projectID = $(this).closest('.project').attr('id');
	// get rid of 'project' from the front of the id 'project3'
	var idNumber = projectID.substr('project'.length);

	//console.log("User clicked on project " + idNumber);


	$.get('/project/' + idNumber, addDetails)

}

function addDetails(result){
	//console.log(result)


	var image = '<img src="' + result['image'] + '" class="detailsImage">'
	var projectHTML =
									image
									+ '<p>' + result['title'] + '</p>'
									+ '<p>' + result['date'] + '</p>'
									+ '<p>' + result['summary'] + '</p>'

	$("#project" + result['id'] + " .details").html(projectHTML);
}

/*
 * Make an AJAX call to retrieve a color palette for the site
 * and apply it
 */
function randomizeColors(e) {
	console.log("User clicked on color button");

	e.preventDefault();
	$.get('/palette', modifyColors);
}

function modifyColors(result){
	// console.log(result);
	var colors = result['colors']['hex'];
	// console.log(colors);
	var bgColor = colors[0];
	var bgColor2 = colors[1];
	var hColors = colors[2];
	var pColor = colors[3];
	$('body').css('background-color', bgColor);
	$('.thumbnail').css('background-color', bgColor2);
	$('h1, h2, h3, h4, h5, h5').css('color', hColors);
	$('p').css('color', pColor);
	$('.project img').css('opacity', .75);

}
