
$(document).ready(function() {
  //users in an array
  var channelList = [
    "ESL_SC2",
    "OgamingSC2", 
    "cretetion",
    "Funn1k",
    "DreamLeague",
    "epicenter_en",
    "freecodecamp",
    "storbeck",
    "habathcx",
    "RobotCaleb",
    "noobs2ninjas",
    "zai",
    "Sing_sing",
    "Nightblue3",
    "CohhCarnage"
  ];
  
  channelList.forEach(function(e) {
    // getting the json url
    
    var url="https://wind-bow.glitch.me/twitch-api/streams/freecodecamp";
  //var channelList=["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
  $.getJSON(url,function(data1){
    if(data1.stream===null){
      $("#fcc").html("Status of" +"<a href='https://www.freecodecamp.org/'>"+" FreeCodeCamp"+"</a>"+" - OFFLINE !!");
    }
    else{
      $("#fcc").html("Status of" +"<a href='https://www.freecodecamp.org/'>"+" FreeCodeCamp"+"</a>"+" - ONLINE !!");
    }
  });
    function APICall(callType, channel) {
      return (
        "https://wind-bow.gomix.me/twitch-api/" +
        callType +
        "/" +
        channel +
        "?callback=?"
      );
    }

    // checking the channel connection
    $.getJSON(APICall("streams", e), function(data) {
      var connection = "";
      if (data.stream === null) {
        connection = "Offline";
      } else if (data.stream === undefined) {
        connection = "Account is inactive";
      } else {
        connection = data.stream.game;
      }

      $.getJSON(APICall("channels", e), function(data) {
        var allChannels = "",
          onlineChannels = "",
          offlineChannels = "",
          channelStatus = "";

        if (data.error === "Not Found") {
          allChannels =
            '<div class="well all"><h4>' +
            e +
            "</h4><p><span> This user does not exist!</span></p></div>";
        } else {
          var logo = data.logo;
          if(logo==null){
    logo="http://www.youngler.com/assets/images/brand_logos/nologo.png";
        }
          var channelName = data.display_name;

          if (data.status != null || data.status != undefined) {
            channelStatus = data.status;
          } else {
            channelStatus = "";
          }

          if (
            connection === "Offline" ||
            connection === "This account is inactive!"
          ) 
          {
            offlineChannels="<ul class='list-group'>"+"<li class='list-group-item'>" + "<img src='"+logo+"'class='icon text-center'>"+"<span class='text-center'>" + "<a href='https://go.twitch.tv/"+channelName+"'"+ "target='_blank''>"+"<p>"+channelName+"</p>"+"</a>"+"<span style='color:firebrick;' class='text-center'>"+"<b id='stat'>OFFLINE"+"</b>"+"</span>"+"</li>"+"</ul>";
          } 
          else 
            {
              onlineChannels="<ul class='list-group'>"+"<li class='list-group-item'>" + "<img src='"+logo+"'class='icon text-center'>"+"<span class='text-center'>" + "<a href='https://go.twitch.tv/"+channelName+"'"+ "target='_blank''>"+"<p>"+channelName+"</p>"+"</a>"+"<span style='color:green;' class='text-center'>"+"<b id='stat'>ONLINE"+"</b>"+"</span>"+"<br>"+"<br>"+"<span class='text-center' style='color:darkgrey'>"+"<b id='stat2'>Streaming - "+"<a href='https://go.twitch.tv/"+channelName+"'"+ "target='_blank'style='color:darkmagenta;'>"+connection+"</a>"+"</b>"+"</span>"+"</li>"+"</ul>";
          }
        }
       window.onload=function(){
         document.getElementById("#all").click();
       }
       // $("#result").append(allChannels+onlineChannels + offlineChannels);
         $("result").append(allChannels);
         $("#onlineresult").append(onlineChannels);
         $("#offlineresult").append(offlineChannels);
        
        $("#all").on("click",function(){
           $("#result").show();
           $("#onlineresult").show();
           $("#offlineresult").show();
           //$("#all").toggle();
        });
        
        $("#online").on("click",function(){
           $("#result").show();
           $("#onlineresult").show();
           $("#offlineresult").hide();
           //$("#online").toggle(); 
         });
        
        $("#offline").on("click",function(){
           $("#result").show();
           $("#onlineresult").hide();
           $("#offlineresult").show();
          // $("#offline").toggle();
          
        });
      });
       
    });
  });
  
});

$("#all").click(function(){
  $("#result").fadeIn("slow");
  
});

$("#online").click(function(){
  $("#result").fadeIn("slow");
  
});

$("#offline").click(function(){
  $("#result").fadeIn("slow");
  
});