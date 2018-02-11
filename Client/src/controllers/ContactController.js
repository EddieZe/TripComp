/**
 * Created by EDDIEZ on 19/10/2015.
 */

define(['./ctrlModule'], function(module){
    var contactController = module.controller('ContactController', function ($scope, $http, $location, showMessage) {

        $scope.name = "ContactController";

        $scope.message = {};

        $scope.sendMessage = function () {
            var responseInfo;
            console.log($scope.message);

            $http({
                method: 'POST',
                url: '/sendEmail',
                data: {
                    "message": $scope.message
                },
                headers: {'Content-Type': 'application/json'}
            })
                .success(function (data, status, headers, config) {
                    if (data.responseInfo.isErrorOccurred) {
                        showMessage.showError(data.responseInfo.responseMsg);
                    }
                    else {
                        showMessage.showMessage('Thank you for contact us. We will handle your message and come back to you if needed');
                        $location.path("/");
                    }
                })
                .error(function (data, status) {
                    if (status == 0) {
                        responseInfo = {
                            isErrorOccurred: true,
                            responseMsg: 'Can\'t reach the server, please contact the Administrator',
                            errorData: status
                        };
                        showMessage.showError(responseInfo.responseMsg);
                    }
                    else {
                        responseInfo = {isErrorOccurred: true, responseMsg: 'Error Occured', errorData: data};
                        showMessage.showError(responseInfo.responseMsg + responseInfo.errorData);
                    }
                });
        };

    });

    return contactController;
});
