# Mockuper
This project is a collaborative tool to design the user interfaz prototypes of the web system.

## Prerequisites
* node 6
* npm 3.10.6
* grunt-cli v1.2.0
* run (https://github.com/kapit4n/mockupero-api)

## Install
* npm install
* bower install

## Build & development

* Run `grunt` for building and `grunt serve` for preview.

* http://localhost:9001

## Testing

* Running `grunt test` will run the unit tests with karma.

## Docker installation

* docker build -t llll/ui .
* docker run -p 9001:9001 -d llll/ui
* docker logs containerId
* docker stop  containerId
* curl -i localhost:9001

