
// 数组排序：按字母顺序排序
let fruits = [`bananas`, `Apples`, `Oranges`];
fruits.sort();
fruits.sort((a, b) => {
  return a.toLowerCase().localeCompare(b.toLowerCase());
});
fruits.sort(function (a, b) {
  return a.toLowerCase().localeCompare(b.toLowerCase());
});

// 数组排序：对象数组排序（忽略大小写进行排序）
let fruits = [{prop: 'aad'}, {prop: 'Aac'}, {prop: 'aaB'}];
const asort = (prop) => (a, b) => a[prop].toLowerCase() == b[prop].toLowerCase() ? 0 : a[prop].toLowerCase() < b[prop].toLowerCase() ? -1 : 1;
var asort = function asort(prop) {
  return function (a, b) {
    return a[prop].toLowerCase() == b[prop].toLowerCase() ? 0 : a[prop].toLowerCase() < b[prop].toLowerCase() ? -1 : 1;
  };
};
fruits.sort(asort('prop'));

// 对象排序（忽略大小写进行排序）
let fruits = {
  Bananas: true,
  apples: false,
  Oranges: true
};
function sort(data) {
	let sorte = {};
	Object.keys(data).sort((a, b) => {
	  return a.toLowerCase().localeCompare(b.toLowerCase());
	}).forEach(function(key) {
	  sorte[key] = data[key];
	});
	return sorte;
}
function sort(data) {
  var sorte = {};
  Object.keys(data).sort(function (a, b) {
    return a.toLowerCase().localeCompare(b.toLowerCase());
  }).forEach(function (key) {
    sorte[key] = data[key];
  });
  return sorte;
}
sort(fruits);


