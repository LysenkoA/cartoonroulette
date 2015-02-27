function canselAddItemPanel () {
    $('[name=title-new-item]').val('');
    $('[name=age-new-item]').val('default');
    $('[name=gender-new-item]').val('default');
    $('[name=country-new-item]').val('default');
    $('[name=language-new-item]').val('default');
    $('[name=link-new-item]').val('');
    
    $('#add-button').show();
    $('.add-item-panel').hide();
    $('.admin-table').show(); 
}

$(document).ready ( function () {
    $.ajax ({
        type: "post",
        url: "./system/admin.php",
        data: {getlist: true}
    })
        .done( function (res) {
        
            var items = JSON.parse(res);

            for (var i = 0; i < items.length; i++) {
                $('<tr>', {
                    id: items[i].id,
                    class: 'item'
                }).appendTo('.admin-table-body');

                $('#'+items[i].id)
                    .append('<td>'+items[i].name+'</td>')
                    .append('<td>'+items[i].max_age+'</td>')
                    .append('<td>'+items[i].gender+'</td>')
                    .append('<td>'+items[i].country+'</td>')
                    .append('<td>'+items[i].lang+'</td>')
                    .append('<td><i class="fa fa-times-circle"></i></td>');
            }        

        });
});

// message about adding or removing
function messAddDel(mes, actClass) {
    $('<span>', {
        class: actClass})
        .appendTo('.add-item')
        .text(mes)
        .fadeTo(2000, 0);

    setTimeout(function () {
        $('.'+actClass).detach();
    }, 2000); 
}
// end --message about adding or removing

$('.admin-table-body').on('click', '.fa-times-circle', function () {
    var curId = $(this).parent().parent().attr('id');
    $.ajax ({
        type: "post",
        url: "./system/admin.php",
        data: { id: curId}
    })
        .done ( function (res) {
            if (curId == res) { 
                $('#'+res).hide();
                var mes = 'Cartoon successfully REMOVED!';
                var actClass = 'confirm-item';
                messAddDel (mes, actClass); 
            }
            else {
                var mes = 'Something has gone wrong!';
                var actClass = 'error-add';
                messAddDel (mes, actClass);
            }
        });
});

$('#submit-add-item').on('click', function () {
    
    var elTitle = $("[name=title-new-item]");
    var title = elTitle.val();
    if (title == "") {
        elTitle.after("<span class='mess-add-new'>*You did not enter title!</span>");
        return false;
    }
    
    var elAge = $("[name=age-new-item]");
    var age = elAge.val();
    if (age == "default") {
        elAge.after("<span class='mess-add-new'>*You did not choose age!</span>");
        return false;
    }
    
    var elGender = $("[name=gender-new-item]");
    var gender = elGender.val();
    if (gender == "default") {
        elGender.after("<span class='mess-add-new'>*You did not choose gender!</span>");
        return false;
    }
    
    var elCountry = $("[name=country-new-item]");
    var country = elCountry.val();
    if (country == "default") {
        elCountry.after("<span class='mess-add-new'>*You did not choose country!</span>");
        return false;
    }
    
    var elLanguage = $("[name=language-new-item]");
    var language = elLanguage.val();
    if (language == "default") {
        elLanguage.after("<span class='mess-add-new'>*You did not choose language!</span>");
        return false;
    }
    
    var elLink = $("[name=link-new-item]");
    var link = elLink.val();
    if (link == "") {
        elLink.after("<span class='mess-add-new'>*You did not enter link!</span>");
        return false;
    }
    link = link.replace('watch?v=', 'embed/');

    $.ajax({
      type: "POST",
      url: "./system/admin.php",
      data: { title: title,
            age: age,
            gender: gender,
            country: country,
            language: language,
            link: link
        }
     })
      .done(function(res) {
        if (res > 0) {
            $('#add-button').show();
            var mes = 'Cartoon successfully ADDED!';
            var actClass = 'confirm-item';
            messAddDel (mes, actClass);
            
            if (gender == 'm') {gender = 'boy';}
            if (gender == 'w') {gender = 'girl';}
            
            if (country == 'usa') {country = 'USA';}
            if (country == 'rus') {country = 'Russia (USSA)';}
            if (country == 'jap') {country = 'Japan';}
            
            if (language == 'en') {language = 'English';}
            if (language == 'ru') {language = 'Russian';}
            
            $('<tr>', {
                id: res,
                class: 'item'
            })
                .appendTo('.admin-table-body');
            $('#'+res)
                .append('<td>'+title+'</td>')
                .append('<td>'+age+'</td>')
                .append('<td>'+gender+'</td>')
                .append('<td>'+country+'</td>')
                .append('<td>'+language+'</td>')
                .append('<td><i class="fa fa-times-circle"></i></td>');
            
            $('.admin-table').show();
            $('.add-item-panel').fadeToggle();
            
            elTitle.val('');
            elAge.val('default');
            elGender.val('default');
            elCountry.val('default');
            elLanguage.val('default');
            elLink.val('');
        }
        else {
            var mes = 'Something has gone wrong!';
            var actClass = 'error-add';
            messAddDel (mes, actClass);
        }
      });
});

$('#add-button').on('click', function () {
    $(this).hide();
    $('.add-item-panel').show();
    $('.admin-table').hide();
});

$('#cancel-add-item').on('click', function () {
    canselAddItemPanel ();
});