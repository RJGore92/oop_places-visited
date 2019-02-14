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
  this.currentId += 1;
  return this.currentId;
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
    console.log(testDestination.fullLocation());
    console.log(destinationIn);
    console.log(locCityIn);
    console.log(locStateIn);
    console.log(locCountryIn);
    console.log(landmarksIn);
    console.log(timeVisitedIn);
    console.log(notesIn);
    console.log(testDestination);

    // currentAddressBook.addContact(contactToAdd);
    // $("ul#contact-list").append(
    //   "<li id='contact" + currentAddressBook.currentId + "'><button type='button' class='red-button' value='" + currentAddressBook.currentId + "' onClick='removeFromContacts(this.value)'>Delete this.</button> Name: " + contactToAdd.fullName() + ".  Phone Number: " + contactToAdd.phoneNumber + "</li>"
    // );
  });
});
