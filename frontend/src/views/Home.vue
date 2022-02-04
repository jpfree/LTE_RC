<template>
    <div>
        <AddDrone/>
        <RCData/>
<!--        <RCCalibration/>-->
    </div>
</template>

<script>
import RCData from "../components/RCData";
import AddDrone from "../components/AddDrone";
// import RCCalibration from "../components/RCCalibration";

export default {
    name: 'Home',

    components: {
        AddDrone,
        RCData,
        // RCCalibration
    },

    created() {
        // console.log(document.cookie);
        // document.cookie.split(";").forEach((c) => {
        //     console.log(c);
        //     document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
        // });
    }
}
</script>