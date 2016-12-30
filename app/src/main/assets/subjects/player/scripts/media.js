var slider_num=1;
function mediaWithDesc(item,desc){
   var a='';
    
    if($.trim(desc)!="" ){
       
        if($.trim(item.type)==""){
             a ='<div class=" custom_desc"><div class="col-xs-12"><div class="desc">'+desc+'</div></div></div>'
        }else{
            a ='<div class=" custom_media custom_desc"><div class="col-xs-5 col-sm-6 pull-right"><div class="desc">'+desc+'</div></div><div class="col-xs-7 col-sm-6 pull-left">'+mediaItem(item)+'</div><div class="clearfix"></div></div>' 
        }
    }else{
        a ='<div class=" custom_media"><div class="col-xs-12 col-sm-10 col-sm-offset-1 ">'+mediaItem(item)+'</div></div>'
    }
     return a
}
function mediaItem(item){
   var a="";
    if($.trim(item.type)=="img"){
        a='<img class="img-responsive center-block media_img" src="' + item.src+'" alt="You have error in src">'
    }else if($.trim(item.type)=="slider"){
        var liTemp,divTemp;
            liTemp='<li data-target="#mediaCarousel'+slider_num+'" data-slide-to="0" class="active"></li>'
            divTemp=' <div class="item active"> <img src="'+item.src[0]+'"  class="center-block img-responsive" alt="You have error in src"/> </div>'
        for (var i =1 ; i<item.src.length ;i++ ){
            liTemp+='<li data-target="#mediaCarousel'+slider_num+'" data-slide-to="'+i+'"  ></li>'
            divTemp+=' <div class="item "> <img src="'+item.src[i]+'"  class="center-block img-responsive" alt="You have error in src"> </div>'
        }
        a='<div id="mediaCarousel'+slider_num+'" class="carousel slide media_slider" data-ride="carousel" data-interval="false">  <!-- Indicators -->  <ol class="carousel-indicators">'+liTemp+' </ol><!-- Wrapper for slides -->  <div class="carousel-inner" role="listbox"> '+divTemp+'</div><!-- Left and right controls -->  <a class="no_bg_img left carousel-control" href="#mediaCarousel'+slider_num+'" role="button" data-slide="prev">    <span class="fa fa-chevron-left" aria-hidden="true"></span>    <span class="sr-only">Previous</span>  </a>  <a class="no_bg_img right carousel-control" href="#mediaCarousel'+slider_num+'" role="button" data-slide="next">    <span class="fa fa-chevron-right" aria-hidden="true"></span>    <span class="sr-only">Next</span>  </a></div>'
         slider_num++
    }else if($.trim(item.type)=="video"){
        var new_src=item.src.split(".")[0]
        a=' <video class="img-responsive center-block media_video" controls poster="data/' + new_src+'.png">   <source src="data/' + new_src+'.mp4" type="video/mp4">   <source src="data/' + new_src+'.ogg" type="video/ogg"> Your browser does not support the video tag. </video>'
    }else{
       a=""
    }
    return a
}