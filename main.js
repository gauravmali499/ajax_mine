$(function () {
  getData();
  $("#btn").click(() => {
    obj = { name: "", email: "", gender: "", status: "" }
    obj.name = $("#name").val()
    obj.email = $("#email").val()
    obj.gender = $("[name='gender']:checked").val()
    obj.status = $("#status").val()
    postData(obj)
    getData()
  })
  $("#btnEdit").click(() => {
    obj = { name: "", email: "", gender: "", status: "" }
    obj.name = $("#name").val()
    obj.email = $("#email").val()
    obj.gender = $("[name='gender']:checked").val()
    obj.status = $("#status").val()
    url="https://gorest.co.in/public/v2/users/"+$("#id").val()
    var settings = {
      "url": url,
      "method": "PATCH",
      "timeout": 0,
      "headers": {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": "Bearer e6f586b76ebd8d76b6fb64b9154de293e30dcc34eb1e2aeb97314a633a1c4c04"
      },
      "data": JSON.stringify(obj),
    };

    $.ajax(settings).done(function (response) {
      getData(obj)
    });
  })
})
function getData() {
  $("table").html("")
  $("table").html("<th>ID</th><th>Name</th><th>Email</th><th>Gender</th><th>Status</th>")
  var settings = {
    "url": "https://gorest.co.in/public/v2/users",
    "method": "GET",
    "timeout": 0,
    "headers": {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Authorization": "Bearer e6f586b76ebd8d76b6fb64b9154de293e30dcc34eb1e2aeb97314a633a1c4c04"
    },
  };

  $.ajax(settings).done(function (value) {
    $.each(value, function (key, value) {
      var tr = $("<tr></tr>")
      $("<td></td>").text(value.id).appendTo($(tr))
      $("<td></td>").text(value.name).appendTo($(tr))
      $("<td></td>").text(value.email).appendTo($(tr))
      $("<td></td>").text(value.gender).appendTo($(tr))
      $("<td></td>").text(value.status).appendTo($(tr))
      var editButton = $("<td></td>")
          $("<button></button>").text("Edit").click(() => {
            $("#btn").attr("disabled", true)
            $("#btnEdit").attr("disabled", false)
            $("#name").val(value.name)
            $("#email").val(value.email)
            if (value.gender == "male") {
              $("#male").attr("checked", true)
              $("#female").attr("checked", false)
            }
            else if (value.gender == "female") {
              $("#female").attr("checked", true)
              $("#male").attr("checked", false)
            }
            $("#status").val(value.status)
            $("#id").val(value.id)

          }).appendTo($(editButton))

      var deleteButton = $("<td></td>")
          $("<button></button>").text("Delete").click(() => {
            var url = "https://gorest.co.in/public/v2/users/" + value.id;
            var settings = {
              "url": url,
              "method": "DELETE",
              "timeout": 0,
              "headers": {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": "Bearer e6f586b76ebd8d76b6fb64b9154de293e30dcc34eb1e2aeb97314a633a1c4c04"
              },
            };
            
            $.ajax(settings).done(function (response) {
              $("table").html("")
              $("table").html("<th>ID</th><th>Name</th><th>Email</th><th>Gender</th><th>Status</th>")
              getData()
            });
          }).appendTo($(deleteButton))

          $(editButton).appendTo($(tr))
          $(deleteButton).appendTo($(tr))
          $("table").append($(tr))
        })
    })
  }


function postData(data) {
  var settings = {
    "url": "https://gorest.co.in/public/v2/users",
    "method": "POST",
    "timeout": 0,
    "headers": {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Authorization": "Bearer e6f586b76ebd8d76b6fb64b9154de293e30dcc34eb1e2aeb97314a633a1c4c04"
    },
    "data": JSON.stringify(data),
  };
  $.ajax(settings).done(function (response) {

  });
}

