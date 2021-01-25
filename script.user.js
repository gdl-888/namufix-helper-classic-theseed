// ==UserScript==
// @name        classic-theseed
// @namespace   f
// @include     https://namu.wiki/*
// @include     https://*.theseed.io/*
// @include     https://theseed.io/*
// @exclude     https://forum.theseed.io
// @exclude     https://feedback.theseed.io
// @version     1
// @grant       none
// ==/UserScript==

if(location.pathname.startsWith('/thread/')) {
	document.querySelector('.wiki-article h2').setAttribute('class', 'wiki-heading');
}

var wc = document.createElement('link');
wc.setAttribute('rel', 'stylesheet');
wc.setAttribute('href', '/css/wiki.css');
document.body.insertBefore(wc, document.getElementById('app'));

var df = document.createElement('script');
df.setAttribute('src', '/js/dateformatter.js');
document.body.insertBefore(df, document.getElementById('app'));

var jq = document.createElement('script');
jq.setAttribute('src', '/js/jquery-2.1.4.min.js');  /* jQuery를 활성화한다. */
document.body.insertBefore(jq, document.getElementById('app'));

var ts = document.createElement('script');
ts.setAttribute('src', '/js/theseed.js');
document.body.insertBefore(ts, document.getElementById('app'));

var style = document.createElement('style');
style.setAttribute('id', 'glres');
style.innerText = `
.res-wrapper {
margin-top: 20px;
margin-bottom: 20px;
}

.res-wrapper .r-head {
background: #eee;
border: 0px solid #068;
border-style: solid;
border-color: #068 #068 #068 #068;
border-radius: 6px 6px 0 0;
padding: 8px;
padding-left: 18px;
padding-right: 18px;
padding-bottom: 8px;
padding-top: 8px;
text-shadow: 1px 1px #000;
}
.res-wrapper .r-head.first-author {
background: #efe;
}
.res-wrapper .r-body {
background: #fafafa;
border: 0px solid #068;
border-style: solid;
border-color: #068 #068 #068 #068;
border-radius: 0;
padding: 5px;
padding-left: 5px;
padding-right: 5px;
padding-bottom: 5px;
padding-top: 5px;
}
.res-wrapper .r-body.r-hidden-body {
background: #333;
color: #fff
}
.more-box {
border: 1px solid #068;
border-width: 1px 1px 1px 1px;
border-style: solid;
border-color: #068 #068 #068 #068;
border-radius: 4px;
padding: 5px;
padding-left: 5px;
padding-right: 5px;
padding-bottom: 5px;
padding-top: 5px;
}

.res-wrapper .r-head {
  padding: 
	color: #fff !Important;
	background: linear-gradient(to bottom, rgb(128, 191, 237) 0%, rgb(91, 153, 226) 51%, rgb(57,128,210) 50%, rgb(51,103,189) 100%);
}
.res-wrapper .r-head.first-author {
	color: #fff !Important;
	background: linear-gradient(to bottom, rgb(81, 116, 168) 0%, rgb(29, 75, 143) 51%, rgb(16,54,122) 50%, rgb(13,53,123) 100%);
}

.res-wrapper .r-head a {
  color: #fff !Important;
}
.res.res-type-status .r-body {
  background-image: linear-gradient(to bottom, #f0ad4e, #ec971f);
}

.r-hidden-body .line {
  border-top: 1px solid #fff;
}

.res .r-body {
	padding: 5px 10px 10px 15px;
	background-image: linear-gradient(to bottom, #e8e8e8, #cfcfcf);
	border-radius: 0px;
	display: block;
	max-height: 500px;
  overflow: scroll;
}

.res .r-body.r-hidden-body {
	background-image: linear-gradient(to bottom, #444, #000);
	color: white;
}
`;
if(!document.querySelector('.buma')) document.head.insertBefore(style, document.querySelector('title'));

