var slide_src = [],
    curSlide = 1,
    lessonTitles = [],
    lessonCode,
    audioTap,
    allSounds=['Intro','Goals','Quiz','Dictionary','Summery'];
var currFileName =function() {
      var pageName=location.href.split("/").slice(-1)[0]
    return pageName.substring(0, pageName.length - 5);
}
function loadScript(path, callback) {
    var done = false;var scr = document.createElement('script');scr.onload = handleLoad;
    scr.onreadystatechange = handleReadyStateChange;scr.onerror = handleError;scr.src = path;
    document.body.appendChild(scr);
    function handleLoad() {if (!done) {done = true;callback(path, "ok");}}
    function handleReadyStateChange() {var state;if (!done) {state = scr.readyState;
            if (state === "complete") {handleLoad();}}}
    function handleError() {if (!done) {done = true;callback(path, "error");}}
    return scr;
}
// to check storage is found or not and retern if found
Storage.prototype.get = function (a, trueCallBack, falseCallBack) {
    if (typeof (Storage) != "undefined") {
        var data = localStorage.getItem(a);
        if (data) {
            trueCallBack(JSON.parse(data));
        } else {
            if (typeof falseCallBack === "function") {
                falseCallBack()
            }
        }
    } else {
        alert("Sorry, your browser does not support Web Storage...");
    }
}
function playSound(pathWithOutExtention) {
    
    if (pathWithOutExtention != "") {
        if(audioTap!=undefined){ if(audioTap[0]!=undefined  )audioTap[0].pause()}
        audioTap = $('<audio id="audioDemo" controls preload="auto"><source src="../theme/sounds/' + pathWithOutExtention + '.mp3" type="audio/mp3"><source src="../theme/sounds/' + pathWithOutExtention + '.ogg" type="audio/ogg"></audio>')
        audioTap[0].play()
    }
}

function verticalHeight(){
    var a=(parseInt($('body').height())-$('.screen').height())/2;
    if(a<0){a=0}
    $('.screen').css('margin-top',a+'px' )
}
    function init(){
        verticalHeight()
    //hide sub menu after start lesson
    setTimeout(function () {
            $('.menu_nav').removeClass('in').addClass('out') 
        }, 1200);
        // change in design for taps 
    if ($(this).width() < 992) {
        //        remove center class from silent icon 
        $('.reload_btn').removeClass('center_icon')
    }
    // menu control hide and show and resize to full screen 
    $(".submenu_control").click(function () {
            $('.menu_nav').toggleClass('out in ') 
             
        })
    //fullscreen 
$('.full_screen').click(function(){
    if(! $.fullscreen.isFullScreen()){
           $('body').fullscreen().css({'background-color':'#81745E'});
         verticalHeight()
         
       }else{
           
            verticalHeight()
           $.fullscreen.exit()
       }
    $(this).children().children().toggleClass('fa-expand fa-compress')
});
        // this code for resize window by tester for dont reload
    $(window).resize(function () {
            if ($(this).width() < 992) {
                $('.real_body').parent().removeClass('container ').addClass('container-fluid')
                
                $('.reload_btn').removeClass('center_icon')
            } else { 
                $('.reload_btn').addClass('center_icon')
            }
         verticalHeight()
        })
        //reload btn for reload page
    $('.reload_btn').click(function () {
            loadContent(slide_src[curSlide - 1])
        })
        // call data of lesson from json 
    if (typeof (lessonData) != 'undefined') {
        lessonCode = $.trim(lessonData.code_name)
        slide_src.push($.trim(lessonData.main.src))
        lessonTitles.push($.trim(lessonData.main.title))
        slide_src.push($.trim(lessonData.intro.src))
        lessonTitles.push($.trim(lessonData.intro.title))
        slide_src.push($.trim(lessonData.objective.src))
        lessonTitles.push($.trim(lessonData.objective.title))
            //to add all page from learning type
        $.each(lessonData.learning, function (index, value) {
            slide_src.push($.trim(value.src))
            lessonTitles.push($.trim(value.title))
        })
        slide_src.push($.trim(lessonData.quiz.src))
        lessonTitles.push($.trim(lessonData.quiz.title))
            //check glossary page is found or not
        if ($.trim(lessonData.glossary.src) !== "") {
            slide_src.push($.trim(lessonData.glossary.src));
            lessonTitles.push($.trim(lessonData.glossary.title))
        } else {
            $('#content_menu li.glossary').addClass('dimmed');
        }
        slide_src.push($.trim(lessonData.summary.src))
        lessonTitles.push($.trim(lessonData.summary.title))
    }

    //this two function to load title and the frist page 
    loadTitles()
    loadContent(slide_src[0])
        //to change pages numbering  of player for frist play
    $('.numbering .last').text(slide_src.length)
        //access next and previous BTN
    $('.next_nav').click(function () {

        if (curSlide < slide_src.length) {
            ++curSlide
            loadContent(slide_src[curSlide - 1])
        }

    })
    $('.prev_nav').click(function () {
            if (curSlide > 1) {
                --curSlide
                loadContent(slide_src[curSlide - 1])
            }

        })
        // lood search, help and note
    loadControls()
        //load left control activeMenu 
    $('#content_menu li').click(function () {
        if (!$(this).hasClass('dimmed')) {
            $('.menu_nav').toggleClass('out in ') 
            activeMenu($(this))
        }
    })
    
    }
