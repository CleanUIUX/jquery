var ui = {
    init: function(){
        ui.common.bindEvents();
        ui.common.tabs.init();
        ui.common.popupFn.init();
        ui.layout.header.init();
        ui.layout.footer.init();
    },
    common:{
        bindEvents : function(){
            //인풋 텍스트입력시 삭제버튼 생성
            $('.inp_box').find('.btn_del').hide();
            $('.inp_base').on('focus change keyup paste', function(e) {
                if ($(this).val() == '') {
                    $(e.target).parents('.inp_box').find('.btn_del').hide();
                } else {
                    $(e.target).parents('.inp_box').find('.btn_del').show();
                }
            });
            //삭제버튼 클릭시 value값 삭제 및 포커스
            $('.inp_box .btn_del').on('click', function(e) {
                e.preventDefault();
             
                var $input = $(e.target).parents('.inp_box').find('input');
                 
                if (!$input.prop('readonly')) {
                    $input.val('').focus();
                }
                $(this).hide();
            });

            // 231004 카테고리 리스트 오픈
            $('.tab_type2 .btn_open').on('click',function(){
                var $this = $(this);
                var $closest = $this.closest('.tab_type2');
    
                if(!$closest.hasClass('active')){
                    $closest.addClass('active');
                    $this.text('카테고리 접기');
                } else{
                    $closest.removeClass('active');
                    $this.text('카테고리 펼치기');
                }
            });

            //탑버튼
            $(window).on('scroll',function(){
                var windowTop = $(window).scrollTop();
                if(windowTop > 500){
                    $('.fixed_area').children('.btn_top').addClass('on')
                }else{
                    $('.fixed_area').children('.btn_top').removeClass('on')
                }
            });

            $('.btn_top').on('click',function(){
                $('html,body').animate({
                    scrollTop : 0
                },500)
                return false;
            });

            // 도움이 돼요 버튼 클릭
            $('.btn_like').on('click',function(){
                var $this = $(this);
                if($this.hasClass('active')){
                    $this.removeClass('active');
                    $this.attr('aria-pressed','false');
                }else{
                    $this.addClass('active');
                    $this.attr('aria-pressed','true');
                }
            });

            // 개인정보 수집이용 동의
            $('.agree_box .btn_detail').on('click',function(){
                var $this = $(this);
                var $con = $this.closest('.agree_box');
                
                if($con.hasClass('active')){
                    $con.removeClass('active');
                }else{
                    $con.addClass('active');
                }
            });

        },
        tabs:{
            init: function(){
                //오뚜기SNS
                $('.tabs .btn_tab').on('click',function(e){
                    e.preventDefault();
                    var $tabListItem = $(this).closest('li');
                    var tabIndex = $tabListItem.index();
                    var $tabPanel = $(this).closest('.tab_panel');
                    var $tabContentsWrap = $tabPanel.siblings('.tab_cont_wrap');
                    var $tabContents = $tabContentsWrap.find('.tab_cont');
                    var $selectedTabContent = $tabContents.eq(tabIndex);
                    
                    $tabPanel.find('li').removeClass('active');
                    $tabContents.removeClass('active').removeAttr('title');

                    $tabListItem.addClass('active');
                    $selectedTabContent.addClass('active').attr('title', '열림');

                    $tabPanel.find('.btn_tab').removeAttr('title');
                    $(this).attr('title', '선택됨');
                });

                //tab_scroll swiper
                if($('.tab_scroll').length > 0){
                    tabSwiper = new Swiper(".tab_scroll .swiper-container", {
                        slidesPerView: "auto",
                        spaceBetween: 0,
                    });
                }
                //tab_scroll 버튼활성화
                $('.tab_scroll .btn').on('click',function(){
                    var $this = $(this);
                    var $li = $this.closest('li');
                    $this.closest('.tab_scroll').find('li').removeClass('active');
                    $li.addClass('active');
                });

                //tab_sticky 상단 고정
                $(window).on('scroll',function(){
                    if ($('.tab_sticky').length > 0) {
                        var $tabs = $('.tab_sticky .swiper-container');
                        var $containerOffsetTop = $('.tab_sticky').offset().top;
    
                        if ($(window).scrollTop() >= $containerOffsetTop) {
                            $tabs.addClass('fixed');
                        } else {
                            $tabs.removeClass('fixed');
                        }
                    }
                });
                //tab_sticky swiper
                if($('.tab_sticky').length > 0){
                    var $tg = $('.tab_sticky .tabs');
                    var $active = $('.tab_sticky').attr('data-active');

                    tabStickySwiper = new Swiper(".tab_sticky .swiper-container", {
                        slidesPerView: "auto",
                        spaceBetween: 0,
                        centeredSlidesBounds : true,
                    });
                    tabStickySwiper.slideTo($active -1, 0);

                    ui.common.tabs.tabSwiper();
                    $(window).resize(function(){
                        ui.common.tabs.tabSwiper();
                        tabStickySwiper.slideTo($active -1, 0);
                    })
                }
                //tab_sticky 버튼활성화
                if ($('.tab_sticky').length > 0) {
                    $('.tab_sticky .tab_link a').on('click', function (e) {
                        e.preventDefault();
                        var $this = $(this);
                        var $li = $this.closest('li');
                        var $tabContainer = $this.closest('.tab_sticky');
    
                        $tabContainer.find('li').removeClass('active');
                        $tabContainer.find('li a').removeAttr('title');
                        $li.addClass('active');
                        $li.find('a').attr('title', '선택됨');
                    });
                }
                // 231013 mobile일 때 tab_menu_wrap swiper 추가 [s]
                if($('.tab_menu_wrap').length > 0){
                    var $ww = $(window).outerWidth();
                    var menuSwiper = undefined;
                    function initMenuSwiper(){
                        if($ww <= 1023 && menuSwiper == undefined){
                            menuSwiper = new Swiper(".tab_menu_wrap .swiper-container",{
                                slidesPerView: 'auto',
                                spaceBetween: 5,
                                centeredSlidesBounds : true,
                                breakpoints: {
                                    // 1024 이상
                                    1024: {
                                        spaceBetween: 10,
                                    },
                                },
                            });
                        } else if($ww > 1023 && menuSwiper != undefined){
                            menuSwiper.destroy();
                            menuSwiper = undefined;
                        }
                    }
                    initMenuSwiper();

                    if(menuSwiper != undefined){
                        var $active = $('.tab_menu_wrap').attr('data-active');
                        menuSwiper.slideTo($active -1, 0);
                    }

                    ui.common.tabs.tabSwiper2();

                    $(window).on('resize', function () {
                        $ww = $(window).outerWidth();
                        initMenuSwiper();

                        if(menuSwiper != undefined){
                            var $active = $('.tab_menu_wrap').attr('data-active');
                            menuSwiper.slideTo($active -1, 0);
                        }
                        ui.common.tabs.tabSwiper2();
                    });
                }
                // 231013 mobile일 때 tab_menu_wrap swiper 추가 [e]
                // 231003 tab_menu_wrap 버튼 활성화 [s]
                if ($('.tab_menu_wrap').length > 0) {
                    $('.tab_menu_wrap .swiper-slide a').on('click', function (e) {
                        var $this = $(this);
                        var $li = $this.closest('li');
                        var $tabContainer = $this.closest('.tab_menu_wrap');

                        $tabContainer.find('li').removeClass('active');
                        $tabContainer.find('li a').removeAttr('title');
                        $li.addClass('active');
                        $li.find('a').attr('title', '선택됨');
                    });
                }
                // 231003 tab_menu_wrap 버튼 활성화 [e]
                // 231003 tab_img_wrap swiper 추가 [s]
                if($('.tab_img_wrap .swiper-container').length > 0) {
                    tabSliderSwiper = new Swiper(".tab_img_wrap .swiper-container", {
                        pagination: {
                            el: ".tab_img_wrap .swiper-pagination",
                            type: "fraction"
                        },
                        navigation: {
                            nextEl: '.tab_img_wrap .swiper-button-next',
                            prevEl: '.tab_img_wrap .swiper-button-prev',
                        },
                        a11y: {
                            prevSlideMessage: '이전 슬라이드',
                            nextSlideMessage: '다음 슬라이드',
                            slideLabelMessage: '총 {{slidesLength}}장의 슬라이드 중 {{index}}번 슬라이드 입니다.',
                            
                        },
                        autoplay:{
                            delay: 2000,
                            disableOnInteraction: false
                        },
                        speed: 800,
                        loop :true,
                        spaceBetween: 15,
                        slidesPerView: 1.17, // 231010 수정
                        observer: true,
                        observeParents: true,
                        breakpoints: {
                            // 1024 이상
                            1024: {
                                slidesPerView: 1,
                            },
                        },
                    });
                }
                // 231003 tab_img_wrap swiper 추가 [e]
                // 231003 tab_img_wrap 슬라이드 포커스되었을때 자동재생 정지 추가 [s]
                if ($('.tab_img_wrap .swiper-container').length > 0) { // 231004 .swiper-container 추가
                    function pauseAutoplay() {tabSliderSwiper.autoplay.stop();}
                    function resumeAutoplay() {tabSliderSwiper.autoplay.start();}
                    var slides = document.querySelectorAll('.tab_img_wrap .swiper-slide, .tab_img_wrap .swiper-slide .img_box');
                    var pauseButton = $('.tab_img_wrap .swiper-button-pause');
                    var playButton = $('.tab_img_wrap .swiper-button-play');
                    var isPausedByButton = false;

                    slides.forEach(function (slide) {
                        //탭 키로 슬라이드에 포커스되었을 때 이벤트 처리
                        slide.addEventListener('focus', function () {
                            if (!isPausedByButton) {
                                pauseAutoplay();
                            }
                        });

                        //포커스가 해제되면 다시 자동 재생 시작
                        slide.addEventListener('blur', function () {
                            if (!isPausedByButton) {
                                resumeAutoplay();
                            }
                        });
                    });

                    pauseButton.on('click', function () {
                        pauseAutoplay();
                        isPausedByButton = true;
                        pauseButton.hide();
                        playButton.show().focus();
                    });

                    playButton.on('click', function () {
                        resumeAutoplay();
                        isPausedByButton = false;
                        playButton.hide();
                        pauseButton.show().focus();
                    });
                }
                // 231003 tab_img_wrap 슬라이드 포커스되었을때 자동재생 정지 추가 [e]
            },
            tabSwiper : function(){
                var $tg = $('.tab_sticky .tabs');
                var $ww = $(window).innerWidth();
                var $li = $('.tab_sticky .tabs .tab_link');
                var $ttl = 0;
                $li.each(function(){
                    $ttl += $(this).outerWidth();
                });
                
                // 231017 #21 수정
                $tg.removeClass('unset')
                if($ww - $ttl <= 100 && $ww > 1023){ //pc case
                    $tg.addClass('unset')
                }else if($ww - $ttl <= 30 && $ww <= 1023){ //mobile case
                    $tg.addClass('unset')
                }
            },
            // 231003 tab_menu_wrap swiper 추가 [s]
            tabSwiper2 : function(){
                var $tg = $('.tab_menu_wrap .swiper-wrapper');
                var $ww = $(window).innerWidth();
                var $li = $('.tab_menu_wrap .swiper-slide');
                var $ttl = 0;
                $li.each(function(){
                    $ttl += $(this).outerWidth(true); 
                });

                $tg.addClass('center');
                // 231004 조건 수정 [s]
                // 231013 pc case 삭제 [s]
                if($ww - $ttl <= 40 && $ww <= 1023){ 
                    $tg.removeClass('center');
                } 
                // 231013 pc case 삭제 [e]
                // 231004 조건 수정 [e]
            }
            // 231003 tab_menu_wrap swiper 추가 [e]
        },
        popupFn : {
            init:function(){			
                $(document).on('click','.layer_wrap .dim',function(e){
                    var popid = $(this).closest('.layer_wrap').attr('id');
                    ui.common.popupFn.close(popid);

                    // 자주묻는질문 top10 팝업 닫기 클릭시
                    if(!$('.pop_faq_top10').is('visible')){
                        $('.faq_top10').find('.swiper-slide').removeClass('active');
                    }
                });

                //검색팝업
                $(window).resize(function(){
                    ui.common.popupFn.popSearch();
                })
            },
            open:function(tg){
                var target = $('#'+tg);
                $('body').addClass('layer_activated');
    
                if(!target.hasClass('bottom_layer')){
                    target.stop().fadeIn();
                }else{
                    target.stop().fadeIn();
                    setTimeout(function(){
                        target.addClass('active');
                    },100);
                }
                
                //팝업을 열면 해당 팝업으로 포커스
                target.attr('tabindex','0').focus();
                //팝업 내부초점이동
                ui.common.popupFn.a11y(target);
            },
            close:function(tg){
                var target = $('#'+tg);
                var button  = $('.'+tg)
                $('body').removeClass('layer_activated');
    
                if(!target.hasClass('bottom_layer')){
                    target.stop().hide();
                }else{
                    target.removeClass('active');
                    setTimeout(function(){
                        target.stop().fadeOut();
                    },300);
                }
    
                //팝업 닫으면 해당 팝업열었던 버튼으로 포커스
                button.focus();

                //자주묻는질문 top10 팝업 닫기 클릭시
                if(!$('.pop_faq_top10').is('visible')){
                    $('.faq_top10').find('.swiper-slide').removeClass('active');
                }
            },
            searchOpen:function(tg){
                var target = $('#'+tg);
                $('body').addClass('m_search');
                $('body').addClass('search_activated');
    
                if(!target.hasClass('bottom_layer')){
                    target.stop().fadeIn();
                }else{
                    target.stop().fadeIn();
                    setTimeout(function(){
                        target.addClass('active');
                    },100);
                }
                
                //팝업을 열면 해당 팝업으로 포커스
                target.attr('tabindex','0').focus();
                //팝업 내부초점이동
                ui.common.popupFn.a11y(target);
            },
            searchClose:function(tg){
                var target = $('#'+tg);
                var button  = $('.'+tg)
                $('body').removeClass('m_search');
                $('body').removeClass('search_activated');
    
                if(!target.hasClass('bottom_layer')){
                    target.stop().hide();
                }else{
                    target.removeClass('active');
                    setTimeout(function(){
                        target.stop().fadeOut();
                    },300);
                }
    
                //팝업 닫으면 해당 팝업열었던 버튼으로 포커스
                button.focus();
            },
            pcSearchOpen:function(tg){
                var target = $('#'+tg);
                $('body').addClass('pc_search');
                $('body').addClass('search_activated');
    
                if(!target.hasClass('bottom_layer')){
                    target.stop().fadeIn();
                }else{
                    target.stop().fadeIn();
                    setTimeout(function(){
                        target.addClass('active');
                    },100);
                }
                
                //팝업을 열면 해당 팝업으로 포커스
                target.attr('tabindex','0').focus();
                //팝업 내부초점이동
                ui.common.popupFn.a11y(target);
            },
            pcSearchClose:function(tg){
                var target = $('#'+tg);
                var button  = $('.'+tg)
                $('body').removeClass('pc_search');
                $('body').removeClass('search_activated');
    
                if(!target.hasClass('bottom_layer')){
                    target.stop().hide();
                }else{
                    target.removeClass('active');
                    setTimeout(function(){
                        target.stop().fadeOut();
                    },300);
                }
    
                //팝업 닫으면 해당 팝업열었던 버튼으로 포커스
                button.focus();
            },
            filterClose:function(tg, obj) {
                var target = $('#'+tg);
                var num = $(obj).parent().index();
                var text = $(obj).html();
                var btn = $('.btn_'+tg);
                var pc_list = btn.siblings('ul').find('li');
                ui.common.popupFn.close(tg);
                btn.attr('data-check',num);
                btn.text('');
                btn.append(text);
                $(obj).closest('ul').find('li').removeClass('active').find('li a').removeAttr('title');
                $(obj).closest('li').addClass('active').find('a').attr('title','선택됨');

                pc_list.removeClass('active').find('a').removeAttr('title');
                pc_list.eq(num).addClass('active').find('a').attr('title','선택됨');
            },
            faqOpen: function(tg, obj){
                var target = $('#'+tg);
                target.stop().fadeIn();
                $(obj).closest('.swiper-slide').addClass('active');

                var resizeAndScroll = function() {
                    var $ww = $(window).width();
                    var $this = $(obj).offset().top;
                    var $ht = $(obj).height();
                    var $faq = $(obj).closest('.faq_top10').find('.swiper-container').offset().top;
            
                    if ($ww > 1023) {
                        target.find('.pop_con').css('top', $this + $ht);
                        $('body').removeClass('layer_activated');
                    } else {
                        target.find('.pop_con').css('top', '80px');
                        if(target.is(':visible')){
                            $('body').addClass('layer_activated');
                        }
                    }
                };
            
                $(window).on('resize',resizeAndScroll);
                resizeAndScroll();
                //팝업을 열면 해당 팝업으로 포커스
                target.find('.pop_con').attr('tabindex','0').focus();
                //팝업 내부초점이동
                ui.common.popupFn.a11y(target);
            },
            a11y: function(tg){
                var target = tg;
                var $obj = target.find("button:visible, input:not([type='hidden']), select, textarea, [href], [tabindex]:not([tabindex='-1'])");
                var $objFirst = $obj.first();
                var $objLast = $obj.last();
    
                $objFirst.on("keydown", function(event) {
                    if (event.shiftKey && (event.keyCode || event.which) === 9) {
                        // Shift + Tab키 : 초점 받을 수 있는 첫번째 요소에서 마지막 요소로 초점 이동
                        event.preventDefault();
                        $objLast.focus();
                    }
                });

                $objLast.on("keydown", function(event) {
                    if (!event.shiftKey && (event.keyCode || event.which) === 9) {
                        // Tab키 : 초점 받을 수 있는 마지막 요소에서 첫번째 요소으로 초점 이동
                        event.preventDefault();
                        $objFirst.focus();
                    }
                });
            },
            popSearch:function(){
                var $ww = $(window).innerWidth();
                //mobile 검색 풀팝업 케이스
                if($('.mo_only').length){
                    if($('body').hasClass('m_search')){
                        if($ww > 1024){
                            $('body').removeClass('search_activated');
                        }else{
                            $('body').addClass('search_activated');
                        }
                    }
                }
                //pc 검색 레이어팝업 케이스
                if($('.pc_only').length){
                    if($('body').hasClass('pc_search')){
                        if($ww < 1024){
                            $('body').removeClass('search_activated');
                        }else{
                            $('body').addClass('search_activated');
                        }
                    }
                }
            }
        },
        toast : {
            show: function(target){
                var $toast = $('#' + target);
                if($toast.length){
                    $toast.fadeIn();
        
                    function timeout(){
                        setTimeout(function(){
                            $toast.fadeOut();
                        }, 2000);
                    }
                    timeout();
                }
            }
        },
        filter: function(tg, obj){
            var target = $('#'+tg);
            var num = $(obj).parent().index();
            var btn = $('.btn_'+tg);
            var mo_list = target.find('ul li');
            var text = mo_list.eq(num).find('.btn').html();
            btn.attr('data-check',num);
            btn.text('');
            btn.append(text);
           
            $(obj).closest('ul').find('li').removeClass('active');
            $(obj).closest('li').addClass('active');
            
            mo_list.removeClass('active');
            mo_list.eq(num).addClass('active');
        },
    },
    layout:{
        header:{
            init: function(){
                //헤더 마우스이벤트 설정
                var $ww = $(window).width();
                var timer;
                $('.header .navbar>.menu_item:not(.sitemap)>a').on('mouseenter',function(){
                    if($ww > 1023){
                        timer = setTimeout(function() {
                            $('.header').addClass('header_over');
                            $('.header .sub_menu').slideDown(200);
                        }, 200);
                    }
                });
        
                $('.header').on('mouseleave',function(){
                    if($ww > 1023){
                        $('.header').removeClass('header_over');
                        $('.header .sub_menu').hide(0);
                    }
                    clearTimeout(timer);
                });
        
                $(window).resize(function(){
                    var $ww = $(window).width();
                    var timer;
                    if($ww > 1023){
                        $('.header .navbar > .menu_item:not(.sitemap) > a').on('mouseenter', function(){
                            timer = setTimeout(function() {
                                $('.header').addClass('header_over');
                                $('.header .sub_menu').slideDown(200);
                            }, 200);
                        });
                
                        $('.header').on('mouseleave', function(){
                            $('.header').removeClass('header_over');
                            $('.sub_menu').hide(0);
                        });
                        clearTimeout(timer);
                    }else{
                        $('.header .navbar > .menu_item:not(.sitemap) > a').off('mouseenter');
                        $('.header').off('mouseleave');
                    }

                    //모바일헤더 1depth 메뉴 클릭시
                    $(document).on('click','.navbar.active>li.menu_item>a',function(){
                        if($('.header .sub_menu').css('display') === 'none'){
                            $('.header .sub_menu').removeAttr('style')
                        }
                    });
                });
        
                //포커스
                $('.header .navbar>.menu_item:not(.sitemap)').on('focusin',function(){
                    if($ww > 1023){
                        $('.header').addClass('header_over');
                        $('.header .sub_menu').slideDown(200);
                    }
                });
                $('.header .navbar>.menu_item:not(.sitemap)').last().find('.menu_item:last-child a').on('focusout',function(){
                    if($ww > 1023){
                        $('.header').removeClass('header_over');
                        $('.header .sub_menu').hide(0);
                    }
                });
                $('.header .navbar>.menu_item:first-child>a').on('keydown',function(e){
                    if(e.keyCode == "9" && e.shiftKey){
                        $('.header').removeClass('header_over');
                        $('.header .sub_menu').hide(0);
                    }
                });
        
                //언어선택
                $('.header .btn_lang').on('click',function(){
                    if($(this).hasClass('active')){
                        $(this).removeClass('active');
                        $(this).next('.lang_menu').stop().slideUp();
                        $(this).attr('aria-expanded','false');
                    }else{
                        $(this).addClass('active');
                        $(this).next('.lang_menu').stop().slideDown();
                        $(this).attr('aria-expanded','true');
                    }
        
                    $(document).on('mouseup',function(e){
                        if($('.header .lang').has(e.target).length === 0){
                            $('.header .btn_lang').removeClass('active');
                            $('.header .lang').find('.lang_menu').stop().slideUp();
                            $(this).attr('aria-expanded','false');
                        }
                    });
                });

                //언어선택 포커스
                $('.lang_menu').keydown(function(e){
                    if(e.keyCode == "9" && e.shiftKey){
                    }else{
                        $('.lang_menu a').last().focusout(function() {
                            $('.lang_menu').fadeOut();
                            $('.btn_lang').removeClass('active');
                        });
                    }
                });

                //모바일헤더 햄버거 클릭시 //231020 #163 수정
                $('.header .btn_dropdown').on('click',function(){
                    console.log(1);
                    $(window).scrollTop(0);
                    $(this).toggleClass('active');
                    $('.header .logo, .header .lang').show();
                    $('.header .btn_back').hide();
                    $('.header').removeClass('header_over');
                    $('body').toggleClass('layer_activated');
        
                    if($('.header').hasClass('bg_white')){
                        $('.header .navbar').removeClass('active');
                        $('.header .sub_menu').removeClass('active');
                        $('.header').removeClass('bg_white');
                        $(this).text('전체메뉴')
                    }else{
                        $('.header').addClass('bg_white');
                        $('.header .navbar').addClass('active');
                        $(this).text('닫기');
                    }
                })
        
                //모바일헤더 1depth 메뉴 클릭시
                $(document).on('click','.navbar.active>li.menu_item>a',function(){
                    $(this).removeAttr('href');
                    $(this).next('.sub_menu').toggleClass('active');
                    $('.header .logo, .header .lang').hide();
                    $('.header .btn_back').css('display','block');
                });
        
                //모바일헤더 2depth에서 뒤로가기 버튼 클릭시
                $(document).on('click','.header .btn_back',function(){
                    $('.header .sub_menu').removeClass('active');
                    $('.header .logo, .header .lang').show();
                    $(this).hide();
                });

                //모바일헤더 햄버거 클릭후 pc로 넘어갈때 (1depth,2depth 모두 고려)
                $(window).on('resize', function () {
                    var isWindowSize1024 = $(window).width() >= 1024;
                    var isSubMenuActive = $('.header .sub_menu').hasClass('active');
                    var isBtnDropdownActive = $('.header .btn_dropdown').hasClass('active');
                    var header = $('.header');

                    if(isWindowSize1024){
                        header.removeClass('bg_white');
                        if(isSubMenuActive){
                            $('.header .logo, .header .lang').show();
                            $('.header .btn_back').css('display', 'none');
                        }
                    }else{
                        if(isBtnDropdownActive){
                            header.addClass('bg_white');
                        }
                        if(isSubMenuActive){
                            $('.header .logo, .header .lang').hide();
                            $('.header .btn_back').css('display', 'block');
                        }
                    }
                });
            },
        },
        footer:{
            init: function(){
                //모바일푸터 아코디언
                $('.f_toggle .btn_acc').on('click',function(){
                    if($(this).hasClass('active')){
                        $(this).removeClass('active');
                        $(this).next('.f_link').slideUp();
                    }else{
                        $(this).addClass('active');
                        $(this).next('.f_link').slideDown();
                    }
                });
            },
        },
    },
}

