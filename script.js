// ==UserScript==
// @name         微博WAP版助手
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  从WAP版微博页面和个人主页跳转到PC版
// @author       andriasw, snomiao
// @match        https://weibo.cn/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var btnPC = (link) => { // thx snomiao
        var a = document.createElement("a");
        a.innerText="PC版"; a.classList.add('nl'); a.href=link;
        var txt = document.createTextNode("|");
        document.querySelector('.n').children[4].parentElement.appendChild(txt)
        document.querySelector('.n').children[4].parentElement.appendChild(a)
    } // 添加PC版按钮

    //判断页面类型：我的首页、个人主页和微博页面
    var hmpg, profilePage, weiboPage = 0;
    if (document.title === '我的首页') hmpg =1;
    else if (document.getElementsByClassName('ut').length) profilePage = 1; //https://www.techiedelight.com/check-element-exists-with-given-class-javascript/
    else if (document.getElementById('M_') !== null) weiboPage = 1;

    var urlPC='https://weibo.com/';

    if(hmpg); //转到首页，PC版链接不变
    else if(profilePage) {
        var uid = document.getElementsByClassName('ut')[0].innerHTML.match(/\?uid=(\d+)/)[1];
        urlPC += 'u/'+uid;
    }
    else if(weiboPage) {
        var uid2 = document.getElementById('M_').outerHTML.match(/\?uid=(\d+)/)[1];
        var weiboID = window.location.href.match(/\/(comment|repost)\/(\w+)(\/|\?)?/)[2];

        var isComment=window.location.href.indexOf("/comment/")!=-1;
        var isRepost=window.location.href.indexOf("/repost/")!=-1;
        var tail;
        if(isComment) tail='?type=comment';
        else if(isRepost) tail='?type=repost';

        urlPC += uid2+'/'+weiboID+tail;
    }

    btnPC(urlPC)

})();
