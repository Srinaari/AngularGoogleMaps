var app = angular.module('googleMapsApp', ['ngAnimate', 'toaster', 'ui.bootstrap', 'uiGmapgoogle-maps']);

app.config(function(uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
        v: '3.20',
        libraries: 'weather,geometry,visualization'
    });
});