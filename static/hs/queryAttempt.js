(function initTimePicker()
    {
      $('#time_from').
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
      $('#time_to').
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
var params = location.href.substr(location.href.indexOf('queryAttempts')+14);
if(params!=""){
    params = decodeURI(params);
    var tmp = params.split(PARAM_SPLIT);
    if(tmp[0]!="")
        document.getElementById('node').value=tmp[0];
    if(tmp[1]!="")//document.getElementById('start_time_from').value=tmp[3];
        $('#time_from').AnyTime_picker().val(tmp[1]);
    if(tmp[2]!="")//document.getElementById('start_time_to').value=tmp[4];
        $('#time_to').AnyTime_picker().val(tmp[2]);
}

function query(){
    var node = document.getElementById('node').value;
    var time_from = document.getElementById('time_from').value;
    var time_to = document.getElementById('time_to').value;
    if(time_from==""||time_to==""){
    	alert("运行时间为必填参数!");
    	return;
    }
    var queryParams = node+PARAM_SPLIT+time_from+PARAM_SPLIT+time_to;
    var queryURL = location.href;
    queryURL = queryURL.substr(0,queryURL.indexOf('queryAttempts')+13)+'/'+queryParams;
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
