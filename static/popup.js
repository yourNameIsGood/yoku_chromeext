chrome.tabs.query({'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT},
   function(tabs){
      var current_url = (tabs[0].url);
      var res = decodeId(current_url,"U");
      $(".this-result").html(res);

      // chrome.tabs.executeScript(tabs.id, {code: 'hh();', allFrames: true});

      $(".decode-btn").on("click",function(){
      	  var current_url = (tabs[0].url);
	      var input_url = $(".input-url").val();
	      var decode_url = input_url!=""?input_url:current_url;
	      var res = decodeId(decode_url,"U");
	      $(".result").html(res);

      });

      //测试数据：
      var list_data = [
      		{'list_name':'边看边买','num_id':'177428936',"encode_id":'XNzA5NzE1NzQ0'},
      		{'list_name':'(秋千)图文注释','num_id':'227047537',"encode_id":'XOTA4MTkwMTQ4'},
      		{'list_name':'打赏','num_id':'207232552',"encode_id":'XODI4OTMwMjA4'},
      		{'list_name':'投票','num_id':'207242262',"encode_id":'XODI4OTY5MDQ4'},
      ];

      var http = "http://linzhen.youku.com";
      var str = "";
      for(var i in list_data){
      	// console.log(list_data[i]);
      	var d = list_data[i];
	      	str+="<span class=\"list-name\">"+d.list_name+": </span>";
	      	str+="<span class=\"num-id\">"+d.num_id+"</span>";
	      	str+="<span class=\"encode-id\"> "+ d.encode_id+"</span><br>";
	      	str+="<a href=\""+http+"/v/timelineH5forAppCard?videoId="+d.encode_id+"\" target=\"_blank\">CARD</a> ";
                  str+="<a href=\""+http+"/v/timelineH5forAppV2?videoId="+d.encode_id+"&h5_type=2\" target=\"_blank\">V2</a> ";
	      	str+="<a href=\""+http+"/interact/app/get/timeLinePlugin?data={%22platform%22:10,%22platform_type%22:102,%22device%22:1,%22Sc%22:1,%22vid%22:%22"+d.encode_id+"%22,%22showId%22:0,%22card_width%22:320}&callback=jsonp1"+"\" target=\"_blank\">timelinePlugin接口</a><br>";
      }
      $(".video-list p").append(str);

   }
);