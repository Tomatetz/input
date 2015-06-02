function checkDictionaries(val, inputList, type) {

    var ru_arr = 'яючшщжабвгдеёзийклмнопрстуфхцыьъэ'.split("");
    var key_ru_arr = new Array('z', '\\.', 'x', 'i', 'o', ';', 'f', ',', 'd', 'u', 'l', 't', '`', 'p', 'b', 'q', 'r', 'k', 'v', 'y', 'j', 'g', 'h', 'c', 'n', 'e', 'a', '\\[', 'w', 's', 'm', '\\]', '\'');
    var en_ru_arr = new Array('ya', 'yu', 'ch', 'sh', 'sсh', 'zh', 'a', 'b', 'v', 'g', 'd', 'e', 'e', 'z', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'r', 's', 't', 'u', 'f', 'h', 'c', 'y', '\'', '\'', 'e');

    function ChangeText(arr_original, arr_out, text) {
        for (var i = 0; i < arr_original.length; i++) {
            var reg = new RegExp(arr_original[i], "g");
            text = text.replace(reg, arr_out[i]);
        }
        return (text);
    }

    var outputList = [];
    for (var i = 0; i < inputList.length; i++) {
        if (type == 'groups') {
            var fullName = inputList[i].user_name.toLowerCase();
        } else {
            var fullName = inputList[i].full_name.toLowerCase();
        }
        if (fullName.indexOf(val) !== -1) {
            outputList.push(inputList[i]);
        } else {
            if (fullName.indexOf(ChangeText(key_ru_arr, ru_arr, val)) !== -1) {
                outputList.push(inputList[i]);
            } else {
                if (fullName.indexOf(ChangeText(en_ru_arr, ru_arr, val)) !== -1) {
                    outputList.push(inputList[i]);
                } else {
                    if (fullName.indexOf(ChangeText(en_ru_arr, ru_arr, (ChangeText(ru_arr, key_ru_arr, val)))) !== -1) {
                        outputList.push(inputList[i]);
                    }
                }
            }
        }
    }
    return (outputList);
}

function rebuildOutputList(arr, idArr){
    for (var i=0;  i<idArr.length; i++){
        for(var user=arr.length-1; user>=0; user--){
            if(arr[user].user_id==idArr[i]){
                arr.splice(user, 1);
            }
        }
    }
    return arr
}