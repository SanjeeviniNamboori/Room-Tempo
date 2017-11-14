<template src="./notificationDetailVue.template.html"></template>
<script>
    export default {
        data() {
            return {
                editMode: false,
                showNewEntity: false,
                newEntity: null,
                showRelSearch: false,
                key: "GetAllUsers",
                arrSearchResult: [],
                notificationDetail: null
            }
        },
        props: ["listType"],
        methods: {
            deleteNotification: function () {

            },
            editNotification: function () {
                this.editMode = !this.editMode;
            },
            saveNotification: function () {
                // if (this.notificationId > 0) {

                this.$store.dispatch("dataRequestHandler", {
                    key: 'CreateNotification',
                    params: {
                        templateId: 4,
                        userDevices: [
                            { deviceId: this.notificationDetail.response.userIds, type: 'Android', send: true }
                        ],
                        notifyOptions: {
                            "Android": true,
                            "IOS": false,
                            "SMS": true,
                            "Web": false,
                            "Email": false
                        },
                        entityInstanceId: 62,
                        entityId: 3
                    },
                    callback: function (err, response) {
                        console.log(response);
                    }
                });
                this.editMode = false;
            },

            goToEntity: function (entity) {
                window.location.href = this.$store.state.uiPageName + "#notification/" + this.notificationId + "/entity/" + entity.response.cbkey;
            },
            newNotification: function () {
                window.location.href = this.$store.state.uiPageName + "#notification/0";
            },
            getNotificationDetails: function () {
                let vm = this;                
                vm.$store.dispatch("dataRequestHandler", {
                    key: "GetNotificationDetail",
                    params: {
                        notificationId: vm.notificationId
                    },
                    callback: (err, response) => {
                        if (Array.isArray(response)) {
                            console.log(response);
                            vm.notificationDetail = response[0];
                        }
                    }
                });
            }
        },
        computed: {
            notificationId() {
                let notificationId = this.$store.state.selectedNotificationDetail.notificationId;
                return notificationId;
            },
            
        },
        watch: {
            notificationId() {
                this.getNotificationDetails();
            }
        },
        mounted() {
            this.getNotificationDetails();
        }
    }

</script>