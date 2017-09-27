var viewModel = {
  teams: ko.observable([]),
  employees: ko.observable([]),
  projects:ko.observable([])
};

$(function(){
  console.log("jQuery is working.");
  return new Promise((resolve,reject)=>{
    initializeTeams()
    .then(initializeEmployees())
    .then(initializeProjects())
    .then(()=>{
      ko.applyBindings(viewModel);
      $("#select, .multiple").multipleSelect({filter:true});
      $("#select, .single").multipleSelect({single:true, filter:true});
    }).catch((err)=>{
      showGenericModal("Error",err);
    });
  });


  function showGenericModal(title, message)
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
