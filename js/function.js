//图片切换
function focusAutoImg(id){
	var idParent= id.parent();
	var new_num = idParent.attr('indexNewNum');
	var old_num = idParent.attr('indexOldNum');
	
	if(typeof(old_num) == 'undefined'){
		new_num = 0;
		old_num = 1;
	}

	id.eq(new_num).fadeIn('slow');
	id.eq(old_num).fadeOut('slow');	
	
	old_num = new_num;
	new_num++;
	
	if(new_num >= id.length) new_num = 0;
	
	idParent.attr('indexNewNum',new_num);
	idParent.attr('indexOldNum',old_num);
	
	setTimeout(function(){focusAutoImg(id)},3000);
}
function focusAutoImgBanner(){
	var $focusClear	=	0,
		$focusImg	=	$('.jFocusImg li');
		//添加按钮
		if($('.jFocusImg .btnWrap').html() == ''){
			for(var i = 1, len = $focusImg.length + 1 ; i < len; i++){
				$('.jFocusImg .btnWrap').append('<span />');
			}
		}
	var $focusbtn	=	$('.jFocusImg .btnWrap span'),
		$textShow	=	$('.jFocusImg .textShow'),
		$selected	=	'selected',
		$autoFocus	=	function($this,	$index){
			
			$textShow.find('h3').text($focusImg.eq($index).attr('rel-title'));
			$textShow.find('p').html($focusImg.eq($index).attr('rel-intro'));
			$focusImg.eq($index).fadeIn(400).addClass($selected).siblings('.'+$selected).fadeOut(400).removeClass($selected);
			$this.addClass($selected).siblings('.'+$selected).removeClass($selected);
		};			
		$focusbtn.live('click',function(){
			var $this	=	$(this),
				$index	=	$focusbtn.index($this);
				
				$autoFocus($this,$index);
				
				if ($focusClear != 0) clearInterval($focusClear);

				$focusClear = setInterval(function () {		
					$index += 1;
					$autoFocus($focusbtn.eq($index),$index);	
					if ($index+1 > $focusbtn.length - 1) $index = -1;		
				}, 4000);
				
		}).eq(0).trigger('click');	
}

//项目切换
function projectAuto(className){
	//切换项目
	var $stxh_project = $(className);
	var $prev		  = $stxh_project.find('.prev');
	var $next		  = $stxh_project.find('.next');
	var $prevNextNone = function(page, $mod){
				if(typeof(page) == 'undefined') page = 1;
				if(page >= $mod) $next.addClass('nextNone'); else $next.removeClass('nextNone');
				if(page <= 1) $prev.addClass('prevNone'); else $prev.removeClass('prevNone');
				
				//当前页码
				$stxh_project.attr('rel-indexNum',page);	
				
				//等到于1的时候设置总宽度
				if(page == 1) $stxh_project.find('ul').width($stxh_project.find('li').length * 354);
				//大于1时，执行动画
				if(page >= 1) $stxh_project.find('ul').stop(0,true).animate({left:- ((page - 1) * (354 * 3)) +'px'},'slow');						

				
		}
		$prevNextNone(1, Math.ceil($stxh_project.find('li').length / 3));
		
		//next
		$next.live('click',function(){
			var $this 		= $(this);
			var $indexNum	= parseInt($stxh_project.attr('rel-indexNum'));
			var $mod		= Math.ceil($stxh_project.find('li').length / 3);
			
				if($this.hasClass('nextNone') || $mod <= $indexNum) return false;				
				//
				$indexNum++;
				//
				$prevNextNone($indexNum, $mod);
				//
		});
		//prev
		$prev.live('click',function(){
			var $this 		= $(this);
			var $indexNum	= parseInt($stxh_project.attr('rel-indexNum'));
			var $mod		= Math.ceil($stxh_project.find('li').length / 3);
			
				if($this.hasClass('nextNone') || $indexNum < 0) return false;				
				//
				$indexNum--;
				//
				$prevNextNone($indexNum, $mod);
				//
		});
}