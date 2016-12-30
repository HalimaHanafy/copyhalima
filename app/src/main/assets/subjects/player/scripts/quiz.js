// fB ==> boolen to fix this ques has feedback or not
var options, questions, fB = false,
    currQ, report = false;
// function to get element by id  by pure js 
function _(a) {
    return document.getElementById(a);
}
// function to create element by pure js 
function cr(a) {
    return document.createElement(a);
}
//function for round digits
function round(a,b){
    var it=parseFloat(parseFloat(a).toFixed(b))
    if($.isNumeric(it)){return it}else{return "ليس له درجات"}
}
//// function to shuffle array ///
Array.prototype.shuffle = function () {
    var i = this.length,
        j, temp;
    while (--i > 0) {
        j = Math.floor(Math.random() * (i + 1));
        temp = this[j];
        this[j] = this[i];
        this[i] = temp;
    };
    return this;
}

function playTapAudio(pathWithOutExtention) {
    if (pathWithOutExtention != "") {
        audioTap = $('<audio id="audioDemo" controls preload="auto"><source src="../../theme/sounds/' + pathWithOutExtention + '.mp3" type="audio/mp3"><source src="../../theme/sounds/' + pathWithOutExtention + '.ogg" type="audio/ogg"></audio>')
        audioTap[0].play()
    }
}
// check for div has class correct or not
function checkCorrect(a) {
    if ($(a).hasClass('correct')) {
        if (fB) {
            $(_('correct_modal')).modal('toggle');
            playTapAudio('correct_answer')
        }
        return true
    } else {
        if (fB) {
            $(_('wrong_modal')).modal('toggle');
            playTapAudio('wrong_answer')
        }
        return false
    }
    inaccurate_modal
}
 var degree=function(a,d){
       var check={'true':d,'false':0}; return [check[a],a] 
    }
function init() {
    if (typeof jsonData !== 'undefined') {
        questions = jsonData.questions;
        options = jsonData.options;
        if (options.randomize) {
            questions.shuffle()
        };
        if (options.feedback) {
            fB = true
        };
        if (options.report) {
            report = true
        }
        loadQuizNav(questions.length)
        loadQuestions()
    }
}

function loadQuizNav(l) {
    if (report) {
        ++l
    }
    $('#quiz_pag').bootpag({
        total: l,
        maxVisible: 5,
        firstLastUse: true,
        first: '→',
        last: '←'
    }).on("page", function (event, /* page number here */ num) {
        $('.question.active,.report.active').removeClass('active')
        if (report && num == l) {
            $('.report').addClass('active')
            $('.que_head .title').html("التقرير ")
            loadReport();
        } else {
            loadQuestionNumber(num - 1)
        }
    });}
function loadQuestionNumber(number){
            $('.question').eq(number ).addClass('active')
            $('.que_head .title').html(questions[number ].header)
            $('.que_title').removeClass('titleScroll').html(questions[number ].body)
            if($('.question').eq(number ).hasClass('essay')){
                $('.question').eq(number ).children('textarea').focus();}
}
function loadQuestions() {
    $.each(questions, function (index, value) {
        var currentQue = $(cr('div'))
        currentQue.addClass('question').appendTo('.que_answers')
        questionsCalling[questions[index].type](index, currentQue)
    })
    if (report) {
        $(cr('div')).addClass('report').appendTo('.que_answers')
    }
     loadQuestionNumber(0)
}

function loadReport() {
    var html;$('.que_title').empty().addClass('titleScroll')
    $('.question').each(function (num, el) {
        if ($(this).attr('state') == 'none') {
            $(cr('div')).addClass('notAnswered').html(' لم يتم حل السؤال رقم  ' + parseInt(num + 1) + ' .').appendTo('.que_title')
        }
    })
    $(cr('div')).attr('id', 'reportBtn').addClass('check_btn dimmed').text('عرض التقرير').appendTo('.que_title')
   if($('.que_title').children('.notAnswered').length<1){
       $(cr('div')).addClass('notAnswered').html(' أحسنت لقد أتممت الإجابة علي جميع الأسئلة و يمكنك الان عرض تقرير الدرجات').prependTo('.que_title')
       // add score to report
       var total=0,score=0;
       $('.question').each(function (num, el) {
    $('#report_modal .report_body').append('<tr><td>'+parseInt(num+1)+'</td><td>'+queState($(el).attr('state'))+'</td><td>'+questionsCallingDegree[$(el).attr('type')](num)+'</td><td>'+round($(el).attr('score'),2)  +'</td></tr>') 
               
               if($(el).attr('type')!='essay'){
                   total+=parseInt(options.degrees[$(el).attr('type')]) 
                   score+=round($(el).attr('score'),2)}
               
        })
        $('#report_modal .total').html('<span>'+score+'</span>   /   <span>'+total+'</span>')
       $(_('reportBtn')).removeClass('dimmed').click(function(){
           $('#report_modal').modal('toggle')//parseInt($(el).attr('score')).toFixed(1)
       })
   }
}

