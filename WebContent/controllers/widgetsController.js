routerApp.controller('widgetController', function ($scope, $http, $state, $location, $window, $rootScope) {

    // get method
    var getallwidgets = function () {
        $http.get('http://localhost:3000/widgets').success(function (data) {
            console.log(data, "data testing")
            $scope.widgets = []
            $scope.widgets = data;
        }).error(function () {
            $scope.error = "An Error has occured while loading posts!";
        });
    }

    // delete method
    $scope.deleteWidgets = function (inf) {
        var Id = inf.id;
        $scope.loading = true;
        $http.delete('http://localhost:3000/widgets/' + Id).success(function (data) {
            $location.path('/')
        }).error(function (data) {
            $scope.error = "An Error has occured while Delete employee! " + data;
        });
        $state.reload()
    }


    // add widgets
    $scope.addWidgets = function () {
        $http.post('http://localhost:3000/widgets/', this.newwidgets).success(function (data) {
            $scope.widgets = data;
            $scope.newwidgets = '';
            $location.path('/')
        }).error(function (data) {
            $scope.error = "An Error has occured while adding widgets! " + data;
        });
        $state.reload()
    }
// reset form
$scope.resetForm = function(){
	$scope.newwidgets =""
}

    // show details
    $scope.showDetails = function (inf) {
        var id = inf.id
        //alert("function working")
        $http.get('http://localhost:3000/widgets/' + id).success(function (data) {
            console.log(data, "data testing")
            $scope.widgetsdetails = {}
            $scope.widgetsdetails = data;
			$scope.widgetPairs = []
			$scope.widgetPairs = data.pairs
		
        }).error(function () {
            $scope.error = "An Error has occured while get details!";
        });
        $rootScope.detailsName = inf.name
        $rootScope.detailsNumber = inf.number
        $rootScope.detailsId = inf.id
        $rootScope.detailsPlace = inf.dob
    }

    // edit widget
    $scope.editWidgets = function () {
        console.log($rootScope.detailsId)
        var detName = document.getElementById('name').value
        var detNumber = document.getElementById('number').value
        var data = {
            name: detName,
            number: detNumber
        }
        $http.put('http://localhost:3000/widgets/' + $rootScope.detailsId, data).success(function (data) {
            console.log(data, "testing edit data")
            $scope.widgets = data;
            $location.path('/')
        }).error(function () {
            $scope.error = "An Error has occured while loading edit!";
        });
        $state.reload()
    }

// create new input
var counter = 0;
$scope.addElement=function() {
	var form = document.getElementById('editWidget');
   counter++;
    var input = document.createElement("input");
	input.class="col-sm-2"
    input.id = 'input-' + counter;
    input.type = 'text';
    input.name = 'name';
    form.appendChild(input);
}


// Remove element

$scope.removeElement = function(inf){
	var form = document.getElementById('editWidget');
	var element = document.getElementById(inf.id);
    element.parentNode.removeChild(form);
}


    getallwidgets();
});