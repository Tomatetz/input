(function () {

    Array.prototype.clone = function () {
        return this.slice(0);
    };

    var users = users_collection;
    var x = document.getElementById("form_input");
    document.addEventListener("click", domClick, true);
    x.addEventListener("input", inputChange, false);
    x.addEventListener("click", inputChange, false);
    makeList(users)

    var uTransform = users.clone();
    function domClick(event){
        var trigger = event.target.getAttribute('data-action');
        var arrowTr = event.target.getAttribute('data-element');
        if(trigger&&trigger==='show'){
            if(arrowTr&&arrowTr==='arrow'){
                var $userListStyle = document.getElementById("users_list");
                $userListStyle.style.display==='block'? focusout() : focus();
            } else{
                focus();
            }
        } else {
            focusout();
        }
    }

    function makeList(users) {

        var $usersList = document.getElementById("users"),
            $usersEmpty = document.getElementById("u_empty_wrapper");
        clearBox($usersList);
        if (users.length === 0) {
            document.getElementById("users_empty").style.display = "block";
        } else {
            document.getElementById("users_empty").style.display = "none";
            $.each(users, function (i, user) {
                user.full_name = user.user_name + ' ' + user.user_surname;
                $('.users').append('<div class="user" data-id="' + user.user_id + '" onclick=""><div class="user_inner">' +
                '<div class="img_wrapper"><img class="user_img" src="' + user.user_pic + '"></div>' +
                '<div class="user_name">' + user.full_name + '</div><div class="wddi_sub"></div></div></div>')
            });
        }
    }

    function focus() {
        document.getElementById("users_list").style.display = "block";
    }
    function focusout() {
        document.getElementById("users_list").style.display = "none";
        document.getElementById("users_empty").style.display = "none";
    }

    function inputChange(a, b) {
        var inputValue = x.value.toLowerCase(),
            enRusValue = new checkDictionaries(inputValue)[0],
            trRusValue = new checkDictionaries(inputValue)[1];

        var newList = [];

        $.each(uTransform, function (i) {
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