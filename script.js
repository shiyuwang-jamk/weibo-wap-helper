// ==UserScript==
// @name         微博WAP版助手
// @namespace    http://tampermonkey.net/
// @version      1.1.2 short tail
// @description  从WAP版微博页面和个人主页跳转到PC版
// @author       andriasw, snomiao
// @match        https://weibo.cn/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const btnPC = (link) => { // thx snomiao
        var a = document.createElement("a");
        a.innerText="PC版"; a.classList.add('nl'); a.href=link;
        var txt = document.createTextNode("|");
        document.querySelector('.n').children[4].parentElement.appendChild(txt)
        document.querySelector('.n').children[4].parentElement.appendChild(a)
    } // Add link on page to PC version

    var urlPC='https://weibo.com/';
    var uidRe=/\?uid=(\d+)/;

    // Homepage, profile page or specific Weibo page?
    if(document.title === '我的首页'); // Do nothing if on homepage.
    else if(document.getElementsByClassName('ut').length) urlPC += 'u/'+document.getElementsByClassName('ut')[0].innerHTML.match(uidRe)[1]; //+='u/'+uid
    // The class 'ut' also appears in the homepage, hence line 26 to exclude homepage first.
    else if(document.getElementById('M_') !== null) { // The corresponding element that contains uid...
        var tail = (window.location.href.indexOf("/repost/")!=-1)?'?type=repost':''; // Add 'repost' tail if is a repost page. Do nothing if not.
        urlPC += document.getElementById('M_').outerHTML.match(uidRe)[1]+'/'+window.location.href.match(/\/(comment|repost)\/(\w+)(\/|\?)?/)[2]+tail; // +=uid+weiboID+tail
    }

    btnPC(urlPC)

})();
