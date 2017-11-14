<template src="./leftMenuComponent.template.html"></template>
<script>
    import $ from 'jquery'

    export default {
        // options
        props: ["instanceId", "clientId"],
        data() {
            return {};
        },
        methods: {
            getData: function () {
                $('[data-toggle="tooltip"]').tooltip();
            },
            toggleSideBar: function () {
                $("#leftMenu").toggleClass("expand");
                $("#nav-icon3").toggleClass("open");
                $(".menuMask").toggle();
            },
            pinSideBar: function () {
                $(".mainContent").toggleClass("fix");
                $(".sideBar").toggleClass("fix");
                $(".menuMask").hide();
                var currentItem = $(".pintx");
                if ($(currentItem).text() == "Always show sidebar") {
                    $(currentItem).text("Hide sidebar");
                    $(".sideBar").removeClass("expand");
                }
                else
                    $(currentItem).text("Always show sidebar");
                $("#nav-icon3").removeClass("open")
            },
            switchClient: function () {
                window.location.href = this.$store.state.uiPageName;
            },
            redirectToUsers: function () {
                window.location.href = this.$store.state.uiPageName + "#users";
            },
            // redirectToHome: function () {
            //     if (this.$store.state.selectedClientDetail.landingPage)
            //         window.location.href = this.$store.state.uiPageName + this.$store.state.selectedClientDetail.clientId;
            //     else
            //         window.location.href = this.$store.state.uiPageName + "#client/" + this.$store.state.selectedClientDetail.clientId;
            // },
            redirectToSolutions: function () {
                window.location.href = this.$store.state.uiPageName + "#solutionList";
                $("#leftMenu").removeClass("expand");
                $("#nav-icon3").removeClass("open");
                $(".menuMask").hide();
            },
            redirectToMenuGroups: function () {
                window.location.href = this.$store.state.uiPageName + "#menugroup";
                $("#leftMenu").removeClass("expand");
                $("#nav-icon3").removeClass("open");
                $(".menuMask").hide();
            },
            redirectToBaseCalendar: function () {
                window.location.href = this.$store.state.uiPageName + "#basecalendars";
                $("#leftMenu").removeClass("expand");
                $("#nav-icon3").removeClass("open");
                $(".menuMask").hide();
            },
            redirectToNotifications: function () {
                window.location.href = this.$store.state.uiPageName + "#notifications";
                $("#leftMenu").removeClass("expand");
                $("#nav-icon3").removeClass("open");
                $(".menuMask").hide();
            },
            redirectToUserTypes() {
                window.location.href = this.$store.state.uiPageName + "#users";
                $("#leftMenu").removeClass("expand");
                $("#nav-icon3").removeClass("open");
                $(".menuMask").hide();
            },
            redirectToUserGroups() {
                window.location.href = this.$store.state.uiPageName + "#userGroupList";
                $("#leftMenu").removeClass("expand");
                $("#nav-icon3").removeClass("open");
                $(".menuMask").hide();
            },
            redirectToChangePassword() {
                window.location.href = this.$store.state.uiPageName + "#changePassword";
                $("#leftMenu").removeClass("expand");
                $("#nav-icon3").removeClass("open");
                $(".menuMask").hide();
            },
            redirectToMenus() {
                window.location.href = this.$store.state.uiPageName + "#menuList";
                $("#leftMenu").removeClass("expand");
                $("#nav-icon3").removeClass("open");
                $(".menuMask").hide();
            },
            redirectToReservations() {
                window.location.href = this.$store.state.uiPageName + "#reservations";
            }
        },
        computed: {
            isCurrentUserAdmin() {
                return this.$store.state.isCurrentUserAdmin;
            }
        },
        watch: {},
        mounted() {
            this.getData();
        }
    }

</script>