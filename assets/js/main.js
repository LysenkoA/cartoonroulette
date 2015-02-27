$(window).on('load', function () {
    var $preloader = $('#page-preloader'),
        $spinner   = $preloader.find('.spinner');
    $spinner.fadeOut();
    $preloader.delay(350).fadeOut('slow');
});


function setCookie(name, value, options) {
    options = options || {};

    var expires = options.expires;

    if (typeof expires == "number" && expires) {
        var d = new Date();
        d.setTime(d.getTime() + expires*1000);
        expires = options.expires = d;
    }
    if (expires && expires.toUTCString) { 
        options.expires = expires.toUTCString();
    }

    value = encodeURIComponent(value);

    var updatedCookie = name + "=" + value;

    for(var propName in options) {
        updatedCookie += "; " + propName;
        var propValue = options[propName];    
        if (propValue !== true) { 
            updatedCookie += "=" + propValue;
        }
    }

    document.cookie = updatedCookie;
}

function getCookie(key) {
    var matches = document.cookie.match(new RegExp(
"(?:^|; )" + key.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

function afterLogin () {
    var userName = getCookie('userName');
    var userId = getCookie('userId');
    var userR = getCookie('userR');
    
    $('.modal-login-content').detach();
    
    if (userName != undefined && userId != undefined) {
        $('#login').detach();
        $('<div>', {
            class: 'header-user-data'
        })  .text(userName)
            .appendTo('.authorization');
        
        if (userR == 'admin') {
            $('<span>', {
                class: 'admim-panel-link',
                text: 'Admin Panel'
            }).prependTo('.authorization');            
        }
        
        $('<i>', {
           class: 'fa fa-sign-out user-out' 
        }).appendTo('.authorization');
        
        $('<i>', {
            class: 'fa fa-user user-icon'
        }).prependTo('.header-user-data');
    }
}

$(document).ready (function () {
    afterLogin ();
});



$('.header').on('click', '#login', function () {
    
    if ( $('#login').hasClass('active-modal-login') ) {
        $('div.modal-login-content').detach();
        $('#login').removeClass('active-modal-login');
    }
    else {
        
        $('#login').addClass('active-modal-login');
        
        $('<div>', {
            class: 'modal-login-content'
        }).insertBefore('#login');
        
        $('<i>', {
            class: 'fa fa-times-circle-o close-modal-login',
            text: ' close'
        }).appendTo('.modal-login-content');

        $('<input>', {
            type: 'text',
            id: 'login-name',
            placeholder: '| Login'
        }).appendTo('.modal-login-content');

        $('<input>', {
            type: 'password',
            id: 'login-pass',
            placeholder: '| Password'
        }).appendTo('.modal-login-content');

        $('<input>', {
            type: 'submit',
            id: 'login-sub',
            value: 'Log in'
        }).appendTo('.modal-login-content');  

        $('<a>', {
            href: 'registration.php'
        })
            .text('Sign Up')
            .appendTo('.modal-login-content');        
    }

});

$('.header').on('click', '.close-modal-login', function (){
    $('div.modal-login-content').detach();
    $('#login').removeClass('active-modal-login');    
});

function notCorrectUserData (userData) {
    var regex = /^[A-Za-z]{1}[A-Za-z0-9\_\-]{3,48}[a-zA-Z]{1}/g;
    var curInput = $('#login-'+userData);
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

$('.header').on ('focusout', '#login-name', function () {
    notCorrectUserData ('name');
});

$('.header').on ('focusout', '#login-pass', function () {
   notCorrectUserData ('pass'); 
});

$('.header').on('click', '#login-sub', function (){
    
    function errorEnterUserData (data) {

        $('<span>', {
            class: 'error-enter-data',
            text: 'enter '+data
        })  .insertAfter('#login-'+data)
            .fadeTo(1000, 0);

        setTimeout(function () {
            $('.error-enter-data').detach();
        }, 2000); 
    }
    
    if ( $('[id^=login]').hasClass('non-correct-data') ) {
        return false;
    }
    
    var loginName = $('#login-name').val();
    if (loginName == "") {
        errorEnterUserData ('name');
        return false;            
    }
    
    var loginPass = $('#login-pass').val();
    if (loginPass == "") {
        errorEnterUserData ('pass');
        return false;
    }
    
    $.ajax ({
        url: './system/authorization.php',
        type: 'post',
        data: {
            action: 'login',
            login: loginName,
            pass: loginPass
        }
    }).done ( function (res) {
        
        if ( res == 'false' ) {
            if ( !$('div.error-user-notexist').hasClass('error-user-notexist') ){
                $('<div>', {
                    class: 'error-user-notexist',
                    text: 'This user does not exist or the password is invalid'
                }).appendTo('.modal-login-content');
            }

            return false;
        }
        else {
            var userData = JSON.parse(res);
            document.cookie = "userName="+userData.name;
            document.cookie = "userId="+userData.id;
            document.cookie = "userR="+userData.role;
            afterLogin ();            
        }
    });
});

$('.header').on('click', '.error-user-notexist', function () {
    $(this).detach();
});

$('.header').on('click', '.admim-panel-link', function () {
    document.location.href = "admin.php";
});

$('.header').on('click', '.user-out', function () {
    function deleteCookie(cookies) {
        for (var i = cookies.length-1; i >= 0; i--) {
            setCookie(cookies[i], "", { expires: -1 });
        }
    }
    
    deleteCookie(['userName', 'userId', 'userR']);
    $('.authorization').empty();
    $('<div>', {
        id: 'login',
        text: 'Sign In '
    }).appendTo('.authorization');
    
    $('<span>', {
       class: 'fa fa-sign-in fa-2x' 
    }).appendTo('#login');
    
    //$('#login').show();
    
});


/////////////////////////////// parameters


$('.switch').on('click', function(){
    if ($(this).hasClass('button-red')) {
        $(this).removeClass('button-red').addClass('button-green').html('<i class="fa fa-angle-double-up"></i>');
        return;
    } else {
        $(this).removeClass('button-green').addClass('button-red').html('<i class="fa fa-angle-double-down"></i>');
    }
});

$('#agefilt').on('click', function () {
    if ($('#agefilt').hasClass('button-green')) {
        $('#agefilt-after').show();
        $(':radio[name=age]:last').attr('checked', 'checked');
    } else {
        $(':radio[name=age]:last').removeAttr('checked');
        $('#agefilt-after').hide();
    }
});

$('#genfilt').on('click', function () {
    if ($('#genfilt').hasClass('button-green')) {
        $('#genfilt-after').show();
        $(':radio[name=gen]:first').attr('checked', 'checked');
    } else {
        $(':radio[name=gen]:first').removeAttr('checked');
        $('#genfilt-after').hide();
    }
});

$('#counfilt').on('click', function () {
    if ($('#counfilt').hasClass('button-green')) {
        $(':radio[name=count]:first').attr('checked', 'checked');
        $('#counfilt-after').show();
    } else {
        $(':radio[name=count]:first').removeAttr('checked');
        $('#counfilt-after').hide();
    }
});

$('#langfilt').on('click', function () {
    if ($('#langfilt').hasClass('button-green')) {
        $(':radio[name=lan]:first').attr('checked', 'checked');
        $('#langfilt-after').show();
    } else {
        $(':radio[name=lan]:first').removeAttr('checked');
        $('#langfilt-after').hide();
    }
});



/* choese cartoon list  */

function getListCartoons (res, start) {
    var data = JSON.parse(res);
    $('.list-cartoons').empty();

    for (var i = 0; i < data.length; i++) {
        $('<li>', {
            id: data[i].id,
            class: 'one-item',
            src: data[i].link
        }).appendTo('.list-cartoons');

        $('<i>', {
            class: 'fa fa-youtube-play'
        }).appendTo('#'+data[i].id);

        $('<span>', {
            class: 'item-name'
        })
            .html(data[i].name)
            .appendTo('#'+data[i].id);

        $('<span>', {
            class: 'item-lang'
        })
            .html(data[i].lang)
            .appendTo('#'+data[i].id);

        $('<span>', {
            class: 'item-country'
        })
            .html(data[i].country)
            .appendTo('#'+data[i].id);

        $('<span>', {
            class: 'item-age'
        })
            .html(data[i].max_age)
            .appendTo('#'+data[i].id);

        $('<i>', {
            class: 'fa fa-star-o'
        }).appendTo('#'+data[i].id);

        $('[class*=help]').hide();
        //$('.choice-menu').css('width', '30%');

        favCrtoons = localStorage.favCrtoons ? JSON.parse(localStorage.favCrtoons) : [];

        for (var j = 0; j < favCrtoons.length; j++) {
            $('#'+favCrtoons[j]).children('.fa-star-o').addClass('fav-on');
            $('#'+favCrtoons[j]).prependTo('.list-cartoons');
        }
        
        $('.cartoon-list').css('display', 'inline-block');
    }
    
    var lengthList = $('.list-cartoons > li').length;
    //console.log(lengthList);
    if (lengthList == 10 ) {
        $('<div>', {
            class: 'pag-next-cartoons'
        })  .html('<i class="fa fa-chevron-down"></i>')
            .appendTo('.list-cartoons');
    }
    
    if (start > 0) {
        $('<div>', {
            class: 'pag-prew-cartoons'
        })  .html('<i class="fa fa-chevron-up"></i>')
            .prependTo ('.list-cartoons');        
    }
    
    setCookie ('start', start);
}

var favCrtoons = new Array();

function sendRequest (start, action) {
    var age;
    if ($('#agefilt').hasClass('button-green')) {
        age = $(':radio[name=age]').filter(':checked').val();
    } else { age = 'no'; }
    
    var gen;
    if ($('#genfilt').hasClass('button-green')) {
        gen = $(':radio[name=gen]').filter(':checked').val();
    } else { gen = 'no'; }
    
    var count;
    if ($('#counfilt').hasClass('button-green')) {
        count = $(':radio[name=count]').filter(':checked').val();
    } else { count = 'no'; }
    
    var lan;
    if ($('#langfilt').hasClass('button-green')) {
        lan = $(':radio[name=lan]').filter(':checked').val();
    } else { lan = 'no'; }
    
    $.ajax({
      type: "POST",
      url: "./system/main.php",
      data: { age_post: age,
            gen_post: gen,
            count_post: count,
            lan_post: lan,
            start_post: start
        }
     })
      .done(function(res) {
            //console.log(res);
            getListCartoons (res, start);
      }); 
}

$('.but-submit').on ('click', function () {
    sendRequest (0);
});

$('.cartoon-list').on('click', '.pag-next-cartoons', function () {
    var start = parseInt( getCookie ('start') ) + 10;
    sendRequest (start);
});

$('.cartoon-list').on('click', '.pag-prew-cartoons', function () {
    var start = parseInt( getCookie ('start') ) - 10;
    sendRequest (start);
});

$('.list-cartoons').on ('click', '.fa-star-o', function () {
    if ($(this).hasClass('fav-on')) {
        $(this).removeClass('fav-on');
        $(this).parent()
            .removeClass('favorite');
            //.appendTo('.list-cartoons');
        
        var tempArr = new Array ();
        tempArr = localStorage.favCrtoons ? JSON.parse(localStorage.favCrtoons) : [];
        
        var tempId = $(this).parent().attr('id');
        
        for (var k = tempArr.length; k >= 0; k--) {
            if (tempArr[k] == tempId){
                tempArr.splice(k, 1);
                console.log(tempArr[k]);
            }
        }
        
        localStorage.favCrtoons = JSON.stringify(tempArr);
        
    } else {
        $(this).addClass('fav-on');
        $(this).parent().addClass('favorite');
        var id_local = $(this).parent().attr('id');

        favCrtoons.push(id_local)
        localStorage.favCrtoons = JSON.stringify(favCrtoons);
        
        //$(this).parent().prependTo('.list-cartoons');
        
        console.log(favCrtoons);
        
        //$(this).parent().clone().hide();
        //
    }
    return false;    
});

$('.but-favorite').on('click', function () {
    var favoriteData = localStorage.favCrtoons;
    
    $.ajax({
        url: "./system/main.php",
        type: "POST",
        data: { getfavorite: true,
                idsfavorite: favoriteData
        }
    }).done ( function (res) {
        //console.log(res);
        getListCartoons (res);
    });
});

/* choese cartoon */
$('.result-list').on('click', 'li', function (resClick) {
    var targetSrc = $(this).attr('src');
    var targetId = $(this).attr('id');
    var targetTitle = $(this).children('.item-name').text();
    var targetLang = $(this).children('.item-lang').text();
        if (targetLang == "ru") {targetLang = 'Russian'}
        else {targetLang = 'English'}
    var targetCountry = $(this).children('.item-country').text();
        if (targetCountry == "rus") {targetCountry = 'Russia (USSA)'}
        else if (targetCountry == "usa") {targetCountry = 'USA'}
        else if (targetCountry == "jap") {targetCountry = 'Japan'}
    var targetAge = $(this).children('.item-age').text();
    
    $('.play-video').attr('src', targetSrc);
    $('.header-info').text(targetTitle);
    $('#age-info').text(targetAge);
    $('#lang-info').text(targetLang);
    $('#country-info').text(targetCountry);
    $('.info').attr('alt', targetId);
    
    $('.choice-menu, .cartoon-list').hide();
    $('.stop-alert').hide();
    $('.video, .info').show();
    $('.showing').show();
    
});

function getCartoon (newItem) {
    
    if (newItem.hasClass('one-item')) {
    
        var newTitle = newItem.children('.item-name').text();
        var newSrc = newItem.attr('src');
        var newLang = newItem.children('.item-lang').text();
            if (newLang == "ru") {newLang = 'Russian'}
            else {newLang = 'English'}
        var newCountry = newItem.children('.item-country').text();
            if (newCountry == "rus") {newCountry = 'Russia (USSA)'}
            else if (newCountry == "usa") {newCountry = 'USA'}
            else if (newCountry == "jap") {newCountry = 'Japan'}
        var newAge = newItem.children('.item-age').text();
        var newId = newItem.attr('id');

        $('.play-video').attr('src', newSrc);
        $('.header-info').text(newTitle);
        $('#age-info').text(newAge);
        $('#lang-info').text(newLang);
        $('#country-info').text(newCountry);
        $('.info').attr('alt', newId);
    }
    else {
        $('.video, .info').hide();
        
        $('<div>', {
            class: 'stop-alert'
        }).appendTo('.showing');
        
        $('<p>', {
            class: 'content-stop-alert'
        })
            .text('It was the last cartoon!')
            .appendTo('.stop-alert');
        
        $('<i>', {
            class: 'fa fa-undo fa-5x'
        })
            .appendTo('.stop-alert');
        
        $('<span>', {})
            .text('Go back to the list')
            .appendTo('.fa-undo');
        
        $('i.fa-undo').on('click', function () {
            $('.showing').hide();
            $('.choice-menu, .cartoon-list').show();
        });
    }
}


$('.next-film').on ('click', function () {
    var curId = parseInt($('.info').attr('alt'));
    var newItem = $('#'+curId).next();
    getCartoon(newItem);
});

$('.prev-film').on ('click', function () {
    var curId = parseInt($('.info').attr('alt'));
    var newItem = $('#'+curId).prev();
    getCartoon(newItem); 
    
});

$('.close-film').on('click', function () {
    $('.showing').hide();
    $('.play-video').attr('src', '');
    $('.choice-menu, .cartoon-list').show();
});