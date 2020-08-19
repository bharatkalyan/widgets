var baseAddress = 'http://localhost:3000/widgets/';
 var url = "";

routerApp.factory("widgetsFactory", function($http,$q){
return{
	getWidgetsList: function () {
 url = baseAddress;
 return $http.get(url);
 },

deleteWidgetUser : function (employeeid) {
        var defer = $q.defer(); // I have disscussed littel bit about $q and defer in 3rd tutorial of angualrjs. 
        $http({
            url: baseAddress +employeeid, 
            method: 'DELETE'
        }).success(function (d) {
            alert("the widgets deleted successfully");
            defer.resolve(d);
        }).error(function (e) {
            alert("Error");
            defer.reject(e);
        });
        return defer.promise;

    },
}
});
