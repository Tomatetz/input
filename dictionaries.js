Object.prototype.switchKeyValue = function (obj) {
    var new_obj = {};
    for (var prop in obj) {
        if(obj.hasOwnProperty(prop)) {
            new_obj[obj[prop]] = prop;
        }
    }
    return new_obj;
};

function checkDictionaries(val){
    var output_en_rus ='',
        output_tr_rus ='',
        output_temp_RusEng='';
    this.eng_rus={
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
    };
    this.tr_rus={
        'tch':'ч',
        'tsch':'щ',
        'ch':'ч',
        'sch':'щ',
        'yu':'ю',
        'kh':'х',
        'zh':'ж',
        'ts':'ц',
        'yo':'ё',
        'yu':'ю',
        'sh':'ш',
        'ya':'я',
        'y':'ы',
        'a':'а',
        'b':'б',
        'v':'в',
        'w':'в',
        'g':'г',
        'd':'д',
        'e':'е',
        'j':'ж',
        'z':'з',
        'i':'и',
        'y':'й',
        'k':'к',
        'l':'л',
        'm':'м',
        'n':'н',
        'o':'о',
        'p':'п',
        'r':'р',
        's':'с',
        't':'т',
        'u':'у',
        'f':'ф',
        'h':'х'
    };

    this.tr_rus={
        'tch':'ч',
        'tsch':'щ',
        'ch':'ч',
        'sch':'щ',
        'yu':'ю',
        'kh':'х',
        'zh':'ж',
        'ts':'ц',
        'yo':'ё',
        'yu':'ю',
        'sh':'ш',
        'ya':'я',
        'y':'ы',
        'a':'а',
        'b':'б',
        'v':'в',
        'w':'в',
        'g':'г',
        'd':'д',
        'e':'е',
        'j':'ж',
        'z':'з',
        'i':'и',
        'y':'й',
        'k':'к',
        'l':'л',
        'm':'м',
        'n':'н',
        'o':'о',
        'p':'п',
        'r':'р',
        's':'с',
        't':'т',
        'u':'у',
        'f':'ф',
        'h':'х'
    };

    var ru_arr = 'яючшщжабвгдеёзийклмнопрстуфхцыьъэ'.split("");
    var key_ru_arr = new Array ('z','\\.','x','i','o',';','f',',','d','u','l','t','`','p','b','q','r','k','v','y','j','g','h','c','n','e','a','\\[','w','s','m','\\]','\'');
    var en_ru_arr = new Array ('ya','yu','ch','sh','sсh','zh','a','b','v','g','d','e','e','z','i','j','k','l','m','n','o','p','r','s','t','u','f','h','c','y','\'','\'', 'e');

    function key_to_cyrill(text){
        for(var i=0; i<key_ru_arr.length; i++){
            var reg = new RegExp(key_ru_arr[i], "g");
            text = text.replace(reg, ru_arr[i]);
        }
        console.log(text);
        return (text);
    }

    function latin_to_cyrill(text){
        for(var i=0; i<en_ru_arr.length; i++){
            var reg = new RegExp(en_ru_arr[i], "g");
            text = text.replace(reg, ru_arr[i]);
        }
        return (text);
    }

    //console.log(key_to_cyrill(val));
    this.rusToTranslit = this.switchKeyValue(this.eng_rus);
    for (var x = 0; x < val.length; x++){
        var c = val.charAt(x);
        output_en_rus = output_en_rus+this.eng_rus[c];
        output_temp_RusEng = output_temp_RusEng + this.rusToTranslit[c];
    }
    //console.log(output_temp_RusEng);
    return [key_to_cyrill(val), latin_to_cyrill(val)];
}