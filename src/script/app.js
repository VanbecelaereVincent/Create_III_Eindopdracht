'use strict';


console.log("d");

var query = "";

var holder = "";
var input= "";
var messages = "";
var chatwindow = "";
var help = "";
var form_box = "";

var body = "";
var citydata = "";
var datakeywords = ["--","weather", "wind", "windspeed", "humidity", "sunrise", "sunset", "warm", "temperature", "rain", "clouds", "hot", "cold", "freezing", "freeze", "snow", "fahrenheit", "kelvin", "time", "forecast", "date", "nice", "good", "bad", "ugly"];
var leestekens = [".", "?", "!", ","];

var state = 1;


var chosen_city;







//------------------ get weatherbycity ------------------

function getWeatherByCity(city, callback) {
    var xhttp = new XMLHttpRequest();
    var bool = 0;
    query = 'select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="' + city + '")';
    xhttp.onreadystatechange = function()
    {
        if (this.readyState == 4 && this.status == 200)
        {
            var data = JSON.parse(xhttp.responseText);
            if(data.query.results != null){
                bool +=1;
                console.log("test");

            }


            callback(bool);
        }



    };

    chosen_city = city;
    chosen_city = chosen_city.toUpperCase();
    xhttp.open('GET', 'http://query.yahooapis.com/v1/public/yql?q=' + query + '&format=json', true);
    xhttp.send();
    bool = 0;
    //callback(bool);

}



// ------------------ BOT ------------------


document.addEventListener('DOMContentLoaded', function() {

    input = document.querySelector('.input__text');
    holder = document.querySelector('.holder');
    messages = document.querySelector('.chatwindow');
    help = document.querySelector('.title__help');
    form_box = document.querySelector('.form_box');
    body = document.querySelector('body');
    console.log(body);






    checkstate(state);

    document.addEventListener('keypress', function( e ) {
        // is het enter?
        if (e.keyCode == 13){
            // functie oproepen die iets met inhoud doet: CheckInput()
            checkInput( input.value );
            // And to empty the input
            input.value = '';
        }
    });


    help.addEventListener('click', function (e) {
        form_box.style.display = 'flex';
        form_box.style.alignItems = 'center';
    });





});


function checkInput( input ) {


    if(state == 1) {


        getWeatherByCity(input, function (value) {
            console.log(value);
            // if(value==1) {
            //     console.log(value);
            //

            // }
            // else {
            //     createAndAddNewResponse("I don't know this city, try again.")
            // }
            if(value == 1) {
                writeInput(input);

                createAndAddNewResponse("Chosen city: " + chosen_city);
                console.log("value gevonden");

                console.log(state + " state");
                state += 1;
                checkstate(state);
                createAndAddNewResponse("Ask me anything. <br> Typing '--' will perform a reset and delete all messages.");
            }


            else {
                writeInput(input);


                createAndAddNewResponse("I don't know this city, try again.");

                console.log("value niet gevonden")
            }


        });



        // switch(ja_ik_heb_city_gevonden) {
        //     case 1:
        //         getWeatherByCity(input, function(value) {console.log(value)});
        //         console.log(state + " state");
        //         state += 1;
        //         checkstate(state);
        //         createAndAddNewResponse("Ask my anything. <br> Typing '--' will perform a reset and delete all messages");
        //         break;
        //
        //     case 0:
        //         createAndAddNewResponse("I don't know this city, try again.");
        //         console.log("nope");
        //         break;

        // }



    }

    else if(state > 1) {


        checkForData(input, datakeywords);
        checkstate(state);
            // var text = checkForData(input, citydata, datakeywords);

        }

        // else if (input == '--'){
        //
        // }



    // if (input == 'hi'){
    //     createAndAddNewResponse('Hello')
    //  }

    // else if(checkForCity(input) != "") {
    //     var citydata = checkForCity(input);
    //     if(checkForData(input, citydata, datakeywords) != "") {
    //         var text = checkForData(input, citydata, datakeywords);
    //     }
    //     createAndAddNewResponse(text);
    //
    // }
    //
    // // else if (checkForKeyWords(input, jokeKeywords)) {
    // //     createAndAddNewResponse([
    // //         'Yo mama so stupid She watched an orange to get a consentrate.',
    // //         'Yo mama so fat when i pictured her in my head, she broke my f*cking neck',
    // //         'Yo mama so fat from the 5 fattest people i know, she\'s 3 of them',
    // //         'Yo mama so old when they told her to act her age, she died.',
    // //         'Yo mama so old her first christmas, was the first christmas',
    // //         'Yo mama so old she has a friendship bracelet from jesus',
    // //         'Yo mama so fat she left the house in high heels and when she came back she had on flip flops.',
    // //         'Yo mama so fat she sat on an iPhone and turned it into an iPad',
    // //         'Yo mama so fat she went to KFC to get a bucket of chicken they asked her what size and she said the one on the roof',
    // //         'Yo mama so fat she sued xbox 360 for guessing her weight',
    // //         'yo mama so fat that she dont need the internet she\'s already world wide',
    // //         'Yo mama so fat that I ran out of gas trying to drive around her.',
    // //         'yo mama so fat that she gave draclua diabeties'])
    // // }
    // //
    // // else if (checkForKeyWords(input, glennKeywords)) {
    // //     createAndAddNewResponse('Sexy as hell!!!')
    // // }
    // // else if (checkForKeyWords(input, timeKeyWords)){
    // //     var d = new Date();
    // //     createAndAddNewResponse('Right now it is ' + d.getHours() + 'h, ' + d.getMinutes() + 'm ' + d.getSeconds() + 's!')
    // // }
    // // else if (checkForKeyWords(input, dateKeywords)){
    // //     var date = new Date();
    // //     createAndAddNewResponse('Today is ' + days[date.getDay()-1] + '-' + date.getDate() + '-' + months[date.getMonth()] + '-' + date.getFullYear())
    // // }
    // // else if (checkForKeyWords(input, whatIsKeywords)) {
    // //     createAndAddNewResponse('Just ask google')
    // // }
    // // else if (input == "anything else"){
    // //     createAndAddNewResponse('Clever one!')
    // // }
    // else {
    //     createAndAddNewResponse('Sorry')
    // }
}