(function() {
	// 리버티 토론 CSS
	// https://github.com/namuwiki/theseed-skin-liberty/blob/master/LICENSE (라이선스)
  // https://github.com/namuwiki/theseed-skin-liberty/blob/153cf78f70206643ec42e856aff8280dc21eb2c0/static/css/theseed.css에서 퍼옴
	// GPL 3.0 라이선스
	// https://github.com/namuwiki (작성자)
	
	var style = document.createElement('style');
	style.innerText = `
	.res-wrapper {
		padding-bottom: 20px !important;
	}

	.r-head, .r-body {
		border: 1px solid black !important;
			border-collapse: collapse !important;
	}

	.r-head {
		background: #dbcfcf !important;
		border-bottom: 0px !important;
		padding: 5px 10px !important;
	}

	.r-head.first-author {
		background: #a89b9b !important;
	}

	.r-body.r-hidden-body {
		background: gray !important;
		color: white !important;
	}

	.Liberty .content-wrapper .liberty-content {
		margin-top: -20px !important;
	}

	.r-body {
		background: whitesmoke !important;
		padding: 10px !important;
			overflow: scroll !important;
			max-height: 50vh !important;
	}

	.more-box {
		border: 1px solid black !important;
		margin: 30px !important;
		padding: 10px !important;
		display: block !important;
		width: 80px !important;
		background: whitesmoke !important;
	}

	.res.res-type-status .r-body {
		background: darkorange !important;
	}

	.r-head.first-author {
			background: #C4D7F5 !important;
	}

	.r-head, .r-body {
			border: 1px solid gainsboro !important;
	}

	.r-body {
			padding-bottom: 0 !important;
	}
	@keyframes loading-head-animation{
			0% {background-color: #dbcfcf !important;}
			50% {background-color: hsla(0, 15%, 54%, 1) !important;}
			100% {background-color: #dbcfcf !important;}
	}

	@keyframes loading-res-animation {
			0% {transform: rotate(2deg);}
			50% {transform: rotate(-2deg);}
			100% {transform: rotate(2deg);}
	}

	.res-loading[data-visible="true"] .r-head {
			animation: loading-head-animation 1s infinite !important;
	}

	.res-loading .r-body {
			height: 50px !important;
	}

	.res-loading[data-visible="true"] .res {
			animation: loading-res-animation 1s infinite !important;
	}
	`;
	if(document.querySelector('.Liberty')) {
		document.body.insertBefore(style, document.querySelector('#app'));
	  document.querySelector('#glres').remove();
	}
})();

var s2 = document.createElement('style');
s2.innerText = `
.res-wrapper .res .r-body .wiki-paragraph {
  margin-bottom: 0 !important;
}
`;
document.head.insertBefore(s2, document.querySelector('title'));

var config = JSON.parse(document.querySelector('div#app + script').innerText.replace('window.INITIAL_STATE=', '').replace(/[;]$/, ''));

var _title = document.querySelector('h1.title, .title h1');
var _content = document.querySelector('.wiki-article');
var _err = document.querySelector('.wiki-article > div');
var ot = _title.innerText;
if(_title.innerText == '오류' && !location.pathname.startsWith('/w/')) _title.innerText = '문제가 발생했습니다!', document.title = document.title.replace('오류', '문제가 발생했습니다!'), _err.outerHTML = '<h2>' + _err.innerHTML + '</h2>';
if(location.pathname.startsWith('/history')) _title.innerText = _title.innerText.replace(/\s[(]역사[)]$/, '의 역사'), document.title = document.title.replace(ot, ot.replace(/\s[(]역사[)]$/, '의 역사'));
if(location.pathname.startsWith('/backlink')) _title.innerText = _title.innerText.replace(/\s[(]역링크[)]$/, '의 역링크'), document.title = document.title.replace(ot, ot.replace(/\s[(]역링크[)]$/, '의 역링크'));

for(table of document.querySelectorAll('table')) {
	for(attr of table.attributes) {
		/* 머리터지겠네 이 data-v 진짜;;; */
		if(attr.name.startsWith('data-v-')) {
			if(location.pathname.startsWith('/Recent') || location.pathname.startsWith('/contribution/')) {
			  table.setAttribute('class', 'table table-hover');
			  for(td of table.querySelectorAll('td, tr')) {
					for(attr of td.attributes) {
						if(attr.name.startsWith('data-v-')) {
							td.removeAttribute(attr.name);
						}
					}
				}
			} else if(!location.pathname.startsWith('/diff/')) table.setAttribute('class', 'table');
		}
	}
}

