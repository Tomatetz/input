function checkDictionaries(val){
     var ru_arr = 'яючшщжабвгдеёзийклмнопрстуфхцыьъэ'.split("");
    var key_ru_arr = new Array ('z','\\.','x','i','o',';','f',',','d','u','l','t','`','p','b','q','r','k','v','y','j','g','h','c','n','e','a','\\[','w','s','m','\\]','\'');
    var en_ru_arr = new Array ('ya','yu','ch','sh','sсh','zh','a','b','v','g','d','e','e','z','i','j','k','l','m','n','o','p','r','s','t','u','f','h','c','y','\'','\'', 'e');

    function ChangeText(arr_original, arr_out, text){
        for(var i=0; i<arr_original.length; i++){
            var reg = new RegExp(arr_original[i], "g");
            text = text.replace(reg, arr_out[i]);
        }
        return (text);
    }
    return [ChangeText(key_ru_arr, ru_arr, val), ChangeText(en_ru_arr, ru_arr, val), ChangeText(en_ru_arr,ru_arr,(ChangeText(ru_arr, key_ru_arr, val)))];
}