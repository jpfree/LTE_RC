<template>
    <div>
        <AddDrone/>
        <RCCalibration/>
    </div>
</template>

<script>
import RCCalibration from "../components/RCCalibration";
import AddDrone from "../components/AddDrone";

export default {
    name: 'Home',

    components: {
        AddDrone,
        RCCalibration
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