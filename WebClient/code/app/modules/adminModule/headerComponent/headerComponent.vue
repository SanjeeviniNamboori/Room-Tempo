<template src="./headerComponent.template.html"></template>
<script>
    import $ from 'jquery'
    export default {
        // options
        data() {
            return {
                notificationList: [],
                filterType: 'prepared',
                // notificatoinKeyList: [],
                userImage: "https://cdn2.iconfinder.com/data/icons/ios-7-icons/50/user_male2-512.png",
                userName: null,
                userNotifications: [],
                // notificationCount: 0,
                userProfile: null,
                unreadCount: 0
            };
        },
        methods: {
            toggleNotification: function () {
                $("#notification").toggleClass("expand");
                $(".notoficationButton").toggleClass("active");
                $(".menuMaskN").toggle();
            },
            logout: function () {
                let scope = this;
                /*
                scope.$store.dispatch("dataRequestHandler", {
                    key: "UserLogout",
                    params: {},
                    callback: (err, response) => {
                        //console.log(response);
                        if (err) {
                            vm.$store.dispatch("toastr", {
                                type: "error",
                                message: err
                            });
                            console.log(err);
                            return;
                        }

                        window.localStorage.removeItem("vwtoken");
                        if (window.localStorage.getItem('loginType')) {
                            window.location.href = "dist/client/login.html";
                            window.localStorage.removeItem("loginType");
                        }
                        else
                            window.location.href = "dist/client/login.html";
                    }
                });
                */
                window.localStorage.removeItem("rttoken");
                window.location.href = "login.html";
            },
            redirectToHome: function () {
                window.location.href = this.$store.state.uiPageName;// + this.userDetail.response["p_9"]["txt"];
            },
            gotoHome() {
                //window.location.href = this.$store.state.uiPageName;
            },
            clearMessages: function () {
                changeNotificationStatus(scope.userNotifications, "archieved");
            },
            changeNotificationStatus: function (notifications, status) {
                let scope = this;
                scope.$store.dispatch("dataRequestHandler", {
                    "key": "UpdateNotification", "params": { "notifications": notifications, "status": status }, "callback": function (err, response) {
                        //console.log(response);
                        scope.userNotifications = [];
                        scope.notificationCount = 0;
                    }
                });
            },
            getNotifications() {
                // let scope = this;
                // scope.$store.dispatch("dataRequestHandler", {
                //     key: "GetNotificationList",
                //     params: {},
                //     callback: (err, response) => {
                //         //console.log(response);
                //         if (err)
                //             return;

                //         scope.notificatoinKeyList = response[0];
                //         scope.unreadCount = response[1][0]["unreadCount"];

                //     }
                // })

            },
            getNotifications1() {
                //this.$store.dispatch("getNotificationKeys", { "params": {} })
            },
            showNotificationByType(type) {
                this.filterType = type;
            },
            redirectToNotifications: function () {
                window.location.href = this.$store.state.uiPageName + "#notifications";
            },
            navigateToUserProfile: function () {
                window.location.href = this.$store.state.uiPageName + "#userProfile";
            },
            getUserProfile() {
                var self = this;
                this.$store.dispatch("dataRequestHandler", {
                    key: 'GetUserProfile', params: {}, callback: function (err, response) {
                        //console.log(err + "/" + response);
                        if (response.recordsets.length === 0) {
                            return;
                        }
                        else {
                            self.userProfile = response.recordsets[0][0];
                            self.userImage = self.userProfile.ProfileImage;
                            self.userName = self.userProfile.userFirstName + " " + self.userProfile.userLastName;

                        }
                    }
                });
            },
            redirectToChangePassword() {
                window.location.href = this.$store.state.uiPageName + "#changePassword";
            },
            naviagateToDetail(notificationObj) {
                this.dismissNotification(notificationObj);
                window.location.href = this.$store.state.uiPageName + "#notifications/" + notificationObj.NotificationIdText;
            },
            dimissAllNotifications() {
                let scope = this;
                let arrNotificationIds = [];

                for (let index = 0; index < scope.notificatoinKeyList.response.length; index++) {
                    arrNotificationIds.push(scope.notificatoinKeyList.response[index]["NotificationIdText"]);
                }

                if (arrNotificationIds.length > 0) {
                    scope.updateNotificationStatus(arrNotificationIds);
                    scope.notificatoinKeyList.response.splice(0, Infinity);
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
            },
            updateNotificationCount(notificationObj) {
                let scope = this;
                let index = scope.notificatoinKeyList.response.findIndex(x => x.NotificationIdText == notificationObj.NotificationIdText);
                if (index > -1) {
                    scope.notificatoinKeyList.response.splice(index, 1);
                }
            }
        },
        computed: {
            notificatoinKeyList() {
                return [];//this.$store.getters.getNotificationKeys({ "params": {} });
            },
            notificationCount() {
                if (this.notificatoinKeyList && this.notificatoinKeyList.status == 'success') {
                    let count = 0;
                    for (let index = 0; index < this.notificatoinKeyList.response.length; index++) {
                        if (this.notificatoinKeyList.response[index]["Status"] == 1) {
                            count++;
                        }
                    }
                    return count;
                }
                return 0;
            }
        },
        watch: {
            namespaceInstanceId() {
                //console.log("test");
                //console.log(this.namespaceInstanceId);
                //Check whether user is belongs to admin group or not
            }
        },
        mounted() {
            this.getNotifications1();
            this.getUserProfile();
        }
    }

</script>