<p align="center">
  <a href="http://konzi.kir-dev.hu/" target="_blank"><img src="https://warp.sch.bme.hu/images/konzisite_email_header" alt="Konzisite header" /></a>
</p>

## Description

Konzisite is a web application for the students of Budapest University of Technology and Economic Faculty of Electrical Engineering and Informatics to organise consultations, study sessions where students help each other. This repository contains frontend of that application, built with <a href="https://www.typescriptlang.org/" target="_blank" title="Typescript"><img src="https://github.com/get-icon/geticon/raw/master/icons/typescript-icon.svg" alt="Typescript" width="21px" height="21px"> TypeScript</a>, <a href="https://reactjs.org/" title="React"><img src="https://github.com/get-icon/geticon/raw/master/icons/react.svg" alt="React" width="21px" height="21px"> React</a> and <a href="https://chakra-ui.com/" title="Chakra UI"><img src="https://github.com/get-icon/geticon/raw/master/icons/chakra-icon.svg" alt="Chakra UI" width="21px" height="21px"> ChakraUI</a>. See the <a href="https://github.com/kir-dev/konzisite-api" target="_blank" title="Backend repo">backend repository here</a>. The application was developed by <a href="https://kir-dev.hu/" title="Kir-Dev" target="_blank"><img src="https://warp.sch.bme.hu/images/kir-dev-only-logo" alt="Kir-Dev" height="21px"> Kir-Dev</a>. For more information about the project, see our <a href="https://kir-dev.hu/project/konzisite/" target="_blank" title="Project page">project page</a> or <a href="https://kir-dev.hu/post/2023-03-05-az-uj-konzisite-fejlesztese/" target="_blank" title="Project page">our blogpost</a>, both in Hungarian.

## Preparation

First, start the backend server by following [this guide](https://github.com/kir-dev/konzisite-api#readme).

Then copy the contents of `.env.example` to a new file named `.env`.

## Available Scripts

In the project directory, you can run:

### `yarn install`

Installs the dependecies of the app.

### `yarn start`

Runs the app in the development mode.<br /> Open
[http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br /> You will also see any lint errors
in the console.

### `yarn build`

Builds the app for production to the `build` folder.<br /> It correctly bundles
React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br /> Your app is
ready to be deployed!

See the section about
[deployment](https://facebook.github.io/create-react-app/docs/deployment) for
more information.
