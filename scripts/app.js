(function () {
    var multiselect = true;

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
    Node.prototype.chainableAppendChild=function (newChild) {
        this.appendChild(newChild)
        return this
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
    } else if (el.attachEvent)  {
        document.attachEvent('onclick', domClick);
        x.attachEvent("oninput", inputChange);
        $userList.attachEvent('onclick', selectType)
        $bubbles.attachEvent('onclick', removeBubble)
    }
    makeList(users);



    function checkEl($target){
        if($target.getAttribute('data-id')){
            return $target
        }
        else {
            return checkEl($target.parentNode)
        }
    }
    function addBubble(e){
        var clickedTarget = checkEl(e.target);
        if(clickedTarget.getAttribute('data-id')){

            var newNode = document.createElement('span'),
                nodeClose = document.createElement('div');
            newNode.innerHTML = clickedTarget.getAttribute('data-name');
            newNode.classList.add("bubble");
            newNode.setAttribute("data-id", clickedTarget.getAttribute('data-id'));
            nodeClose.classList.add("bubble_close");
            newNode.appendChild(nodeClose);
            document.getElementById("bubblesWrapper").appendFirst(newNode);
            x.value = "";
            makeList(remakeUsersList());
            checkBubblesQnt();
        }
    }
    function removeBubble(e){
        if(e.target.classList[0]==='bubble_close'){
            var $bubbleToDelete = e.target.parentNode;
            $bubbleToDelete.parentNode.removeChild($bubbleToDelete);
            makeList(remakeUsersList());
            checkBubblesQnt();
        }
    }
    function addSingleUser(e){
        var clickedTarget = checkEl(e.target),
            targetId=clickedTarget.getAttribute('data-id');
        clickedTarget.setAttribute('class', 'user singleUser')
        if(targetId){
            clearBox(document.getElementById("bubblesWrapper"))
            document.getElementById("bubblesWrapper").appendFirst(clickedTarget);
            x.value = "";
            makeList(remakeUsersList());
        }
    }
    function remakeUsersList(){
        usersClone = users.clone();
        var bubbles = document.getElementsByClassName("bubble").length!=0? document.getElementsByClassName("bubble"): document.getElementsByClassName("singleUser");
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
            for(var i=0; i<users.length;i++){
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
                userInner.chainableAppendChild(imgWrapper).chainableAppendChild(userName).chainableAppendChild(userInfo);
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
        var obsh = document.getElementsByClassName('bubble');
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

        /*var xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://localhost:5001/users/search/'+inputValue);
        xhr.send();
        if (xhr.status != 200) {
        } else {
            console.log(xhr);
            for (var i=0; i<xhr.responseText.length; i++){
                newList.push(xhr.responseText[i])
            }
        }*/
        function createRequestObject() {
            if (typeof XMLHttpRequest === 'undefined') { XMLHttpRequest = function() {
                try { return new ActiveXObject("Msxml2.XMLHTTP.6.0"); }
                catch(e) {}
                try { return new ActiveXObject("Msxml2.XMLHTTP.3.0"); }
                catch(e) {}
                try { return new ActiveXObject("Msxml2.XMLHTTP"); }
                catch(e) {}
                try { return new ActiveXObject("Microsoft.XMLHTTP"); }
                catch(e) {}
                throw new Error("This browser does not support XMLHttpRequest.");
            };
            }
            return new XMLHttpRequest();
        }
        function doRequest(){
            req = createRequestObject();
            if(req){
                req.open('GET', 'http://localhost:5001/users/search/'+inputValue);
                req.onreadystatechange = function() {
                    if (req.readyState==4) {
                        return(req.responseText);
                    }
                }
                req.send(null);
                console.log(req);
                if(req.status == 200) {
                    return("Status 200");
                }else{
                    return("Status != 200");
                }
            }else{
                return("req = false");
            }
        }

        console.log(doRequest());
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