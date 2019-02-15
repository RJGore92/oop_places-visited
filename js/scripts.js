// Business Logic for PlacesList
function PlacesList() {
  this.placesBeen = [];
  this.placeId = 0;
}

PlacesList.prototype.addPlace = function (place) {
  place.id = this.assignId();
  this.placesBeen.push(place);
};

PlacesList.prototype.assignId = function () {
  this.placeId += 1;
  return this.placeId;
};

PlacesList.prototype.findPlace = function (id) {
  for (var i = 0; i < this.placesBeen.length; i++) {
    if (this.placesBeen[i]) {
      if (this.placesBeen[i].id == id) {
        return this.placesBeen[i];
      }
    }
  };
  return false;
};

PlacesList.prototype.deletePlace = function (id) {
  for (var i = 0; i < this.placesBeen.length; i++) {
    if (this.placesBeen[i]) {
      if (this.placesBeen[i].id == id) {
        delete this.placesBeen[i];
        return true;
      }
    }
  };
  return false;
};

var placesListLog = new PlacesList();

// Business Logic for Destinations
function Destination(destinationName, locationCity, locationState, locationCountry, landmarks, timeOfYear, notes) {
  this.destinationName = destinationName,
  this.locationCity = locationCity,
  this.locationState = locationState,
  this.locationCountry = locationCountry,
  this.landmarks = landmarks,
  this.timeOfYear = timeOfYear,
  this.notes = notes
}

Destination.prototype.fullLocation = function () {
  var locationFull = "";
  if (this.locationCity != "") {
    locationFull = locationFull + this.locationCity;
    console.log(locationFull);
    if (this.locationState != "") {
      locationFull = locationFull + ", " + this.locationState;
      console.log(locationFull);
    }
    if (this.locationCountry != "") {
      locationFull = locationFull + ", " + this.locationCountry;
      console.log(locationFull);
    }
  }
  else if (this.locationState != "") {
    console.log(this.locationState);
    locationFull = locationFull + this.locationState;
    console.log(locationFull);
    if (this.locationCountry != "") {
      locationFull = locationFull + ", " + this.locationCountry;
      console.log(locationFull);
    }
  }
  else {
    locationFull = locationFull + this.locationCountry;
    console.log(locationFull);
  }
  return locationFull;
};

// Manipulation functions for UI, Destinations, and PLaces List

function removeFromPlaceLog(val) {
  placesListLog.deletePlace(val);
  console.log(val);
  $("div#destination"+val).remove();
}

function showDetails(val) {
  $("div#button"+val).slideToggle();
  $("div#dest-body"+val).slideToggle();
}

function hideDetails(val) {
  $("div#button"+val).slideToggle();
  $("div#dest-body"+val).slideToggle();
}

function landmarksCheck(id) {
  console.log(placesListLog.placesBeen[id-1]);
  if (placesListLog.placesBeen[id-1].landmarks != "") {
    var landmarksSplit = placesListLog.placesBeen[id-1].landmarks.split(", ");
    console.log(landmarksSplit);
    landmarksSplit.forEach(function(landmark) {
      $("ul#landmarks"+id).append("<li>"+landmark+"</li>");
    });
  }
  else {
    $("ul#landmarks"+id).append("<li>No landmarks noted.</li>");
  }
}

function notesCheck(id) {
  if (placesListLog.placesBeen[id-1].notes != "") {
    $("span#notes"+id).text(placesListLog.placesBeen[id-1].notes);
  }
  else {
    $("span#notes"+id).text("No notes to mention.");
  }
}


// User Interface Logic

$(document).ready(function() {
  $("form#add-destination").submit(function(event) {
    event.preventDefault();
    var destinationIn = $("input#destination-name").val();
    var locCityIn = $("input#location-city").val();
    var locStateIn = $("input#location-state").val();
    var locCountryIn = $("input#location-country").val();
    var landmarksIn = $("input#landmarks-noted").val();
    var timeVisitedIn = $("input#time-of-year").val();
    var notesIn = $("input#notes-in").val();
    var testDestination = new Destination(destinationIn, locCityIn, locStateIn, locCountryIn, landmarksIn, timeVisitedIn, notesIn);
    placesListLog.addPlace(testDestination);
    $("div#output-div").append(
      "<div id='destination" + placesListLog.placeId + "' class='col-md-8'>" +
        "<div class='card px-2 py-1'>" +
          "<div class='card-heading bg-primary'><h3>" + testDestination.destinationName + "</h3><div id='button"+placesListLog.placeId+"'><button type='button' value='"+placesListLog.placeId+"' onClick='showDetails(this.value)'>Show Details</button></div><div><button type='button' class='red-button' value="+placesListLog.placeId+" onClick='removeFromPlaceLog(this.value)'>Delete this entry</button></div></div>" +
          "<div class='card-body hidden-start bg-muted' id='dest-body"+placesListLog.placeId+"'>" +
            "<div class='row'>" +
              "<div class='col'>" +
                "<h6>General location of destination:</h6>" +
                "<p>" + testDestination.fullLocation() + "</p></div>" +
              "<div class='col'>" +
                "<h6>Landmarks near destination:</h6>" +
                "<ul id='landmarks"+placesListLog.placeId+"'></ul></div>" +
              "<div class='col'>" +
                "<h6>Time of year visited:</h6>" +
                "<p>" + testDestination.timeOfYear + "</p></div></div>" +
            "<div class='row'>" +
              "<div class='col'>" +
                "<h6>Notes about location</h6>" +
                "<p><span id='notes"+placesListLog.placeId+"'></span></p></div></div>" +
            "<button type='button' value='"+placesListLog.placeId+"' onClick='hideDetails(this.value)'>Hide these details</button>" +
            "</div></div></div>"
    );

    landmarksCheck(placesListLog.placeId);
    notesCheck(placesListLog.placeId);

    // console.log(destinationIn);
    // console.log(locCityIn);
    // console.log(locStateIn);
    // console.log(locCountryIn);
    // console.log(landmarksIn);
    // console.log(timeVisitedIn);
    // console.log(notesIn);
    // console.log(testDestination);
  });
});
