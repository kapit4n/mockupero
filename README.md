# Mockuper
This project is a collaborative tool to design the user interfaz prototypes of the web system.

## Planning
[Planning Board](https://github.com/kapit4n/mockupero/projects/1)


## Wiki
https://github.com/kapit4n/mockupero-ui/wiki

### Project View
<img src="https://github.com/kapit4n/mockupero-ui/raw/develop/mockups/mockupero_project_view.png" alt="Drawing" width="80%"/>

## Prerequisites
* node 6
* npm 3.10.6
* grunt-cli v1.2.0
* bower
* run (https://github.com/larce1212/mockupero-api)
* go run https://github.com/kapit4n/mockupero-go

## Install
* npm install
* bower install

## Build & Development

* Run `grunt` for building and `grunt serve` for preview.

* http://localhost:9001

## Run Unit Tests

* Running `grunt test` will run the unit tests with karma.

## Docker installation

* docker build -t llll/ui .
* docker run -p 9001:9001 -d llll/ui
* docker logs containerId
* docker stop  containerId
* curl -i localhost:9001

