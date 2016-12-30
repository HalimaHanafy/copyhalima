var audioElement = document.createElement('audio');
var right_trials=0;
var myArray=[];
$(function() { 
    audioElement.setAttribute('src', 'sounds/activity.mp3');
    audioElement.play();
    
    $('.page_title').html(title.second_title);

    for(var x=0; x<data.length; x++){
        myArray[x]=x;
    }
    shuffle(myArray);
    
    for(var x=0; x<data.length; x++){
        var z=x+1;
        $('.draggable_container').append('<div class="draggable_item animated bounceIn">'+data[myArray[x]].answer+'</div>');
        $('section').append('<div style="animation-delay:0.'+z+'s" class="animated slideInRight col-md-12 col-sm-12 col-xs-12 quiz_content"><div class="col-md-3 col-sm-3 col-xs-3 droppable_container"><div class="droppable_item animated bounceIn"></div></div><div class="col-md-9 col-sm-9 col-xs-9 quiz_text">'+data[x].quiz+'</div></div>');
    } 
    
    var w=3;
    $('.draggable_item ').css('cursor', 'move').draggable({
		revert: true,
		containment: $('.container'),
		start:  function(event, ui) {
            w++;
			$(this).css('z-index',w);
		},
		stop :  function() {   
		}
	});
    
    $('.droppable_item').droppable({
		tolerance: 'pointer',
        accept: ".draggable_item",
		drop: function (event, ui) {
            for(var x=0; x<data.length; x++){
                if(data[x].quiz == $(this).parent().parent().children('.quiz_text').html()){
                    if(data[x].answer == $(ui.draggable).html()){
                        $(this).css('background','#4ab848');
                        $(this).css('color','white')
                        $(this).html(data[x].answer);
                        $(ui.draggable).remove();
                        right_trials++;
                        if(right_trials ==data.length){                            
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


function shuffle(a) {
    var j, x, i;
    for (i = a.length; i; i--) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
    }
}