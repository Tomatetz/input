(function(){
    var users = users_collection;
    var x = document.getElementById("form_input");
    x.addEventListener("focus", focus, true);
    x.addEventListener("input", inputChange, false);




    $.each(users, function(i, user){
        user.full_name = user.user_name +' '+ user.user_surname;
        $('.users').append('<div class="user" data-id="'+ user.user_id +'" onclick=""><div class="user_inner">' +
        '<div class="img_wrapper"><img class="user_img" src="'+ user.user_pic +'"></div>' +
        '<div class="user_name">'+ user.user_name +' '+ user.user_surname +'</div><div class="wddi_sub"></div></div></div>')
    });
    function focus(){
        $('.users_list').css('display','block');
        //$('.user').each(function(){console.log($(this).data());})
        console.log(users);
    }
    function inputChange(a,b){
        //$('.users_list').css('display','block');
        //$('.user').each(function(){console.log($(this).data());})
        console.log(event.keyCode);
        translit(x.value)
    }
    function translit(val){
        var eng_rus={
            'q':'й',
            'w':'w',
            'e':'e',
            'r':'й',
            't':'й',
            'y':'й',
            'u':'й',
            'i':'й',
            'o':'й',
            'p':'й',
            '[':'й',
            ']':'й',
            'a':'й',
            's':'й'

        }
    }
})()