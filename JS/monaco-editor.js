var editor = monaco.editor.create(document.getElementById("container"), {
	value: "// 备注",							// 默认值
	language: "javascript",				// 编辑器使用的语言
	lineNumbers: "off",						// 是否显示行号: "on|off" (默认为 "on")
	roundedSelection: false,
	scrollBeyondLastLine: false,	// 滚动超过最后一行(默认 "true")
	readOnly: false,							// 只读(默认 "false")
	theme: "vs-dark",							// 主题样式: "vs|vs-dark|hc-black" (默认 "vs")
	
	wordWrap: 'wordWrapColumn',		// 以列为单位进行自动换行
	wordWrapColumn: 40,						// 自动换行的列数(40列后自动换行)
	wordWrapMinified: true,				// 将此设置为false以不自动自动换行缩小文件
	wrappingIndent: "indent"			// 包装缩进: "same|indent|none"
});