//load lesson titles -li- to  ul 
function loadTitles() {
    $('.all_lessons').empty()
    $.each(lessonTitles, function (index, value) {
        $('<li><a href="#" title="' + value + '">' + value + '</a></li>').appendTo('.all_lessons').click(function () {
            curSlide = $(this).index() + 1
            loadContent(slide_src[curSlide - 1]);
        })
    })
    $('.all_lessons li').first().addClass('current')
}
// functionalty of  search  and note
function loadControls() {
    //delete teaxt and style with replay
    $('#note').click(function () {
        $('#note_modal #add_note').val('').attr('style', '');
    });
    //load functionalty of notes 
    loadNote()
        /*search sara start*/
    $('.search_btn').click(function () {
        $('.search_inbux').val('');
        $('.search_result ul').empty();
    });
    /*sara end*/

}
//load functionalty of sub menu -left menu -
function activeMenu($this) {
    var a = $this.index() + 1;
    $this.addClass('active').siblings().removeClass('active');
    if (a == 1) {
        curSlide = a;
        loadContent(slide_src[curSlide - 1]);
    } else if (a == 2) {
        curSlide = a + 2;
        loadContent(slide_src[curSlide - 1]);
    } else if (a == 3) {
        curSlide = slide_src.length - 2;
        if ($('#content_menu li.glossary').hasClass('dimmed')) {
            ++curSlide
        }
        loadContent(slide_src[curSlide - 1]);
    } else {
        curSlide = slide_src.length - (5 - a);
        loadContent(slide_src[curSlide - 1]);
    }
}
//load current page by src 
function loadContent(src) {
    if(curSlide==2||curSlide==3){playSound(allSounds[curSlide-2])}
    else if(curSlide > slide_src.length-3){ playSound(allSounds[allSounds.length - (slide_src.length -curSlide  )-1])}else{
        if(audioTap!=undefined){ if(audioTap[0]!=undefined  )audioTap[0].pause()}
    }
 
     
    var ex = checkExtension(src)
    if (ex == "img") {
        $('.content').html(' <img width="100%" height="100%" src="' + currFileName() + '/' + src + '" />')
    } else if (ex == "video") {
        var new_src = src.split(".")[0]
        $('.content').html(' <video width="100%" height="100%" controls poster="' + currFileName() + '/' + new_src + '.png">   <source src="' + currFileName() + '/' + new_src + '.mp4" type="video/mp4">   <source src="' + currFileName() + '/' + new_src + '.ogg" type="video/ogg"> Your browser does not support the video tag. </video>')
    } else if (ex == "html") {
        $('.content').html('<object data="' + currFileName() + '/' + src + '"></object>')
    }
    $('.numbering .current').text(curSlide)
        // make left menu active with navigate from footer
    var a = curSlide;
    if (curSlide == 1 || curSlide == 2 || curSlide == 3) {
        a = 1
    } else if (((curSlide == slide_src.length - 1) && ($('#content_menu li.glossary').hasClass('dimmed'))) || ((curSlide == slide_src.length - 2) && (!$('#content_menu li.glossary').hasClass('dimmed')))) {
        a = 3
    } else if (((curSlide == slide_src.length - 1) && (!$('#content_menu li.glossary').hasClass('dimmed')))) {
        a = 4
    } else if (curSlide == slide_src.length) {
        a = 5
    } else {
        a = 2
    }
    $('#content_menu li:nth-child(' + a + ')').addClass('active').siblings().removeClass('active')
        //end menu activation 
        //change title with current page and title of page 
    $('.all_lessons li').eq(curSlide - 1).addClass('current').siblings().removeClass('current')
    $('.lesson_name .curr_lesson').text($('.all_lessons li.current').text())
}
// function for check the type of any source 
function checkExtension(file) {
    var extension = file.substr((file.lastIndexOf('.') + 1));
    switch (extension) {
    case 'jpg':
    case 'png':
    case 'gif':
        return "img" // There's was a typo in the example where
        break; // the alert ended with pdf instead of gif.
    case 'mp4':
    case 'mp3':
    case 'ogg':
        return "video"
        break;
    case 'html':
        return "html"
        break;

    }
};
// the functionalty of notes 
function loadNote() {
    // for test 
    //    localStorage.clear(); 
    $('#note_modal .results').empty();
    //load all notes from local storage 
    getNotes()
        //when user write any thing access btn for adding or not 
    $('#add_note').on('input', function () {
        if ($.trim($(this).val()) != "") {
            $(this).next('#add_btn').removeClass('dimmed')
        } else {
            $(this).next('#add_btn').addClass('dimmed')
        }
    })
    $('#add_btn').click(function () {
        // check text area is empty
        if ($('#add_note').val() != "") {
            // if found notes adding text else create notes
            localStorage.get('notes', function (notesData) {
                    if (typeof (notesData[lessonCode]) == 'undefined') {
                        notesData[lessonCode] = []
                    }
                    notesData[lessonCode].push({
                        'page': curSlide,
                        'text': $('#add_note').val().replace(/\n/g, '<br/>')
                    })
                    localStorage.setItem("notes", JSON.stringify(notesData));
                    getNotes()
                }, function () {
                    var newNote = {};
                    newNote[lessonCode] = [{
                        'page': curSlide,
                        'text': $('#add_note').val().replace(/\n/g, '<br/>')
                }];
                    localStorage.setItem("notes", JSON.stringify(newNote));
                    getNotes()

                })
                //clear input after adding 
            $('#add_note').val("")
        }
    })
}

