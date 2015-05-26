(function () {
    var multiselect = true;

    Array.prototype.clone = function () {
        return this.slice(0);
    };
    var ie8 = false;
    if(typeof HTMLElement=="undefined"){
        ie8 = true;
        Element.prototype.showBlock = function () {
            return this.style.display = "block";
        };
        Element.prototype.hideBlock = function () {
            return this.style.display = "none";
        };
        Element.prototype.appendFirst=function(childNode){
            if(this.firstChild)this.insertBefore(childNode,this.firstChild);
            else this.appendChild(childNode);
        };
    } else{
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
    }

    var users = users_collection;
    var usersClone = users.clone();

    function selectType(e){
        if(multiselect==true){
            return addBubble(e)
        } else {
            return addSingleUser(e)
        }
    }
    var x = document.getElementById("form_input"),
        $users = document.getElementById("users"),
        $usersEmpty = document.getElementById("u_empty_wrapper"),
        $userList = document.getElementById("users_list"),
        $bubbles = document.getElementById("bubblesWrapper");

    if (document.addEventListener) {
        document.addEventListener("click", domClick, false);
        x.addEventListener("input", inputChange, false);
        $userList.addEventListener('click', selectType, false)
        $bubbles.addEventListener('click', removeBubble, false)
    } else if (document.attachEvent)  {
        document.attachEvent('onclick', domClick);
        x.attachEvent("onpropertychange", function(e) {
            if (e.propertyName === "value") {
                inputChange(e)
            }
        });
        $userList.attachEvent('onclick', selectType)
        $bubbles.attachEvent('onclick', removeBubble)
    }
    makeList(users);



    function checkEl($target){
        var targetId = ie8? $target.getAttribute('data-id'):$target.getAttribute('data-id');
        if(targetId){
            return $target
        }
        else {
            return checkEl($target.parentNode)
        }
    }
    function addBubble(e){
        var clickedTarget = ie8? checkEl(e.srcElement) : checkEl(e.target);
        if(clickedTarget.getAttribute('data-id')){

            var newNode = document.createElement('span'),
                nodeClose = document.createElement('div');
            newNode.innerHTML = clickedTarget.getAttribute('data-name');
            newNode.setAttribute('class',"bubble");
            newNode.setAttribute("data-id", clickedTarget.getAttribute('data-id'));
            nodeClose.setAttribute('class',"bubble_close");
            newNode.appendChild(nodeClose);
            document.getElementById("bubblesWrapper").appendFirst(newNode);
            x.value = "";
            makeList(remakeUsersList());
            checkBubblesQnt();
        }
    }
    function removeBubble(e){
        var $target = ie8?e.srcElement:e.target;
        if($target.getAttribute('class')==='bubble_close'){
            var $bubbleToDelete = $target.parentNode;
            $bubbleToDelete.parentNode.removeChild($bubbleToDelete);
            makeList(remakeUsersList());
            checkBubblesQnt();
        }
    }
    function addSingleUser(e){
        var clickedTarget = ie8? checkEl(e.srcElement) : checkEl(e.target),
            targetId=clickedTarget.getAttribute('data-id');
        clickedTarget.setAttribute('class', 'user singleUser');
        if(targetId){
            clearBox(document.getElementById("bubblesWrapper"));
            document.getElementById("bubblesWrapper").appendFirst(clickedTarget);
            x.value = "";
            makeList(remakeUsersList());
        }
    }
    function remakeUsersList(){
        usersClone = users.clone();
        var $element = ie8?document.querySelectorAll('.bubble'):document.getElementsByClassName("bubble");
        var $singleUserElement = ie8?document.querySelectorAll('.singleUser'):document.getElementsByClassName("singleUser");

        var bubbles = $element.length!=0? $element: $singleUserElement;
        var bubblesId=[];
        for(var i=0; i<bubbles.length; i++){
            bubblesId.push(bubbles[i].getAttribute('data-id'))
        }
        for(var bubble=0; bubble<bubblesId.length; bubble++) {
            for (var user = usersClone.length-1; user >= 0 ; user--) {
                if (usersClone[user].user_id == bubblesId[bubble]) {
                    usersClone.splice(user, 1)
                }
            }
        }
        return usersClone
    }
    function checkBubblesQnt(){
        var quantity = document.getElementById("bubblesWrapper").getElementsByTagName('span').length;
        if(quantity>0){
            document.getElementById("bubble_add").showBlock();
            x.hideBlock();
        } else {
            if(!!document.getElementById("bubble_add")) {
                document.getElementById("bubble_add").hideBlock();
            }
            x.showBlock();
        }
    }

    function domClick(event){
        if(ie8){
            var trigger = event.srcElement.getAttribute('data-action');
            var arrowTr = event.srcElement.getAttribute('data-element');
            var user = event.srcElement.getAttribute('data-id');
        } else {
            var trigger = event.target.getAttribute('data-action');
            var arrowTr = event.target.getAttribute('data-element');
            var user = event.target.getAttribute('data-id');
        }

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
        if (users&&users.length === 0) {
            $usersEmpty.showBlock();
        } else {
            $usersEmpty.hideBlock();
            for(var i=0; i<users.length;i++){
                if(users[i].user_surname == undefined){
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
                user.setAttribute('class','user');
                user.setAttribute('data-id',users[i].user_id);
                user.setAttribute('data-name',users[i].full_name);
                userInner.setAttribute('class','user_inner');
                imgWrapper.setAttribute('class','img_wrapper');
                img.setAttribute('class','user_img');
                img.setAttribute('src',users[i].user_pic);
                userName.setAttribute('class','user_name')
                userName.innerHTML = users[i].full_name;
                userInfo.setAttribute('class','user_info')
                userInfo.innerHTML = users[i].user_info;

                imgWrapper.appendChild(img);
                userInner.appendChild(imgWrapper)
                userInner.appendChild(userName)
                userInner.appendChild(userInfo);
                user.appendChild(userInner);
                userWrapper.appendChild(user);
                document.getElementById('users').appendChild(userWrapper);
            }
        }
    }

    function focus() {
        var $usersListLength = $users.getElementsByTagName("img").length;
        if($usersListLength===0){
            $usersEmpty.showBlock();
        }
        $userList.showBlock();
        if(!!document.getElementById("bubble_add")) {
            document.getElementById("bubble_add").hideBlock();
        }
        x.showBlock();

        var obsh = ie8? document.querySelectorAll('.bubble'):document.getElementsByClassName('bubble');
        var elementsWidth = 0;
        for(var i=0; i<obsh.length; i++){
            if(elementsWidth<=280) {
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
        var inputValue = x.value.toLowerCase(),
            dictionaries = new checkDictionaries(inputValue);
        var newList = [];
        for(var i=0; i<usersClone.length; i++){
            var fullName = usersClone[i].full_name.toLowerCase();
            if (fullName.indexOf(inputValue) !== -1) {
                newList.push(usersClone[i]);
            } else {
                if (fullName.indexOf(dictionaries[0]) !== -1) {
                    newList.push(usersClone[i]);
                } else {
                    if (fullName.indexOf(dictionaries[1]) !== -1) {
                        newList.push(usersClone[i]);
                    } else{
                        if (fullName.indexOf(dictionaries[2]) !== -1) {
                            newList.push(usersClone[i]);
                        }
                    }
                }
            }
        }

        /*var getJSON = function(url, successHandler, errorHandler) {
            var xhr = new XMLHttpRequest();
            xhr.open('get', url, true);
            xhr.responseType = 'json';
            xhr.onload = function() {
                var status = xhr.status;
                if (status == 200) {
                    successHandler && successHandler(xhr.response);
                } else {
                    errorHandler && errorHandler(status);
                }
            };
            xhr.send();
        };

        getJSON('http://localhost:5001/users/search/'+inputValue, function(data) {
            console.log(data);
        }, function(status) {
        });*/

        makeList(newList);
        focus();

        if(inputValue!==''){
            var xhr = new XMLHttpRequest();
            xhr.open('get', 'http://localhost:5001/users/search/'+inputValue, true);
            xhr.responseType = 'json';
            if(ie8){

            }
            xhr.onreadystatechange  = function() {
                if (xhr.readyState == 4 /* complete */) {
                    if (xhr.status == 200) {
                        var response = ie8?JSON.parse(xhr.responseText):xhr.response
                        for (var i=0; i<response.length; i++){
                         newList.push(response[i]);
                         }
                    }
                }
                makeList(newList);
                focus();
            };
            xhr.send();
        }

    }
})();
function clearBox($item) {
    for (var i = 0; i < arguments.length; i++) {
        while (arguments[i].firstChild) {
            arguments[i].removeChild(arguments[i].firstChild);
        }
    }

}