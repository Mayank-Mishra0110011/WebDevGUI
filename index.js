const defaultHTML =
	'<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta http-equiv="X-UA-Compatible" content="ie=edge"><title>Document</title></head><body></body></html>';
let draggedTool, hoverImage, grabbed;
const tagDimensions = {
	a: { width: 400, height: 30 },
	article: { width: 500, height: 80 },
	aside: { width: 500, height: 80 },
	br: { width: 300, height: 30 },
	details: { width: 550, height: 100 },
	div: { width: 350, height: 80 },
	h1: { width: 250, height: 25 },
	h2: { width: 250, height: 25 },
	h3: { width: 250, height: 25 },
	h4: { width: 250, height: 25 },
	h5: { width: 250, height: 25 },
	h6: { width: 250, height: 25 },
	header: { width: 300, height: 80 },
	hgroup: { width: 250, height: 80 },
	hr: { width: 150, height: 30 },
	footer: { width: 400, height: 80 },
	nav: { width: 300, height: 80 },
	p: { width: 220, height: 30 },
	section: { width: 300, height: 80 },
	span: { width: 220, height: 25 },
	summary: { width: 300, height: 30 },
	base: { width: 300, height: 30 },
	basefont: { width: 300, height: 30 },
	link: { width: 320, height: 30 },
	style: { width: 250, height: 80 },
	title: { width: 300, height: 25 },
	button: { width: 300, height: 30 },
	datalist: { width: 350, height: 100 },
	fieldset: { width: 350, height: 100 },
	form: { width: 350, height: 100 },
	input: { width: 300, height: 30 },
	keygen: { width: 250, height: 30 },
	label: { width: 300, height: 30 },
	legend: { width: 300, height: 30 },
	meter: { width: 330, height: 30 },
	optgroup: { width: 300, height: 80 },
	option: { width: 300, height: 30 },
	select: { width: 300, height: 100 },
	textarea: { width: 300, height: 60 },
	abbr: { width: 400, height: 30 },
	acronym: { width: 350, height: 26 },
	address: { width: 400, height: 100 },
	b: { width: 250, height: 25 },
	bdi: { width: 150, height: 25 },
	bdo: { width: 300, height: 50 },
	big: { width: 200, height: 30 },
	blockquote: { width: 400, height: 70 },
	center: { width: 300, height: 25 },
	cite: { width: 200, height: 30 },
	code: { width: 300, height: 30 },
	del: { width: 180, height: 25 },
	dfn: { width: 180, height: 25 },
	em: { width: 200, height: 30 },
	font: { width: 300, height: 30 },
	i: { width: 200, height: 30 },
	ins: { width: 200, height: 30 },
	kbd: { width: 200, height: 30 },
	mark: { width: 200, height: 30 },
	output: { width: 250, height: 30 },
	pre: { width: 300, height: 100 },
	progress: { width: 300, height: 30 },
	q: { width: 400, height: 30 },
	rp: { width: 200, height: 30 },
	rt: { width: 150, height: 30 },
	ruby: { width: 200, height: 50 },
	s: { width: 200, height: 30 },
	samp: { width: 300, height: 30 },
	small: { width: 300, height: 30 },
	strike: { width: 200, height: 30 },
	strong: { width: 200, height: 30 },
	sub: { width: 200, height: 30 },
	sup: { width: 200, height: 30 },
	tt: { width: 200, height: 30 },
	u: { width: 200, height: 30 },
	var: { width: 200, height: 30 },
	wbr: { width: 200, height: 30 },
	dd: { width: 300, height: 30 },
	dir: { width: 300, height: 80 },
	dl: { width: 300, height: 90 },
	dt: { width: 200, height: 30 },
	li: { width: 200, height: 30 },
	ol: { width: 250, height: 80 },
	menu: { width: 300, height: 80 },
	ul: { width: 280, height: 80 },
	caption: { width: 300, height: 30 },
	col: { width: 300, height: 30 },
	colgroup: { width: 300, height: 80 },
	table: { width: 300, height: 150 },
	tbody: { width: 300, height: 150 },
	td: { width: 200, height: 30 },
	tfoot: { width: 300, height: 120 },
	thead: { width: 300, height: 120 },
	th: { width: 200, height: 30 },
	tr: { width: 300, height: 80 },
	noscript: { width: 350, height: 30 },
	script: { width: 350, height: 50 },
	applet: { width: 300, height: 50 },
	area: { width: 350, height: 30 },
	audio: { width: 300, height: 80 },
	canvas: { width: 300, height: 30 },
	embed: { width: 300, height: 30 },
	figcaption: { width: 300, height: 30 },
	figure: { width: 450, height: 80 },
	frame: { width: 300, height: 30 },
	frameset: { width: 300, height: 80 },
	iframe: { width: 300, height: 30 },
	img: { width: 350, height: 30 },
	map: { width: 450, height: 120 },
	noframes: { width: 350, height: 30 },
	object: { width: 380, height: 30 },
	param: { width: 300, height: 30 },
	source: { width: 300, height: 30 },
	time: { width: 350, height: 30 },
	video: { width: 300, height: 100 }
};
const tags = {
	a: '<a>',
	article: '<article>',
	aside: '<aside>',
	br: '<br>',
	details: '<details>',
	div: '<div>',
	h1: '<h1>',
	h2: '<h2>',
	h3: '<h3>',
	h4: '<h4>',
	h5: '<h5>',
	h6: '<h6>',
	header: '<header>',
	hgroup: '<hgroup>',
	hr: '<hr>',
	footer: '<footer>',
	nav: '<nav>',
	p: '<p>',
	section: '<section>',
	span: '<span>',
	summary: '<summary>',
	base: '<base>',
	basefont: '<basefont>',
	link: '<link>',
	style: '<style>',
	title: '<title>',
	button: '<button>',
	datalist: '<datalist>',
	fieldset: '<fieldset>',
	form: '<form>',
	input: '<input>',
	keygen: '<keygen>',
	label: '<label>',
	legend: '<legend>',
	meter: '<meter>',
	optgroup: '<optgroup>',
	option: '<option>',
	select: '<select>',
	textarea: '<textarea>',
	abbr: '<abbr>',
	acronym: '<acronym>',
	address: '<address>',
	b: '<b>',
	bdi: '<bdi>',
	bdo: '<bdo>',
	big: '<big>',
	blockquote: '<blockquote>',
	center: '<center>',
	cite: '<cite>',
	code: '<code>',
	del: '<del>',
	dfn: '<dfn>',
	em: '<em>',
	font: '<font>',
	i: '<i>',
	ins: '<ins>',
	kbd: '<kbd>',
	mark: '<mark>',
	output: '<output>',
	pre: '<pre>',
	progress: '<progress>',
	q: '<q>',
	rp: '<rp>',
	rt: '<rt>',
	ruby: '<ruby>',
	s: '<s>',
	samp: '<samp>',
	small: '<small>',
	strike: '<strike>',
	strong: '<strong>',
	sub: '<sub>',
	sup: '<sup>',
	tt: '<tt>',
	u: '<u>',
	var: '<var>',
	wbr: '<wbr>',
	dd: '<dd>',
	dir: '<dir>',
	dl: '<dl>',
	dt: '<dt>',
	li: '<li>',
	ol: '<ol>',
	menu: '<menu>',
	ul: '<ul>',
	caption: '<caption>',
	col: '<col>',
	colgroup: '<colgroup>',
	table: '<table>',
	tbody: '<tbody>',
	td: '<td>',
	tfoot: '<tfoot>',
	thead: '<thead>',
	th: '<th>',
	tr: '<tr>',
	noscript: '<noscript>',
	script: '<script>',
	applet: '<applet>',
	area: '<area>',
	audio: '<audio>',
	canvas: '<canvas>',
	embed: '<embed>',
	figcaption: '<figcaption>',
	figure: '<figure>',
	frame: '<frame>',
	frameset: '<frameset>',
	iframe: '<iframe>',
	img: '<img>',
	map: '<map>',
	noframes: '<noframes>',
	object: '<object>',
	param: '<param>',
	source: '<source>',
	time: '<time>',
	video: '<video>'
};

