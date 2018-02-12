/**
 * Created by EDDIEZ on 20/10/2015.
 */
define(['./srvModule'], function (module) {
    var fileUpload = module.service('fileUpload', ['Upload', function (Upload) {
        this.uploadFileToUrl = function (file, uploadUrl, imageInfo, callback) {
            Upload.rename(file, imageInfo.imageName);
            Upload.upload({
                url: uploadUrl,
                file: file,
                data: {
                    "id": imageInfo.id,
                    "newPhotoSrc": imageInfo.photoStruct
                }
            }).then(function (resp) {
                if (resp.data.responseInfo.isErrorOccurred === true) {
                    console.log('Error status: ' + resp.status + ', Error Msg: '+ resp.data.responseInfo.responseMsg);
                    callback(resp.data)
                }
                else {
                    console.log('Success ' + resp.config.data.file.name + ' uploaded.');
                    callback(resp.data);
                }
            });
        }
    }]);
    return fileUpload;
});