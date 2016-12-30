var alphabit ="الكل ا ب ت ث ج ح خ د ذ ر ز س ش ص ض ط ظ ع غ ف ق ك ل م ن هـ و ي";
var alphabit_arr = alphabit.split(" ");
var allData;
$(start());
function start() {
    if (jsonData != undefined) {
        allData = jsonData
        $('title').html(allData.name)
        $('.desc').html(allData.desc)
        $('.gloss_letters').empty()
        var avaliableLetterArr = []
        for (var i = 0; i < allData.terms.length; i++) {
            avaliableLetterArr.push($.trim(allData.terms[i].word).charAt(0))
        }
        $.each(alphabit_arr, function (index, letter) {
            if ($.inArray(letter, avaliableLetterArr) !== -1 || index == 0) {
                $('<span class="letter">' + letter + '</span>').appendTo('.gloss_letters')
            } else {
                $('<span class="letter  dimmed_letter">' + letter + '</span>').appendTo('.gloss_letters')
            }
        })
        $('<div class="clearfix"></div>').appendTo('.gloss_letters')
        $('.gloss_letters .letter:not(.dimmed_letter)').click(function () {
            $(this).addClass('active_letter').siblings().removeClass('active_letter')
            var currentLetter=$(this).text();
            $('.gloss_words ul,.tab-content.gloss_desc').empty()
                $.each(allData.terms, function (index, term) {
                if(currentLetter==$.trim(term.word).charAt(0)||currentLetter==alphabit_arr[0]){
                    $('<li class="word" ><a href="#menu'+index+'" data-toggle="tab">'+term.word+'</a></li>').appendTo('.gloss_words ul')
                    $('<div  id="menu'+index+'" class="tab-pane fade in ">'+mediaWithDesc(term.media,term.desc)+'</div>').appendTo('.tab-content.gloss_desc')
                    }
                })
            
              $('.gloss_words li:nth-child(1) a').trigger('click') 
              
            })
             $('.letter:not(.dimmed_letter):nth-child(1)').trigger('click')  
    }

}