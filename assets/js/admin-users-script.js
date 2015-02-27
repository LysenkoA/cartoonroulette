function notCorrectUserData (userData, action) {
    
    if (userData == 'name') {
        var regex = /^[A-Za-z]{1}[A-Za-z0-9\_\-]{3,48}[a-zA-Z]{1}/g;
    }
    if (userData == 'pass') {
        var regex = /^[A-Za-z]{1}[A-Za-z0-9]{3,48}/g;
    }
    if (userData == 'email') {
        var regex = /^[a-z]+[a-z0-9\_\-\.]+@([a-z]+\.)+[a-z]+/g;
    }
    
    if (action == 'create') {
        var curInput = $('#'+userData+'-new-user');
    }
    if (action == 'edit') {
        var curInput = $('#new-'+userData);
    }
    var userValue = curInput.val();
    if ( !regex.test(userValue) ) {
        curInput
            .css('border', '2px solid red')
            .addClass('non-correct-data');
        
        return false;
    }
    else {
        curInput
            .css('border', 'none')
            .removeClass('non-correct-data');
    }    
}

function notCorrectUserRole (action) {
    
    if (action == 'create') {
        var userRole = $('#role-new-user');
    }
    if (action == 'edit') {
        var userRole = $('#new-role');
    }

    if (userRole.val() == 'default') {
        userRole
            .css('border', '2px solid red')
            .addClass('non-correct-data');
        return false;        
    }
    else {
        userRole
            .css('border', 'none')
            .removeClass('non-correct-data');        
    }
}

$('.cartoon-cat').on('click', function () {
    if ( $('.cartoon-cat').hasClass('active-cat') ) {
        return false;
    } else {
        $('.admin-users').hide();
        $('.add-item, .admin-table').show();
        
        $('.users-cat').removeClass('active-cat');
        $('.cartoon-cat').addClass('active-cat');
    } 
});

$('.users-cat').on('click', function () {
    
    canselAddItemPanel ();
    
    if ( $('.users-cat').hasClass('active-cat') ) {
        return false;
    } else {
        $('.cartoon-cat').removeClass('active-cat');
        $('.users-cat').addClass('active-cat');
        
        $('.add-item, .admin-table').hide();
        $('.admin-users').show();
        
        $.ajax ({
            url: "./system/admin.php",
            type: "post",
            data: {getusers: true}
        })
            .done ( function (res) {
            $('.users-list-table-body').empty();
            var usersList = JSON.parse(res);
            
            for (var j = 0; j < usersList.length; j++) {
                var userId = "u"+usersList[j].id
                $('<tr>', {
                    id: userId,
                    class: 'users-list-table-tr'
                }).appendTo('.users-list-table-body');
                
                $('<td>', {
                    class: 'td-user-name'
                })  .text(usersList[j].name)
                    .appendTo('#'+userId);
                
                $('<td>', {
                    class: 'td-user-email'
                })  .text(usersList[j].email)
                    .appendTo('#'+userId);
                
                $('<td>', {
                    class: 'td-user-role'
                })  .text(usersList[j].role)
                    .appendTo('#'+userId);
                
                $('<td>', {
                    class: 'td-user-del'
                }).appendTo('#'+userId);
                
                $('<i>', {
                    class: 'fa fa-times-circle'
                }).appendTo('#'+userId+' .td-user-del');
                
                $('<td>', {
                    class: 'td-user-edit'
                }).appendTo ('#'+userId);
                
                $('<i>', {
                    class: 'fa fa-edit'
                }).appendTo('#'+userId+' .td-user-edit');

            }
        });
    }
});

$('.users-list-table-body').on('click', '.fa-edit', function () {
    var curId = $(this).parent().parent().attr('id');
    curId = parseInt(curId.substring(1));
    
    var curEl = $(this).parent().parent();
    
    var edName = $('<input>', {
        type: 'text',
        id: 'new-name',
        placeholder: 'Enter new name'
    });
    
    var edEmail = $('<input>', {
        type: 'text',
        id: 'new-email',
        placeholder: 'Emter new e-mail'
    }); 
    
    var edRole = $('<select>', {
        name: 'user-role',
        id: 'new-role'
    });
    
    var edCancel = $('<i>', {
        class: 'fa fa-undo',
        id: 'ed-cancel'
    });
    
    var edSubmit = $('<li>', {
        class: 'fa fa-check',
        id: 'ed-submit'
    });
    
    curEl.find('.td-user-name').append(edName);
    curEl.find('.td-user-email').append(edEmail);
    curEl.find('.td-user-role').append(edRole);
    curEl.find('.td-user-del').append(edCancel);
    curEl.find('.td-user-edit').append(edSubmit);
    
    
    $('<option>', {
        value: 'default'
    })  .text('Select a role')
        .appendTo('#new-role');
    
    $('<option>', {
        value: 'admin'
    })  .text('admin')
        .appendTo('#new-role');
    
    $('<option>', {
        value: 'user'
    })  .text('user')
        .appendTo('#new-role');
});

$('.users-list-table-body').on('click', '#ed-cancel', function () {
    $('#new-name, #new-email, #new-role, #ed-cancel, #ed-submit').detach();
});

