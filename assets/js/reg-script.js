function registrationError (sel, text) {
    
    $("<span>", {
        class: 'reg-err'
    })
        .text('Enter your '+text+' !')
        .insertAfter($('#'+sel));
    setTimeout (function () {
        $('.reg-err').detach();
    }, 3000);
}

function notCorrectUserData (userData) {
    
    if (userData == 'name') {
        var regex = /^[A-Za-z]{1}[A-Za-z0-9\_\-]{3,48}[a-zA-Z]{1}/g;
    }
    if (userData == 'pass') {
        var regex = /^[A-Za-z]{1}[A-Za-z0-9]{3,48}/g;
    }
    if (userData == 'email') {
        var regex = /^[a-z]+[a-z0-9\_\-\.]+@([a-z]+\.)+[a-z]+/g;
    }
    
    var curInput = $('#user-'+userData);
    var userValue = curInput.val();
    if ( !regex.test(userValue) ) {
        curInput
            .css('border', '2px solid red')
            .addClass('non-correct-data');
    }
    else {
        curInput
            .css('border', 'none')
            .removeClass('non-correct-data');
    }    
}

$('#reg-submit').on('click', function () {
    
    var arrData = ['name', 'pass', 'email'];
    
    for (var i = 0; i < arrData.length; i++) {
        notCorrectUserData (arrData[i]);
    }
    
    if ( $('[id^=user]').hasClass('non-correct-data') ) {
        return false;
    }
    
    var name = $('#user-name').val();
    if (name == "") {
        registrationError ('user-name', 'name');
        return false;   
    }
    var pass = $('#user-pass').val();
    if (pass == "") {
        registrationError ('user-pass', 'password');
        return false;   
    }
    var email = $('#user-email').val();
    if (email == "") {
        registrationError ('user-email', 'e-mail');
        return false;   
    }
    
    $.ajax ({
        type: 'post',
        url: './system/authorization.php',
        data: {
            action: 'registration',
            name: name,
            pass: pass,
            email: email
        }
    })
        .done ( function (res) {
            if (res == 'false') {
                
                $('<span>', {
                    class: 'alert-user-exist',
                    text: 'User already exists!'
                }).insertAfter('#user-name');
                
                setTimeout (function () {
                    $('.alert-user-exist').detach();
                }, 3000);
            }
            else {
                var userData = JSON.parse(res);
                document.cookie = "userName="+userData.name;
                document.cookie = "userId="+userData.id;
                document.location.href = "index.php";                
            }

        })
});

$('#user-name').focusout( function () {
   notCorrectUserData ('name');
});

$('#user-pass').focusout( function () {
   notCorrectUserData ('pass');  
});

$('#user-email').focusout( function () {
   notCorrectUserData ('email');   
});