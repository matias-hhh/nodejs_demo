angular.module('PersonalInfoForm', ['ui.bootstrap'])

.controller('FormController', ['$scope','$http' , function ($scope, $http) {
  $scope.persons = [];
  $scope.maxDate = new Date();
  $scope.isEdit = false;
  // Function for clearing all error and status messages
  $scope.clearStatus = function () {
    $scope.firstNameError = '';
    $scope.lastNameError = '';
    $scope.emailError = '';
    $scope.dayOfBirthError = '';
    $scope.socialIdError = '';
    $scope.postStatus = '';
  };
  $scope.clearForm = function () {
    $scope.clearStatus();
    $scope.firstName = '';
    $scope.lastName = '';
    $scope.email = '';
    $scope.dayOfBirth = '';
    $scope.socialId = '';
    $scope.isEdit = false;
  };
  // Post person data to server to create a database entry
  $scope.create = function () {
    $scope.clearStatus();
    var data = {
      firstName: $scope.firstName,
      lastName: $scope.lastName,
      email: $scope.email,
      dayOfBirth: $scope.dayOfBirth,
      socialId: $scope.socialId
    };
    $http.post('/api/persons', data)
      .success(function (data) {
        $scope.getPersons();
        $scope.clearForm();
        $scope.postStatusStyle = 'success';
        $scope.postStatus = 'Henkilötietojen tallennus onnistui.';
      })
      // Error handling. Errors are shown directly below respective fields
      .error(function (data, status) {
        $scope.handleErrors(data);
      });
  };
  // Get a list of persons from server
  $scope.getPersons = function () {
    $http.get('/api/persons')
      .success(function (data) { 
        $scope.persons = data.persons;
      });
  };
  $scope.getPersons();
  // Delete person from database by id
  $scope.deletePerson = function (id) {
    $scope.clearStatus();
    $http.delete('/api/persons/' + id)
      .success(function (data) {
        $scope.getPersons();
        $scope.postStatusStyle = 'success';
        $scope.postStatus = 'Henkilön postaminen tietokannasta onnistui.';
      })
      .error(function (data) {
        $scope.postStatusStyle = 'error';
        $scope.postStatus = 'Määräämääsi henkilöä ei löydy tietokannasta';
      });
  };
  // Ready person for editing
  $scope.editPerson = function (person) {
    $scope.clearStatus();
    $scope.firstName = person.firstName;
    $scope.lastName = person.lastName;
    $scope.email = person.email;
    $scope.dayOfBirth = person.dayOfBirth;
    $scope.socialId = person.socialId;
    $scope.personId = person._id;
    $scope.isEdit = true;
  };
  // Update person in database by id
  $scope.updatePerson = function () {
    $scope.clearStatus();
    var data = {
      firstName: $scope.firstName,
      lastName: $scope.lastName,
      email: $scope.email,
      dayOfBirth: $scope.dayOfBirth,
      socialId: $scope.socialId
    };
    $http.put('/api/persons/' + $scope.personId, data)
      .success(function (data) {
        $scope.getPersons();
        $scope.clearForm()
        $scope.postStatusStyle = 'success';
        $scope.postStatus = 'Henkilötietojen muokkaaminen onnistui.';
      })
      .error(function (data, status) {
        if (status === 404) {
          $scope.postStatusStyle = 'error';
          $scope.postStatus = 'Määräämääsi henkilöä ei löydy tietokannasta';
        } else {
          $scope.handleErrors(data);
        }
      });
  };
  // Angular UI date picker functions
  $scope.clear = function () {
    $scope.dayOfBirth = null;
  };
  $scope.openDatePicker = function($event) {
    $event.preventDefault();
    $event.stopPropagation();

    $scope.opened = true;
  };
  $scope.dateOptions = {
    formatYear: 'yyyy',
    startingDay: 1
  };
  $scope.handleErrors = function (data) {
    var error;
    var errorCode;
    for(var key in data.errors) {
      errorCode = data.errors[key];
      if (key === 'firstName') {
        if (errorCode === 'missing_field') {
          $scope.firstNameError = 'Pakollinen kenttä.';
        } else if (errorCode === 'invalid') {
          $scope.firstNameError = 'Nimessä ei voi olla numeroita tai erikoismerkkejä "-"-merkin lisäksi.';
        }
      } else if (key === 'lastName') {
        if (errorCode === 'missing_field') {
          $scope.lastNameError = 'Pakollinen kenttä.';
        } else if (errorCode === 'invalid') {
          $scope.lastNameError = 'Nimessä ei voi olla numeroita tai erikkoismerkkejä "-"-merin lisäksi';
        }
      } else if (key === 'email') {
        if (errorCode === 'missing_field') {
          $scope.emailError = 'Pakollinen kenttä';
        } else if (errorCode === 'invalid') {
          $scope.emailError = 'Ole hyvä ja anna kunnollinen sähköpostiosoite';
        } else if (errorCode === 'already_exists') {
          $scope.emailError = 'Tietokannassa on jo henkilö jolla on tämä sähköpostiosoite';
        }
      } else if (key === 'dayOfBirth') {
        if (errorCode === 'missing_field') {
          $scope.dayOfBirthError = 'Pakollinen kenttä';
        } else if (errorCode === 'invalid') {
          $scope.dayOfBirthError = 'Syötä kunnollinen päivämäärä';
        } else if (errorCode === 'date_in_future') {
          $scope.dayOfBirthError = 'Syntymäaika ei voi olla tulevaisuudessa';
        }
      } else if (key === 'socialId' ) {
        if (errorCode === 'missing_field') {
          $scope.socialIdError = 'Pakollinen kenttä';
        } else if (errorCode === 'invalid') {
          $scope.socialIdError = 'Syötä kunnollinen sosiaaliturvatunnus';
        } else if (errorCode === 'date_does_not_match') {
          $scope.socialIdError = 'Sosiaaliturvatunnus ei täsmää syntymäajan kanssa';
        }
      }
    }
  };
}]);