function getNotes() {
    // clear result of notes 
    $('#note_modal .results').empty();
    //get  the notes of this lesson 
    localStorage.get('notes', function (notesData) {
        if (typeof (notesData[lessonCode]) != 'undefined') {
            $.each(notesData[lessonCode], function (index, value) {
                $('<div class="item"><div class="desc" contenteditable="false">' + value.text + '</div><div class="options"  ><a title="حذف الملاحظة" class="delete_item"><i class="fa fa-trash-o "></i></a><a title="تعديل الملاحظة" class="edit_item"><i class="fa fa-pencil-square-o "></i></a></div><div class="clearfix"></div></div>').appendTo('#note_modal .results').find('.options .delete_item').click(function () {
                    //add delete btn for this note  and remove it from localstorage
                    var Sthis = $(this);
                    localStorage.get('notes', function (notesDataDelete) {
                        notesDataDelete[lessonCode].splice(parseInt(Sthis.parent().parent().index()), 1);
                        localStorage.setItem("notes", JSON.stringify(notesDataDelete));
                    });
                    $(this).parent().parent().remove()

                }).next('.edit_item').click(function () {
                    //add edit btn for this note  and save this editing to  localstorage
                    var Sthis = $(this)
                    $(this).parent().parent().toggleClass('save')
                    Sthis.children('i').toggleClass('fa-floppy-o fa-pencil-square-o ')
                        //chnge class when div editable
                    var stateEditable = Sthis.parent().parent().children('.desc')
                    if (stateEditable.attr('contenteditable') == 'true') {
                        stateEditable.attr('contenteditable', false);
                        localStorage.get('notes', function (notesDataEdit) {
                            notesDataEdit[lessonCode][parseInt(Sthis.parent().parent().index())].text = stateEditable.html();
                            //save editing to localstorage 
                            localStorage.setItem("notes", JSON.stringify(notesDataEdit));
                        })
                    } else {
                        stateEditable.attr('contenteditable', true)
                    }
                })
            })

        }
    })
}


 
$(function () {
    loadScript( currFileName() + '/lesson_key.json', function (a, b) {}).onload = function () {
        console.log("dd")
        init();
 //search sara script start
var learning_items = new Array(); //refers to lesson keyword if found or not at learning slides
var search_data; //refers to data typed in search box
var search_flag;

//search result when click on search icon
$('.search_button').click(function () {
    search_fun();    
});

//search result when click on enter button
$(".search_inbux").keydown(function (e) {
    if (e.keyCode == 13) {
        search_fun();
    }
});

function search_fun() {
    search_flag = 'False';
    $('.search_result ul').html('');
    if ($('.search_inbux').val() != '') {
        //First of all set all results as False
        for (var z = 0; z < lessonData.learning.length; z++) {
            learning_items[z] = 'False';
        }
        search_data = $('.search_inbux').val();
        for (var xx = 0; xx < lessonData.learning.length; xx++) {
            pp = lessonData.learning[xx].keywords;
            for (var x2 = 0; x2 < pp.length; x2++) {
                if (pp.substr(x2, search_data.length) == search_data) {
                    if (learning_items[xx] != 'True') {
                        learning_items[xx] = 'True';
                    }
                } else {
                    if (learning_items[xx] != 'True') {
                        learning_items[xx] = 'False';
                    }
                }
            }
        }

        //append items for search list at learning slides
        for (var xx = 0; xx < learning_items.length; xx++) {
            if (learning_items[xx] == 'True') {
                Add_List_Items(xx);
                search_flag = 'True';
            }
        }
        if (search_flag == 'False') {
            $('.search_result ul').append('<li class="not_fount">لا يوجد نتائج بحث</li>');
        }
    }
    $('.search_result ul .clickable_item').click(function () {
        curSlide = $(this).attr('id').substring(4, $(this).attr('id').length);
        curSlide = parseInt(curSlide) + 3;
        loadContent(slide_src[curSlide - 1])
    });
}

var pp;
var displayed_text;

function Add_List_Items(xx) {
    pp = lessonData.learning[xx].keywords;
    for (var x = 0; x < search_data.length; x++) {
        displayed_text = '';
        for (var x2 = 0; x2 < pp.length; x2++) {
            if (pp.substr(x2, search_data.length) == search_data) {
                displayed_text += '<span class="key_words">' + pp.substr(x2, search_data.length) + '</span>';
                x2 += search_data.length - 1;
            } else {
                displayed_text += pp.slice(x2, x2 + 1)
            }
        }
        pp = displayed_text;
        break;
    }

    //append list item to search result
    $('.search_result ul').append('<li id="item' + parseInt(xx + 1) + '" class="clickable_item">شريحة ' + parseInt(xx + 1) + ': ' + lessonData.learning[xx].title + '<br><span class="lesson_words">' + displayed_text + '</span></li>');
}
//search sara script end
        };
    
});