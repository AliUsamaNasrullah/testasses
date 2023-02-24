$(document).ready(function () {
    loadData();

});
function loadData() {
    debugger
    $.ajax({
        url: "https://localhost:7121/api/User/GetUsers",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            console.log(result);
            var html = '';
            $.each(result, function (key, item) {
                html += '<tr>';
                html += '<td>' + item.id + '</td>';
                html += '<td>' + item.firstname + '</td>';
                html += '<td>' + item.lastname + '</td>';
                html += '<td>' + item.email + '</td>';
                html += '<td>' + item.number + '</td>';
                html += '<td><a href="#" onclick="return getbyID(' + item.id + ')">Edit</a> | <a href="#" onclick="Delete(' + item.id + ')">Delete</a></td>';
                html += '</tr>';
            });
            $('.tbody').html(html);
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}
function Add() {
    debugger
    var res = validate();
    if (res == false) {
        return false;
    }
    var empObj = {
        //Id: $('#ID').val(),
        firstname: $('#firstname').val(),
        lastname: $('#lastname').val(),
        email: $('#email').val(),
        number: $('#number').val()
    };
    CheckEmail();
    if (CheckEmail() == false  ) {
        return 0;
    }

    $.ajax({
        url: "https://localhost:7121/api/User/AddUser",
        data: JSON.stringify(empObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            Swal.fire(
                'Successfully!',
                'Data has been Inserted Succesfully!',
                'success'
            )

            loadData();
            $('#myModal').modal('hide');

        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}
function getbyID(Id) {
    debugger
    $('#firstname').css('border-color', 'lightgrey');
    $('#lastname').css('border-color', 'lightgrey');
    $('#email').css('border-color', 'lightgrey');
    $('#number').css('border-color', 'lightgrey');
    $.ajax({
        url: "https://localhost:7121/api/User/GetUserById/" + Id,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            $('#ID').val(result.id);
            $('#firstname').val(result.firstname);
            $('#lastname').val(result.lastname);
            $('#email').val(result.email);
            $('#number').val(result.number);
            $('#myModal').modal('show');
            $('#myModalLabel').text('Update User');
            $('#btnUpdate').show();
            $('#btnAdd').hide();
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
    return false;
}
function Update() {

    debugger
    var Id = $('#ID').val();

    console.log(Id);
    var res = validate();
    CheckEmail();
    if (CheckEmail() == false) {
        return 0;
    }
    if (res == false) {
        return false;
    }
    

    var empObj = {
        Id: $('#ID').val(),
        firstname: $('#firstname').val(),
        lastname: $('#lastname').val(),
        email: $('#email').val(),
        number: $('#number').val()
    };
    $.ajax({
        url: "https://localhost:7121/api/User/Update/" + Id,
        data: JSON.stringify(empObj),
        type: "Put",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            Swal.fire(
                'Successfully!',
                'Data has been Updated Succesfully!',
                'success'
            )
            loadData();
            $('#myModal').modal('hide');
            $('#ID').val("");
            $('#firstname').val("");
            $('#lastname').val("");
            $('#email').val("");
            $('#number').val("");
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}
function Delete(ID) {
    debugger
    var ans = confirm("Are you sure you want to delete this Record?");
    if (ans) {
        $.ajax({
            url: "https://localhost:7121/api/User/DeleteUserById/" + ID,
            type: "DELETE",
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            success: function (result) {    
                loadData();
            },
            error: function (errormessage) {
                alert(errormessage.responseText);
            }
        });
    }
}

function CheckEmail() {
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    var email = document.getElementById("email").value;
    const emailElem = document.getElementById("email");
    if (regex.test(email)) {
        emailElem.classList.remove('border-danger');
    
        return true;

    }
    else {
        emailElem.classList.add('border-danger');
        return false;
    }
}


function clearTextBox() {
    //console.log("HEy");
    //$('#myModal').show(); 
    $('#myModal').modal('show');
    $('#myModalLabel').text('Add New User');
    $('#ID').val("");
    $('#firstname').val("");
    $('#lastname').val("");
    $('#email').val("");
    $('#number').val("");
    $('#btnUpdate').hide();
    $('#btnAdd').show();
    $('#firstname').css('border-color', 'lightgrey');
    $('#lastname').css('border-color', 'lightgrey');
    $('#email').css('border-color', 'lightgrey');
    $('#number').css('border-color', 'lightgrey');
}
function CloseModal() {
    //console.log("HEy11");
    $('#myModal').modal('hide');
}
function validate() {
    var isValid = true;
    if ($('#firstname').val().trim() == "") {
        $('#firstname').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#firstname').css('border-color', 'lightgrey');
    }
    if ($('#lastname').val().trim() == "") {
        $('#lastname').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#lastname').css('border-color', 'lightgrey');
    }
    if ($('#email').val().trim() == "") {
        $('#email').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#email').css('border-color', 'lightgrey');
    }
    if ($('#number').val().trim() == "") {
        $('#number').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#number').css('border-color', 'lightgrey');
    }
    return isValid;
}