/* 아 이게 뭐양 피라이드가 쌓아졌어;; */
if(location.pathname.startsWith('/Recent') || location.pathname.startsWith('/contribution/')) {
  for(ol of document.querySelectorAll('ol')) {
		for(attr of ol.attributes) {
			if(attr.name.startsWith('data-v-')) {
				ol.removeAttribute(attr.name);
				ol.setAttribute('class', 'breadcrumb link-nav');
				for(li of ol.querySelectorAll('li')) {
					for(li of ol.querySelectorAll('li')) {
						for(attr of li.attributes) {
							if(attr.name.startsWith('data-v-')) {
								li.removeAttribute(attr.name);
							}
						}
					}
				}
			}
		}
	}
}

function qa(q, f) {
	for(el of document.querySelectorAll(q)) {
		f(el);
	}
}

const qs = (q, e) => (e || document).querySelector(q);

function usrlnk() {
	qa('div.v-popover', vp => {
		try {
			var ip = qs('a', vp);
			var mbr = qs('a.u', vp);

			if(mbr || (!ip.innerText.includes(':') && !ip.innerText.includes('.'))) {
				vp.outerHTML = '<a ' + (mbr && location.pathname.startsWith('/thread/') ? 'style="font-weight: bold;"' : (mbr && !location.pathname.startsWith('/thread/') ? 'style="font-weight: bold;"' : '')) + ' href="/w/사용자:' + encodeURIComponent((mbr || ip).innerText) + '">' + (mbr || ip).innerHTML + '</a>';
			} else {
				vp.outerHTML = '<a href="/contribution/ip/' + encodeURIComponent(ip.innerText) + '/document">' + ip.innerHTML + '</a>';
			}
		} catch(e) { 
		}
	});
}

function req(pth) {
	var request = new XMLHttpRequest();
	request.open('GET', pth, 0);
	request.send(null);

	var doc = new DOMParser().parseFromString(request.responseText, "text/html");
	return doc;
}

if(location.pathname == '/Upload') {
	qs('input + input + input#fileInput + div.g').outerHTML = `
		<div class=row>
			<div class="form-group col-xs-12 col-md-7">
				<label for=fakeFileInput>파일 선택</label>
				<div class=input-group>
					<input class=form-control id=fakeFileInput readonly type=text />
					<span class=input-group-btn>
					<button class="btn btn-secondary" type=button id=fakeFileButton>Select</button>
					</span>
				</div>
			</div>
		</div>
  `;
	
	qs('input + input + input#fileInput + div.row + div.g').outerHTML = `
		<div class=row>
			<div class="col-xs-12 col-md-7 form-group">
				<label for=fakeFileInput>파일 이름</label>
				<input id=documentInput class=form-control name=document type=text />
			</div>
		</div>
  `;
	
	var lices = [], cates = [];
	
	for(cfg_1 in config) {
		if(typeof config[cfg_1] != 'object') continue;
		/* _ea2134b3 */
		for(cfg_2 in config[cfg_1]) {
			if(typeof config[cfg_1][cfg_2] != 'object') continue;
			/* _49d9a01a */
			for(cfg_3 in config[cfg_1][cfg_2]) {
				if(typeof config[cfg_1][cfg_2][cfg_3] != 'object') continue;
				/* _98277f5a */
				for(cfg_4 in config[cfg_1][cfg_2][cfg_3]) {
					if(typeof config[cfg_1][cfg_2][cfg_3][cfg_4] != 'object') continue;
					/* CC BY 2.0 */
					for(cfg_5 in config[cfg_1][cfg_2][cfg_3][cfg_4]) {
						var str = config[cfg_1][cfg_2][cfg_3][cfg_4][cfg_5];
						if(typeof str == 'string' && str.startsWith('이미지 라이선스/')) {
							lices.push({ display: cfg_4, doc: '틀:' + str });
						}
						if(typeof str == 'string' && str.startsWith('파일/')) {
							cates.push({ display: cfg_4, doc: '분류:' + str });
						}
					}
				}
			}
		}
	}
	
	var lcopt = '', ctopt = '';
	for(lice of lices) {
		lcopt += '<option value="' + lice.doc + '"' + (lice.display == '제한적 이용' ? ' selected' : '') + '>' + lice.display + '</option>';
	}
	for(cate of cates) {
		ctopt += '<option value="' + cate.doc + '">' + cate.display + '</option>';
	}
	
	qs('label[for="licenseSelect"] + div.v-select').remove();
	var lclbl = qs('label[for="licenseSelect"]');
	lclbl.innerText += ' : ';
	lclbl.outerHTML = lclbl.outerHTML + '<select class=form-control id=licenseSelect name=license>' + lcopt + '</select>';
	
	qs('label[for="categorySelect"] + div.v-select').remove();
	var ctlbl = qs('label[for="categorySelect"]');
	ctlbl.innerText += ' : ';
	ctlbl.outerHTML = ctlbl.outerHTML + '<select class=form-control id=categorySelect name=category><option value selected>선택</option>' + ctopt + '</select>';
	
	qs('textarea[name="text"]').setAttribute('rows', '25');
}