function checkcondition(data) {
    if(data.toLowerCase().indexOf("cloudy")>=0) {
        body.style.background = 'url("images/clouds.jpg")';
        body.style.backgroundSize = "cover";
        body.style.backgroundPosition = "center";
        body.style.backgroundAttachment = "fixed";

    }

    else if(data.toLowerCase().indexOf("snow" )>=0) {
        body.style.background = 'url("images/snow.jpg")';
        body.style.backgroundSize = "cover";
        body.style.backgroundPosition = "center";
        body.style.backgroundAttachment = "fixed";

    }

    else if(data.toLowerCase().indexOf("showers" )>=0 || data.toLowerCase().indexOf("rain" )>=0) {
        body.style.background = 'url("images/rain.jpg")';
        body.style.backgroundSize = "cover";
        body.style.backgroundPosition = "center";
        body.style.backgroundAttachment = "fixed";


    }

    else if(data.toLowerCase().indexOf("sunny" )>=0) {
        body.style.background = 'url("images/sunny.jpg")';
        body.style.backgroundSize = "cover";
        body.style.backgroundPosition = "center";
        body.style.backgroundAttachment = "fixed";


    }
}


function deletePunctationMarks(input) {
    if(input[input.length-1] == "!" || input[input.length-1] == "." || input[input.length-1] == "?" ) {
       input = input.slice(0,-1);

    }

    input = input.toLowerCase();

    return input


}



function check_is_keywords(input) {
    input =  deletePunctationMarks(input);
    var inputarray = input.split(' ');

    if(inputarray[0] == "is" || inputarray[0] == "do") {
        return true
    }

    else {
        return false
    }

}

function check_what_keywords(input) {
    input =  deletePunctationMarks(input);
    var inputarray = input.split(' ');
    if(inputarray[0] == "how" || inputarray[0] == "how's" || inputarray[0] == "what's" || inputarray[0] == "whats" || (inputarray[0] == "what" && inputarray[1] == "is")|| (inputarray[0] == "could" && inputarray[1]=="you") || (inputarray[0] == "would" && inputarray[1]=="you")) {
        return true
    }
    else {
        return false
    }
}

