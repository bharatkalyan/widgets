var routerApp = angular.module("routerApp", ['ui.router']);

routerApp.config(function ($stateProvider) {
    $stateProvider
        .state('home', {
            url: '/',
            views: {
                home: {
                    templateUrl: './partials/home.html',
                }
            },
        })
        .state('details', {
            url: '/details/:id',
            views: {
                home: { templateUrl: './partials/home.html' },
                content: {
                    templateUrl: './partials/details.html',
                    controller: "widgetController"
                }
            },
        })
        .state('addWidgets', {
            url: '/addWidgets',
            views: {
                addedit: {
                    templateUrl: './partials/addWidgets.html',
                }
            },
        })
        .state('edit', {
            url: '/edit/:id',
            views: {
                addedit: {
                    templateUrl: './partials/edit.html',
                }
            },
        })
})

