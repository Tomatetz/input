(function () {
    Array.prototype.clone = function () {
        return this.slice(0);
    };
    HTMLElement.prototype.showBlock = function () {
        return this.style.display = "block";
    };
    HTMLElement.prototype.hideBlock = function () {
        return this.style.display = "none";
    };
    HTMLElement.prototype.appendFirst=function(childNode){
        if(this.firstChild)this.insertBefore(childNode,this.firstChild);
        else this.appendChild(childNode);
    };

    var users = users_collection;
    var usersClone = users.clone();

    var x = document.getElementById("form_input");
    var $users = document.getElementById("users");
    var $usersEmpty = document.getElementById("u_empty_wrapper");
    var $userList = document.getElementById("users_list");
    var $bubbles = document.getElementById("bubblesWrapper");
    document.addEventListener("click", domClick, true);
    x.addEventListener("input", inputChange, false);
    $userList.addEventListener('click', addBubble, false)
    $bubbles.addEventListener('click', removeBubble, false)
    makeList(users);

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
            for(var i=0; i<usersClone.length; i++){
                if(usersClone[i].user_id==clickedTarget.getAttribute('data-id')){
                    usersClone.splice(i,1)
                }
            }
            makeList(usersClone);

            var newNode = document.createElement('span'),
                nodeClose = document.createElement('div');
            newNode.innerHTML = clickedTarget.getAttribute('data-name');
            newNode.classList.add("bubble");
            newNode.setAttribute("bubble-id", clickedTarget.getAttribute('data-id'));
            nodeClose.classList.add("bubble_close");
            newNode.appendChild(nodeClose);
            document.getElementById("bubblesWrapper").appendFirst(newNode);
            x.value = "";
            checkBubblesQnt();
        }
    }
    function removeBubble(e){
        if(e.target.classList[0]==='bubble_close'){
            var $bubbleToDelete = e.target.parentNode;
            var idToRetrieve = $bubbleToDelete.getAttribute('data-id')
            console.log(idToRetrieve);
        }

    }

    function checkBubblesQnt(){
        var quantity = document.getElementById("bubblesWrapper").getElementsByTagName('span').length;
        if(quantity>0){
            document.getElementById("bubble_add").showBlock();
            x.hideBlock();
        } else {
            document.getElementById("bubble_add").hideBlock();
            x.showBlock();
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
            }
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
        document.getElementById("bubble_add").hideBlock();
        x.showBlock();
        var obsh = document.getElementsByClassName('bubble');
        var elementsWidth = 0;
        for(var i=0; i<obsh.length; i++){
            if(elementsWidth<=280) {
                elementsWidth += obsh[i].offsetWidth;
            } else {
                elementsWidth = obsh[i].offsetWidth;
                console.log(elementsWidth)
            }
            //elementsWidth =  parseInt(elementsWidth) +  parseInt(obsh[i].offsetWidth);
        }
        //console.log(elementsWidth)
        //console.log(elementsWidth)
    }
    function focusout() {
        $userList.hideBlock();
        $usersEmpty.hideBlock();
        checkBubblesQnt();
    }

    function inputChange() {
        var inputValue = x.value.toLowerCase(),
            dictionaries = new checkDictionaries(inputValue),
            enRusValue = dictionaries[0],
            trRusValue = dictionaries[1];
        var newList = [];
        //console.log(dictionaries);
        $.each(usersClone, function () {
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