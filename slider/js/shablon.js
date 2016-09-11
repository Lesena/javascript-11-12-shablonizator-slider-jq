//��������� ���������� ����� ����� �������� ���� js ������ � �������� 
//�� ��������� � ������ ����� ������� ��������� ���������� js ������ ��� ���� �������. 
//��� ����� ������ �������������� ���������� cursor, ������� ����� ����� � ����� ����� ������� �� ������ ��������� � ���� ��������� ���.
$(function () {
var TemplateEngine = function(tpl, data) {
    var name = [], value = [];
	//������� ������ � ������ ������ ������������� ��������, ���� ������ ���������� � #, �� ��� id ������ �������.
    var html = tpl.charAt(0) === '#' ? document.getElementById(tpl.substring(1)).innerHTML : tpl;
    if (typeof(data) === "object") {
        for (var k in data) {
            name.push(k);
            value.push(data[k]);
        }
    }
	//� ������� ������ ��������� �� ������ �������� ��� ��� ��������� ����� ������ <% � %>. �������� /g ����������, ��� ��� ���������� �� ���� ����������, � ���.
	//���� ��������� �������� ��� ������������ � js ���������� ���������, �� ������������� ������� .exec():
	//�� ������� ������ ���������� ���������. ���������������� ���������� �� ������ ���������, � ���������� � ���������, ����� ��� ����������� �� ����������, 
	//������� ���������� �� for.  � ���� ������ ��� ���� ���������� for_man. ������� � ������� ��� ����� ���������:
	var re = /<%([^%>]+)?%>/g,
	   reExp = /(^( )?(var|if|for|else|switch|case|break|{|}|;))(?:(?=\()|(?= )|$)/g

        code = 'var r=[];\n',
         cursor = 0, match;
		 //�� ������ �������� ������ ������������, ����� ��� ����� ������ <% %>
//		 �������� ���������� � � ����� ��������� � ������, � ����� ��� js ������� ���� ����� � � ����� ���������.

��� �� ���������� �� ����������� � ������ � ���� ������, �� ������� �������� �� js ���:
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
	//������ ��� ��� ��� ����������, ��� �������� ���������� ������ ��� �������� � new Function � ��������� �.
	//� ����������� ������ ��� ��� ����� ���������� �� ��������� � this ����� ������ ����������, � ��� ����� ��
//	��������� ����� ���������� scope � ��������� new Function, � �������� �� �� �������� � ������� ������ .apply().
	return new Function(code.replace(/[\r\t\n]/g, '')).apply(data);
}
var template = '<p>Hello, my name is <%this.name%>. I\'m <%this.profile.age%> years old.</p>';
console.log(TemplateEngine(template, {
    name: "John",
    profile: { age: 23 }
}));
});