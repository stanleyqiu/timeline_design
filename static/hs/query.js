(function initTimePicker()
    {
      $('#start_time_from').
        click( function(e) { $(this).off('click').AnyTime_picker().focus(); } ).
        keydown(
          function(e)
          {
            var key = e.keyCode || e.which;
            if ( ( key != 16 ) && ( key != 9 ) ) // shift, del, tab
            {
                $(this).off('keydown').AnyTime_picker().focus();
                e.preventDefault();
            }
          } );
      $('#start_time_to').
        click( function(e) { $(this).off('click').AnyTime_picker().focus(); } ).
        keydown(
          function(e)
          {
            var key = e.keyCode || e.which;
            if ( ( key != 16 ) && ( key != 9 ) ) // shift, del, tab
            {
                $(this).off('keydown').AnyTime_picker().focus();
                e.preventDefault();
            }
          } );
    })();
var PARAM_SPLIT = '~';
if(location.href.indexOf('app4')>0){
//	alert(location.href+":"+location.href.indexOf('app4'));
	var params = location.href.substr(location.href.indexOf('app4')+6);
	if(params!=""){
	    params = decodeURI(params);
	    var tmp = params.split(PARAM_SPLIT);
	    if(tmp[0]!="")
	        document.getElementById('id').value=tmp[0];
	    if(tmp[1]!="")document.getElementById('name').value=tmp[1];
	    if(tmp[2]!="")document.getElementById('status').value=tmp[2];
	    if(tmp[3]!="")//document.getElementById('start_time_from').value=tmp[3];
	        $('#start_time_from').AnyTime_picker().val(tmp[3]);
	    if(tmp[4]!="")//document.getElementById('start_time_to').value=tmp[4];
	        $('#start_time_to').AnyTime_picker().val(tmp[4]);
	    if(tmp[5]!="")document.getElementById('user_name').value=tmp[5];
	    if(tmp[6]!="")document.getElementById('queue').value=tmp[6];
	    if(tmp[7]!="")document.getElementById('cpu_cost_from').value=tmp[7];
	    if(tmp[8]!="")document.getElementById('cpu_cost_to').value=tmp[8];
	    if(tmp[9]!="")document.getElementById('memory_cost_from').value=tmp[9];
	    if(tmp[10]!="")document.getElementById('memory_cost_to').value=tmp[10];
	}
}


function query(){
    var id = document.getElementById('id').value;
    var name = document.getElementById('name').value;
    var status = document.getElementById('status').value;
    var start_time_from = document.getElementById('start_time_from').value;
    var start_time_to = document.getElementById('start_time_to').value;
    var user_name = document.getElementById('user_name').value;
    var queue = document.getElementById('queue').value;
    var cpu_cost_from = document.getElementById('cpu_cost_from').value;
    var cpu_cost_to = document.getElementById('cpu_cost_to').value;
    var memory_cost_from = document.getElementById('memory_cost_from').value;
    var memory_cost_to = document.getElementById('memory_cost_to').value;
    var queryParams = id+PARAM_SPLIT+name+PARAM_SPLIT+status+PARAM_SPLIT+start_time_from+PARAM_SPLIT
    					+start_time_to+PARAM_SPLIT+user_name+PARAM_SPLIT+queue+PARAM_SPLIT
    					+cpu_cost_from+PARAM_SPLIT+cpu_cost_to+PARAM_SPLIT+memory_cost_from+PARAM_SPLIT+memory_cost_to;
    var queryURL = location.href;
    if(queryURL.indexOf('app4')>0){ //根目录
        queryURL = queryURL.substr(0,queryURL.indexOf('app4')+5)+'/'+queryParams;
    }else{
        queryURL = queryURL.substr(0,queryURL.indexOf('hs')+2)+'/app4j/'+queryParams;
    }
    document.getElementById('btn_query').disabled=true;
//    alert(queryURL);
    location.href=queryURL;
}

document.onkeydown=function(event){ 
        e = event ? event :(window.event ? window.event : null); 
        if(e.keyCode==13){ 
            query();
        } 
    }
