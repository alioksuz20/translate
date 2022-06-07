// ==UserScript==
// @name         Double Click/Tap to Google Translate v3 (Multi)
// @namespace    http://tampermonkey.net/
// @version      3.03
// @description  try to take over the world!
// @author       You

// @match        *://*/*

// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js
// @require      https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js
// @resource     https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/themes/smoothness/jquery-ui.css

// @require      https://ngryman.sh/jquery.finger/libs/jquery.finger.min.js

// @updateURL    https://raw.githubusercontent.com/alioksuz20/translate/main/Double%20Click-Tap%20to%20Google%20Translate%20v2.0.js

// @icon         http://ssl.gstatic.com/translate/favicon.ico
// @grant        none
// ==/UserScript==

//**********************************************************************
// var jq = document.createElement('script');
// jq.src = "//ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js";
// document.getElementsByTagName('head')[0].appendChild(jq);
// jQuery.noConflict();
//**********************************************************************

var JQuery306 = jQuery.noConflict(true);


(function ($) {


    // code that needs 3.0.6 goes here
    $(document).ready(function () {

        //****************************************************

        // | tap | doubletap | press | drag | flick | (flick not working!)
        //     $('body').on('flick', '.clickedElementDiziCumle',function(e) {
        //         //console.log(this, e);
        //         //console.log($(this).text());

        //     });

        //****************************************************

        //████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████


        // Haber/makale içindeki resimlerin click olayını kaldırıp, "drag" ile resmi silme fonksiyonu tanımlayalım:
        setTimeout(function () {

            // $("img").contents().unwrap();

            // Başlığın shadowRoot una erişip içindeki iki div i dışarı çıkardıktan sonra shadowRoot u silelim:
            if ($('msnews-views-title').length) {
                $('div.providerInfo', $('msnews-views-title')[0].shadowRoot).insertAfter($('div.viewsHeaderInfoLeft-DS-EntryPoint1-1'));
                $('div.viewsInfo', $('msnews-views-title')[0].shadowRoot).insertAfter($('div.providerInfo'));
                $("msnews-views-title").remove();
            }


            $("img").each(function () {
                var original, clone;
                // element with id my-div and its child nodes have some event-handlers
                original = $(this);
                clone = original.clone();
                //
                original.replaceWith(clone);
            });

            //****************************************************

            // | tap | doubletap | press | drag | flick | (flick not working!)
            $('body').on('drag', 'img, video, iframe',function(e) {
                console.log(this, e);
                if ('horizontal' == e.orientation) {
                    if (-1 == e.direction) { // left
                        $(this).parents("div[id^='ArticleBody-InlineImage']").remove(); // CNBC
                        $("div.SingleVideo").remove(); // abcnews.go.com
                        $(this).remove(); // Bunu sona koyalım
                    }
                    else { // right
                        //Galeri ise
                        $(this).parents("div[class^='gallery_carouselContainer']").remove(); // MSN
                        $(this).parents("div.article-image-container").remove(); // MSN

                    }
                }
            });

            //****************************************************

        }, 1000);



        //████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████



        var is_Windows = navigator.platform.toLowerCase().indexOf("win32") > -1; // true. navigator.platform = "Win32"
        var is_Android = navigator.platform.toLowerCase().indexOf("linux") > -1; // true. navigator.platform = "Linux aarch64"



        $("body").on("click", ".clickedElementDiziCumleTranslated", function () {

            // Firefox ın Windows ve Android versiyonlarına göre çalışacak farklı kod parçacıkları:
            //*************************************************************************************

            // if (is_Windows) {
            // Windows ta metni kopyalamadan önce metni seçili hale getirmemiz gerekiyor. Read Aloud ancak seçili metni okuyor:
            $(this).selectText();

            setTimeout(function () { // 200 ms beklemezsek kopyalamıyor!..
                document.execCommand("copy");
            }, 50);

            setTimeout(function () { // 200 ms beklemezsek kopyalamıyor!..
                //document.execCommand("copy");
                document.getSelection().removeAllRanges();
            }, 400);
            blink_text(this);

            //}

            /*
        if (is_Android) {
            copyToClipboard($(this));
            blink_text(this);
        }
        */

            //*************************************************************************************

        });

        //████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████



        // Bir kelimenin üstüne çift tıklayarak Parent ını seçelim. Kelimeden paragraf seçme gibi...
        $("body").on("click", function (x) {


            var clickedElement = $(x.target);
            var clickedElementTagName = clickedElement.prop("tagName");

            function cevrilmeyeceklerMesaj() {
                // Do nothing, Bunları çevirme!..
                console.log("Tıklanan öğe: " + clickedElementTagName);
                console.log("ÇEVRİLMEYECEK bir öğeye tıkladınız! ÇEVİRİ İPTAL.");
            }

            if ( $(x.target).is("MSN-ARTICLE-IMAGE") ) {
                $("span.image-caption").addClass("tikladigimizMetninKardesleri");
                $("span.image-caption").click();
            }


            if ( $(x.target).hasClass("clickedElementDiziCumle") ) {
                cevrilmeyeceklerMesaj();
                console.log(' hasClass("clickedElementDiziCumle") ');
            }
            else if ( $(x.target).hasClass("clickedElementDiziCumleTranslated") ) {
                cevrilmeyeceklerMesaj();
                console.log(' hasClass("clickedElementDiziCumleTranslated") ');
            }
            else if ( $(x.target).hasClass("clickedElementDiziCeviri") ) {
                cevrilmeyeceklerMesaj();
                console.log(' hasClass("clickedElementDiziCeviri") ');
            }
            else if ( $(x.target).hasClass("clickedElementDiziCevrildi") ) {
                cevrilmeyeceklerMesaj();
                console.log(' hasClass("clickedElementDiziCevrildi") ');
            }
            else if ( $(x.target).hasClass("tikladigimizMetninKardesleri") ) {
                cevrilmeyeceklerMesaj();
                console.log(' hasClass("tikladigimizMetninKardesleri") ');
            }
            else if ( $(x.target).hasClass("cevrilmisMetin") ) {
                cevrilmeyeceklerMesaj();
                console.log(' hasClass("cevrilmisMetin") ');
            }

            else if ( $(x.target).children(".cevrilmisMetin").length ) {
                cevrilmeyeceklerMesaj();
                console.log(' children(".cevrilmisMetin").length ');
            }

            else if ( $(x.target).is("button") ) {
                cevrilmeyeceklerMesaj();
                console.log(' is("button") ');
            }
            else if ( $(x.target).is("a") ) {
                cevrilmeyeceklerMesaj();
                console.log(' is("a") ');
            }
            else if ( $(x.target).is("a span") ) {
                cevrilmeyeceklerMesaj();
                console.log(' is("a span") ');
            }
            else if ( $(x.target).is("img") ) {
                cevrilmeyeceklerMesaj();
                console.log(' is("img") ');
            }
            else if ( $(x.target).is("ul") ) {
                cevrilmeyeceklerMesaj();
                console.log(' is("ul") ');
            }
            else if ( $(x.target).has("audio").length > 0 ) {
                cevrilmeyeceklerMesaj();
                console.log(' has("audio").length > 0 ');
            }
            else if ( $(x.target).is("p span") || $(x.target).is("p strong") ) {
                $(x.target).parent().click();
            }
            else {
                console.log("ÇEVRİLECEK bir öğeye tıkladınız, ÇEVİRİYE DEVAM...");




                /*
                            if ( $(x.target).is(".clickedElementDiziCumle")
                || $(x.target).is(".clickedElementDiziCumleTranslated")
                || $(x.target).is(".clickedElementDiziCeviri")
                || $(x.target).is(".clickedElementDiziCevrildi")
                || $(x.target).is(".tikladigimizMetninKardesleri")
                || $(x.target).is(".cevrilmisMetin")

                || $(x.target).children(".cevrilmisMetin").length
                || $(x.target).is("button")
                || $(x.target).is("a")
                || $(x.target).is("a span")
                || $(x.target).is("img")
                || $(x.target).has('audio').length > 0
                //|| $(x.target).has('img').length > 0
                || $(x.target).is("ul")
               ) {
                // Do nothing, Bunları çevirme!..

                 */


                /*
        if ($(this).hasClass("klonDiziCumleSPAN")) {
            $(this).off("dblclick");
            return;
        }
        */


                console.log("Tıklanan öğe: " + clickedElementTagName);

                clickedElement.find('strong').contents().unwrap();


                // Panoya kopyalayıp; Android de Tasker ile Windows da Firefox >> ReadAloud ve ReadAloud.ahk ile okutalım:
                //document.execCommand("copy");

                if ( clickedElement.text().length > 1000 ) {
                    console.log("Tıklanan Öğenin Karakter Sayısı (" + clickedElement.text().length + ") 1000'den FAZLA. ÇEVİRİ İPTAL...");
                    blink_text(clickedElement);
                    return;
                } else {
                    console.log("Tıklanan Öğenin Karakter Sayısı:");
                    console.log(clickedElement.text().length);
                    console.log("----------- Tıklanan Metin-----------\n" + clickedElement.text() + "\n-------------------------------------");
                }
                //-------------------------------------------

                var clickedElementBROS = clickedElement.nextAll().not('.cevrilmisMetin');
                console.log("Tıklanan Öğeden Sonraki KARDEŞ Sayısı:");
                console.log(clickedElementBROS.length);

                var totalBROSCharCount = 0;
                var i = 0;

                var to500CharCount = setInterval(function () {

                    if (clickedElementBROS.eq(i).hasClass('cevrilmisMetin') || clickedElementBROS.eq(i).children().hasClass('cevrilmisMetin')) {
                        clearInterval(to500CharCount);
                        metniCeviriyeHazirla();
                        metniCevir();
                    }

                    else if (clickedElementBROS.length == 0) { // Tıklanan Öğeden Sonraki KARDEŞ Sayısı "0" ise;
                        clearInterval(to500CharCount);
                        console.log("Kardeş Öğe YOK...");
                        metniCeviriyeHazirla();
                        metniCevir();

                    } else { // Tıklanan Öğeden Sonraki KARDEŞ Sayısı "0" değilse;

                        if (totalBROSCharCount > 300) {
                            clearInterval(to500CharCount);
                            console.log("Toplam Kardeş Karakter Sayısı: " + totalBROSCharCount + " oldu. Bu gıdaa yetee!..");
                            metniCeviriyeHazirla();
                            metniCevir();


                        } else {

                            if (clickedElementBROS.eq(i).text().length == 0) { // Kardeş Karakter Sayısı "0" ise ÇIK...
                                clearInterval(to500CharCount);

                                console.log((i+1) + ". Kardeş Karakter Sayısı: " + clickedElementBROS.eq(i).text().length);
                                console.log("Kardeş Karakter Sayısı '0', ÇIKIYORUZ...");

                                metniCeviriyeHazirla();
                                metniCevir();

                            } else {

                                console.log((i+1) + ". Kardeş: " + clickedElementBROS.eq(i).prop("tagName"));
                                console.log((i+1) + ". Kardeş Karakter Sayısı: " + clickedElementBROS.eq(i).text().length);
                                console.log((i+1) + ". Kardeş Metni----------------------\n" + clickedElementBROS.eq(i).text() + "\n-------------------------------------");

                                totalBROSCharCount += clickedElementBROS.eq(i).text().length;
                                console.log("TOPLAM KARDEŞ KARAKTER SAYISI: " + totalBROSCharCount + " / 300");

                                clickedElementBROS.eq(i).addClass("tikladigimizMetninKardesleri");
                                clickedElementBROS.eq(i).css('color','lime');
                            }

                        }
                    }
                    i++;

                }, 10);


                clickedElement.addClass("tikladigimizMetninKardesleri");
                clickedElement.css('color','lime');




                //████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████

                function metniCeviriyeHazirla() {

                    $(".tikladigimizMetninKardesleri").not('.cevrilmisMetin').each(function(index,eleman) {


                        function uniqueID() {
                            return Math.floor(Math.random() * Date.now());
                        }
                        // console.log(uniqueID());

                        var clickedElementID = "cevrilmisMetin-" + uniqueID();

                        // Seçili metnimize bir sınıf atayalım:
                        $(eleman).addClass("cevrilmisMetin").attr('id', clickedElementID);


                        var clickedElementCURRENT = $("*[id='" + clickedElementID + "']");
                        //console.log(clickedElementCURRENT.text());


                        // Metnimizi cümlelere ayıralım:
                        var str = $(eleman).text();
                        // console.log(str.replace(/([.?!])\s*(?=[a-z]|[A-Z])/g, "$1|").split("|"));


                        var clickedElementDizi = str.replace(/(?![A-Z]..?\.)(?![A-Z]?\.)(\b\S+[.?!:]["'’]?)\s/g, "$1|").split("|");
                        // var klonDizi = str.replace(/(?!Mrs?\.|Jr\.|Dr\.|Sr\.|Prof\.)(\b\S+[.?!]["']?)\s/g, "$1|").split("|");
                        // var klonDizi = str.replace(/([.?!])\s*(?=[a-z]|[A-Z])/g, "$1|").split("|");


                        var clickedElementDiziParcali;
                        // Cümleleri span a çevirip alt alta yazdıralım ve çeviri için klonlayalım:
                        clickedElementDizi.forEach(function (item) {
                            // do something with `item`
                            //console.log(item);
                            clickedElementDiziParcali += "<span class='clickedElementDiziCumle'>" + item + "</span></br>";
                        });

                        // ilk başta gelen "undefined" ı (9 karakter uzunluğunda) silelim:
                        clickedElementDiziParcali = clickedElementDiziParcali.slice(9);
                        //console.log(klonDiziParcali);

                        // Klon metnimizi <span> şeklinde cümlelere ayrılmış hali ile değiştirelim:
                        clickedElementCURRENT.html(clickedElementDiziParcali);


                        // AYRILMIŞ MEVCUT CÜMLEMİZ/CÜMLELERİMİZ:
                        var clickedElementCURRENT_CumleSPAN = clickedElementCURRENT.find("span.clickedElementDiziCumle");



                        clickedElementCURRENT_CumleSPAN.each(function () {
                            $(this).clone().addClass('clickedElementDiziCeviri').insertAfter($(this).next()); // Next yani <br> den sonraya atalım klonu
                        });



                        // AYRILMIŞ MEVCUT KLON/ÇEVRİLECEK CÜMLEMİZ/CÜMLELERİMİZ:
                        var clickedElementCURRENT_CeviriSPAN = clickedElementCURRENT.find("span.clickedElementDiziCeviri");

                        clickedElementCURRENT_CeviriSPAN.removeClass('clickedElementDiziCumle'); //.css('color','limegreen').css('display','inline-block').css('margin-top','10px');

                        // Çeviri cümlesinden/cümlelerinden sonra <br> ekleyelim:
                        $("</br>").insertAfter(clickedElementCURRENT_CeviriSPAN);



                        blink_text(clickedElementCURRENT_CumleSPAN);
                        //clickedElementCURRENT_CumleSPAN.animate({color: 'tomato'}, 1000);
                        clickedElementCURRENT_CumleSPAN.addClass('clickedElementDiziCumleClicked');
                        setTimeout(function () {
                            clickedElementCURRENT_CumleSPAN.removeClass('clickedElementDiziCumleClicked');
                        }, 400);

                        $(".cevrilmisMetin").removeClass('tikladigimizMetninKardesleri');


                    });

                }
                //████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████



                //████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████

                function metniCevir() {

                    // Nihayet çevirimizi Google Translate e yaptıralım:

                    var apikey = sessionStorage.getItem("gtAPIkey");

                    // Yukarıda tanımladığımız "jQuery Google Translate API 2.0 plugin" için parametrelerimizi tanımlayalım, API key imizi girelim:
                    $.translate = {
                        // key : 'Enter google translate API key here',
                        key: apikey,
                        source: 'en'
                    };


                    $.translate.onComplete = function () {

                        $("span.clickedElementDiziCeviri").addClass('clickedElementDiziCevrildi').removeClass('clickedElementDiziCeviri');

                        $("</br>").insertAfter($("span.clickedElementDiziCumle"));

                        // Son çeviri cümlesinden sonraki <br> yi silelim, yoksa ara çok açılıyor!
                        $("span.clickedElementDiziCevrildi").last().next('br').remove();

                        // Çevrilen ilk cümleyi önceki çevirilerden ayırmak için üstüne çizgi çekelim:
                        $("span.clickedElementDiziCumle").first().addClass('ilkCumleTranslated');
                        $("span.ilkCumleTranslated").css('border-top','3px solid #710000').css('padding-top','6px');


                        $("span.clickedElementDiziCumle").addClass('clickedElementDiziCumleTranslated').removeClass('clickedElementDiziCumle');


                        // clickedElementCURRENT_CumleSPAN.first().get(0).scrollIntoView({
                        //     behavior: 'instant',
                        //     block: 'center'
                        // });


                        // ELLLO.org gibi sitelerde içi boş (sadece tab ve boşluk var) çıkan span elemanlarını çeviriden sonra sildirelim:
                        // ---------------------------------------------------------------------------------------------------------------
                        var regex_ELLLO = new RegExp(/^\t*\s*$/);
                        $("span.clickedElementDiziCumleTranslated, span.clickedElementDiziCevrildi").each(function () {
                            if ( regex_ELLLO.test($(this).html())) {
                                console.log("span BOŞ");
                                $(this).prev("br").remove();
                                $(this).remove();
                            }
                        });
                        // ---------------------------------------------------------------------------------------------------------------

                        // quodb.com da altyazıların başındaki zaman bilgisini çeviriden sonra sildirelim:
                        // ---------------------------------------------------------------------------------------------------------------
                        $("span.clickedElementDiziCumleTranslated, span.clickedElementDiziCevrildi").html(function() {
                            return this.innerHTML.replace(/\d\d:\d\d:\d\d/, "");
                        });
                        $("span.clickedElementDiziCumleTranslated, span.clickedElementDiziCevrildi").css('font-weight','400');
                        // ---------------------------------------------------------------------------------------------------------------


                    }

                    $("span.clickedElementDiziCeviri").translate({
                        // source: 'de', // You can override source
                        target: 'tr',
                        progressIndicator: '' // You can override progressIndicator
                        // progressIndicator: '<span class="my-indicator"></span>' // You can override progressIndicator
                    });

                }
                //████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████


            } // ELSE - ÇEVİRİYE DEVAM

        }); // $("body").on("click", function (x) { - SON


        //████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████



    }); // $(document).ready - SON


    //████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████






    // JQuery e selectText() fonksiyonu ekliyoruz. Bu Parent text i seçmemize yarıyor...
    JQuery306.fn.selectText = function () {
        this.find('input').each(function () {
            if ($(this).prev().length == 0 || !$(this).prev().hasClass('p_copy')) {
                $('<p class="p_copy" style="position: absolute; z-index: -1;"></p>').insertBefore($(this));
            }
            $(this).prev().html($(this).val());
        });
        var doc = document;
        var element = this[0];
        var range;
        // console.log(this, element);
        if (doc.body.createTextRange) {
            range = document.body.createTextRange();
            range.moveToElementText(element);
            range.select();
        } else if (window.getSelection) {
            var selection = window.getSelection();
            range = document.createRange();
            range.selectNodeContents(element);
            selection.removeAllRanges();
            selection.addRange(range);
        }
    };

    /*
    function copyToClipboard(element) {
        var $temp = $("<input>");
        $("body").append($temp);
        $temp.val($(element).text()).select();
        document.execCommand("copy");
        $temp.remove();
    }
    */

    function blink_text(element) {
        $(element).fadeOut(200);
        $(element).fadeIn(200);
    }






    // code that needs 1.4.2 goes here
}(JQuery306));












//████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████


//----------------------------------------------
/*!
 * jQuery Google Translate API 2.0 plugin
 * https://github.com/michaeldewildt/jquery-translate
 * Copyright 2013 Michael De Wildt - MIT License
 */

(function ($, window, undefined) {
    //'use strict';

    $.translate = {};

    var properties = {
        MAX_SIZE: 1000,
        progressIndicator: $('<div class="translating">Translating</div>')
    };

    var methods = {
        push: function (text) {
            properties.textSize += text.length;
            if (properties.textSize > properties.MAX_SIZE) {
                properties.textCollectionIndex++;
                properties.textCollection[properties.textCollectionIndex] = [];
                properties.textSize = text.length;
            }

            properties.textCollection[properties.textCollectionIndex].push(encodeURIComponent(text));
        },
        collect: function ($element) {
            var $children = $element.children();

            if ($children.length > 0) {
                $children.each(function () {
                    methods.push($(this).text().trim());
                });
            } else if ($element.length > 0) {
                $element.each(function () {
                    methods.push($(this).text().trim());
                });
            } else {
                methods.push($element.text().trim());
            }
            return this;
        },
        done: function ($element) {
            var
            $children = $element.children(),
                text = [];

            for (var i = 0; i <= properties.translatedTextCollection.length; i++) {
                text = text.concat(properties.translatedTextCollection[i]);
            }

            if ($children.length > 0) {
                $children.each(function (i) {
                    $(this).html(text[i]);
                });
            } else if ($element.length > 0) {
                $element.each(function (i) {
                    $(this).html(text[i]);
                });
            } else {
                $element.html(text[0]);
            }

            return this
                .removeProgress($element)
                .onComplete();
        },
        parseResonse: function (index, response) {
            var translations = response.data.translations;

            properties.translatedTextCollection[index] = [];
            for (var i = 0; i < translations.length; i++) {
                properties.translatedTextCollection[index].push(translations[i].translatedText);
            }

            return this;
        },
        showProgress: function ($element) {
            properties.progressIndicator.insertBefore($element);

            return this;
        },
        removeProgress: function ($element) {
            $element.prev().remove();

            return this;
        },
        setDefaults: function () {
            if (typeof $.translate.progressIndicator !== 'undefined') {
                if (typeof $.translate.progressIndicator === 'object') {
                    properties.progressIndicator = $.translate.progressIndicator;
                } else {
                    properties.progressIndicator = $($.translate.progressIndicator);
                }
                delete $.translate.progressIndicator;
            }

            if (typeof $.translate.onComplete !== 'undefined') {
                methods.onComplete = $.translate.onComplete;
                delete $.translate.onComplete;
            }

            properties.translatedTextCollection = [];
            properties.textCollection = [
                []
            ];
            properties.textCollectionIndex = 0;
            properties.textSize = 0;

            return this;
        },
        onComplete: function () {}
    };

    $.fn.translate = function (options) {
        if (!this.length) {
            $.error("Element not found: '" + this.selector + "'");
        }

        $.translate = $.extend(options, $.translate);

        methods
            .setDefaults()
            .collect(this)
            .showProgress(this);

        var
        $this = this,
            requestPromises = [],
            ajaxRequest = (function () {
                var count = 0;
                return function () {
                    var index = count++;
                    return $.get(
                        'https://www.googleapis.com/language/translate/v2?q=' + properties.textCollection[index].join('&q='),
                        $.translate
                    ).done(function (res) {
                        methods.parseResonse(index, res);
                    }).fail(function (res) {
                        methods.removeProgress($this);
                        $.error(res.responseText);
                    });
                };
            })();

        for (var i in properties.textCollection) {
            requestPromises.push(ajaxRequest());
        }

        return $.when.apply($, requestPromises).then(function () {
            methods.done($this);
        });
    };

}(JQuery306, window));
//----------------------------------------------

//████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████