function singleChoiceTxt(n, $place) {
    $($place).addClass('choiceTxt work').attr('state', 'none').attr('type','singleChoiceTxt');
    var html = new Array();
    html.push('<div class="correct">' + questions[n].co_answer + '</div>');
    for (var i = 0; i < questions[n].wro_answer.length; i++) {
        html.push('<div>' + questions[n].wro_answer[i] + '</div>');
    };
    $($place).html(html.shuffle()).children().click(function () {
        var stateDegree=degree(checkCorrect(this),options.degrees['singleChoiceTxt'])
        console.log(parseInt(stateDegree[0]))
        $(this).parent().attr('state',stateDegree[1] ).attr('score',parseFloat(stateDegree[0])).attr('st_answer', $(this).text()).attr('co_answer',questions[n].co_answer );
 $(this).addClass('selected').unbind('click').siblings().unbind('click').addClass('dimmed').parent().removeClass('work');
    })
}

function multiChoiceTxt(n, $place) {
    $($place).addClass('choiceTxt work').attr('state', 'none').attr('type','multiChoiceTxt');
    var html = new Array(),
        corLength = questions[n].co_answer.length;
    for (var i = 0; i < corLength; i++) {
        html.push('<div class="correct">' + questions[n].co_answer[i] + '</div>');
    };
    for (var i = 0; i < questions[n].wro_answer.length; i++) {
        html.push('<div>' + questions[n].wro_answer[i] + '</div>');
    };
    $($place).html(html.shuffle()).children().click(function () { //.addClass('checked')
        $(this).addClass('checked')
        if (!($(this).siblings('.checked').length < corLength - 1)) {
            var degree = $($place).children('.checked.correct').length * (parseInt(options.degrees['multiChoiceTxt']) / corLength);
            var tempState;
            if (degree == options.degrees['multiChoiceTxt'] || degree == 0) {
                tempState = checkCorrect(this)
            } else {
                if (fB) {
                    $(_('inaccurate_modal')).modal('toggle');
                    playTapAudio('wrong_answer')
                }
               tempState =false;
            }
            $($place).attr('state', tempState).attr('score', degree).children('.checked').removeClass('checked').addClass('selected');
            $(this).unbind('click').siblings().unbind('click').addClass('dimmed').parent().removeClass('work');
        }
    })
}

function trueFalse(n, $place) {
    $($place).addClass('trueFalse work').attr('state', 'none').attr('type','trueFalse');
    var html;
    if (questions[n].co_answer) {
        html = '<div class="correct" ><i class="fa fa-check"></i></div><div><i class="fa fa-times"></i></div>'
    } else {
        html = '<div ><i class="fa fa-check"></i></div><div class="correct"><i class="fa fa-times"></i></div>'
    }
    
    $($place).html(html).children().click(function () {
        var stateDegree=degree(checkCorrect(this),options.degrees['singleChoiceTxt'])
        $(this).parent().attr('state', stateDegree[1]).attr('score', parseFloat(stateDegree[0]));
        $(this).addClass('selected').unbind('click').siblings().unbind('click').addClass('dimmed').parent().removeClass('work');
    })
}

function essay(n, $place) {
    $($place).addClass('essay work').attr('state', 'none').attr('type','essay');;
    var html;
    html = '<textarea id="textarea' + n + '" rows="5" placeholder="أضف أجابتك هنا "></textarea><div id="answer_review' + n + '" class="check_btn dimmed"> تحقق من الإجابة</div>'
    $($place).html(html)
    $('#textarea' + n).on('change keyup paste', function () {
        if ($.trim($(this).val()) !== "") {
            $(this).unbind('change keyup paste')
            $('#answer_review' + n).removeClass('dimmed').click(function () {
                $(this).parent().attr('state','done');
                $('#text_modal .modal-title').html(questions[n].title)
                $('#text_modal .frame_text').html(questions[n].feedback)
                $('#text_modal').modal('toggle')
            })
        }
    })
}
var questionsCalling = {
    'singleChoiceTxt': function (a, b) {
        singleChoiceTxt(a, b)
    },
    'multiChoiceTxt': function (a, b) {
        multiChoiceTxt(a, b)
    },
    'trueFalse': function (a, b) {
        trueFalse(a, b)
    },
    'essay': function (a, b) {
        essay(a, b)
    }
};
 var questionsCallingDegree={
    'singleChoiceTxt': function (n) {
        return questions[n].co_answer
    },
    'multiChoiceTxt': function (n) {
         return questions[n].co_answer
    },
    'trueFalse': function (n) {
        var a={'true':'صح','false':'خطأ'}
         return a[questions[n].co_answer]
    },
    'essay': function (n) {
        return '----'
    } 
 }
 function queState(a){
     switch (a){
         case 'true':
             return 'صحيحة';
             break;
         case 'false':
             return 'خاطئة';
             break;
         default:
             return '----';
     }
 }
$(init());