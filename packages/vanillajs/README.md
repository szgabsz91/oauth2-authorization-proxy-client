# OAuth2 Authorization Proxy Client VanillaJS

The VanillaJS implementation of the OAuth2 Authorization Proxy Client library.

The main responsibilities are:

* Adds the `Authorization` and `X-OAuth2-Provider` headers to REST API requests.
* In case of images, adds the `access_token` and `oauth2_provider` query parameters.
* Provides components to login and logout with several supported OAuth2 providers such as Facebook and Google.
* Stores the authentication information in local storage.

Currently supported technology stacks:

* VanillaJS
* AngularJS
