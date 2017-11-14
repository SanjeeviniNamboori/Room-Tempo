<template src="./notificationItemComponent.template.html"></template>
<script>
    export default {
        // options
        name: "notificationItemComponent",
        props: ["instanceId", "filterType", "updateCount", "instance"],
        data() {
            return {};
        },
        methods: {
            getData: function () {
                //call action to get data
                this.$store.dispatch("getNotificationDetail", { "params": { notificationId: this.instanceId.toString() } })
            },
            selectInstance: function (instance) {
                window.location.href = this.$store.state.uiPageName + "#instance/" + instance.response.cbkey;
            },
            naviagateToDetail(notificationObj) {
                this.dismissNotification(notificationObj);
                window.location.href = this.$store.state.uiPageName + "#notifications/" + notificationObj.NotificationIdText;
            },
            dismissNotification(notificationObj) {
                let scope = this;
                scope.updateCount(notificationObj);
                notificationObj.Status = 2;

                scope.updateNotificationStatus([notificationObj.NotificationIdText]);
            },
            dimissAllNotifications() {
                let scope = this;
                let arrNotificationIds = [];

                scope.unreadCount = 0;

                for (let index = 0; index < scope.notificatoinKeyList.length; index++) {
                    if (scope.notificatoinKeyList[index]["Status"] == 1) {
                        scope.notificatoinKeyList[index]["Status"] = 2;
                        arrNotificationIds.push(scope.notificatoinKeyList[index]["NotificationIdText"]);
                    }
                }

                if (arrNotificationIds.length > 0) {
                    scope.updateNotificationStatus(arrNotificationIds);
                }
            },
            updateNotificationStatus(arrNotificationIds) {
                let scope = this;

                scope.$store.dispatch("dataRequestHandler", {
                    key: "DismissNotification",
                    params: {
                        notificationId: arrNotificationIds,
                        statusId: 2
                    },
                    callback: (err, response) => {
                        //console.log(response);
                        if (err)
                            return;
                    }
                })
            }
        },
        computed: {
            entityInstance() {
                return this.$store.getters.getNotificationDetail({ "params": { notificationId: this.instanceId.toString() } });
            }
        },
        watch: {
            instanceId: function (value) {
                this.getData();
            },
            instance: function(){
                
            }
        },
        mounted() {
            this.getData();
        }
    }

</script>