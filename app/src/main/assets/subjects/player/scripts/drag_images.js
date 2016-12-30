var myArray=new Array();
var right_trials=0;
var audioElement = document.createElement('audio');

$(function(){
    audioElement.setAttribute('src', 'sounds/activity.mp3');
    audioElement.play();
    for(var x=0; x<jsonData.length; x++){
        myArray[x]=x;
    }
    shuffle(myArray);
    
//    add content to desktop
    for(var x=0; x<jsonData.length; x++){
        $('.container').append('<div class="cont"><p class="animated zoomIn" style="animation-delay: 0.7s;">'+jsonData[myArray[x]].desc+'</p><img src="'+jsonData[x].image+'" alt="" class="animated zoomIn"><div class="animated zoomIn" style="animation-delay: 0.7s;">.</div></div>');
    }
    
    $('.cont p').css('cursor', 'move').draggable({
		revert: true,
		containment: $('.container'),
		start:  function(event, ui) {
			$(this).css('z-index','2');
		},
		stop :  function() {   
		}
	});
    
    $('.cont div').droppable({
		tolerance: 'pointer',
        accept: ".cont p",
		drop: function (event, ui) {        
            for(var x=0; x<jsonData.length; x++){                
                if(jsonData[x].image == $(this).parent().children('img').attr('src')){
                    if(jsonData[x].desc == $(ui.draggable).text()){                        
                        $(this).css('background','#1d445a')
                        $(this).html(jsonData[x].desc);
                        $(ui.draggable).remove();
                        right_trials++;
                        if(right_trials ==jsonData.length){                            
                            audioElement.setAttribute('src', '../../theme/sounds/correct_feedback.mp3');
                            audioElement.play();
                            $('#feedback').modal({
                                show: 'false'
                            });
                        }else{
                            audioElement.setAttribute('src', '../../theme/sounds/correct_answer.mp3');
                            audioElement.play();
                        }
                    }
                    else{
                        audioElement.setAttribute('src', '../../theme/sounds/scrape-and-drag1.mp3');
                        audioElement.play();
                    }
                }
            }
		}
	});
    
});

function shuffle(a) {
    var j, x, i;
    for (i = a.length; i; i--) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
    }
}