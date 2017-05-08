/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */            
            //JSON CALLS SECTION
            // jSON call for messages 
            $(document).ready(function()
            {
                $.getJSON("http://localhost:8888/php_this/json-data-messages.php", function(data)
                {
		    $.each(data.messages, function(index, message)
                    {
  			$("#messagesData").append("<p><b>Subject: </b><a href='#" + message.messageNumber + "'>" + message.messageTitle + "</a>\n\
                        <b> From: </b><a href='mailto:" + message.messageMail + "'>" + message.fromLecturerNumber + "</a>\n\
                        <b> Date: </b>" + message.messageDate + "</p></a>");
                        $("#theBody").append("<div data-role='page' id=" + message.messageNumber + ">\n\
                        <div data-role='header' data-add-back-btn='true'><h1>Message Details</h1></div>\n\
                        <div role='main' class='ui-content' id='content'>\n\
                        <h1>Subject: " + message.messageTitle + "</h1>\n\
                        <h2>From: " + message.fromLecturerNumber + "</h2>\n\
                        <h2>Sent on: " + message.messageDate + "</h2>\n\
                        <p>"+ message.messageBody + "</p>\n\
                        <a href='mailto:" + message.messageMail + "'>Reply</a>");
                    });
                });
    	    });
            
            // jSON call for lecturer details
            $(document).ready(function()
            {
                $.getJSON("http://localhost:8888/php_this/json-data-lecturers.php", function(data)
                {
		    $.each(data.lecturers, function(index, lecturer)
                    {
  			$("#lecturersData").append("<p>" + lecturer.lastName + ", " + lecturer.firstName + ": <a href='mailto:" + lecturer.email + "'>" + lecturer.email + "</a></p>");
		    });
                });
    	    });
            
            //jSON call for student details
            $(document).ready(function()
            {
                $.getJSON("http://localhost:8888/php_this/json-data-students.php", function(data) 
                {
                    $.each(data.students, function(index, student) 
                    {
                        $("#studentsData").append("<li><a href='#" + student.firstName + "'>" + student.lastName + ", " + student.firstName + "</a></li>");
                        $("#theBody").append("<div data-role='page' id=" + student.firstName + ">\n\
                        <div data-role='header' data-add-back-btn='true'><h1>Course Details</h1></div>\n\
                        <div role='main' class='ui-content' id='content'><ul data-role='listview' id='list2'>\n\
                        <li>Student ID: " + student.studentID + "</li>\n\
                        <li>Module No1: " + student.moduleNo1 + "</li>\n\
                        <li>Module No2: " + student.moduleNo2 + "</li>\n\
                        <li>Course ID: " + student.courseID + "</li>\n\
                        </ul></div><div data-role='footer' data-position='fixed'>\n\
                        <a href='www.dit.ie' target='_blank'>DIT</h4></div></div>");
                    });
                });
            });

            $(document).ready(function()
            {
                $("#messagesData").hide();
                $("#lecturersData").hide();
                $("#studentsData").hide();
                $("#locationList").hide();
                
                $("#toggleMessages").click(function()
                {
                    $("#messagesData").toggle();
                });
                
                $("#toggleLecturers").click(function()
                {
                    $("#lecturersData").toggle();
                });
                
                $("#toggleStudents").click(function()
                {
                    $("#studentsData").toggle();
                });
                
                $("#toggleList").click(function()
                {
                    $("#locationList").toggle();
                });
            });
            
            //GEOLOCATION SECTION
            //Onload, geolocate and set global variables
            google.maps.event.addDomListener(window, "load", function() {findLocation();});
            var x = document.getElementById("where");
            var marker;
            var map;

            function findLocation() 
            {
                if (navigator.geolocation) 
                {
                    navigator.geolocation.watchPosition(locatorMap);
                } 
                else 
                {
                    x.innerHTML = "Please allow access to location.";
                }
            }

            //Setting up map
            function locatorMap(position) 
            {
                //Location array
                var buttons = ["DIT Aungier Street:", "DIT Kevin Street:", "DIT Bolton Street:", "DIT GrangeGorman:"];

                //Coordinates array
                var coordinates = [];
                coordinates[0] = {lat: 53.3385, lng: -6.2666},
                coordinates[1] = {lat: 53.3375, lng: -6.2677},
                coordinates[2] = {lat: 53.3515, lng: -6.2694},
                coordinates[3] = {lat: 53.3548, lng: -6.2794};

                myLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                
                var a0 = document.getElementById("aungier"),
                    a1 = document.getElementById("kevin"),
                    a2 = document.getElementById("bolton"),
                    a3 = document.getElementById("grange");
            
                    a0.onclick = function() 
                    {
                        myLocation = coordinates[0],
                        where.innerHTML = buttons[0],
                        setMap(myLocation);
                    };

                    a1.onclick = function() 
                    {
                        myLocation = coordinates[1],
                        where.innerHTML = buttons[1],
                        setMap(myLocation);
                    };

                    a2.onclick = function() 
                    {
                        myLocation = coordinates[2],
                        where.innerHTML = buttons[2],
                        setMap(myLocation);
                    };

                    a3.onclick = function() 
                    {
                        myLocation = coordinates[3],
                        where.innerHTML = buttons[3],
                        setMap(myLocation);
                    };

                //Map specs
                map = new google.maps.Map(document.getElementById("mapOne"), 
                {
                    zoom: 16,
                    disableDefaultUI: true,
                    mapTypeId: google.maps.MapTypeId.TERRAIN
                });

                marker = new google.maps.Marker
                ({
                    map: map,
                    position: myLocation,
                    animation: google.maps.Animation.DROP,
                    title: "Location"
                });

                map.setCenter(myLocation);
            }
            
            function setMap(position) 
            {
                if (marker.setPosition) marker.setPosition(myLocation);
                if (map.setCenter) map.setCenter(myLocation);
            }
                
            //Reload onclick
            function reLoad() 
            {
                location.reload();
            }
                
            //Scroll to top
            function scrollUp()
            {
                window.scrollTo(0, 0);
            }
            
            //SWIPE FUNCTION SECTION
            //Setting up page array
            var navbarArray = ["profile","home","location"];
            
            //Setting up swipe function
            $(document).ready(function() 
            {
                $(document).on("swiperight", function() 
                {
                    ChangePage("right");
                });
                $(document).on("swipeleft", function() 
                {
                    ChangePage("left");
                });
            });
            
            //Setting up directional function
            function ChangePage(direction) 
            {
                var currentPageId = $(":mobile-pagecontainer").pagecontainer("getActivePage")[0].id;
                var currentPageIndex = navbarArray.indexOf(currentPageId);
                var nextPageId;
                
                if(direction === "left")
                {
                    nextPageId = navbarArray[currentPageIndex-1];

                }
                else if(direction === "right")
                {
                    nextPageId = navbarArray[currentPageIndex+1];
                }
                $( ":mobile-pagecontainer" ).pagecontainer( "change", "#" + nextPageId);
            }