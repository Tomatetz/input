(function () {
    var users = users_collection;
    var usersClone = users.clone();
    var multiselect = checkMultiSelect();
    function checkMultiSelect(){
        var radios = document.getElementsByName('select');
        for (var i = 0, length = radios.length; i < length; i++) {
            if (radios[i].checked) {
                return radios[i].value;
                break;
            }
        }
    }
    function checkShowingImages(){
        var radios = document.getElementsByName('photo');
        var images = ie8 ? document.querySelectorAll('.img_wrapper') : document.getElementsByName('img_wrapper');
        for (var i = 0, length = radios.length; i < length; i++) {
            if (radios[i].checked) {
                for (var j = 0, length = images.length; j < length; j++) {
                if(radios[i].value !== 'show') {
                    images[j].hideBlock()
                }
                else {
                        images[j].showBlock()
                }
                }
                return radios[i].value;
                break;
            }
        }
    }

    function selectType(e) {
        if (multiselect === 'multi') {
            var wrapper = document.getElementById("singleUserWrapper")
            while ( wrapper.firstChild ) wrapper.removeChild( wrapper.firstChild );
            return addBubble(e);
        } else {
            var bubbles = document.getElementById('bubbles');
            while (bubbles.firstChild) {
                bubbles.removeChild(bubbles.firstChild);
            }
            return addSingleUser(e);
        }
    }


    var x = document.getElementById("form_input"),
        $users = document.getElementById("users"),
        $usersEmpty = document.getElementById("u_empty_wrapper"),
        $userList = document.getElementById("users_list"),
        showImage = document.getElementById("show_image"),
        hideImage = document.getElementById("hide_image"),
        $bubbles = document.getElementById("bubblesWrapper");

    if (document.addEventListener) {
        document.addEventListener("click", domClick, false);
        x.addEventListener("input", inputChange, false);
        $userList.addEventListener('click', selectType, false);
        $bubbles.addEventListener('click', removeBubble, false);
        showImage.addEventListener('click', checkShowingImages, false);
        hideImage.addEventListener('click', checkShowingImages, false);
    } else if (document.attachEvent) {
        document.attachEvent('onclick', domClick);
        x.attachEvent("onpropertychange", function (e) {
            if (e.propertyName === "value") {
                inputChange(e);
            }
        });
        $userList.attachEvent('onclick', selectType);
        $bubbles.attachEvent('onclick', removeBubble);
    }
    makeList(users);

    function checkEl($target) {
        var targetId = $target.getAttribute('data-id');
        if (targetId) {
            return $target;
        }
        else {
            return checkEl($target.parentNode);
        }
    }

    function addBubble(e) {
        var clickedTarget = ie8 ? checkEl(e.srcElement) : checkEl(e.target);
        if (clickedTarget.getAttribute('data-id')) {

            var newNode = document.createElement('span'),
                nodeClose = document.createElement('div');
            newNode.innerHTML = clickedTarget.getAttribute('data-name');
            newNode.setAttribute('class', "bubble");
            newNode.setAttribute("data-id", clickedTarget.getAttribute('data-id'));
            nodeClose.setAttribute('class', "bubble_close");
            newNode.appendChild(nodeClose);
            document.getElementById("bubbles").appendFirst(newNode);
            x.value = "";

            var newUsersList = rebuildOutputList(users.clone(), setBubblesIdArray());
            makeList(newUsersList);
            checkBubblesQnt();
        }
    }

    function removeBubble(e) {
        var $target = ie8 ? e.srcElement : e.target;
        if ($target.getAttribute('class') === 'bubble_close') {
            var $bubbleToDelete = $target.parentNode;
            $bubbleToDelete.parentNode.removeChild($bubbleToDelete);

            var newUsersList = rebuildOutputList(users.clone(), setBubblesIdArray());
            makeList(newUsersList);
            checkBubblesQnt();
        }
    }

    function addSingleUser(e) {
        var clickedTarget = ie8 ? checkEl(e.srcElement) : checkEl(e.target),
            targetId = clickedTarget.getAttribute('data-id');
        clickedTarget.setAttribute('class', 'user singleUser');
        if (targetId) {
            //clearBox(document.getElementById("bubblesWrapper"));
            var wrapper = document.getElementById("singleUserWrapper")
            while ( wrapper.firstChild ) wrapper.removeChild( wrapper.firstChild );

            wrapper.appendFirst(clickedTarget);
            var $imgWrapper = ie8 ? clickedTarget.querySelectorAll('.img_wrapper') : clickedTarget.getElementsByClassName("img_wrapper");
            $imgWrapper[0].showBlock();
            x.value = "";
            var newUsersList = rebuildOutputList(users.clone(), setBubblesIdArray());
            makeList(newUsersList);
        }
    }

    function setBubblesIdArray(){
        var $element = ie8 ? document.querySelectorAll('.bubble') : document.getElementsByClassName("bubble");
        var $singleUserElement = ie8 ? document.querySelectorAll('.singleUser') : document.getElementsByClassName("singleUser");

        var bubbles = $element.length !== 0 ? $element : $singleUserElement;
        var bubblesId = [];
        for (var i = 0; i < bubbles.length; i++) {
            bubblesId.push(bubbles[i].getAttribute('data-id'));
        }
        return bubblesId
    }

    function checkBubblesQnt() {
        var quantity = document.getElementById("bubbles").getElementsByTagName('span').length;
        if (quantity > 0) {
            document.getElementById("bubble_add").showBlock();
            x.hideBlock();
        } else {
            if (!!document.getElementById("bubble_add")) {
                document.getElementById("bubble_add").hideBlock();
            }
            x.showBlock();
        }
    }

    function domClick(event) {
        var $srcElem = ie8 ? event.srcElement : event.target;
        multiselect = checkMultiSelect();

        var trigger = $srcElem.getAttribute('data-action'),
            arrowTr = $srcElem.getAttribute('data-element');

        if (trigger && trigger === 'show') {
            if (arrowTr && arrowTr === 'arrow') {
                $userList.style.display === 'block' ? focusout() : focus();
            } else {
                focus();
            }
        } else {
            focusout();
        }
    }

    function makeList(users) {
        clearBox($users);
        if (users && users.length === 0) {
            $usersEmpty.showBlock();
        } else {
            $usersEmpty.hideBlock();
            for (var i = 0; i < users.length; i++) {
                if (users[i].user_surname === undefined) {
                    users[i].user_surname = '';
                }
                users[i].full_name = users[i].user_name + ' ' + users[i].user_surname;

                var userWrapper = document.createElement('span'),
                    user = document.createElement('div'),
                    userInner = document.createElement('div'),
                    imgWrapper = document.createElement('div'),
                    img = document.createElement('img'),
                    userName = document.createElement('div'),
                    userInfo = document.createElement('div');
                user.setAttribute('class', 'user');
                user.setAttribute('data-id', users[i].user_id);
                user.setAttribute('data-name', users[i].full_name);
                userInner.setAttribute('class', 'user_inner');
                imgWrapper.setAttribute('class', 'img_wrapper');
                imgWrapper.setAttribute('name', 'img_wrapper');
                img.setAttribute('class', 'user_img');
                img.setAttribute('src', users[i].user_pic);
                userName.setAttribute('class', 'user_name');
                userName.innerHTML = users[i].full_name;
                userInfo.setAttribute('class', 'user_info');
                userInfo.innerHTML = users[i].user_info;

                imgWrapper.appendChild(img);
                userInner.appendChild(imgWrapper);

                if (checkShowingImages() == 'hide') {
                    imgWrapper.hideBlock();
                } else {
                    imgWrapper.showBlock();
                }
                userInner.appendChild(userName);
                userInner.appendChild(userInfo);
                user.appendChild(userInner);
                userWrapper.appendChild(user);
                document.getElementById('users').appendChild(userWrapper);
            }
        }
    }

    function focus() {
        var $usersListLength = $users.getElementsByTagName("span").length;
        if ($usersListLength === 0) {
            $usersEmpty.showBlock();
        }
        $userList.showBlock();
        if (!!document.getElementById("bubble_add")) {
            document.getElementById("bubble_add").hideBlock();
        }
        x.showBlock();

        var obsh = ie8 ? document.querySelectorAll('.bubble') : document.getElementsByClassName('bubble');
        var elementsWidth = 0;
        for (var i = 0; i < obsh.length; i++) {
            if (elementsWidth <= 280) {
                elementsWidth += obsh[i].offsetWidth;
            } else {
                elementsWidth = obsh[i].offsetWidth;
            }
        }
    }

    function focusout() {
        $userList.hideBlock();
        $usersEmpty.hideBlock();
        checkBubblesQnt();
    }

    function inputChange() {
        var inputValue = x.value.toLowerCase();
        var newUsersList = rebuildOutputList(users.clone(), setBubblesIdArray()),
            newList = checkDictionaries(inputValue, newUsersList);

        makeList(newList);
        focus();

        if (inputValue !== '') {
            var xhr = new XMLHttpRequest();
            xhr.open('post', 'http://localhost:5001/users/search/' + inputValue, true);
            xhr.responseType = 'json';
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        var response = ie8 ? xhr.responseText : xhr.response;

                        if(typeof response == 'string') {
                            response = JSON.parse(response)
                        }
                        console.log(response);
                        for (var i = 0; i < response.length; i++) {
                            newList.push(response[i]);
                        }
                        makeList(newList);
                        focus();
                    }
                }
            };
            xhr.send(setBubblesIdArray().join());
        }
    }
})();

function clearBox() {
    for (var i = 0; i < arguments.length; i++) {
        while (arguments[i].firstChild) {
            arguments[i].removeChild(arguments[i].firstChild);
        }
    }
}