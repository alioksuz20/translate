// ==UserScript==
// @name         Websites for Translate
// @namespace    http://tampermonkey.net/
// @version      1.04
// @description  MSN.com, Medium.com
// @author       You

// @match        https://*.msn.com/*
// @match        https://*.medium.com/*
// @match        https://*.theidioms.com/*
// @match        https://*.elllo.org/*

// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js
// @run-at       document-end

// @updateURL    https://raw.githubusercontent.com/alioksuz20/translate/main/Websites%20for%20Translate%20v1.0.js

// @icon         http://ssl.gstatic.com/translate/favicon.ico

// @grant        GM_addStyle
// @grant        GM_getResourceText
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_setClipboard

// ==/UserScript==

$(document).ready(function() {



    //████████████████████████   MSN.com   █████████████████████████████████

    var VarMisinYokMusun1 = setInterval( function() {
        if( $("button[name='Continue reading']").length || $("div.readmoremobile button").length || $("div.readmore a").length ) {
            clearInterval(VarMisinYokMusun1);
            console.log("Eleman yüklendi!..");

            setTimeout(function () {
                $("button[name='Continue reading']").trigger('click');
                $("div.readmoremobile > button").trigger('click');
                $("div.readmore a")[0].click(); // trigger('click') not working here!
            }, 1000);

            clearTimeout(myTimeOut1);
        }
    }, 50);

    // Her hâlükârda 10 saniye sonra VarMisinYokMusun1 i İPTAL ET, butonu arama.
    var myTimeOut1 = setTimeout(function () {
        clearInterval(VarMisinYokMusun1);
        console.log("VarMisinYokMusun1 İPTAL EDİLDİ!..");
    }, 10000);

    //#######################################################################


    //████████████████████████   Medium.com   █████████████████████████████████

    setTimeout(function () { // 200 ms beklemezsek kopyalamıyor!..
        $("p:contains('free member-only')").closest("div.l").css('background-color','red').remove();
        $("footer").siblings("div:has(button[aria-label='responses'])").css('background-color','red').remove();
        $("nav.ag").css('background-color','red').remove();
    }, 1000);

    //#########################################################################


    //████████████████████████   Theidioms.com   █████████████████████████████████

    if (window.location.href.indexOf("https://www.theidioms.com") == 0) {
        document.removeEventListener('copy', addCopyrightInfo);
    }

    //############################################################################


    //████████████████████████   ELLLO.org   █████████████████████████████████

    if (window.location.href.indexOf("https://elllo.org") == 0) {
        $("body").append("<div class='audio_play-pause'/>");
        $("div.audio_play-pause").css('background','url("http://i.stack.imgur.com/lqK28.png") no-repeat').css('width','30px').css('height','30px').css('background-position','center -204px');
    }

    $("body").on('click', "div.audio_play-pause", function () {
        var audio = $('audio')[0];
        if ( audio.paused ) {
            audio.play();
            $(this).css('width','30px').css('height','30px').css('background-position','center -143px');
        } else {
            audio.pause();
            $(this).css('width','30px').css('height','30px').css('background-position','center -204px');
        }
    });




    //############################################################################

    //     $("body").on("keydown", function (e) {
    //         e = e || window.event;
    //         var key = e.which || e.keyCode; // keyCode detection
    //         var ctrl = e.ctrlKey ? e.ctrlKey : ((key === 17) ? true : false); // ctrl detection

    //         if (key == 122 && ctrl) { // Ctrl + F11
    //             console.log("Ctrl + F11 Pressed !");
    //             $("#li_NGM1MjY5NzMtZjY3My00MWU0LWIxM2ItZDYxOTcxZGU4YmRhX2Rldg_editormenuentry").click();
    //             $("#td_NGM1MjY5NzMtZjY3My00MWU0LWIxM2ItZDYxOTcxZGU4YmRhX2VkaXRvcnN1Ym1lbnVlbnRyeV90ZF9sZGV2X3JlaW5kZW50YWxs").click();



    //         }

    //         // else if (key == 86 && ctrl) {
    //         //     console.log("Ctrl + V Pressed !");
    //         //     $(document.activeElement).addClass("backgroundRedColorWhite");
    //         //     setTimeout(function () {
    //         //         $(document.activeElement).removeClass("backgroundRedColorWhite");
    //         //     }, 200);
    //         // }

    //     });

    //***************************************************




});




