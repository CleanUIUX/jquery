var ui = {
    init: function(){
        ui.common.bindEvents();
        ui.common.tabs.evt();
    },
    common: {
        bindEvents : function(){ 
            // 인풋 텍스트 입력 시 삭제버튼 생성
            $('.input_box').find('.btn_del').hide();
            $('.input_info').on('focus change keyup paste', function(e){
                if($(this).val() == ''){
                    $(e.target).parents('.input_box').find('.btn_del').hide();
                }else{
                    $(e.target).parents('.input_box').find('.btn_del').show();
                }
                // 글자수 제한
                const inputLength = $(this).val().length;
                if($(this).val().length > 12){
                    $(this).val($(this).val().substring(0, 13));

                    $('.input_btn').addClass("on");
                }
                // 하이픈 적용
                $(this).val($(this).val().replace(/[^0-9]/g, "").replace(/(^02|^0505|^1[0-9]{3}|^0[0-9]{2})([0-9]+)?([0-9]{4})$/,"$1-$2-$3").replace("--", "-") );
            });
            // 삭제 버튼 클릭 시 value 값 삭제 및 포커스
            $('.input_box .btn_del').on('click', function(e){
                e.preventDefault();

                const $inputDel = $(e.target).parents('.input_box').find('input');

                if(!$inputDel.prop('readonly')){
                    $inputDel.val('').focus();
                };
                $(this).hide();
            });       
        },
        //  tabs
        tabs: {
            evt : function(){
                
                // 클릭 시 스크롤 이동
                $(".main_tab li").on("click", function(event){
                    $('html, body').animate({
                        screenTop: $($.attr(this, 'href').offset().top)
                    }, 500);
                    return false;
                    
                    // console.log(this);
                })

                // var _this = this;
                // $(document).on('click', '.main_tab > li .bt', function(){
                //     var id = $(this).closest("li").data("btn-sid");
                //     _this.goto(id);
                // });
            }
            // goto: function(id){
            //     console.log(id);
            //     var test = $("[data-sid="+id+"]").offset().top;
            //     var navHt = $(".main_tab:visible").outerHeight() || 0;
                
            // }
        }
    }
}

$(function(){
    ui.init();
});



// 
 // a클릭시 부드럽게 이동
 $('a').click(function() {
    $('html, body').animate({
        scrollTop: $($.attr(this, 'href')).offset().top
    }, 500);
    return false;
});

// 퀵메뉴
$('.quick_menu li a').click(function() {
    // 버튼 hover 이벤트
    return false
    $(this).parent().addClass('on');
    $(this).parent().siblings().removeClass('on');
});
// target 위치 표시와, 이동  
var sections = $('.target'),
    nav = $('.quick_menu'),
    nav_height = nav.outerHeight();

$(window).on('scroll', function() {
    var cur_pos = $(this).scrollTop();

    sections.each(function() {
        var top = $(this).offset().top - nav_height,
            bottom = top + $(this).outerHeight();

        if (cur_pos >= top && cur_pos <= bottom) {
            nav.find('a').parent().removeClass('on');
            sections.removeClass('active');

            $(this).parent().addClass('on');
            nav.find('a[href="#' + $(this).attr('id') + '"]').parent().addClass('on');
        }
    });
});

nav.find('a').on('click', function() {
    var $el = $(this),
        id = $el.attr('href');

    $('html, body').animate({
        scrollTop: $(id).offset().top 
    }, 500);

    return false;
});


// 원하는 위치에서 스크롤 이벤트
$(window).on('scroll', function() {
    if ($(window).scrollTop() > 520) {
        $('.quick_menu').addClass("fixed");
    } else {
        $('.quick_menu').removeClass("fixed");
    }
})
// 