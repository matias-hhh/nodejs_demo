# nodejs_demo - personal information handling app

A simple demo app which attemps do demonstrate how to do a modular MEAN (MongoDB, ExpressJS, AngularJS and Node.js) app that can be easily expanded.

The demo implements a RESTful api for creating, reading, updating and deleting personal information. The server provides basic input validation, and simple and easy to interpret error responses.

Personal information consists of first name, last name, email address, date of birth and a Finnish social security number.

The client-side interface is implemented in Finnsih. 

Validation of data is done in the server only, for demonstration purposes

## Things to improve

For the sake of consistency and convenience , validation should be handled with something else than mongoose's own validation (ctavan's express-validator seemed nice) for more effective validation, getting all validation errors at once and making error reporting easier.

## Requirements

* `node.js` v.0.10.36
* `MongoDb` v2.4.9

## Installation

Just run

```
$ npm install
```

in the project folder.

To start the server, run 

```
$ node server.js
```

## Folder structure

This project has a basic MEAN MVC folder structure:

```
.
├── app                // Server files
│   ├── controllers    // Route logic
│   ├── models         // Database models
│   ├── routes         // Route definition
│   ├── tests          // Server tests
│   └── views          // Html-templates
├── config             // Server configuration
│   └── env            // User environment definitions
└── public             // Static files
    ├── css            // Css-stylesheets
    └── libs           // JavaScript-libraris

```

## Configuration

The server app has at the moment two user environmets, development and testing. Environment configuration is handled by `/config/config.js`, which reads the respecful config files from `/config/env/`. 

When running the server.js, the default environment is development and thus the port used is 8080 and database `mongodb:localhost/nodejs_demo`. For tests, port is 8081 and database `mongodb:localhost/nodejs_demo_test`.

To set the environment manually, set user environment variable `NODE_ENV` to the corresponding value like so:

```
$ NODE_ENV='test' node server.js
```

Port can also be set manually using `PORT`-environment variable.

## Tests

Test exist for model validation and api. Test environment is ``mocha`` and ``chai`` is used for assertion. ``supertest`` is used for api tests.

Tests can be run with command

```
$ grunt mochaTest
```

## Api

### Operation summary

**person:** create, update and look up persons

|Methods                   | Location
|--------------------------|----------------------------|
|``GET`` ``POST``          |``/api/persons``            |
|``GET`` ``PUT`` ``DELETE``|``/api/persons/<Person-Id>``|

### Api Operation

#### List all persons

**Operation:**

``GET /api/persons``

Use this call to list all the persons.

**Request:**

Use the GET operation.

**Response:**

If successful, this call returns HTTP status of ``200`` and a list of **person**-objects:

|Property       |Type                    |Description
|---------------|------------------------|----------------------------------------
|``_id``        |*string*                |A unique identifier for the record
|``firstName``  |*string*                |Person's first name,
|``lastName``   |*string*                |Person's email.
|``email``      |*string*                |Person's email address.
|``dayOfBirth`` |*JavaScript Date-object*|Person's date of birth.
|``socialId``   |*string*                |Person's Finnish social security number.
|``__v``        |*int    *               |Internal revision of the document

#### Create a person

**Operation:**

``POST /api/persons``

Use this call to create a person.

**Request:**

|Property       |Type                    |Description
|---------------|------------------------|------------------------------------------------------------------------------
|``firstName``  |*string*                |Person's first name. Can consist of characters and "-"-sign. **Required**
|``lastName``   |*string*                |Person's email. Can consist of characters and "-sign" **Required**
|``email``      |*string*                |Person's email address. Must be unique. **Required**
|``dayOfBirth`` |*JavaScript Date-object*|Person's date of birth. Must be a valid JavaScript Date-object **Required**
|``socialId``   |*string*                |Person's Finnish social security number. Must be consistent with date of birth, and unique. **Required**

**Response:**

If successful, this call returns HTTP status of ``201`` and response body ``message: 'person created successfully``'

If not successful, returns HTTP status of ``400`` and response body (error names explained in Errors-section):

```
    {
        message: 'request has erraneous fields',
        errors : {
            erraneous_field_1: 'error_name',
            erraneous_field_2: 'error_name'
        }
    }
```

#### Look up a person

**Operation:**

``GET /api/persons/<Person-Id>``

Use this call to look up a person.

**Request:**

Pass the person ``__id`` in the URL of a GET call. 

**Response:**

If successful, this call returns HTTP status of ``200`` and a **person**-object:

|Property       |Type                    |Description
|---------------|------------------------|----------------------------------------
|``_id``        |*string*                |A unique identifier for the record
|``firstName``  |*string*                |Person's first name,
|``lastName``   |*string*                |Person's email.
|``email``      |*string*                |Person's email address.
|``dayOfBirth`` |*JavaScript Date-object*|Person's date of birth.
|``socialId``   |*string*                |Person's Finnish social security number.
|``__v``        |*int    *               |Internal revision of the document

If id of a person is incorrect, returns HTTP status of ``404`` and response body ``message: 'resource not found``

#### Update a person

**Operation:**

``PUT /api/persons/<Person-Id>`` 

Use this call to update a person.

**Request:**

Pass the person ``__id`` in the URL of a PUT call. Request body:

|Property       |Type                    |Description
|---------------|------------------------|------------------------------------------------------------------------------
|``firstName``  |*string*                |Person's first name. Can consist of characters and "-"-sign. **Required**
|``lastName``   |*string*                |Person's email. Can consist of characters and "-sign" **Required**
|``email``      |*string*                |Person's email address. Must be unique. **Required**
|``dayOfBirth`` |*JavaScript Date-object*|Person's date of birth. Must be a valid JavaScript Date-object **Required**
|``socialId``   |*string*                |Person's Finnish social security number. Must be consistent with date of birth, and unique. **Required**

**Response:**

If successful, this call returns HTTP status of ``200`` and response body ``message: 'person successfully updated``'

If id of a person is incorrect, returns HTTP status of ``404`` and response body ``message: 'resource not found``

If input data is invalid, returns HTTP status of ``400`` and response body (error names explained in Errors-section):

```
    {
        message: 'request has erraneous fields',
        errors : {
            erraneous_field_1: 'error_name',
            erraneous_field_2: 'error_name'
        }
    }
```

#### Delete a person

**Operation:**

``DELETE /api/persons/<Person-Id>``

Use this call to delete a person.

**Request:**

Pass the person ``__id`` in the URL of a DELETE call. 

**Response:**

If successful, this call returns HTTP status of ``200`` and response body ``message: person successfully deleted``

If id of a person is incorrect, returns HTTP status of ``404`` and response body ``message: 'resource not found``

### Error codes

* ``missing_field`` - A required field is missing.
* ``invalid`` - A field does not match requirements.
* ``date_is_in_future`` - Date of birth is set in future
* ``date_does_not_match`` - Date of birth does not match with social security number

### License

The MIT License (MIT)
Copyright (c) 2015 matias-hhh

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:


The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
