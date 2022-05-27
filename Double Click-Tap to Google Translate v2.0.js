// ==UserScript==
// @name         Double Click/Tap to Google Translate v2
// @namespace    http://tampermonkey.net/
// @version      2.20
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



$(document).ready(function () {




    //****************************************************

    // | tap | doubletap | press | drag | flick | (flick not working!)
    //     $('body').on('flick', '.clickedElementDiziCumle',function(e) {
    //         //console.log(this, e);
    //         //console.log($(this).text());

    //     });

    //****************************************************


    //████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████


    // Haber/makale içindeki resimlerin click olayını kaldırıp, çift tıklama ile resmi silme fonksiyonu tanımlayalım:
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
        $('body').on('drag', 'img, video',function(e) {
            console.log(this, e);
            if ('horizontal' == e.orientation) {
                if (-1 == e.direction) { // left
                    $(this).parents("div[id^='ArticleBody-InlineImage']").remove(); // CNBC
                    $(this).remove(); // Bunu sona koyalım
                }
                else { // right
                    //Galeri ise
                    $(this).parents("div[class^='gallery_carouselContainer']").remove(); // MSN

                }
            }
        });

        //****************************************************

    }, 1000);

    /*
    $("body").on("dblclick", "span.storyimage img.loaded", function (e) {
        $(this).parents('span.storyimage').remove();
        // $(this).remove();
    });
    */

    //████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████



    var is_Windows = navigator.platform.toLowerCase().indexOf("win32") > -1; // true. navigator.platform = "Win32"
    var is_Android = navigator.platform.toLowerCase().indexOf("linux") > -1; // true. navigator.platform = "Linux aarch64"


    // JQuery e selectText() fonksiyonu ekliyoruz. Bu Parent text i seçmemize yarıyor...
    jQuery.fn.selectText = function () {
        this.find('input').each(function () {
            if ($(this).prev().length == 0 || !$(this).prev().hasClass('p_copy')) {
                $('<p class="p_copy" style="position: absolute; z-index: -1;"></p>').insertBefore($(this));
            }
            $(this).prev().html($(this).val());
        });
        var doc = document;
        var element = this[0];
        // console.log(this, element);
        if (doc.body.createTextRange) {
            var range = document.body.createTextRange();
            range.moveToElementText(element);
            range.select();
        } else if (window.getSelection) {
            var selection = window.getSelection();
            var range = document.createRange();
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


    //████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████

    $("body").on("click", ".clickedElementDiziCumle", function () {

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




    //████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████

    // Bir kelimenin üstüne çift tıklayarak Parent ını seçelim. Kelimeden paragraf seçme gibi...
    $("body").on("click", function (x) {

        if ($(x.target).is(".clickedElementDiziCumle")
            || $(x.target).is(".clickedElementDiziCevrildi")
            || $(x.target).is(".sectigimizMetin")
            || $(x.target).children(".sectigimizMetin").length
            || $(x.target).is("a")
            || $(x.target).is("a span")) {
            // Do nothing, Bunları çevirme!..
            console.log("ÇEVRİLMEYECEK bir öğeye tıkladınız! ÇEVİRİ İPTAL.");
        } else {
            console.log("ÇEVRİLECEK bir öğeye tıkladınız, ÇEVİRİYE DEVAM...");


            /*
        if ($(this).hasClass("klonDiziCumleSPAN")) {
            $(this).off("dblclick");
            return;
        }
        */

            //********************************************************

            // If writing out .prop("tagName") is tedious, you can create a custom function like so:
            // jQuery.fn.tagName = function() {
            //   return this.prop("tagName");
            // };
            // Examples:
            // jQuery("<a>").tagName(); //==> "A"
            // jQuery("<h1>").tagName(); //==> "H1"

            var clickedElement = $(x.target);
            var clickedElementTagName = clickedElement.prop("tagName");
            console.log("Çift tıklanan öğe: " + clickedElementTagName);

            // Çift tıklanan öğe IMG ise ÇEVİRİ İPTAL:
            if (clickedElementTagName == "IMG") {
                return;
            }

            clickedElement.find('strong').contents().unwrap();

            //********************************************************

            // İlk olarak varsa önceki seçtiğimiz metni geri getirip, klonunu da silelim;

            // $(".sectigimizMetin").show();
            // $(".sectigimizMetin").removeClass('sectigimizMetin');
            // $(".klonladigimizMetin").remove();


            // Tıkladığımız Tag (p,h1,li vb.) metnini seçtirelim:
            //$(selectedElementParentNode).selectText();
            clickedElement.selectText();

            // console.log(clickedElement.text());
            console.log("Çift Tıklanan öğe karakter sayısı: " + clickedElement.text().length);

            // Panoya kopyalayıp; Android de Tasker ile Windows da Firefox >> ReadAloud ve ReadAloud.ahk ile okutalım:
            //document.execCommand("copy");



            setTimeout(function () {

                // Seçili karakter sayısı çok fazla ise yani yanlışlıkla body ye filan çift tıladı isek olayı sonlandır:
                var seciliMetinKarakterSayisi = clickedElement.text().length;
                if (seciliMetinKarakterSayisi > 1000) {
                    console.log("Seçili karakter sayısı 1000 den fazla!.. ÇEVİRİ İPTAL ...");
                    return;
                }


                function uniqueID() {
                    return Math.floor(Math.random() * Date.now());
                }
                console.log(uniqueID());

                var clickedElementID = "sectigimizMetin-" + uniqueID();

                // Seçili metnimize bir sınıf atayalım:
                clickedElement.addClass("sectigimizMetin").attr('id', clickedElementID);


                var clickedElementCURRENT = $("*[id='" + clickedElementID + "']");
                console.log(clickedElementCURRENT.text());



                // Klon metnimizi cümlelere ayıralım:
                var str = clickedElement.text();
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



                // throw new error;

                blink_text(clickedElementCURRENT_CumleSPAN);
                //clickedElementCURRENT_CumleSPAN.animate({color: 'tomato'}, 1000);
                clickedElementCURRENT_CumleSPAN.addClass('clickedElementDiziCumleClicked');
                setTimeout(function () {
                    clickedElementCURRENT_CumleSPAN.removeClass('clickedElementDiziCumleClicked');
                }, 400);






                //++++++++++++++++++++++++++++++++++++++++++++++++++
                // Nihayet çevirimizi Google Translate e yaptıralım:

                var apikey = sessionStorage.getItem("gtAPIkey");

                // Yukarıda tanımladığımız "jQuery Google Translate API 2.0 plugin" için parametrelerimizi tanımlayalım, API key imizi girelim:
                $.translate = {
                    // key : 'Enter google translate API key here',
                    key: apikey,
                    source: 'en'
                };



                $.translate.onComplete = function () {

                    // clickedElementCURRENT_CumleSPAN.first().get(0).scrollIntoView({
                    //     behavior: 'instant',
                    //     block: 'center'
                    // });

                    // Son çeviri cümlesinden sonraki <br> yi silelim, yoksa ara çok açılıyor!
                    clickedElementCURRENT_CeviriSPAN.last().next('br').remove();

                    $("</br>").insertAfter(clickedElementCURRENT_CumleSPAN);

                    clickedElementCURRENT_CeviriSPAN.addClass('clickedElementDiziCevrildi');



                }



                clickedElementCURRENT_CeviriSPAN.translate({
                    // source: 'de', // You can override source
                    target: 'tr',
                    progressIndicator: '' // You can override progressIndicator
                    // progressIndicator: '<span class="my-indicator"></span>' // You can override progressIndicator
                });




            }, 200);




            //         setTimeout(function () {

            //             if (clickedElementTagName == "LI") {
            //                 console.log("li ye tıkladınız #############################");

            //                 console.log(clickedElement.text());
            //                 console.log(clickedElement.siblings("li").translate());
            //                 // clickedElement.trigger('dblclick');
            //             }

            //         }, 2000);


        }

    });

    //████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████




    // Her 200ms de bir bağlantıları sadece metne dönüştür.
    //     var VarMisinYokMusun = setInterval(function () {

    //         if ($("footer").length) {
    //             clearInterval(VarMisinYokMusun);

    //             setTimeout(function () {

    //                 /*
    //                 //Medium.com da biraz temizlik yapalım:
    //                 $("section").parentsUntil("body").unwrap();
    //                 $("section").unwrap();
    //                 $("body > *").not("section").remove();
    //                 $("section.pw-more-medium-articles").remove();
    //                 */


    //                 /*
    //                 $("<input id='translateButton' value='Translate' type='button'>").insertAfter($("section")).css('position','fixed').css('right','30px').css('top','30px');
    //                 $("<div class='translate-me'>Hello world.</div>").insertBefore($("section"));

    //                 $( "#translateButton" ).on( "click", function() {
    //                     $('.translate-me').translate({ target : 'tr' });
    //                 });
    //                 */

    //             }, 500);

    //         }

    //     }, 200);



    //-----------------------------------------------------------------------
    // SAYFALARDA SİLİNECEK BÖLÜMLER:
    // Medium.COM:
    setTimeout(function () { // 200 ms beklemezsek kopyalamıyor!..
        $("p:contains('free member-only')").closest("div.l").css('background-color','red').remove();
        $("footer").siblings("div:has(button[aria-label='responses'])").css('background-color','red').remove();
        $("nav.ag").css('background-color','red').remove();
    }, 1000);

    // theidioms.com:
    document.removeEventListener('copy', addCopyrightInfo);
    //-----------------------------------------------------------------------





}); // $(document).ready - SON


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

}(jQuery, window));
//----------------------------------------------

//████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████



