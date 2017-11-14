<template src="./notificationListVue.template.html"></template>
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
                notifications: [],
                noResultMessage: false
            }
        },
        props: ["parentId", "parentType", "entityId", "clientId", "paramId", "listType"],
        methods: {
            getNotificationList: function () {

                let scope = this;
                scope.$store.dispatch("dataRequestHandler", {
                    key: "GetNotificationList",
                    params: { entityId: scope.entityId },
                    callback: (err, response) => {
                        console.log(response);
                        if (err)
                            return;

                        scope.notifications = response[0];
                    }
                })

            },
            deleteClient: function () {

            },
            editClient: function () {
                this.editMode = !this.editMode;
            },
            goToNotification: function (notificationObj) {
                 window.location.href = this.$store.state.uiPageName + "#notifications/" + notificationObj.NotificationIdText;
            },
            newNotificatoin: function () {
                window.location.href = this.$store.state.uiPageName + "#notifications/0";
            }
        },
        computed: {
            keyList() {
                return this.$store.dispatch("getDataByType", { "type": "notification" });
            }
        },
        mounted() {
            this.getNotificationList();
        }
    }

</script>