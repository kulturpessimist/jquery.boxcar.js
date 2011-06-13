(function( $ ){

  	$.boxcar = function( options ) {
		// check if allready injected... and cleanup
		if( $('#__f__boxcar').length>0 ){
			$('#__i__boxcar').remove();
			$('#__f__boxcar').remove();
		}
		
		// generate form...
		var form = $('<form />')
		.attr('id', '__f__boxcar')
		.attr('method', 'post')
		.attr('target', '__i__boxcar')
		.css('display', 'none');
		
		// make the form elements for the request
		for(var k in options){
			if( ['email', 'secret', 'key', 'invite'].indexOf( k ) > -1 ){
				continue;
			}else{
				$('<input/>')
				.attr('type','hidden')
				.attr('name','notification['+k+']')
				.attr('value',options[k]).appendTo(form);			
			}			
		}		
		var url = 'http://boxcar.io/devices/providers/'+options.key+'/notifications';
		
		// check what method to use
		if(options.hasOwnProperty('email')){
			// notify
			$('<input/>')
			.attr('type','hidden')
			.attr('name','email')
			.attr('value',options.email).appendTo(form);
		}else if(options.hasOwnProperty('secret')){
			// broadcast
			url+='/broadcast';
			$('<input/>')
			.attr('type','hidden')
			.attr('name','secret')
			.attr('value',options.secret).appendTo(form);
		}else if(options.hasOwnProperty('invite')){
			// invite
			url+='/subscribe';
			$('<input/>')
			.attr('type','hidden')
			.attr('name','email')
			.attr('value',options.invite).appendTo(form);
		}else{
			// error
			$.error('wrong parameter count for boxcar.')
		}
		
		//inject iframe as target for the form
		$('<iframe />')
		.attr('id', '__i__boxcar')
		.attr('name', '__i__boxcar')
		.css('display', 'none')
		.appendTo('body');
		// set action of the form, append it and submit...
		form.attr('action', url)
		.appendTo('body')
		.submit();
	}

})( jQuery );