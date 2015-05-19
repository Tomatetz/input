function checkDictionaries(val){
    var output_en_rus ='',
        output_tr_rus ='';
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
    for (var x = 0; x < val.length; x++)
    {
        var c = val.charAt(x);
        output_en_rus = output_en_rus+this.eng_rus[c];
        output_tr_rus = output_tr_rus+this.tr_rus[c];
        //console.log(c);
    }
    return [output_en_rus, output_tr_rus];
}