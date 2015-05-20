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
    $userList.addEventListener('click', addBubble, false)
    makeList(users);

    var uTransform = users.clone();
    function addBubble(e){
        function checkEl($target){
            if($target.getAttribute('data-id')){
                return $target
            }
            else {
                return checkEl($target.parentNode)
            }
        }
        var clickedTarget = checkEl(e.target);
        if(clickedTarget.getAttribute('data-id')){
            for(var i=0; i<users.length; i++){
                if(users[i].user_id==clickedTarget.getAttribute('data-id')){
                    users.splice(i,1)
                }
            }
            //console.log(users);
            makeList(users);

            var newNode = document.createElement('div'),
                nodeClose = document.createElement('div');
            newNode.innerHTML = clickedTarget.getAttribute('data-name');
            newNode.classList.add("bubble");
            nodeClose.classList.add("bubble_close");
            document.getElementById("bubblesWrapper").appendChild(newNode).appendChild(nodeClose);
        }
    }

    function domClick(event){
        var trigger = event.target.getAttribute('data-action');
        var arrowTr = event.target.getAttribute('data-element');
        var user = event.target.getAttribute('data-id');
        if(trigger&&trigger==='show'){
            if(arrowTr&&arrowTr==='arrow'){
                $userList.style.display==='block'? focusout() : focus();
            } else{
                focus();
            }
        } else  {
            if(user){
                //console.log(user);
            }
            focusout();
        }
    }

    function makeList(users) {
        console.log(users);
        clearBox($users);
        if (users.length === 0) {
            $usersEmpty.showBlock();
        } else {
            $usersEmpty.hideBlock();
            $.each(users, function (i, user) {
                user.full_name = user.user_name + ' ' + user.user_surname;
                $('.users').append('<span><div class="user" data-id="' + user.user_id + '" data-name="' + user.full_name + '"><div class="user_inner">' +
                '<div class="img_wrapper"><img class="user_img" src="' + user.user_pic + '"></div>' +
                '<div class="user_name">' + user.full_name + '</div><div class="user_info">' + user.user_info + '</div></div></div></span>')
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
        //console.log(dictionaries);
        $.each(uTransform, function () {
            var fullName = $(this)[0].full_name.toLowerCase();
            if (fullName.indexOf(inputValue) !== -1) {
                newList.push($(this)[0]);
            } else {
                if (fullName.indexOf(dictionaries[0]) !== -1) {
                    newList.push($(this)[0]);
                } else {
                    if (fullName.indexOf(dictionaries[1]) !== -1) {
                        newList.push($(this)[0]);
                    } else{
                        if (fullName.indexOf(dictionaries[2]) !== -1) {
                            newList.push($(this)[0]);
                        }
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