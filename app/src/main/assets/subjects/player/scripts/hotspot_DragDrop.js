var audioElement = document.createElement('audio');
var right_trials=0;

$(function(){
    audioElement.setAttribute('src', 'sounds/activity.mp3');
    audioElement.play();

    //append ites to screen
    $('.page_title').html(other_data[0].page_title);
    $('.drop_container').append('<img src="images/'+other_data[0].img_src+'">');
    $('.Drag_container').append('<p>'+other_data[0].title+'</p>');
    for(var x=0; x<jsonData.length; x++){
        $('.drop_container').append('<a id="'+jsonData[x].num+'" href="#" class="animated bounceIn drop_item drop'+x+'"></a>');
        $('#'+jsonData[x].num).css('top',jsonData[x].top+'px');
        $('#'+jsonData[x].num).css('left',jsonData[x].left+'px');
        $('.Drag_container').append('<a href="#" class="animated bounceIn Drag_item">'+jsonData[x].answer+'</a>');
    }
    
    $('.Drag_item').css('cursor', 'move').draggable({
		revert: true,
//		containment: $('body'),
		start:  function(event, ui) {
            $(this).css('z-index','2');
		},
		stop :  function() {   
		}
	});
    
    $('.drop_item').droppable({
		tolerance: 'pointer',
        accept: ".Drag_item",
		drop: function (event, ui) {
            for(var x=0; x<jsonData.length; x++){
                if($(this).attr('id') == jsonData[x].num){
                    if(jsonData[x].answer == $(ui.draggable).text()){
                        $(this).html(jsonData[x].answer);
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
                    }else{
                        audioElement.setAttribute('src', '../../theme/sounds/scrape-and-drag1.mp3');
                        audioElement.play();
                    }
                }
            }
		}
	});
});