/*
 * 문서: 문서 / 수정자 / 수정 시간
 * 토론: 항목 / 수정자 / 수정 시간
 */
if(location.pathname.startsWith('/contribution/')) {
	const regex = location.pathname.match(/^\/contribution\/(author|ip)\/(.*)\/(document|discuss)$/);
	const user  = _title.innerText.match(/^["](.*)["] 기여 목록$/)[1];
	qs('table.table > colgroup').outerHTML = '<colgroup><col /><col style="width: 20%;" /><col style="width: 20%;" /></colgroup>';
	
	if(regex[3] == 'discuss') {
		qs('table.table > thead > tr').outerHTML = '<tr><th>항목</th><th>수정자</th><th>수정 시간</th></tr>';
	} else {
		qs('table.table > thead > tr').outerHTML = '<tr><th>문서</th><th>수정자</th><th>수정 시간</th></tr>';
	}
	
	qa('table.table > tbody > tr', tr => {
		if(tr.querySelectorAll('td').length == 1) {
			return qs('td', tr).setAttribute('colspan', '3');
		}
		const ftd = qs('td:first-child', tr);
		var utd = '<td>';
		if(regex[1] == 'author') {
			utd += '<a style="font-weight: 700;" href="/w/사용자:' + encodeURIComponent(user) + '">' + user + '</a>';
		} else {
			utd += '<a href="/contribution/ip/' + encodeURIComponent(user) + '/document">' + user + '</a>';
		}
		utd += '</td>';
		ftd.outerHTML = ftd.outerHTML + utd;
	});
}

if(location.pathname.startsWith('/thread/')) {
	/* setInterval(usrlnk, 1000); */
	var resdiv = '<div id=res-container>';
	for(cfg_1 in config) {
		if(typeof config[cfg_1] != 'object') continue;
		/* _ea2134b3 */
		for(cfg_2 in config[cfg_1]) {
			if(typeof config[cfg_1][cfg_2] != 'object') continue;
			/* _49d9a01a */
			for(cfg_3 in config[cfg_1][cfg_2]) {
				if(typeof config[cfg_1][cfg_2][cfg_3] != 'object' || !((config[cfg_1][cfg_2][cfg_3]) instanceof Array)) continue;
				
				var resdata = config[cfg_1][cfg_2][cfg_3];
				if(!resdata.length) continue;
				var chk = 1;
				for(item of resdata) {
					if(typeof item != 'object' || Object.keys(item).length != 2) {
						chk = 0; break;
					}
				}
				if(!chk) continue;
				
				for(i=1; i<=resdata.length; i++) {
					resdiv += `
           <div class="res-wrapper res-loading" data-id=${i} data-visible=false data-locked=false>
             <div class="res res-type-normal">
               <div class=r-head>
                 <span class=num>
									 <a id=${i}>#${i}</a>&nbsp;
								 </span>
                 
               </div>

               <div class=r-body></div>
             </div>
           </div>
          `;
				}
			}
		}
	}
	resdiv += '</div>';
	
	qs('form.d + h2 + div.c').remove();
	qs('form.d + h2').outerHTML += resdiv;
	
	qs('input#noDisplayHideAuthor').click();
	qs('input#noDisplayHideAuthor').remove();
	qs('label[for="noDisplayHideAuthor"]').remove();
} usrlnk();

/* 나무픽스 호환 */
document.querySelector('body').setAttribute('class', (document.querySelector('div.buma')) ? 'buma' : 'Liberty');

/* 도구 모음의 링크에서 이벤트 리스너를 제거해서 상단에 흰 수평줄이 안나오게 한다. */
for(el of document.getElementsByTagName('a'))
{
	try {
		if(el.getAttribute('href').startsWith('#') || !el.getAttribute('href')) continue;
	} catch(e) {}
	el.outerHTML = el.outerHTML;
}

