$(document).ready(function () {

    function update()
    {
        chrome.storage.local.get("data",function(items)
        {
            if(items.data==undefined)
            {
                $(".blocked").append("No sites blocked till now!!");
            }
            else
            {
                for(var i=0;i<items.data.length;i++)
                {
                    $(".blocked").append("<li>"+items.data[i].sites+"</li>");
                    console.log(items);
                }
            }
        });
    }
    function perform(){
        var Url=document.forms["add_remove"]["Url"].value;
        var option=document.forms["add_remove"]["opt"].value;
        console.log(option);


            chrome.storage.local.get(function(items) {

                //object named items with array of objects data

                if(option==="Block") {
                    if (Object.keys(items).length > 0 && items.data) {
                        // The data array already exists, add to it the new server and nickname
                        items.data.push({sites: Url});
                    }
                    else {
                        // The data array doesn't exist yet, create it
                        items.data = [{sites: Url}];
                    }

                    // Now save the updated items using set
                    chrome.storage.local.set(items, function () {
                            console.log('Data successfully saved to the storage!');


                        }
                    );
                }
                else
                    if(option==="Remove")
                    {
                        if (Object.keys(items).length > 0 && items.data) {
                            // The data array already exists, add to it the new server and nickname
                            items.data=items.data.filter(function(obj)
                                {

                                    if(obj["sites"]===Url)
                                        return false;
                                    else
                                        return true;
                                }
                            );



                        }
                        else {
                            // The data array doesn't exist yet, create it
                            message("Oops! That URL was not found.")
                        }

                        // Now save the updated items using set
                        chrome.storage.local.set(items, function () {
                                console.log('Data successfully saved to the storage!');

                            }
                        );


                    }




            })

        update();
    }

        update();
        $("#form1").submit(perform);

    var bgPage=chrome.extension.getBackgroundPage();
    var flag=true;

    function getTime()
    {
        var time =parseFloat(document.forms["time_form"]["time"].value);
        chrome.alarms.create("myAlarm", {delayInMinutes: time});
        alert("Alarm created with " + time);
            var background = chrome.extension.getBackgroundPage();
            background.flag=true;
        bgPage.block();
        bgPage.createAlarm();
    }
    $("#form2").submit(getTime);




















});