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
                // 글자수 제한
                const inputLength = $(this).val().length;
                if($(this).val().length > 13){
                    $(this).val($(this).val().substring(0, 13));

                    $('.btn').addClass("on");
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
            
        }
    }
}

$(function(){
    ui.init();
});
