var busesArray = [];
var collegeID = "cbit";
var selectedBusId ="";
var selectedBusName ="";

$(document).ready(
    function(){
            loadAllBuses(collegeID);
    }
);


function loadAllBuses(){
    busesArray = [];
    let payloadData ={
        clgId : collegeID
    };

    $.ajax({
        type: "POST",
        url: "https://irg0ytx6yf.execute-api.ap-south-1.amazonaws.com/v1/getbuses",
        dataType: "json",
        data: JSON.stringify(payloadData),
        success: function(data){
            console.log("=====Success=====");
            console.log(data);
            busesArray = busesArray.concat(data.data); //the response has an array "data" containing the buses list
            console.log("==============");
            console.log(busesArray);
            fillTheBusesList(); 
        },
        error: function(err){
            console.log("=====Error=====");
            console.log(err);
        }
        
    });
    }



function fillTheBusesList(){
    
    $("#busesList").empty();

    for(bus in busesArray){
        let appender = "";
        
        let busId =  busesArray[bus].id;
        let busName = busesArray[bus].name;
        
        appender+= `
        <li class="list-group-item" >
            <div>
                <h5 style="margin:0;">${busId}</h5>
                <h3 style="margin:0; text-align:center">${busName}</h3>
            </div>
        </li>
        `;


        $("#busesList").append(appender);


        
    }

    /*adding the + button*/

    let plusButton =  `
    <li class="list-group-item" id="plusButtonLi" >
        <div id="plusButton">
            
            <h3 style="margin:0; text-align:center; color:blue;">+</h3>
        </div>
    </li>
    `;

    $("#busesList").append(plusButton);


    $("li").css({"cursor":"pointer"}); //making the cursor as HAND (pointer) for list items 
    $('ul li').hover(
        function(){$(this).find('h3').css('color','#f00');},
        function(){$(this).find('h3').css('color','#000');}
      );

    $('ul li').click(
        
        

        function(){

            if($(this).is(":last-child")){
                    return;
                }

            console.log($(this).find('h5').text());
            $("#busInfoId").text("Bus ID: " + $(this).find('h5').text());
            selectedBusId = $(this).find('h5').text();
            $("#busInfoName").text("Bus Name: " + $(this).find('h3').text());
            selectedBusName = $(this).find('h3').text();

        }
    );
    /*
        modal is displayed on clicking the last item i.e the virtual plus button
    */
    $('#plusButton').click(function(){
        $('#addBusModal').modal();
    });
    
}

//called when bus is tried to be added
function addBus(){

    $("#addBusModal .close").click(); //forcibly close the modal then perform the task

    let busName = ""+ $("#busNameInput").val();

    let payloadData ={
        clgId: collegeID, //GLOBAL COLLEGE ID
        name: busName
    };

    /*
        POST request with payload to add the bus
    */
    $.ajax({
        type: "POST",
        url: "https://irg0ytx6yf.execute-api.ap-south-1.amazonaws.com/v1/addbus",
        data: JSON.stringify(payloadData),
        dataType: "json",
        success: function(data){
            console.log("=====Success=====");
            console.log(data);
            loadAllBuses();
        },
        error: function(err){
            console.log("=====Error=====");
            console.log(err);
        }
        
      });

}


function editToRoute(){
    window.location = './test.html?direction=to&id='+selectedBusId+'&name='+selectedBusName;
    //window.location = './map.html?direction=to&id='+selectedBusId+'&name='+selectedBusName;

}


function editFroRoute(){
    window.location = './map.html?direction=fro&id='+selectedBusId+'&name='+selectedBusName;
}