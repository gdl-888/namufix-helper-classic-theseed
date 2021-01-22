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

var jq = document.createElement('script');
jq.setAttribute('src', 'https://theseed.io/js/jquery-2.1.4.min.js');  /* jQuery를 활성화한다. */
document.body.insertBefore(jq, document.getElementById('app'));

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
			} else table.setAttribute('class', 'table');
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
		var ip = qs('a', vp);
		var mbr = qs('a.u', vp);

		if(mbr || (!ip.innerText.includes(':') && !ip.innerText.includes('.'))) {
			vp.outerHTML = '<a ' + (mbr && location.pathname.startsWith('/thread/') ? 'style="font-weight: bold;"' : (mbr && !location.pathname.startsWith('/thread/') ? 'style="font-weight: bold;"' : '')) + ' href="/w/사용자:' + encodeURIComponent((mbr || ip).innerText) + '">' + (mbr || ip).innerHTML + '</a>';
		} else {
			vp.outerHTML = '<a href="/contribution/ip/' + encodeURIComponent(ip.innerText) + '/document">' + ip.innerHTML + '</a>';
		}
	});
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
	setInterval(usrlnk, 1000);
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

			$('.wiki-folding dt').click(function() {
				$(this).parent().children('dd').toggle('fast');
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
