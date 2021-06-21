$(window).on('load', function() {
	$('#content').css("display", "block");
	$('.loader').delay(350).fadeOut(500);
	$('body').delay(1000).css("overflow", "visible");
});
$("#reload").hide(0);
var textarea = document.getElementById("romeNum");
var heightLimit = 200;
textarea.oninput = function() {
	textarea.style.height = "";
	textarea.style.height = Math.min(textarea.scrollHeight, heightLimit) + "px";
};
function arabToRom(num) {
	if (!+num)
		return false;
	var	digits = String(+num).split(""),
		key = ["","C","CC","CCC","CD","D","DC","DCC","DCCC","CM",
		       "","X","XX","XXX","XL","L","LX","LXX","LXXX","XC",
		       "","I","II","III","IV","V","VI","VII","VIII","IX"],
		roman = "",
		i = 3;
	while (i--)
		roman = (key[+digits.pop() + (i * 10)] || "") + roman;
	return Array(+digits.join("") + 1).join("M") + roman;
}
function romanToArabic(roman){
		if (/IIII|XXXX|CCCC|MMMM|VVV|LLL|DDD|[^IVXLCDM]/.test(roman)) {
			return "Введите правильное число!";
       }  
    if(roman == null) return 0;
    var totalValue = 0, 
        value = 0, 
        prev = 0;
    for(var i=0;i<roman.length;i++){
        var current = char_to_int(roman.charAt(i));
        if (current > prev) {
            totalValue -= 2 * value;
        }
        if (current !== prev) {
            value = 0;
        }
        value += current;
        totalValue += current;
        prev = current;
    }
    return totalValue;
}
function char_to_int(character) {
    switch(character){
        case 'I': return 1;
        case 'V': return 5;
        case 'X': return 10;
        case 'L': return 50;
        case 'C': return 100;
        case 'D': return 500;
        case 'M': return 1000;
        default: return -1;
    }
}

function inputTextIsNumber(inp) {
	$(inp).keyup(function() {
		$(inp).val(this.value.match(/[0-9]*/));
		romeNum.value = arabToRom(arabNum.value);
	textarea.style.height = "";
	textarea.style.height = Math.min(textarea.scrollHeight, heightLimit) + "px";
	warning.innerHTML = "Перезагрузите страницу, чтобы конвертировать римские в арабские числа.";
	$("#reload").slideDown(500);
	$("#warning").css("color", "red");
	});
}
function inputTextIsRomNumber(inp) {
	$(inp).keyup(function() {
		$(inp).val(this.value.match(/[IVXLCDMivxlcdm]*/));
		romeNum.value = romeNum.value.toUpperCase();
		arabNum.innerHTML = romanToArabic(romeNum.value);  
	});
}
		
		
		

inputTextIsRomNumber("#romeNum")
inputTextIsNumber("#arabNum")


