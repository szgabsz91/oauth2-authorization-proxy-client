# OAuth2 Authorization Proxy Client

[![Build Status](https://travis-ci.org/szgabsz91/oauth2-authorization-proxy-client.svg?branch=master)](https://travis-ci.org/szgabsz91/oauth2-authorization-proxy-client)
[![Dependencies](https://img.shields.io/david/szgabsz91/oauth2-authorization-proxy-client.svg)](https://david-dm.org/szgabsz91/oauth2-authorization-proxy-client)
[![License](https://img.shields.io/github/license/szgabsz91/oauth2-authorization-proxy-client.svg)](https://github.com/szgabsz91/oauth2-authorization-proxy-client/blob/master/LICENSE)

Client libraries for [OAuth2 Authorization Proxy](https://github.com/szgabsz91/oauth2-authorization-proxy-server-spring-boot).

The main responsibilities are:

* Adds the `Authorization` and `X-OAuth2-Provider` headers to REST API requests.
* In case of images, adds the `access_token` and `oauth2_provider` query parameters.
* Provides components to login and logout with several supported OAuth2 providers such as Facebook and Google.
* Stores the authentication information in local storage.

Currently supported technology stacks:

* VanillaJS
* AngularJS

The AngularJS demo application can be viewed here: [https://szgabsz91.github.io/oauth2-authorization-proxy-client](https://szgabsz91.github.io/oauth2-authorization-proxy-client).
