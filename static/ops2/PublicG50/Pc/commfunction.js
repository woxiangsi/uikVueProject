/***
* vue调取视图
*/
function vueView(name) {
   // console.log(name);
	 return function (resolve, reject) {
		 require(['views/'+name], function (comp) {
			 resolve(comp)
		 })
	 }
} 
/***
* vue调取组件
*/
function vueComponent(name) {
   // console.log(name);
	 return function (resolve, reject) {
		 require(['components/'+name], function (comp) {
			 resolve(comp)
		 })
	 }
} 

//判断是否是手机端
function isMobile() {
    var sUserAgent = navigator.userAgent.toLowerCase();
    var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
    var bIsMidp = sUserAgent.match(/midp/i) == "midp";
    var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
    var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
    var bIsAndroid = sUserAgent.match(/android/i) == "android";
    var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
    var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
    if (!(bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) ){ //PC端
        return false;
    }
    return true;
}

// 初始化family-item-swiper
function swiperInit(k){
	var familySwiper;
	// 判断浏览器的宽度
    var slideLen;
    if($(window).width() < 1920){
        slideLen = 3
    }else{
        slideLen = 4
    }
    // 判断slide的个数
    // $(".family__swiper").each(function(){
    //     if($(window).width() < 1920){
    //         if($(this).find(".swiper-slide").length < 4){
    //             $(this).find(".swiper-button-prev").hide();
    //         }
    //     }else{
    //         if($(this).find(".swiper-slide").length < 5){
    //             $(this).find(".swiper-button-prev").hide();
    //         }
    //     }
    // })
                
	familySwiper = new Swiper ('.family__swiper'+k, {
		slidesPerView: slideLen,
		slideToClickedSlide: true
	});       
	$('.family__prev'+k).on('click', function(e){
		e.preventDefault();
		familySwiper.swipePrev();
		if(familySwiper.slides[0].isActive()){
			$(this).addClass("disabled");			
		}
		$(this).siblings(".family__next"+k).removeClass("disabled");
	})
	$('.family__next'+k).on('click', function(e){
		e.preventDefault();
		familySwiper.swipeNext();
		var _length = $(".family__swiper"+k).find(".swiper-slide").length;
		if(familySwiper.slides[_length-slideLen].isActive()){
			$(this).addClass("disabled");			
		}
		$(this).siblings(".family__prev"+k).removeClass("disabled");
	})
}

/*
**dialog 弹窗类名
**isShow 弹窗是显示还是隐藏
**isAnimate 弹框是否从左侧出来
*/
function dialog(dialog,isShow,isAnimate){
	if(!isShow){		
		if(isAnimate){
			$("."+dialog).animate({left:"0"},500);
		}else{
			$("#overlay, ."+dialog).fadeIn();
			$(".footer__list").addClass("active");
		}
	}else{
		if(isAnimate){
			$("."+dialog).animate({left:"-100%"},500);
		}else{
			$("#overlay, ."+dialog).fadeOut();
			$(".footer__list").removeClass("active");
		}
	}	
}
//数字加逗号
function parseFormatNum(number,n){
   if(n != 0 ){
       n = (n > 0 && n <= 20) ? n : 2; 
  }
    number = parseFloat((number + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";  
    var sub_val = number.split(".")[0].split("").reverse(); 
    var sub_xs = number.split(".")[1];  
   
    var show_html = "";  
    for (i = 0; i < sub_val.length; i++){  
        show_html += sub_val[i] + ((i + 1) % 3 == 0 && (i + 1) != sub_val.length ? "," : "");  
    }  
    
    if(n == 0 ){
        return show_html.split("").reverse().join("");  
    }else{
    return show_html.split("").reverse().join("") + "." + sub_xs;  
    }

}



/**确认配置页显示外饰*/
function showConfigurationCarExt(){
	$("#showConfigurationCarExtA").addClass("active")
	$("#showConfigurationPanoA").removeClass("active")
	D90App.showCarExt()
}
/**确认配置页显示外饰*/
function showConfigurationPano(){
	$("#showConfigurationCarExtA").removeClass("active")
	$("#showConfigurationPanoA").addClass("active")
	D90App.showPano()
}