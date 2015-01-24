'use strict';


angular.module('dashboard.dashboard', [])
    .factory('backend', ['$http', function backendFactory($http) {
        var backend_location = '/components/backend.yaml';
        this.get = function(value) {
                       return $http.get(backend_location)
                           .then(function(response) {
                               var _db = jsyaml.load(response.data);
                               return _db[value];
                       })
        }
        return this;
    }])
    .controller('PublisherCtrl', ['$scope', 'backend', function($scope, backend) {
        backend.get('publishers')
            .then(function(data) {
                $scope.data = data;
                $scope.data_length = $scope.data.length;
            });
    }])
    .controller('SourceCtrl', ['$scope', 'backend', function($scope, backend) {
        backend.get('sources')
            .then(function(data) {
                $scope.data = data;
                $scope.data_length = $scope.data.length;
            });
    }])
    .controller('OverviewCtrl', ['$scope', 'backend', function($scope, backend) {
        backend.get('overview')
            .then(function(data) {
                $scope.data = data;
                $scope.data_length = $scope.data.length;
            });
    }])
    .controller('ActionCtrl', ['$scope', 'backend', function($scope, backend) {

    }]);
