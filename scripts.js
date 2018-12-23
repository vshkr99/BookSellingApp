var app=angular.module("application",["ngRoute"]);

app.config(['$routeProvider',function($routeProvider){
    $routeProvider
    .when("/signin",{
        templateUrl :  "views/login.html"
    }).when("/explore",{
        templateUrl: "views/explore.html",
        controller: "exploreCtrl"
    }).when("/addNew",{
        templateUrl: "views/newAddition.html",
        controller: "addItem"
    }).when("/imageUpload",{
        templateUrl:"views/imageUpload.html",
        controller: "imageUpload"
    })
    .otherwise({
        template : "<h1>rceljkrmc.,celcrnle,rce</h1>"
    })
}]);


app.controller("exploreCtrl",function($scope,$http,$location){
    $http({
        method:"GET",
        url:"/data"
    }).then(function(response){
        console.log(response);
        $scope.items=response.data;
    },function(res){
        throw res;
    })

    $scope.remove=function(it){
        if(confirm("Are you sure you want ot delete this entry?")){
            $http({
                method:"DELETE",
                url:'/delete',
                data:it
            }).then(function(response){
                if(response.remove="success"){
                    console.log("Entry deleted");
                    location.reload();
                }
            },function(err){
                throw err;
            })
        }
    }
});

app.controller("addItem",function($scope,$http,$location){
    $scope.item={};
    $scope.add=function(){
        console.log($scope.item);
        $http({
            method:'POST',
            url : '/add',
            data:$scope.item
        }).then(function(response){
            if(response.send='success'){
                console.log("RECORDED");
                $location.path("/explore");
                
            }
        },function(err){
            throw err;
        });
    }
});


app.controller("imageUpload",function($scope,$http) {
    
    $scope.upload=function(){
        $http({
            method:"POST",
            url:"/image",
            data:{file:$scope.file},
            headers:{
                'Content-Type' : 
            }
        }).then(function(response){
            if(response.upload="success"){
                console.log("Image uploaded to the server");
                alert("Image has been uploaded");
            }
        },function(err){
            throw err;
        })
    }
});