function checkForData(input, arrayToCheck) {
    writeInput(input);
    input =  deletePunctationMarks(input);
    var input_found = 1;
    var inputarray = input.split(' ');
    var xhttp = new XMLHttpRequest();
    query = 'select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="' + chosen_city + '") and u="c"';
    console.log(query);
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var data = JSON.parse(xhttp.responseText).query.results.channel;
             console.log(data);
             console.log(data.item.condition.temp);
             checkcondition(data.item.condition.text);
            for (var i = 0; i < inputarray.length; i++) {



                if (~arrayToCheck.indexOf(inputarray[i])) {

                    input_found +=1 ;

                    switch(inputarray[i]) {


                        case "weather":

                            // ook nog kijken voor bv "will the weather be nice today?", "what weather can I expect?"

                            if(check_is_keywords(input)) {
                                for (var x = 0; x < inputarray.length; x++) {
                                                if (~arrayToCheck.indexOf(inputarray[x])) {
                                                    console.log(inputarray[x]);
                                                    console.log("test");
                                                    switch(inputarray[x]) {
                                                        case "good":
                                                        case "hot":
                                                        case "nice":
                                                            console.log(data.item.condition.temp);
                                                            if(data.item.condition.temp > 20){
                                                                // hier nog extra if's over data.item.condition.temp
                                                                createAndAddNewResponse("Yes, indeed,  we have good weather! :) ");
                                                            }

                                                            else {
                                                                createAndAddNewResponse("Nope, the weather is not all that good. :'(");
                                                            }
                                                            break;


                                                        case "bad":
                                                        case "ugly":

                                                            if(data.item.condition.temp < 20){
                                                                // hier nog extra if's over data.item.condition.temp
                                                                createAndAddNewResponse("Yes, indeed, today we have bad weather! :( ");

                                                            }
                                                            else {
                                                                createAndAddNewResponse("Nope, the weather is actually quite good! :)");
                                                            }
                                                            break;


                                                    }
                                                }
                                            }

                            }

                            else if(check_what_keywords(input) ) {
                                createAndAddNewResponse("At the moment the temperature is " + data.item.condition.temp+ " °C and the conditions are: " + data.item.condition.text.toLowerCase() +".");




                            }


                            else {
                                createAndAddNewResponse("Please write a full sentence, you lazy one.")
                            }

                            break;





                        case "temperature":
                            if(check_what_keywords(input)) {
                                createAndAddNewResponse("The temperature is " + data.item.condition.temp + " °C.");
                                break;
                            }



                            else if(inputarray[0] == "is") {
                                for (var y = 0; y < inputarray.length; y++) {
                                    if (~arrayToCheck.indexOf(inputarray[y])) {
                                        console.log(inputarray[y]);
                                        console.log("test");
                                        switch(inputarray[y]) {

                                            case "good":
                                            case "nice":
                                            case "hot":
                                            case "warm":
                                                console.log(data.item.condition.temp);
                                                if (data.item.condition.temp > 20) {
                                                    // hier nog extra if's over data.item.condition.temp
                                                    createAndAddNewResponse("Yes, it's a hot day! The temperature is " + data.item.condition.temp + " °C.");
                                                    break;
                                                }

                                                else {
                                                    createAndAddNewResponse("Nope, today is a cold day. It's only " + data.item.condition.temp + " °C.");
                                                    break;
                                                }
                                                break;


                                            case "bad":
                                            case "cold":
                                            case "ugly":
                                                if (data.item.condition.temp < 15) {
                                                    // hier nog extra if's over data.item.condition.temp
                                                    createAndAddNewResponse("Yes, today you should remain inside. The temperature is only  " + data.item.condition.temp + " °C.");
                                                    break;

                                                }
                                                else {
                                                    createAndAddNewResponse("Nope, it's quite hot today. The temperature is " + data.item.condition.temp + " °C.");
                                                    break;
                                                }
                                                break;

                                        }
                                    }
                                }
                            }

                            else {
                                createAndAddNewResponse("Please write a full sentence, you lazy one.")
                            }


                            break;



                        case "humidity":
                            if(check_what_keywords(input)) {
                                createAndAddNewResponse("The humidity is " + data.atmosphere.humidity + "%.");
                            }


                            else {
                                createAndAddNewResponse("Please write a full sentence, you lazy one.")
                            }

                            break;

                        case "sunrise":
                            // ook kijken voor de vraag when will the sun rise?
                            createAndAddNewResponse("The sunrise is at " + data.astronomy.sunrise + ".");
                            break;

                        case "sunset":
                            // ook kijken voor de vraag when will the sun set?
                            createAndAddNewResponse("The sunset is at " + data.astronomy.sunset +".");
                            break;




                        case "windspeed":

                            if(check_what_keywords(input)) {
                                createAndAddNewResponse("The windspeed is " + data.wind.speed +" km/h.");


                            }

                            else {
                                createAndAddNewResponse("Please write a full sentence, you lazy one.")
                            }

                            break;


                        case "wind":
                            if(check_what_keywords(input)) {
                                createAndAddNewResponse("The windspeed is " + data.wind.speed +" km/h.");


                            }

                            else {
                                createAndAddNewResponse("Please write a full sentence, you lazy one.")
                            }

                            break;





                        case "forecast":
                            if(check_what_keywords(input)) {
                                createAndAddNewResponse(data.item.forecast[0].day + ", " + data.item.forecast[0].date  + ": Max = " + data.item.forecast[0].high + " °C, " + "Min: " + data.item.forecast[0].low + "°C"
                                + "</br>" + data.item.forecast[1].day + ", " + data.item.forecast[1].date  + ": Max = " + data.item.forecast[1].high + " °C, " + "Min: " + data.item.forecast[1].low + "°C"
                                    + "</br>" + data.item.forecast[2].day + ", " + data.item.forecast[2].date  + ": Max = " + data.item.forecast[2].high + " °C, " + "Min: " + data.item.forecast[2].low + "°C"
                                    + "</br>" + data.item.forecast[3].day + ", " + data.item.forecast[3].date  + ": Max = " + data.item.forecast[3].high + " °C, " + "Min: " + data.item.forecast[3].low + "°C"
                                    + "</br>" + data.item.forecast[4].day + ", " + data.item.forecast[4].date  + ": Max = " + data.item.forecast[4].high + " °C, " + "Min: " + data.item.forecast[4].low + "°C"
                                    + "</br>" + data.item.forecast[5].day + ", " + data.item.forecast[5].date  + ": Max = " + data.item.forecast[5].high + " °C, " + "Min: " + data.item.forecast[5].low + "°C"
                                    + "</br>" + data.item.forecast[6].day + ", " + data.item.forecast[6].date  + ": Max = " + data.item.forecast[6].high + " °C, " + "Min: " + data.item.forecast[6].low + "°C"
                                    + "</br>" + data.item.forecast[7].day + ", " + data.item.forecast[7].date  + ": Max = " + data.item.forecast[7].high + " °C, " + "Min: " + data.item.forecast[7].low + "°C"
                                    + "</br>" + data.item.forecast[8].day + ", " + data.item.forecast[8].date  + ": Max = " + data.item.forecast[8].high + " °C, " + "Min: " + data.item.forecast[8].low + "°C"
                                    + "</br>" + data.item.forecast[9].day + ", " + data.item.forecast[9].date  + ": Max = " + data.item.forecast[9].high + " °C, " + "Min: " + data.item.forecast[9].low + "°C"
                                );
                                break;
                            }
                        // case today
                        // case tomorrow
                        // case forecast

                        //case location
                            //country
                            //region
                        //case kelvin
                        //case fahrenheit

                        case "--":
                            removeAllOutput();
                            checkstate(state);
                            body.style.background = 'url("images/normal.jpg")';
                            body.style.backgroundSize = "cover";
                            body.style.backgroundPosition = "center";
                            body.style.backgroundAttachment = "fixed";
                            break;

                    }


                }




            }

            if(input_found == 1) {
                createAndAddNewResponse("I don't understand what you're saying. Might I suggest google?")
            }

            input_found =  1;
            return false;


        }

    };

    xhttp.open('GET', 'http://query.yahooapis.com/v1/public/yql?q=' + query + '&format=json', true);
    xhttp.send();


}



