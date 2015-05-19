(function () {
    Array.prototype.clone = function () {
        return this.slice(0);
    };
    Object.prototype.showBlock = function () {
        return this.style.display = "block";
    };
    Object.prototype.hideBlock = function () {
        return this.style.display = "none";
    };

    var users = users_collection;
    var x = document.getElementById("form_input");
    var $users = document.getElementById("users");
    var $usersEmpty = document.getElementById("users_empty");
    var $userList = document.getElementById("users_list");
    document.addEventListener("click", domClick, true);
    x.addEventListener("input", inputChange, false);
    x.addEventListener("click", inputChange, false);
    makeList(users);

    var uTransform = users.clone();
    function domClick(event){
        var trigger = event.target.getAttribute('data-action');
        var arrowTr = event.target.getAttribute('data-element');
        if(trigger&&trigger==='show'){
            if(arrowTr&&arrowTr==='arrow'){
                console.log($userList.style.display);
                $userList.style.display==='block'? focusout() : focus();
            } else{
                focus();
            }
        } else {
            focusout();
        }
    }

    function makeList(users) {
        clearBox($users);
        if (users.length === 0) {
            $usersEmpty.showBlock();
        } else {
            $usersEmpty.hideBlock();
            $.each(users, function (i, user) {
                user.full_name = user.user_name + ' ' + user.user_surname;
                $('.users').append('<div class="user" data-id="' + user.user_id + '" onclick=""><div class="user_inner">' +
                '<div class="img_wrapper"><img class="user_img" src="' + user.user_pic + '"></div>' +
                '<div class="user_name">' + user.full_name + '</div><div class="user_info">' + user.user_info + '</div></div></div>')
            });
        }
    }

    function focus() {
        var $usersListLength = $users.getElementsByTagName("img").length;
        if($usersListLength===0){
            $usersEmpty.showBlock();
        }
        $userList.showBlock();
    }
    function focusout() {
        $userList.hideBlock();
        $usersEmpty.hideBlock();
    }

    function inputChange() {
        var inputValue = x.value.toLowerCase(),
            dictionaries = new checkDictionaries(inputValue),
            enRusValue = dictionaries[0],
            trRusValue = dictionaries[1];
        var newList = [];
        console.log(dictionaries);
        $.each(uTransform, function () {
            var fullName = $(this)[0].full_name.toLowerCase();
            if (fullName.indexOf(inputValue) !== -1) {
                newList.push($(this)[0]);
            } else {
                if (fullName.indexOf(enRusValue) !== -1) {
                    newList.push($(this)[0]);
                } else {
                    if (fullName.indexOf(trRusValue) !== -1) {
                        newList.push($(this)[0]);
                    }
                }
            }
        });
        makeList(newList);
    }
})();
function clearBox($item) {
    for (var i = 0; i < arguments.length; i++) {
        while (arguments[i].firstChild) {
            arguments[i].removeChild(arguments[i].firstChild);
        }
    }

}