const tagsHTML = {
	div: '<div></div>',
	p: '<p></p>',
	img: '<img></img>',
	h1: '<h1></h1>',
	h2: '<h2></h2>',
	h3: '<h3></h3>',
	h4: '<h4></h4>',
	h5: '<h5></h5>',
	h6: '<h6></h6>'
};

window.onload = () => {
	hoverImage = document.getElementById('hoverImage');
	for (let tag in tags) {
		const t = document.getElementById(tag);
		t.innerText = tags[tag];
		t.addEventListener('mousedown', toolMouseDownHandler.bind(t, event));
		t.addEventListener('mousemove', toolMouseMoveHandler);
		t.addEventListener('mouseout', toolMouseOutHandler);
	}
};

function toolMouseMoveHandler(event) {
	if (!grabbed) {
		hoverImage.src = `./images/${event.target.id}.png`;
		hoverImage.style.width = tagDimensions[event.target.id].width + 'px';
		hoverImage.style.height = tagDimensions[event.target.id].height + 'px';
		hoverImage.style.top = event.clientY + 10 + 'px';
		hoverImage.style.left = event.clientX + 10 + 'px';
		hoverImage.style.visibility = 'visible';
	}
}

function toolMouseOutHandler(event) {
	if (!grabbed) {
		hoverImage.src = '';
		hoverImage.style.width = 0;
		hoverImage.style.height = 0;
		hoverImage.style.top = 0;
		hoverImage.style.left = 0;
		hoverImage.style.visibility = 'hidden';
	}
}