$('.users-list-table-body').on('click', '#ed-submit', function () {
    var curId = $(this).parent().parent().attr('id');
    curId = parseInt(curId.substring(1));
    var newName = $('#new-name').val();
    var newEmail = $('#new-email').val();
    var newRole = $('#new-role').val();
    
    var arrData = ['name', 'email'];
    
    for (var i = 0; i < arrData.length; i++) {
        notCorrectUserData (arrData[i], 'edit');
    }
    
    if (newRole == 'default') {
        notCorrectUserRole ('edit'); 
        return false;
    }
    
    $.ajax({
        url: "./system/admin.php",
        type: "post",
        data: {
            edituser: true,
            curid: curId,
            newname: newName,
            newemail: newEmail,
            newrole: newRole
        }
    }).done ( function (res) {
        if (newName != "") {
            $('#u'+curId).find('.td-user-name').text(newName);
        }
        if (newEmail != "") {
            $('#u'+curId).find('.td-user-email').text(newEmail);
        }
        if (newRole != "default") {
            $('#u'+curId).find('.td-user-role').text(newRole);
        }
    });
    
    $('#new-name, #new-email, #new-role, #ed-cancel, #ed-submit').detach();
});

$('.users-list-table-body').on('click', '.fa-times-circle', function () {
    var curId = $(this).parent().parent().attr('id');
    curId = parseInt(curId.substring(1));

    $.ajax ({
        type: "post",
        url: "./system/admin.php",
        data: { deluser: true,
                userid: curId}
    })
        .done ( function (res) {
            if (curId == res) { 
                $('.users-list-table-body #u'+res).hide();
            }
            else {
                console.log('error');
            }
        });
});

$('.but-add-user').on('click', function () {
    
    if ( $(this).hasClass('disactive') ) {
        $('.new-user-panel').detach();
        $(this).removeClass('disactive');
    }
    else {
        $('<div>', {
            class: 'new-user-panel'
        }).appendTo('.add-new-user');

        $('<input>', {
            id: 'name-new-user',
            type: 'text'
        }).appendTo('.new-user-panel');

        $('<label>', {
            for: 'name-new-user',
            text: 'Name'
        }).insertBefore('#name-new-user');

        $('<input>', {
            id: 'email-new-user',
            type: 'text'
        }).appendTo('.new-user-panel');

        $('<label>', {
            for: 'email-new-user',
            text: 'E-mail'
        }).insertBefore('#email-new-user');

        $('<input>', {
            id: 'pass-new-user',
            type: 'text'
        }).appendTo('.new-user-panel');

        $('<label>', {
            for: 'pass-new-user',
            text: 'Password'
        }).insertBefore('#pass-new-user');

        $('<select>', {
            id: 'role-new-user'
        }).appendTo('.new-user-panel');

        var options = [ {"value": "default", 
                        "text": "Select a role"},
                        {"value": "admin",
                        "text": "admin"},
                        {"value": "user",
                        "text": "user"} ];

        for (var i = 0; i < options.length; i++) {
            $('<option>', {
                value: options[i].value,
                text: options[i].text
            }).appendTo('#role-new-user');        
        }
        
        $('<span>', {
            id: 'submit-new-user'
        })  .html('Add <i class="fa fa-check"></i>')
            .appendTo('.new-user-panel');

        $('<span>', {
            id: 'cancel-new-user'
        })  .html('Cancel <i class="fa fa-reply"></i>')
            .appendTo('.new-user-panel');
        
        $(this).addClass('disactive');
    }
});

$('.add-new-user').on('click', '#cancel-new-user', function () {
    $('.new-user-panel').detach();
    $('.but-add-user').removeClass('disactive');
});

$('.add-new-user').on('focusout', '#name-new-user', function () {
    notCorrectUserData ('name', 'create');    
});

$('.add-new-user').on('focusout', '#pass-new-user', function () {
    notCorrectUserData ('pass', 'create');    
});

$('.add-new-user').on('focusout', '#email-new-user', function () {
    notCorrectUserData ('email', 'create');    
});

$('.add-new-user').on('change', '#role-new-user', function () {
    notCorrectUserRole ('create');   
});

$('.add-new-user').on('click', '#submit-new-user', function () {
    
    var newName = $('#name-new-user').val();
    var newEmail = $('#email-new-user').val();
    var newPass = $('#pass-new-user').val();
    var newRole = $('#role-new-user').val();
    
    var arrData = ['name', 'pass', 'email'];
    
    for (var i = 0; i < arrData.length; i++) {
        notCorrectUserData (arrData[i], 'create');
    }
    if (newRole == 'default') {
        notCorrectUserRole ('create'); 
        return false;
    }
    
    $.ajax ({
        type: "post",
        url: "./system/admin.php",
        data: { addnewuser: true,
                name: newName,
                email: newEmail,
                pass: newPass,
                role: newRole}
    })
        .done( function (res) {
        
            if (res > 0) {
                var userId = 'u'+res;
                $('<tr>', {
                    id: userId,
                    class: 'users-list-table-tr'
                }).appendTo('.users-list-table-body');
                
                $('<td>', {
                    class: 'td-user-name',
                    text: newName,
                }).appendTo('#'+userId);
                
                $('<td>', {
                    class: 'td-user-email',
                    text: newEmail,
                }).appendTo('#'+userId);
                
                $('<td>', {
                    class: 'td-user-role',
                    text: newRole,
                }).appendTo('#'+userId);
                
                $('<td>', {
                    class: 'td-user-del'
                })  .append('<i class="fa fa-times-circle"></i>')
                    .appendTo('#'+userId);
                
                $('<td>', {
                    class: 'td-user-edit'
                })  .append('<i class="fa fa-edit"></i>')
                    .appendTo('#'+userId);
            }        

        });
    
    $('.new-user-panel').detach();
    $('.but-add-user').removeClass('disactive');
});

$('#new-name').focusout( function () {
    notCorrectUserData ('name', 'edit');
});

$('#new-email').focusout( function () {
    notCorrectUserData ('email', 'edit');
});

$('#new-role').change( function () {
    notCorrectUserRole ('edit');
});