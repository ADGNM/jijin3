$(function(){
	var $windowH = $(window).height();
		if($windowH > 850){
			$('#T').css('margin-top',($windowH - 850) / 2 + 'px');	
		}
});
function writeImg($loadImg){
	var $loadImg = '';
		  for(var i = 0,l = $loadFile.length; i < l; i++){
			$loadImg += '<img src="'+ $loadFile[i] +'" width="1" height="1">';
		  }
	//写入
	$('body').append('<div style="height:0;overflow:hidden;">'+$loadImg+'</div>');	
}
function isIE(){
	if((navigator.userAgent.indexOf('MSIE') >= 0) && (navigator.userAgent.indexOf('Opera') < 0)){//IE下动画不流畅出的BUG
		return true;
	}else{
		return false;
	}
}