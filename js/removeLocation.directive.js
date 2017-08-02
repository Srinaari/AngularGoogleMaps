app.directive('removeLocation', function(appFactory){
	return {
	    templateUrl: '../removeLocation.html',
	    restrict: 'E',          
	    scope: {
	    	locationDtls: '=',
	    	categoryList: '='
	    },
	    controller: function($scope){  
	    	var categoryArray;
	    	
	    	$scope.locationDtls.removeLocations = [];

	    	$scope.categoryChanged = function(category){
	    		$scope.locationDtls.removeLocations = [];
	    		if(category){
		    		categoryArray = appFactory.getCategoriesInfo()[category.key];
		    		angular.forEach(categoryArray, function(val, key){
		    			$scope.locationDtls.removeLocations.push({
		    				index:key,
		    				label:val.name
		    			});
		    		});
		    	}
	    	}

	    	$scope.closeForm = function(){
	    		$scope.$emit('cancelLocation');
	    	}
	    	$scope.removeLocationClicked = function(){
	    		if($scope.locationForm.$valid){
	    			$scope.$emit('removeLocation');
	    		}
	    	} 
	    }
	};
});