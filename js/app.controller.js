app.controller("GoogleMapsController", ['$scope', 'uiGmapGoogleMapApi', 'toaster', '$http', 'appFactory', function($scope, uiGmapGoogleMapApi, toaster, $http, appFactory) {
    var category = '',
        index,
        enteredData,
        categoryArray;

    $scope.config = {};
    $scope.config.showLoader = true;
    $scope.config.selectedCategory = '';
    $scope.windowOptions = {};
    $scope.config.categoryLabel = "-- Select Category --";

    /*Clearing all the flags used in controller*/
    $scope.locationDtls = {};
    $scope.closeAll = function() {
        $scope.config.modifyLocation = false;
        $scope.config.removeLocation = false;
    }

    $scope.closeAll();

    /* Select Categories List*/
    $scope.categoryList = appFactory.getCategories();

    /* Map Object*/
    uiGmapGoogleMapApi.then(function(maps) {
        $scope.map = {
            center: {
                latitude: 21.7679,
                longitude: 78.8718
            },
            zoom: 8
        };
    });

    /*Service call to get the data*/
    $http.get("../json/categories.json").then(function(response) {
        $scope.config.showLoader = false;
        $scope.config.categories = response.data[0];
        appFactory.setCategoriesInfo($scope.config.categories);
    }, function(err) {
        $scope.config.showLoader = false;
        toaster.error('Data retrival failure!!!');
    });

    /*On selecting category*/
    $scope.categorySelected = function(category) {
        $scope.closeAll();
        $scope.config.categoryLabel = category.label;
        $scope.config.selectedCatData = $scope.config.categories[category.key];
        $scope.config.selectedCategory = category.key;
        $scope.config.markers = appFactory.formatMarkers($scope.config.selectedCatData, $scope.config.selectedCategory);
        if(!$scope.config.markers.length){
            toaster.info('Oops! No '+$scope.config.categoryLabel+' locations are available. Please add if you know any.');
            return;
        }
    }

    /*Showing location details window on marker mouseover*/
    $scope.markerEvents = {
        events: {
            mouseover: markerMouseOver
        }
    }
    function markerMouseOver(marker, e) {
        angular.forEach($scope.config.markers, function(val) {
            val.show = false;
        });
        marker.model.show = true;
    }

    /*Add location link click*/
    $scope.addLocation = function() {
        $scope.config.modifyLocation = true;
        $scope.config.removeLocation = false;
    }

    /*Remove location link click*/
    $scope.removeLocation = function() {
        $scope.config.modifyLocation = true;
        $scope.config.removeLocation = true;
    }

    /*Adding location*/
    $scope.$on('addLocation', function() {
        $scope.closeAll();
        category = $scope.locationDtls.category.key;
        enteredData = {
            "latitude": $scope.locationDtls.latitude.toString(),
            "longitude": $scope.locationDtls.longitude.toString(),
            "name": $scope.locationDtls.name,
            "location": $scope.locationDtls.location,
            "description": $scope.locationDtls.desc,
            "images": [
                "http://carter.blob.core.windows.net/media/bushigokoro/images/weapons/not-available.png"
            ]
        };

        !($scope.config.categories[category]) ? ($scope.config.categories[category] = []) : '';
        $scope.config.categories[category].push(enteredData);
        appFactory.setCategoriesInfo($scope.config.categories);

        /* Adding marker to the map, if added category is same as selected category */
        if (category === $scope.config.selectedCategory) {
            index = $scope.config.categories[category].length - 1;
            $scope.config.markers.push(appFactory.getConfigObject(enteredData, index, category));
        }
        $scope.locationDtls = {};
        toaster.success('Location added successfully!!!');
    });

    /*Removing location*/
    $scope.$on('removeLocation', function() {
        $scope.closeAll();
        category = $scope.locationDtls.category.key;

        function getIndex(obj) {
            return (obj.name === $scope.locationDtls.removeloc.label);
        }

        categoryArray = $scope.config.categories[category] || [];
        index = categoryArray.findIndex(getIndex);

        if(index === -1){
            toaster.error('No specified location in database!!!');
            return;
        }

        $scope.config.categories[category].splice(index, 1);

        /* Removing marker from displayed markers, if removed category is same as selected category */
        if (category === $scope.config.selectedCategory) {
            index = $scope.config.markers.findIndex(getIndex);
            $scope.config.markers.splice(index, 1);
        }

        appFactory.setCategoriesInfo($scope.config.categories);
        $scope.locationDtls = {};
        toaster.success('Location removed successfully!!!');
    });

    /*Closing add/remove loacation form on cancel button click*/
    $scope.$on('cancelLocation', function() {
        $scope.closeAll();
    });
}]);