try {
	/* 위키 본문에서 클릭 이벤트 리스너 제거. a 태그에서 제거하는 것이 아니다 */
	qs("div.w").outerHTML = qs('div.w').outerHTML;
} catch(e){}

if(location.pathname.startsWith('/edit/') || location.pathname.startsWith('/new_edit_request/'))
{
	document.querySelector('form[method="post"]').setAttribute('id', 'editForm');
	document.querySelector('form[method="post"] ul').setAttribute('class', 'nav nav-tabs');
}

/* 검색 시 흰수평선 안나오게 */
try { qs('form.form-inline#searchform').setAttribute('action', '/Go'); } catch(e) { }

/* 제출 단추에서 이벤트 리스너 제거 */
for(el of document.querySelectorAll('form button'))
{
	el.outerHTML = el.outerHTML;
}

/* 싸이드바의 링크에서 이벤트 리스너 제거 */
setInterval(() => {
	try {
		for(el of document.querySelectorAll('ul.live-recent-list a.recent-item'))
		{
			el.outerHTML = el.outerHTML;
		}
	} catch(e) { }
}, 1000);

var si = setInterval(function() {
	if(typeof jQuery != 'undefined') {
		clearInterval(si);
		$(function() {
			if($('script[src*="google.com/recaptcha/api.js"]').length) {
				var theseedjs = setInterval(() => {
					if(window.recaptchaInit) {
						clearInterval(theseedjs);
						recaptchaInit('recaptcha', {
							sitekey: config.config["wiki.recaptcha_public"],
							size: 'invisible',
							badge: 'inline',
							callback: x => ($('form[method="post"] button[type="submit"]').attr("disabled", true), $('form[method="post"]').submit())
						}, id => $('form[method="post"]').attr('data-recaptcha', id));
					}
				}, 100);
			}

			if(location.pathname.startsWith('/thread/')) {
				function isVisible(elmt) {
					var top = elmt.offsetTop;
					var left = elmt.offsetLeft;
					var width = elmt.offsetWidth;
					var height = elmt.offsetHeight;

					while(elmt.offsetParent) {
						elmt = elmt.offsetParent;
						top += elmt.offsetTop;
						left += elmt.offsetLeft;
					}

					return (
						top < (pageYOffset + innerHeight) &&
						left < (pageXOffset + innerWidth) &&
						(top + height) > window.pageYOffset &&
						(left + width) > window.pageXOffset
					);
				}
				
				var allLoadingRes = 'div#res-container div.res-wrapper.res-loading';
				var loadingRes = allLoadingRes + '[data-visible="true"]';
				var loadingRes2 = loadingRes + '[data-locked="false"]';

				function setVisibleState() {
					$(allLoadingRes).each(function() {
						var item = $(this);
						if(isVisible(item[0])) {
							item.attr('data-visible', 'true');
						} else {
							item.attr('data-visible', 'false');
						}
					});
				}
				
				document.addEventListener('scroll', setVisibleState);
				
				function discussFetch(topic) {
					setVisibleState();
					
					if($(loadingRes2).length) {
						var lr = $($(loadingRes2)[0]);
						var id = lr.data('id');
						if(lr.attr('data-locked') == 'true') return;
						lr.attr('data-locked', 'true');
						
						$.ajax({
							url: '/thread/' + topic + '/' + id,
							success: function(d) {
								let config = JSON.parse($(d).filter('div#app + script').text().replace('window.INITIAL_STATE=', '').replace(/[;]$/, ''));
								
								for(cfg_1 in config) {
									if(typeof config[cfg_1] != 'object') continue;
									for(cfg_2 in config[cfg_1]) {
										if(typeof config[cfg_1][cfg_2] != 'object') continue;
										for(cfg_3 in config[cfg_1][cfg_2]) {
											if(typeof config[cfg_1][cfg_2][cfg_3] != 'object' || !((config[cfg_1][cfg_2][cfg_3]) instanceof Array)) continue;

											var resdata = config[cfg_1][cfg_2][cfg_3];
											if(!resdata.length) continue;
											var chk = 1;
											for(item of resdata) {
												if(typeof item != 'object' || Object.keys(item).length != 9) {
													chk = 0; break;
												}
											}
											if(!chk) continue;
											
											var fi = resdata[0][Object.keys(resdata[0])[2]];
											var fu = resdata[0][Object.keys(resdata[0])[1]];
											
											for(item of resdata) {
												var ret = [];
												for(p in item) ret.push(item[p]);
												
												var usr = '';
												if(ret[2]) {
													usr = '<a ' + (ret[7] ? 'style="font-weight: 700;"' : '') + ' href="/contribution/ip/' + ret[2] + '/document">' + ret[2] + '</a>';
												} else {
													usr = '<a ' + (ret[7] ? 'style="font-weight: 700;"' : '') + ' href="/w/사용자:' + ret[1] + '">' + ret[1] + '</a>';
												}
												
												if(typeof(ret[8]) == 'string' && ret[8].includes('line-through')) {
													if(ret[2]) usr += ' <sub>(차단된 아이피)</sub>';
													else usr += ' <sub>(차단된 사용자)</sub>';
												}
												
												var restyp = 'normal';
												var cntnt  = ret[3];
												
												if(ret[6] != 'normal') {
													restyp = 'status';
													switch(ret[6]) {
														case 'status':
															cntnt = '스레드 상태를 <strong>' + ret[3] + '</strong>로 변경';
														break; case 'document':
															cntnt = '스레드를 <strong>' + ret[3] + '</strong> 문서로 이동';
														break; case 'topic':
															cntnt = '스레드 주제를 <strong>' + ret[3] + '</strong>로 변경';
													}
												}
												
												if(ret[5]) {
													cntnt = '[' + ret[5] + '에 의해 숨겨진 글입니다.]';
													if(ret[3]) cntnt += '<div class=text-line-break style="margin: 25px 0 0 -10px;"><a class=text onclick="$(this).parent().parent().find(\'> .hidden-content\').show(); $(this).parent().css(\'margin\', \'15px 0 15px -10px\'); $(this).hide();" style="display: block; color: white;">[ADMIN] Show hidden content</a><div class=line></div></div><div class=hidden-content style="display: none;">' + (ret[3] || '내용을 불러올 수 없습니다!') + '</div>';
												}
												
												hidebtn = '';
												
												if(ret[5] && ret[3] !== null) {
													hidebtn = `<div class="combo admin-menu">
																	<a class="btn btn-danger btn-sm" href="/admin/thread/${topic}/${ret[0]}/${ret[5] ? 'show' : 'hide'}">[ADMIN] 숨기기${ret[5] ? ' 해제' : ''}</a>
																</div>`;
												}
												
												$('div.res-wrapper.res-loading[data-id="' + ret[0] + '"]').replaceWith (
													$ (`
															<div class=res-wrapper data-id=${ret[0]}>
																<div class="res res-type-${restyp}">
																	<div class="r-head${(fi == ret[2] && fi) || (fu == ret[1] && fu) ? ' first-author' : ''}">
																		<span class=num>
																			<a id=${ret[0]}>#${ret[0]}</a>&nbsp;
																		</span>${usr}
																		<span class=pull-right>
																			<time datetime="${(new Date(ret[4] * 1000)).toISOString()}" data-format="Y-m-d H:i:s"></time>
																		</span>
																	</div>

																	<div class="r-body${ret[5] ? ' r-hidden-body' : ''}">${cntnt}</div>
																</div>

																${hidebtn}
															</div>
													`)
												);
											}
											
											$('time').each(function() {
												var time = $(this);
												time.text(formatDate(new Date(time.attr('datetime')), time.data('format')));
											});
										}
									}
								}
							}, error: function(e) {
								history.go(0);
							}
						});
					}
				}
				
				function discussPoll(topic) {
					$.ajax({
						type: 'GET',
						success: function(d) {
							let config = JSON.parse($(d).filter('div#app + script').text().replace('window.INITIAL_STATE=', '').replace(/[;]$/, ''));
							
							for(cfg_1 in config) {
								if(typeof config[cfg_1] != 'object') continue;
								for(cfg_2 in config[cfg_1]) {
									if(typeof config[cfg_1][cfg_2] != 'object') continue;
									for(cfg_3 in config[cfg_1][cfg_2]) {
										if(typeof config[cfg_1][cfg_2][cfg_3] != 'object' || !((config[cfg_1][cfg_2][cfg_3]) instanceof Array)) continue;

										var resdata = config[cfg_1][cfg_2][cfg_3];
										if(!resdata.length) continue;
										var chk = 1;
										for(item of resdata) {
											if(typeof item != 'object' || Object.keys(item).length != 2) {
												chk = 0; break;
											}
										}
										if(!chk) continue;

										var cnt = resdata.length;
										for(i=$('div.res-wrapper').length+1; i<=cnt; i++) {
											$(`
												<div class="res-wrapper res-loading" data-id=${i} data-visible=false data-locked=false>
												<div class="res res-type-normal">
												<div class=r-head>
												<span class=num>
												<a id=${i}>#${i}</a>&nbsp;
												</span>

												</div>

												<div class=r-body></div>
												</div>
												</div>
											`).appendTo(document.querySelector('#res-container'));
										}
										setVisibleState();
									}
								}
							}
						}
					});
					discussFetch(topic);
				}
				
				function _discussPollStart(topic) {
					$('form.c[method="post"][action^="/thread/"]').submit(function() {
						var self = $(this);
						self.find('button, textarea').attr('readonly', '');
						
						$.ajax({
							type: 'POST',
							data: self.serialize(),
							success: function(d) {
								self.find('button, textarea').removeAttr('readonly');
								self.find('textarea').val('');
							}, error: function(e) {
								self.find('button, textarea').removeAttr('readonly');
								alert(e.responseJSON.status || '문제가 발생했습니다!');
							}
						});
						
						return false;
					});
					
					setInterval(function() {
						discussPoll(topic);
					}, (document.title.endsWith(' - 나무위키') ? 5500 : 1500));
					
					setVisibleState();
				}
				
				$(function() {
				  _discussPollStart(location.pathname.replace('/thread/', ''));
				});
			  
				setVisibleState();
				
				window._discussPollStart = _discussPollStart;
			}
			
			/* 참고 사이트
			 * https://stackoverflow.com/questions/19469881/remove-all-event-listeners-of-specific-type
			 * https://stackoverflow.com/questions/2048720/get-all-attributes-from-a-html-element-with-javascript-jquery
			 */

			/* 리버티의 특징인 멋진 효과 부활 */
			$('div.wiki-article div.g').attr('class', 'g form-group');

			const controls = [
				'div.wiki-article input:not([type="button"]):not([type="submit"]):not([type="reset"]):not([type="radio"]):not([type="checkbox"])',
				'div.wiki-article select',
				'div.wiki-article textarea'
			];

			for(ctrl of controls)
			{
				$(ctrl).attr('class', 'form-control');

				for(el of document.querySelectorAll(ctrl))
				{
					for(i=0, atts=el.attributes, n=atts.length, arr=[]; i<n; i++)
					{
						if(!atts[i] || !atts[i].nodeName.startsWith('data-')) continue;
						$(el).removeAttr(atts[i].nodeName);
					}
				}
			}

			const btns = {
				'a.d, button.d, input.d[type="button"], input.d[type="submit"], input.d[type="reset"]': 'btn btn-danger',
				'a.s, button.s, input.s[type="button"], input.s[type="submit"], input.s[type="reset"]': 'btn btn-primary',
				'a.i, button.i, input.i[type="button"], input.i[type="submit"], input.i[type="reset"]': 'btn btn-info'
			};

			for(btn in btns)
			{
				for(el of document.querySelectorAll(btn))
				{
					for(i=0, atts=el.attributes, n=atts.length, arr=[]; i<n; i++)
					{
						if(!atts[i] || !atts[i].nodeName.startsWith('data-')) continue;
						$(el).removeAttr(atts[i].nodeName);
					}
				}

				$(btn).attr('class', btns[btn]);
			}
			
			$('.wiki-folding dt').each(function() {
				this.outerHTML = this.outerHTML;
				$(this).click(function() {
					$(this).parent().children('dd').toggle('fast');
				});
			});

			$(".wiki-heading").click(function() {
				$(this).next().toggle();
			});
			
			try {
					/* form 태그 제출 이벤트 리스너 제거 */
					for(el of document.querySelectorAll('form'))
					{
						$(el).parent()[0].replaceChild(el.cloneNode(1), el);
					}
			} catch(e){}
		});
	}
}, 500);
