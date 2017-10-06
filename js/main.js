/*********************************************************************************
* WEB422 – Assignment 03
* I declare that this assignment is my own work in accordance with Seneca Academic Policy. No part of this
* assignment has been copied manually or electronically from any other source (including web sites) or
* distributed to other students.
*
* Name: Youngmin Kim Student ID: 109-161-158 Date: 2017-10-06
*
********************************************************************************/

var viewModel = {
  teams: ko.observableArray([]),
  employees: ko.observableArray([]),
  projects:ko.observableArray([]),
  saveTeam : function()
  {  }
};

saveTeam = function()
{
  var currentTeam = this;
  console.log(ko.mapping.toJS(currentTeam));
  $.ajax({
    url: "https://guarded-scrubland-73383.herokuapp.com/team/"+ko.mapping.toJS(currentTeam._id),
    type: "PUT",
    data: JSON.stringify({ Projects: ko.mapping.toJS(currentTeam.Projects),Employees: ko.mapping.toJS(currentTeam.Employees),TeamLead: ko.mapping.toJS(currentTeam.TeamLead) }), // we can also send data using the "data" option
    contentType: "application/json"
  })
  .done(function () {
    showGenericModal("Success","\"["+ko.mapping.toJS(currentTeam.TeamName) + "] Updated Successfully\", where ["+ko.mapping.toJS(currentTeam.TeamName)+"] is the \"TeamName\" of \"currentTeam\"");
  }).fail(function (err)
  {
    showGenericModal("Error",err);
  });
}



$(function(){
  console.log("jQuery is working.");
  //return new Promise((resolve,reject)=>{
    initializeTeams()
    .then(initializeEmployees)
    .then(initializeProjects)
    .then(()=>{
      ko.applyBindings(viewModel);
      //ko.applyBindings(saveTeam);
      console.log(ko.mapping.toJS(viewModel));
      $("select.multiple").multipleSelect({ filter: true });
      $("select.single").multipleSelect({ single: true, filter: true });
      console.log(ko.mapping.toJS(viewModel));
      //resolve();
    }).catch((err)=>{
      showGenericModal("Error",err);
      //reject();
    });
  //});


  window.showGenericModal= function(title, message)
  {
    $(".modal-title").empty();
    $(".modal-body").empty();
    $(".modal-title").append(title);
    $(".modal-body").append("<p>"+message+"</p>");
    $("#genericModal").modal('show');
  };
  function initializeTeams()
  {

    return new Promise(function (resolve, reject)
    {
      $.ajax({
        url: "https://guarded-scrubland-73383.herokuapp.com/teams-raw", // This only works if the Teams API is running locally - change this url to your Heroku API (/employees) to use your API on Heroku
        type: "GET",
        //data: JSON.stringify({ some: "data" }), // we can also send data using the "data" option
        contentType: "application/json"
      })
      .done(function (value) {
        viewModel.teams = ko.mapping.fromJS(value);
        //console.log(value);

        resolve();
      }).fail(function (err)
      {
        reject("Error Loading the team data.");
      });
    });
  };
  function initializeEmployees()
  {
    return new Promise((resolve,reject)=>{
      $.ajax({
        url: "https://guarded-scrubland-73383.herokuapp.com/employees", // This only works if the Teams API is running locally - change this url to your Heroku API (/employees) to use your API on Heroku
        type: "GET",
        //data: JSON.stringify({ some: "data" }), // we can also send data using the "data" option
        contentType: "application/json"
      })
      .done(function (value) {
        viewModel.employees = ko.mapping.fromJS(value);
        resolve();
      }).fail(function (err)
      {
        reject("Error Loading the employee data.");
      });
    });
  };
  function initializeProjects()
  {
    return new Promise((resolve,reject)=>{
      $.ajax({
        url: "https://guarded-scrubland-73383.herokuapp.com/projects", // This only works if the Teams API is running locally - change this url to your Heroku API (/employees) to use your API on Heroku
        type: "GET",
        //data: JSON.stringify({ some: "data" }), // we can also send data using the "data" option
        contentType: "application/json"
      })
      .done(function (value) {
        viewModel.projects = ko.mapping.fromJS(value);
        resolve();
      }).fail(function (err)
      {
        reject("Error Loading the 'project' data.");
      });
    });
  };
});
