"use strict"

/**
 * Downloaded from https://javascript.ru/forum/misc/27347-nadezhnyjj-dvukhstoronnijj-translit.html#post168115
 */

const transliterator = {
    transliterate(text, engToRus) {
        let rus = "щ   ш  ч  ц  ю  я  ё  ж  ъ  ы  э  а б в г д е з и й к л м н о п р с т у ф х ь".split(/ +/g);
        let eng = "shh sh ch cz yu ya yo zh `` y' e` a b v g d e z i j k l m n o p r s t u f x `".split(/ +/g);

        let x;
        for (x = 0; x < rus.length; x++) {
            text = text.split(engToRus ? eng[x] : rus[x]).join(engToRus ? rus[x] : eng[x]);
            text = text.split(engToRus ? eng[x].toUpperCase() : rus[x].toUpperCase()).join(engToRus ? rus[x].toUpperCase() : eng[x].toUpperCase());
        }
        return text;

    },

    isTransliteration(text) {
        if (typeof text === "string") {
            for (let i = 0; i < text.length; i++) {
                let charCode = text.charCodeAt(i);
                if (( ( charCode >= 65 ) && ( charCode <= 90 ) ) || ( ( charCode >= 97 ) && ( charCode <= 122 ) )) {
                    return true;
                }
            }
            return false;
        }
        return false;
    }
}


module.exports = transliterator;
