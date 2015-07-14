/**
1. 数组中的成员类型相同，顺序可以不同。例如[1, true] 与 [false, 2]是相似的。
2. 数组的长度一致。
3. 类型的判断范围，需要区分:String, Boolean, Number, undefined, null, 函数，日期, window.
**/

function type(arg) {
	// body...
	return Object.prototype.toString.call(arg);
	// IE 6\7\8 null undefined
}

function getTypeString(arr) {
	var map = [];

	arr.forEach(function(item) {
		map.push(type(item));
	});

	return map.sort().join('');
}

/*
 * param1 Array
 * param2 Array
 * return true or false
 */
function arraysSimilar(arr1, arr2) {

	if (!arr1 || !arr2 || type(arr1) !== '[object Array]' || type(arr2) !== '[object Array]' || arr1.length !== arr2.length) {
		return false;
	}

	var str1 = getTypeString(arr1);
	var str2 = getTypeString(arr2);

	
	return str1 === str2;
}

console.log(arraysSimilar([{}, {}, {}], [{}, {},
	null
]))