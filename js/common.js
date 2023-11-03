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
            evt : function fnMove(seq){
                var offset = $('#div' + seq).offset();
                $('html, body').animate({scrollTop : offset.top}, 400);
                // 클릭 시 스크롤 이동
                // var _this = this;
                // $(document).on('click', '.main_tab > li .bt', function(){
                //     var id = $(this).closest("li").data("btn-sid");
                //     _this.goto(id);
                // });
            }
            // goto: function(id){
            //     var test = $("[data-sid="+id+"]").offset().top;
                
            // }
        }
    }
}

$(function(){
    ui.init();
});
