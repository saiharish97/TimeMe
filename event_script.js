/**
 * Created by priyankark on 27/12/16.
 */



 /* blocking code */

 var flag=true;
var d="";
 function createAlarm() {

  chrome.alarms.onAlarm.addListener(function (alarm) {
    flag=false;
    alert("Alarm beep!")

  });
}

function block()
{
  chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
       /* chrome.storage.local.get("data",function(items) {
            for(var i=0;i<items.data.length;i++)
            {

            }
        });
        */
        if(flag===true) {
          // alert(changeInfo.url); //Add blocking code here
          var arr=tab.url.split('.');
          if(arr[1]==="www"||arr[2]==="in")
            d=arr[2];
          else
            d=arr[1];
          //alert(d);
          /////////////////




  chrome.storage.local.get("data",function(items)
    {
     // alert("from local storage");
    // alert(sender.tab.id);
    if(items.data===undefined)
    {
       //alert("null");
    }
    else
    {
      for(var i=0;i<items.data.length;i++)
      {
        //alert(items.data[i].sites);
        // if(d.toUpperCase()===items.data[i].sites.toUpperCase())
        // {
        //   // alert(items.data[i].sites);

        //   // chrome.tabs.update(sender.tab.id, {
        //   //   active: true,
        //   //   url: "https://www.google.com/"
        //   // }, function(tab){});
        //   // window.location.href="https://www.google.com";
        //   alert(d.toUpperCase());
        // }
        //alert(d.toUpperCase());
        //alert(items.data[i].sites.toUpperCase());
        if(d.toUpperCase()==items.data[i].sites.toUpperCase())
        { 
            chrome.tabs.update(tabId, {
            active: true,
            url: "quote_generator.html"
          }, function(tab){});
        
          
        }
      }
    }
  });



          //////////////////////////



        }
        else
        {
         //alert("Now unblocking");
       }
     });

  chrome.tabs.onCreated.addListener(function(tab) {
    //alert(tab.url);
  });


}