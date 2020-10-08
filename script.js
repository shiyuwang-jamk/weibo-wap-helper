// ==UserScript==
// @name         微博WAP版助手
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  辅助添加按钮到页面，方便打开单条微博页面电脑版
// @author       andriasw, snomiao
// @match        https://weibo.cn/comment/*
// @match        https://weibo.cn/repost/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    let btnPC = (link) => { // thx snomiao
        var a = document.createElement("a");
        a.innerText="PC版"; a.classList.add('nl'); a.href=link;
        var txt = document.createTextNode("|");
        document.querySelector('.n').children[4].parentElement.appendChild(txt)
        document.querySelector('.n').children[4].parentElement.appendChild(a)
    }

    var uid = document.getElementById('M_').outerHTML.match(/\?uid=(\d+)/)[1];
    var urlPC = window.location.href.replace(/(comment|repost)/, uid).replace('weibo.cn', 'weibo.com');
    btnPC(urlPC)

})();
