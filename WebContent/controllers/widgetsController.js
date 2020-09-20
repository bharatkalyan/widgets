angular.module('routerApp').controller('widgetController', function ($scope, $state, $location, WidgetsService, $rootScope) {

    // Get widgets
    var getWidgetsData = function () {
        WidgetsService.getwidgetDetails().then(function (resp) {
            $scope.widgets = []
            $scope.widgets = resp.data;
        },
            function () {
                alert('Failed');
            });

    }

    // get widgets by id
    $scope.showDetails = function (inf) {
        $scope.widgetsdetails = {}
        WidgetsService.GetWidgetsByID(inf.id).success(function (data) {
            $scope.widgetsdetails = data[0];
            $rootScope.detailsName = data[0].name
            $rootScope.detailsNumber = data[0].number
            $rootScope.detailsId = data[0].id
            $rootScope.detailsPlace = data[0].dob
        });
    }

    // Add widgets
    $scope.addWidgets = function () {
        $scope.widgets = this.newwidgets;
        WidgetsService.AddWidgets($scope.widgets).then(function (d) {
            $scope.widgets = d;
            $scope.newwidgets = '';
            alert("widgets added successfully");
            $location.path('/');
        });
        getWidgetsData();
        $state.reload()

    };

    // Delete Widgets
    $scope.deleteWidgets = function (inf) {
        if (inf.id != null) {
            if (window.confirm('Are you sure you want to delete this Id = ' + inf.id + '?'))//Popup window will open to confirm
            {
                WidgetsService.deleteWidgetsData(inf.id).then(function (inf) {
                    $location.path('/')
                }, function () {
                    alert("Error in deleting record");
                });
            }
        }
        else {
            alert("this id is null");
        }
    };

    // Edit save widget details
    $scope.saveEditWDetails = function () {
        var widgetsContent = {}
        widgetsContent.name = $scope.widgetsdetails.name,
            widgetsContent.number = $scope.widgetsdetails.number,
            widgetsContent.id = $rootScope.detailsId
        widgetsContent = JSON.stringify(widgetsContent)
        $scope.widId = $rootScope.detailsId;
        if ($scope.widId != null) {
            WidgetsService.editWidgetsData(widgetsContent).then(function (widgetsContent) {
                $scope.widgets = widgetsContent
                alert("updated successfully")
                $location.path('/')
            }, function () {
                alert("Error in editing record");
            });
        }
        else {
            alert("this id is null");
        }
        $state.reload()
    }

    // create new input
    var counter = 0;
    $scope.addElement = function () {
        var form = document.getElementById('editWidget');
        counter++;
        var input = document.createElement("input");
        input.class = "col-sm-2"
        input.id = 'input-' + counter;
        input.type = 'text';
        input.name = 'name';
        form.appendChild(input);
    }

    // Remove element
    $scope.removeElement = function (inf) {
        var form = document.getElementById('editWidget');
        var element = document.getElementById(inf.id);
        element.parentNode.removeChild(form);
    }
    getWidgetsData();
});


