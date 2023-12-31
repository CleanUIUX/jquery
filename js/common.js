var ui = {
    init: function(){
        ui.common.bindEvents();
        // ui.common.tabs.evt();
    },
    common: {
        bindEvents : function(){ 
            // 인풋 텍스트 입력 시 삭제버튼 생성
            $('.input_box').find('.btn_del').hide();
            $('.input_info.phoneNumber').on('focus change keyup paste', function(e){
                if($(this).val() == ''){
                    $(e.target).parents('.input_box').find('.btn_del').hide();
                }else{
                    $(e.target).parents('.input_box').find('.btn_del').show();
                }
                // 글자수 제한
                const inputLength = $(this).val().length;
                console.log(this);
                if($(this).val().length > 12){
                    $(this).val($(this).val().substring(0, 13));

                    $('.input_btn').addClass("on");
                }else{
                    $('.input_btn').removeClass("on");
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
            
            // 클릭 시 info on
            $('.btn_search').on('click', function(){
                if($('.type2 > .input_wrap').hasClass("on")){
                    $('.type2 > .input_wrap').slideUp(500, function(){
                        $('.type2 > .input_wrap').removeClass("on");
                    })
                }else{
                    $('.type2 > .input_wrap').slideDown(500, function(){
                        $('.type2 > .input_wrap').addClass("on");
                    });
                };
            });
        }
    }
}

$(function(){
    ui.init();
});

$(document).ready(function(){
    $('.menu_list li').on("click", function(e){
        var $this = $(this);
        var $con = $('.sub_menu > ul > li');
        var $index = $this.index();
        var $total = 0;
        
        for(i = 0; i < $index; i++){
            $total += $con.eq(i).outerHeight(true);
        };

        var $offset = $con.eq($index).offset().top;

        if($index == 0){
            $('.sub_menu').stop().delay(100).animate({scrollTop:0}, 400);
        }
        else{
            $('.sub_menu').stop().delay(100).animate({scrollTop:$total+20}, 400);
        }
        e.preventDefault();
    });

    $('.sub_menu').on('scroll', function(){
        var $this = $(this);
        var $con = $this.find('> ul > li');
        var $nav = $('.menu_list li');
        var $subTop = $this.scrollTop();
        var $len = $con.length;

        for(i = 0; i < $len; i++){
            if($con.eq(i).offset().top){
                $nav.removeClass("on");
                $nav.eq(i).addClass("on");
            }
        }
    })
});
