(function(){
    var users = users_collection;
    var x = document.getElementById("form_input");
    x.addEventListener("focus", focus, true);
    x.addEventListener("input", inputChange, false);





    $.each(users, function(i, user){
        user.full_name = user.user_name +' '+ user.user_surname;
        $('.users').append('<div class="user" data-id="'+ user.user_id +'" onclick=""><div class="user_inner">' +
        '<div class="img_wrapper"><img class="user_img" src="'+ user.user_pic +'"></div>' +
        '<div class="user_name">'+ user.full_name +'</div><div class="wddi_sub"></div></div></div>')
    });
    function focus(){
        $('.users_list').css('display','block');
        //$('.user').each(function(){console.log($(this).data());})
        console.log(users);
    }
    function inputChange(a,b){
        //$('.users_list').css('display','block');
        //$('.user').each(function(){console.log($(this).data());})
        //console.log(x.value);
        translit(x.value)
    }
    function translit(val){
        /*$.each(users, function(i, user){
            if(user.full_name.indexOf(val)>-1 ){

            }
        })*/
        $('.user_name').each(function(){
            var thisHtml = $(this).html()
            console.log(thisHtml);
            if(thisHtml.indexOf(val)==-1){
                $(this).parent().parent().css('display', 'none')
            }
        })
        var eng_rus={
            'q':'й',
            'w':'ц',
            'e':'у',
            'r':'к',
            't':'е',
            'y':'н',
            'u':'г',
            'i':'ш',
            'o':'щ',
            'p':'з',
            '[':'х',
            ']':'ъ',
            'a':'ф',
            's':'ы',
            'd':'в',
            'f':'а',
            'g':'п',
            'h':'р',
            'j':'о',
            'k':'л',
            'l':'д',
            ';':'ж',
            '\'':'э',
            'z':'я',
            'x':'ч',
            'c':'с',
            'v':'м',
            'b':'и',
            'n':'т',
            'm':'ь',
            ',':'б',
            '.':'ю'
        }
        var eq = eng_rus[val.slice(-1)];
        console.log(!!eq);
    }
})()