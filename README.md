# frontend-nanodegree-arcade-game

## Introduction

This repository contains a solution to assignment #3 of the Udacity's Front-End Web Developer Nanodegree Programme.

Using the provided visual assets and a game loop engine, the task was to demonstrate object-oriented JavaScript
programming skills by implementing the classic arcade game Frogger.


## Live Demonstration

This solution is deployed through GitHub Pages at the following URL:
[http://www.milanfort.com/frontend-nanodegree-arcade-game/](http://www.milanfort.com/frontend-nanodegree-arcade-game/)


## Game Rules

The game is divided into levels. In each level, the player must reach water at the top of the game board.
Depending on the level, there is a certain number of enemy bugs and rocks that the player must avoid.
Optionally, the player may collect gems to increase the game score.


## Installation Instructions

To run and play the game locally, follow these steps:

1. [Install Node.js](https://nodejs.org/en/download/)

1. Install [Gulp](http://gulpjs.com/) globally:
```
$ npm install -g gulp
```
1. Install [Bower](http://bower.io/) globally:
```
$ npm install -g bower
```
1. Clone this git repository:
```
$ git clone https://github.com/milanfort/frontend-nanodegree-arcade-game.git
```
1. Change your working directory to _frontend-nanodegree-arcade-game_

1. Install development dependencies:
```
$ npm install
```
1. Install client-side dependencies:
```
$ bower install
```
1. Run `gulp` to deploy the code to _dist_ directory

1. Optionally, run `gulp test` to validate JavaScript source files using [JSLint](http://www.jslint.com/)
and HTML source files using [A11Y Project](http://a11yproject.com/)

1. Optionally, run `gulp docs` to generate [JSDoc](http://usejsdoc.org/) API Documentation to _docs_ directory

1. Open file `dist/index.html` in your web browser


## Final Notes

* Initial implementation using JavaScript's Pseudo-Classical Inheritance techniques can be found in
[git tag v1.0](https://github.com/milanfort/frontend-nanodegree-arcade-game/releases/tag/v1.0).

* The current implementation in the master branch is using strictly
[Prototypal Inheritance](http://javascript.crockford.com/prototypal.html).
