$(document).ready(
    function(){
        //alert("Suck my balls");

            loadAll();
    }


    //
    
);


function loadAll(){
    
    var data ={
        clgId : "cbit"
};



$.ajax({
    type: "POST",
    url: "https://irg0ytx6yf.execute-api.ap-south-1.amazonaws.com/v1/getbuses",
    data: JSON.stringify(data),
    success: function(data){
        console.log("Success");
        console.log(data);
 

        fillTheBusesList(data.data);
    },
    error: function(err){
        console.log("Error");
        console.log(err);
    }
    ,
    dataType: "json"
  });
}



function fillTheBusesList(busesList){
    
    $("#busesList").empty();
    console.log(busesList);
    
    for(bus in busesList){
        let appender = "";
        
        let busId =  busesList[bus].id;
        let busName = busesList[bus].name;
        
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
    $("li").css({"cursor":"pointer"});

    $('#plusButton').click(function(){
        $('#addBusModal').modal();
    });
    
    
}


function addBus(){

    $("#addBusModal .close").click()
    
    

    let busName = ""+ $("#busNameInput").val();

    let data ={
        clgId: "cbit",
        name: busName
    };

    $.ajax({
        type: "POST",
        url: "https://irg0ytx6yf.execute-api.ap-south-1.amazonaws.com/v1/addbus",
        data: JSON.stringify(data),
        success: function(data){
            console.log("================SECOND API CALL=======");
            console.log(data);
            loadAll();
        },
        error: function(err){
            console.log(err);
        }
        ,
        dataType: "json"
      });

}