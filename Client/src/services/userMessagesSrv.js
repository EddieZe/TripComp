/**
 * Created by EDDIEZ on 20/10/2015.
 */
define(['./srvModule', 'bootstrap-dialog'], function (module, BootstrapDialog) {
    var showMessage = module.service('showMessage', function () {
        return {
            showError: function (errMsg) {
                BootstrapDialog.show({
                    title: 'Error',
                    type: BootstrapDialog.TYPE_WARNING,
                    message: $('<div>' + errMsg + '</div>').html(),
                    draggable: true,
                    buttons: [{
                        id: 'btn-ok',
                        icon: 'glyphicon glyphicon-check',
                        label: 'OK',
                        cssClass: 'btn-primary',
                        action: function (dialogRef) {
                            dialogRef.close();
                        }
                    }]
                });
            },
            showMessage: function (msg) {
                BootstrapDialog.show({
                    title: 'Success',
                    type: BootstrapDialog.TYPE_SUCCESS,
                    message: $('<div>' + msg + '</div>').html(),
                    draggable: true,
                    buttons: [{
                        id: 'btn-ok',
                        icon: 'glyphicon glyphicon-check',
                        label: 'OK',
                        cssClass: 'btn-primary',
                        action: function (dialogRef) {
                            dialogRef.close();
                        }
                    }]
                });
            }
        }
    });
    return showMessage;
});