function checkstate(state) {
    if(state == 1) {
        input.placeholder = "Enter a city";
        createAndAddNewResponse("Please enter a city.");
    }

    if(state > 1) {
        input.placeholder = "Ask me anything";
    }
}


function removeAllOutput() {
    messages = document.querySelector('.chatwindow');

    while(messages.hasChildNodes()) {
        messages.removeChild(messages.firstChild);
    }


    state = 1 ;
    return state



}


function writeInput(inputText) {
    var section = document.createElement('section');
    section.innerHTML = inputText;
    section.style.backgroundColor = "#" + 008 + "BFD";
    section.style.color = "white";
    section.style.float = "right";
    section.style.padding = 10 + "px";
    section.style.width = "auto";
    section.style.margin = 20 + "px";
    section.style.borderRadius = 10 + "px";
    section.style.maxWidth = 300 + "px" ;

    var clear = document.createElement('section');
    clear.style.clear = "both";

    messages.appendChild(section);
    messages.append(clear);
    messages.lastChild.scrollIntoView( true );
}

function createAndAddNewResponse( customText ) {

    var section = document.createElement('section');
    section.innerHTML = customText;
    section.style.backgroundColor = "#" + "F" +6 +"F" + 4 +"F" + 5;
    section.style.padding = 10 + "px";
    section.style.float = "left";
    section.style.color = '#' + 666465;
    section.style.width = "auto";
    section.style.margin = 20 + "px";
    section.style.borderRadius = 10 + "px";
    section.style.maxWidth = 300 + "px" ;

    var clear = document.createElement('section');
    clear.style.clear = "both";

    messages.appendChild(section);
    messages.appendChild(clear);

    messages.lastChild.scrollIntoView( true )



}
















