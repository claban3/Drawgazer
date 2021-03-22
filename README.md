# Drawgazer
Drawgazer is an accessible web application that allows a user to create art and play with animations on a digital canvas through eye-tracking technology. Drawgazer runs as a web app on a wide variety of devices using their native browser and webcam, meaning there are no peripherals or installation required.

This project is built for EECS 495 - Accessible Software Systems Design at the University of Michigan. This repository allows you to test, build, and contribute to the app.

# How to use Drawgazer
If you just want to try Drawgazer out, navigate to https://drawgazer.com or https://drawgazer.web.app. This site has our latest build deployed through Google Firebase. If you want to experiment more with the source code, follow the instructions below.

## Setup
First, you'll need to install Node.js (and with it, Node Package Manager a.k.a. npm). Follow the instructions at nodejs.org. You'll also need to clone this repository.

Once Node.js and npm are installed, run `npm install` from the root directory. You may be notified of "high severity vulnerabilities." Do *not* run `npm audit fix` as suggested. This will update dependencies to newer, incompatible versions.

Then, install yarn (a JavaScript package manager similar to npm) with `npm install -g yarn`.

## Develop
To test the application, run `yarn start`. This will open a development build of Drawgazer in your web browser which you can experiment with.

Note that this doesn't optimize the app for performance, so you should [build](##build) and [deploy](##deploy) before committing changes.

## Build
To build the application, run `yarn build`. This bundles the React app in performance mode, minifies it, and hashes filenames in the `build` folder. Read [here](https://create-react-app.dev/docs/deployment/) for more information.

## Deploy
After building, follow the instructions in the terminal to deploy to a static server:

```
yarn global add serve
serve -s build
```

Navigate to the local address which is automatically copied to your clipboard. 

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# The Drawgazer Team

## Cory Laban

## Owen Cannon

## Marco Rodrigues

## Andrew Pospeshil
<img src="../drawgazer/team-headshots/aposp-headshot.jpg" width="200"> </br>
Andrew is a senior studying Computer Science Engineering at the University of Michigan. He has a wide variety of interests in the field of software engineering including operating systems, user interface development, and web development. Outside of work, Andrew is interested in language learning, traveling (pre- or hopefully post-pandemic), and equitable STEM education.
