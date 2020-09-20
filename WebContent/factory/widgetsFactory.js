var baseURl = "http://localhost:3000/widgets/";
angular.module('routerApp').factory('WidgetsService', function ($http, $q, $window) {
    return {
        getwidgetDetails: function () {
            return $http.get('baseURl');
        },

        // Get Widgets By Id
        GetWidgetsByID: function (widgetsId) {
            if (widgetsId != null) {
                console.log(widgetsId, 'widgetsId')
                return $http.get('baseURl', { params: { id: widgetsId } });
            }
        },
        //delete widgets

        deleteWidgetsData: function (widgetsId) {
            var defer = $q.defer();
            $http({
                url: 'baseURl' + widgetsId,
                method: 'DELETE'
            }).success(function (d) {
                alert("widgets deleted successfully");
                defer.resolve(d);
            }).error(function (e) {
                alert("Error");
                defer.reject(e);
            });
            return defer.promise;

        },

        // Edit Widgets

        editWidgetsData: function (widgetsContent) {
            var defer = $q.defer();
            var testCont = JSON.parse(widgetsContent);
            console.log(testCont)
            var Id = testCont.id
            $http({
                url: 'baseURl' + Id,
                method: "PUT",
                data: widgetsContent,
                headers: { 'Content-Type': 'application/json' },
            }).success(function (d) {
                defer.resolve(d);
            }).error(function (e) {
                console.log(e, 'error')
                alert("Error");
                defer.reject(e);
            });
            return defer.promise;
        },

        // add widgets

        AddWidgets: function (data) {
            var defer = $q.defer();
            $http({
                url: 'baseURl',
                method: "POST",
                data: data
            }).success(function (d) {
                //Callback after success
                defer.resolve(d);
            }).error(function (e) {
                //callback after failed
                alert("Error");

                defer.reject(e);
            });
            return defer.promise;
        }, //End of Add widgets Data
    }
})