$(function(){
    ui.init();
})






// sample2
        // [D] 221125 최근 메뉴 유동적으로 변경 --s
        function menuHeight(){
            var $userHeight = $('.all_menu_wrap .user_info').outerHeight();

            $('.all_menu_wrap .all_menu_area').css('top',$userHeight);
        }

        menuHeight();
        // [D] 221125 최근 메뉴 유동적으로 변경 --e
        
        // 전체메뉴
        $('.menu_list li').on('click',function(e){
            var $this = $(this);
            var $con = $('.sub_menu > ul > li')
            var $index = $this.index();
            var $total=0;

            for(i = 0; i < $index; i++){ 
                $total += $con.eq(i).outerHeight(true);
            }

            var $offset = $con.eq($index).offset().top - 246; // [D] 221020 수정
            
            if($index == 0){
                $('.sub_menu').stop().delay(100).animate({scrollTop:0}, 400);
            }else{
                $('.sub_menu').stop().delay(100).animate({scrollTop:$total+20}, 400);
            }                
        
            e.preventDefault();
        });

        $('.sub_menu').on('scroll',function(){

            var $this = $(this);
            var $con = $this.find('> ul > li')
            var $nav = $('.menu_list li');
            var $subTop = $this.scrollTop();
            var $len = $con.length;

            for(i = 0; i < $len; i++){ 
                if($con.eq(i).offset().top < 246){ // [D] 221020 수정
                    $nav.removeClass('active');
                    $nav.eq(i).addClass('active');
                }
            }     

        });

        function conHeight(){
            var $con = $('.sub_menu');
            var $wh = $(window).height();
            var $h = $wh - 300;            
            $con.css('padding-bottom',$h);
        }
        conHeight();

        $(window).resize(function(){
            conHeight();
        });
// 