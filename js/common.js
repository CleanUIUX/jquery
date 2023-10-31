var ui = {
    init: function(){
        ui.common.bindEvents();
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
            });
            // 삭제 버튼 클릭 시 value 값 삭제 및 포커스
            $('.input_box .btn_del').on('click', function(e){
                e.preventDefault();

                const $input = $(e.target).parents('.input_box').find('input');
                
                if()
            })
        }
    }
}

$(function(){
    ui.init();
});
