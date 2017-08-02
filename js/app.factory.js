app.factory('appFactory', function() {
    var appData = {};
    appData.markers = [];
    appData.categories = [];

    var appData = {
        setCategoriesInfo: function(data){
            appData.categories = data;
        },
        getCategoriesInfo: function(){
            return appData.categories;
        },
        getCategories: function(){
            return [{
                key: 'temples',
                label: 'Temples'
            }, {
                key: 'museums',
                label: 'Museums'
            }, {
                key: 'lakes',
                label: 'Lakes'
            },{
                key: 'hillstations',
                label: 'Hill Stations'
            }, {
                key: 'flowergardens',
                label: 'Flower Gardens'
            }, {
                key: 'forts',
                label: 'Forts'
            }];
        },
        getIcons: function(){
            return {
                'temples' : '../images/temple.png',
                'museums' : '../images/museum.png',
                'hillstations' : '../images/hill.png',
                'flowergardens' : '../images/flower.png',
                'forts' : '../images/fort.png',
                'lakes' : '../images/lakes.png'
            }
        },
        getColors: function(){
            return {
                'temples' : '#f0592b',
                'museums' : '#f79320',
                'hillstations' : '#66960c',
                'flowergardens' : '#eb46ac',
                'forts' : '#1b4366',
                'lakes' : '#2a7fb8'
            }
        },
        getConfigObject: function(val, key, category){
            return {
                id: 'custom-marker'+category+key,
                latitude: val.latitude,
                longitude: val.longitude,
                icon: appData.getIcons()[category],
                options: {
                    label: {
                        text:val.name,
                        fontWeight: 'bold',
                        fontSize:'12px',
                        fontFamily: 'sans-serif',
                        lineHeight:'24px',
                        color: appData.getColors()[category]
                    },
                    animation: 'BOUNCE'
                },
                name:val.name,
                data: val,
                templateUrl: "markerDetails.html",
            }
        },
        formatMarkers: function(data, category){
            var obj = {};
            appData.markers = [];
            angular.forEach(data, function(val, key){
                appData.markers.push(appData.getConfigObject(val, key, category));
            });
            return appData.markers;
        }
    };
    return appData;
});