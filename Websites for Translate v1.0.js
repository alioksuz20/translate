// ==UserScript==
// @name         Websites for Translate
// @namespace    http://tampermonkey.net/
// @version      1.14
// @description  MSN.com, Medium.com
// @author       You

// @match        https://*.msn.com/*
// @match        https://*.medium.com/*
// @match        https://*.theidioms.com/*
// @match        https://*.elllo.org/*
// @match        https://*.quodb.com/*

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

    if (window.location.href.indexOf("msn.com") > -1) {
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
    }

    //#######################################################################


    //████████████████████████   Medium.com   █████████████████████████████████

    if (window.location.href.indexOf("medium.com") > -1) {
        setTimeout(function () { // 200 ms beklemezsek kopyalamıyor!..
            $("p:contains('free member-only')").closest("div.l").css('background-color','red').remove();
            $("footer").siblings("div:has(button[aria-label='responses'])").css('background-color','red').remove();
            $("nav.ag").css('background-color','red').remove();
        }, 1000);
    }


    //#########################################################################


    //████████████████████████   Theidioms.com   █████████████████████████████████

    if (window.location.href.indexOf("theidioms.com") > -1) {
        document.removeEventListener('copy', addCopyrightInfo);
    }

    //############################################################################


    //████████████████████████   ELLLO.org   █████████████████████████████████

    if (window.location.href.indexOf("elllo.org") > -1) {

        $("body").append("<div class='audio_play-pause'/>");
        $("div.audio_play-pause").addClass("play");

        $("body").append("<div class='audio_backward'/>");
        $("body").append("<div class='audio_forward'/>");


        //-----------------------------------------------------------------------------
        $("body").on('click', "div.audio_play-pause", function () {

            // do Something here;
            var audio = $('audio')[0];
            if ( !audio.paused ) {
                audio.pause();
                $("div.audio_play-pause").removeClass("pause");
                $("div.audio_play-pause").addClass("play");
            } else {
                audio.play();
                $("div.audio_play-pause").removeClass("play");
                $("div.audio_play-pause").addClass("pause");
            }

        });


        $("body").on('click', "div.audio_backward", function () {
            $("audio").prop("currentTime",$("audio").prop("currentTime") -2 );
        });

        $("body").on('click', "div.audio_forward", function () {
            $("audio").prop("currentTime",$("audio").prop("currentTime") +2 );
        });
        //-----------------------------------------------------------------------------


        // audio kontrolu aktif iken Space tuşuna bastığımızda play/pause düğmemize çift tıklanmasını önlemek için:
        //-----------------------------------------------------------------------------
        $("audio").on('focus', function () {
            $(this).blur();
            $("div.audio_play-pause").focus();
        });
        //-----------------------------------------------------------------------------



        $("div.audio audio").on('play', function () {
            $("div.audio_play-pause").removeClass("play");
            $("div.audio_play-pause").addClass("pause");
        });

        $("div.audio audio").on('pause', function() {
            $("div.audio_play-pause").removeClass("pause");
            $("div.audio_play-pause").addClass("play");
        });


        // When the user scrolls down 20px from the top of the document, show the button
        //         window.onscroll = function() {scrollFunction()};

        //         function scrollFunction() {
        //             if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {

        //                 if ($("div.container ul.tabs li.selected a").text() == "Script") {
        //                     $('div.audio').css('position', 'fixed');
        //                     $('div.audio').css('bottom', '0px');
        //                 } else {
        //                     $('div.audio').css('position', 'initial');
        //                     $('div.audio').css('bottom', '');
        //                 }

        //             }
        //         }


        // Biraz temizlik yapalım:
        $("div.tabcontents p, div.tabcontents li").html(function() {
            return this.innerHTML.replace(/\s{2,}/g,' ')
                .replace(/\s{2,}/g,' ')
                .replace(/&nbsp;/g,'')
                .replace(/<br>\s/g,'');
        });



        // Sayfa yüklendiğinde; "Script" dışındaki sekmelerde play/pause düğmemizi ve "audio" oynatıcısını gizleyelim:
        if ($("div.container ul.tabs li.selected a").text() == "Vocab" || $("div.container ul.tabs li.selected a").text() == "Quiz") {
            $("div.audio").hide();
            $("div.audio_play-pause").hide();
            $("div.audio_backward").hide();
            $("div.audio_forward").hide();

            $(document).off('keydown.spaceButton'); // Fonksiyon iptal
            $(document).off('keyup.spaceButton'); // Fonksiyon iptal

        } else {
            $("div.audio").show();
            $("div.audio_play-pause").show();
            $("div.audio_backward").show();
            $("div.audio_forward").show();

            $('div.audio').css('position', 'fixed');
            $('div.audio').css('bottom', '0px');

            // audio kontrolu aktif iken Space veya Enter tuşuna basınca click yapmasın. (Prevent space button from triggering any other button click in jQuery. It's keyup that triggers button clicks.)
            $(document).on('keydown.spaceButton', function (e) {
                // console.log(e.which);
                if (e.which == '32' || e.which == '13') { // SPACE or ENTER
                    e.preventDefault();
                }
            });

            // Ayrıca SPACE, ENTER, Numlock(0) tuşları ile ses kaydını oynat/durdur:
            $(document).on('keyup.spaceButton', function (e) {
                // console.log(e.which);
                if (e.which == '32' || e.which == '13' || e.which == '96' ) { // SPACE, ENTER, Numlock(0)
                    e.preventDefault();
                    $("div.audio_play-pause").trigger("click");
                }
            });

        }

        // Sekmelere tıkladığımızda; "Script" dışındaki sekmelerde play/pause düğmemizi ve "audio" oynatıcısını gizleyelim:
        $("div.container ul.tabs li a").on('click', function () {
            //console.log($("div.container ul.tabs li.selected a").text());
            if ($("div.container ul.tabs li.selected a").text() == "Vocab" || $("div.container ul.tabs li.selected a").text() == "Quiz") {
                $("div.audio").hide();
                $("div.audio_play-pause").hide();
                $("div.audio_backward").hide();
                $("div.audio_forward").hide();

                $(document).off('keydown.spaceButton'); // Fonksiyon iptal
                $(document).off('keyup.spaceButton'); // Fonksiyon iptal

            } else {
                $("div.audio").show();
                $("div.audio_play-pause").show();
                $("div.audio_backward").show();
                $("div.audio_forward").show();

                $('div.audio').css('position', 'fixed');
                $('div.audio').css('bottom', '0px');

                // audio kontrolu aktif iken Space veya Enter tuşuna basınca click yapmasın. (Prevent space button from triggering any other button click in jQuery. It's keyup that triggers button clicks.)
                $(document).on('keydown.spaceButton', function (e) {
                    // console.log(e.which);
                    if (e.which == '32' || e.which == '13') { // SPACE or ENTER
                        e.preventDefault();
                    }
                });

                // Ayrıca SPACE, ENTER, Numlock(0) tuşları ile ses kaydını oynat/durdur:
                $(document).on('keyup.spaceButton', function (e) {
                    // console.log(e.which);
                    if (e.which == '32' || e.which == '13' || e.which == '96' ) { // SPACE, ENTER, Numlock(0)
                        e.preventDefault();
                        $("div.audio_play-pause").trigger("click");
                    }
                });

            }

        });




        // Left tuşu ile ses kaydını 2sn. geriye alalım:
        $(document).on('keydown.leftButton', function (e) {
            // console.log(e.which);
            if (e.which == '37') { // LEFT
                $("audio").prop("currentTime",$("audio").prop("currentTime") -2 );
            }
        });

        // Right tuşu ile ses kaydını 2sn. ileriye alalım:
        $(document).on('keydown.rightButton', function (e) {
            // console.log(e.which);
            if (e.which == '39') { // RIGHT
                $("audio").prop("currentTime",$("audio").prop("currentTime") +2 );
                // $("div.audio_forward").css({outline: "0px solid transparent"}).animate({outlineWidth: '6px', outlineColor: '#FF6347'}, 200);
                // $("div.audio_forward").animate({outlineWidth: '0px', outlineColor: '#FF6347'}, 200);
            }
        });


        // if ($("div.container ul.tabs li.selected a").text() == "Script") {
        //     $('div.audio').css('position', 'fixed');
        //     $('div.audio').css('bottom', '0px');
        // } else {
        //     $('div.audio').css('position', 'initial');
        //     $('div.audio').css('bottom', '');
        // }


    }

    //############################################################################



    //████████████████████████   Quodb.com   █████████████████████████████████

    function quodb_com() {
        if (window.location.href.indexOf("quodb.com") > -1 ) {
            var Bekle_QuoDB_ResultsTable = setInterval(function () { // Her 100ms de bir bekleme penceresi açık mı değil mi kontrol et...
                if ($("table#results_table tbody").length == 0) {
                    // Tablo henüz yüklenmedi!..
                } else {
                    clearInterval(Bekle_QuoDB_ResultsTable);
                    // Tablo yüklendi. Sonraki adımlara geçebilirsiniz!
                    $("a.btn.btn-mini[rel='popover']").trigger("click")
                }
            }, 1000);
        }
    }

    quodb_com();

    $("body").on('click', "div.pagination ul#pages_list a", function () {
        quodb_com();
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






