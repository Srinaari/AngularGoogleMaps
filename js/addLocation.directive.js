app.directive('addLocation', function(){
	return {
	    templateUrl: '../addLocation.html',
	    restrict: 'E',          
	    scope: {
	    	locationDtls: '=',
	    	categoryList: '='
	    },
	    controller: function($scope){
	    	$scope.closeForm = function(){
	    		$scope.$emit('cancelLocation');
	    	}  
	    	$scope.addLocation = function(){
	    		if($scope.locationForm.$valid){
	    			$scope.$emit('addLocation');
	    		}
	    	}  
	    }
	};
});