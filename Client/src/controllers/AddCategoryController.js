/**
 * Created by EDDIEZ on 20/10/2015.
 */
define(['./ctrlModule'], function(module) {
    var addCategoryController = module.controller('AddCategoryController', function ($scope, $http, $location, showMessage) {

        $scope.name = "AddCategoryController";

        $scope.addNewCategory = function () {
            var responseInfo;
            $http({
                method: 'POST',
                url: '/addNewCategory',
                data: {
                    "categoryName": $scope.categoryName
                },
                headers: {'Content-Type': 'application/json'}
            })
                .success(function (data, status, headers, config) {
                    if (data.responseInfo.isErrorOccurred) {
                        showMessage.showError(data.responseInfo.responseMsg);
                    }
                    else {
                        showMessage.showMessage('The category was added');
                        $location.path("/");
                    }


                })
                .error(function (data, status) {
                    if (status === 0) {
                        responseInfo = {
                            isErrorOccurred: true,
                            responseMsg: 'Can\'t reach the server, please contact the Administrator',
                            errorData: status
                        };
                        showMessage.showError(responseInfo.responseMsg);
                    }
                    else {
                        responseInfo = {isErrorOccurred: true, responseMsg: 'Error occurred', errorData: data};
                        showMessage.showError(responseInfo.responseMsg + responseInfo.errorData);
                    }
                });
        }
    });

    return addCategoryController;
});