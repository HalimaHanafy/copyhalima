var allData;
var audioTap

function playTapAudio(pathWithOutExtention) {
    if (pathWithOutExtention != "") {
        audioTap = $('<audio id="audioDemo" controls preload="auto"><source src="sounds/' + pathWithOutExtention + '.mp3" type="audio/mp3"><source src="sounds/' + pathWithOutExtention + '.ogg" type="audio/ogg"></audio>')
        audioTap[0].play()
    }

}
function narrationPlayer(){
    $('.narration').click(function () {
        $(this).toggleClass('play').children().toggleClass('fa-volume-up fa-volume-down')
        if ($(this).hasClass('play')) {
            audioTap[0].play()
        } else {
            if (typeof audioTap[0] != "undefined") audioTap[0].pause()
        }
    })
}
function notification(a,postion){
    $('<div class="noti_btn"><a><i class="fa fa-bell-o "></i></a><div calss="title" > <a class="close"><i class="fa fa-times-circle"></i></a><span>'+a+'</span></div><div class="clearfix"></div></div>').appendTo(postion)  
    $('.noti_btn .close').click(function(){
      $(this).parent().parent().fadeOut(200) 
    }) 
    
}
function _(a){  return document.createElement(a); }
function start() {

    if (typeof jsonData != "undefined") {
        allData = jsonData
        $('title').html(allData.name)
        if(typeof jsonData.title!='undefined'){
            $(_('h2')).addClass('page_title').text(allData.title).prependTo('body')
        }
        //$('.page_title').html(allData.title)
        $('.desc').html(allData.desc)
        
        if (typeof jsonData.notification != 'undefined') {
            notification(jsonData.notification ,'body' ) 
        }
        accordion(allData.terms)
        if(typeof jsonData.narration!="undefined" && jsonData.narration!=""){
           $('.narration').addClass('play i_block') 
       playTapAudio(jsonData.narration)
       audioTap.bind('ended',function(){
           $('.term:nth-child(1) .term_header').trigger('click')
            /*if(jsonData.terms[0].sub_narration != undefined && jsonData.terms[0].sub_narration !="" ){
                
                playTapAudio(jsonData.terms[0].sub_narration) }else{$('.narration').hide()}*/
        })
     }else{
         $('.term:nth-child(1) .term_header').trigger('click')
     }
    }

}

function accordion(terms) {
    $('.terms').empty();
    $.each(terms, function (index, value) {
            $('.terms').append('<div class="term"> <div class="term_header">                <div class="symbol text-center pull-right"><i class="fa fa-plus"></i></div>                <div class="term_title pull-left">' + value.title + '</div> <div class="clearfix"></div>     </div> <div class="term_body ">' + mediaWithDesc(value.media, value.desc) + '<a class="read play" title="كاتم الصوت"><i class="fa fa-volume-up"></i></a></div></div>')
        })
        //    console.log( $(':not(.open) .symbol'))
    $('.term_header').click(function () {

            //addclass open to this term
            if (!$(this).parent().hasClass('open')) {
                if (typeof terms[$(this).parent().index()].sub_narration != "undefined") {
                    if (typeof audioTap != "undefined") {
                        if (typeof audioTap[0] != "undefined") audioTap[0].pause()
                    }
                    $(this).parent().find('.read').addClass('play').children().removeClass('fa-volume-down').addClass('fa-volume-up ')
                    //console.log($(this).parent().find('.read').children().removeClass('fa-volume-down'))
                    playTapAudio(terms[$(this).parent().index()].sub_narration)
                }
                //change icon of this term
                $(this).children('.symbol').children('i').toggleClass('fa-plus fa-minus')
                 $('.term_header').not(this).children('.symbol ').children('i').addClass('fa-plus').removeClass('fa-minus') 
                  //add open class to this class and remove it form another terms
                $(this).next().slideDown(1000).parent().addClass('open').siblings().removeClass('open').children('.term_body').slideUp(1000) ;
                  //change icon of this term
                
            }

        })
        // add sound to all taps

    $('.term .read').click(function () {
        $(this).toggleClass('play').children().toggleClass('fa-volume-up fa-volume-down')
        var indexOfEl = $(this).parent().parent().index()
        if (typeof terms[indexOfEl].sub_narration != "undefined") {
            if ($(this).hasClass('play')) {
                audioTap[0].play()
            } else {
                if (typeof audioTap[0] != "undefined") audioTap[0].pause()
            }
        }

    })
    //$('.term:nth-child(1) .term_header').trigger('click')
}


$(start());