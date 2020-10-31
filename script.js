// ==UserScript==
// @name         微博WAP版助手
// @namespace    http://tampermonkey.net/
// @version      1.2.1 touch
// @description  从微博WAP版跳转到PC版或触屏版
// @author       andriasw, snomiao
// @match        https://weibo.cn/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var url=window.location.href;
    var urlPC='https://weibo.com/';
    var urlM='https://m.weibo.cn/';

    const btn = (link=urlPC, m=urlM) => { // thx snomiao
        var a = document.createElement("a");
        a.innerText="PC版"; a.classList.add('nl'); a.href=link;
        var txt = document.createTextNode("|");
        document.querySelector('.n').children[4].parentElement.appendChild(txt)
        document.querySelector('.n').children[4].parentElement.appendChild(a)

        var ma = document.createElement("a");
        ma.innerText="触屏版"; ma.classList.add('nl'); ma.href=m;
        var txtM = document.createTextNode("|");
        document.querySelector('.n').children[5].parentElement.appendChild(txtM)
        document.querySelector('.n').children[5].parentElement.appendChild(ma)
    } // Add link on page to PC version

    // Homepage, profile page or specific Weibo page?
    if(document.title === '我的首页') btn(); // Do nothing if on homepage.
    else {
        const uidRe=/\?uid=(\d+)/;

        if(document.getElementsByClassName('ut').length) {
            const uid = 'u/'+document.getElementsByClassName('ut')[0].innerHTML.match(uidRe)[1]; // The class 'ut' also appears in the homepage, hence line 33 to exclude homepage first.
            btn(urlPC+uid, urlM+uid);
        }

        else if(document.getElementById('M_') !== null) { // The corresponding element that contains uid...
            const weiboID = url.match(/\/(comment|repost)\/(\w+)(\/|\?)?/)[2];
            const uid = document.getElementById('M_').innerHTML.match(uidRe)[1]+'/';
            if(url.indexOf("/repost/")!=-1) btn(urlPC+uid+weiboID+'?type=repost', urlM+'status/'+weiboID+'#repost');
            else btn(urlPC+uid+weiboID, urlM+'status/'+weiboID);
        }
    }

})();
