// ==UserScript==
// @name         微博WAP版助手
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  辅助添加按钮到页面，方便打开微博评论页面电脑版
// @author       andriasw, snomiao
// @match        https://weibo.cn/comment/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var url=window.location.href;
    if (/\?uid/.test(url)) {

        var urlPC = window.location.href.replace('comment', url.match(/\?uid=(\d+)/)[1]).replace('weibo.cn', 'weibo.com');

        //thx snomiao

        var a = document.createElement("a");
        a.innerText="PC版"; a.classList.add('nl'); a.href=urlPC;
        var txt = document.createTextNode("|");
        document.querySelector('.n').children[4].parentElement.appendChild(txt)
        document.querySelector('.n').children[4].parentElement.appendChild(a)
    }


})();
