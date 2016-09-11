//—ледующим логическим шагом будет находить наши js строки и выполн€€ 
//их добавл€ть в нужной части шаблона результат выполнени€ js циклов или иных функций. 
//ƒл€ этого введем дополнительную переменную cursor, котора€ будет знать в какой части шаблона мы сейчас находимс€ и куда вставл€ть код.
$(function () {
var TemplateEngine = function(tpl, data) {
    var name = [], value = [];
	//ƒобавим теперь в начало нашего шаблонизатора проверку, если строка начинаетс€ с #, то это id нашего шаблона.
    var html = tpl.charAt(0) === '#' ? document.getElementById(tpl.substring(1)).innerHTML : tpl;
    if (typeof(data) === "object") {
        for (var k in data) {
            name.push(k);
            value.push(data[k]);
        }
    }
	//— помощью данной регул€рки мы сможем находить все что находитс€ между тегами <% и %>. ѕараметр /g обозначает, что нас интересует не одно совпадение, а все.
	//≈сть множество способов как использовать в js регул€рное выражение, мы воспользуемс€ методом .exec():
	//мы добавим второе регул€рное выражение. ¬оспользовавшись регул€ркой из статьи  разимира, € столкнулс€ с проблемой, когда она срабатывала на переменные, 
	//которые начинались на for.  ¬ моем случае это была переменна€ for_man. ѕоэтому € написал вот такую регул€рку:
	var re = /<%([^%>]+)?%>/g,
	   reExp = /(^( )?(var|if|for|else|switch|case|break|{|}|;))(?:(?=\()|(?= )|$)/g

        code = 'var r=[];\n',
         cursor = 0, match;
		 //Ќо теперь осталась задача распознавать, когда код между тегами <% %>
//		 €вл€етс€ переменной и еЄ нужно добавл€ть в массив, а когда это js функци€ типа цикла и еЄ сразу выполн€ть.

„то бы переменна€ не добавл€лась в массив в виде строки, мы добавим проверку на js код:
    var add = function(line, js) {
        js? (code += line.match(reExp) ? line + '\n' : 'r.push(' + line + ');\n') :
            (code += line != '' ? 'r.push("' + line.replace(/"/g, '\\"') + '");\n' : '');
        return add;
    };
var match;
while(match = re.exec(tpl)) {
    add(tpl.slice(cursor, match.index));
    add(match[1], true); // <-- say that this is actually valid js
    cursor = match.index + match[0].length;
}
    add(tpl.substr(cursor, tpl.length - cursor));
    code += 'return r.join("");'; // <-- return the result
    console.log(code);
    //return tpl;
	//“еперь все что нам необходимо, это передать полученную строку как параметр в new Function и выполнить еЄ.
	//» завершающим этапом дл€ нас будет избавление от обращени€ к this перед каждой переменной, а дл€ этого мы
//	передадим имена переменных scope в параметре new Function, а значени€ их мы присвоим с помощью метода .apply().
	return new Function(code.replace(/[\r\t\n]/g, '')).apply(data);
}
var template = '<p>Hello, my name is <%this.name%>. I\'m <%this.profile.age%> years old.</p>';
console.log(TemplateEngine(template, {
    name: "John",
    profile: { age: 23 }
}));
});