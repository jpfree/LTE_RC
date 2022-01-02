<template>
    <div>
        <RCCalibration/>
    </div>
</template>

<script>
import RCCalibration from "../components/RCCalibration";

export default {
    name: 'Home',

    components: {
        RCCalibration,
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