function toolMouseDownHandler(event) {
	draggedTool = this;
	grabbed = true;
	document.body.style.cursor = 'grabbing';
	this.style.cursor = 'grabbing';
}

window.addEventListener('mousemove', (event) => {
	if (grabbed) {
		hoverImage.style.top = event.clientY + 10 + 'px';
		hoverImage.style.left = event.clientX + 10 + 'px';
	}
});

window.addEventListener('mouseup', () => {
	document.body.style.cursor = 'default';
	if (draggedTool) draggedTool.style.cursor = 'grab';
	draggedTool = null;
	grabbed = false;
	hoverImage.src = '';
	hoverImage.style.width = 0;
	hoverImage.style.height = 0;
	hoverImage.style.top = 0;
	hoverImage.style.left = 0;
	hoverImage.style.visibility = 'hidden';
});

function toolbarDisplayBtnClickHandler(object) {
	const mainDiv = object.parentElement;
	const toolbar = [ ...document.getElementById('toolbarLeft').children ];
	if (object.children[0].className.includes('fa-caret-up')) {
		object.children[0].classList.remove('fa-caret-up');
		object.children[0].classList.add('fa-caret-down');
		let hiding;
		for (let i = 0; i < toolbar.length; i++) {
			if (toolbar[i].className == 'title' && hiding) {
				break;
			}
			if (hiding) {
				if (toolbar[i].className.includes('visible')) {
					toolbar[i].classList.remove('visible');
				}
				toolbar[i].classList.add('hidden');
			}
			if (toolbar[i] == mainDiv) {
				hiding = true;
			}
		}
	} else {
		object.children[0].classList.remove('fa-caret-down');
		object.children[0].classList.add('fa-caret-up');
		let showing;
		for (let i = 0; i < toolbar.length; i++) {
			if (toolbar[i].className == 'title' && showing) {
				break;
			}
			if (showing) {
				if (toolbar[i].className.includes('hidden')) {
					toolbar[i].classList.remove('hidden');
				}
				toolbar[i].classList.add('visible');
			}
			if (toolbar[i] == mainDiv) {
				showing = true;
			}
		}
	}
}

function searchTag(eventTarget) {
	let text = eventTarget.value;
	const containers = [ ...document.getElementsByClassName('title') ];
	let tools = [ ...document.getElementsByClassName('tool') ];
	const containerSet = new Set();
	for (let tool of tools) {
		if (`<${tool.id}>`.includes(text) && tool.style.visibility != 'visible' && text.trim() != '') {
			tool.style.backgroundColor = 'yellow';
			containerSet.add(findParentCategory(tool.parentElement));
		} else {
			if (tool.style.backgroundColor == 'yellow') {
				tool.style.backgroundColor = 'gray';
			}
		}
	}
	if (containerSet.size > 0) {
		for (let container of containers) {
			if (!container.nextElementSibling.className.includes('hidden')) {
				container.click();
			}
		}
		for (let container of containerSet) {
			container.click();
		}
	}
}

function findParentCategory(element) {
	while (element.className != 'title') {
		element = element.previousSibling;
	}
	return element;
}
