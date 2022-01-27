import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";
import EventBus from '../EventBus';

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        MOBIUS_CONNECTION_CONNECTED: false,
        VUE_APP_MOBIUS_HOST: '203.253.128.177',
        VUE_APP_MOBIUS_GCS: 'KETI_MUV',
        VUE_APP_MOBIUS_RCID: 'RC1',
        VUE_APP_MOBIUS_RC: 'KETI_RC',
        client: {
            connected: false,
            loading: false
        }
    },

    mutations: {
        initTempMarkers(state, payload) {
            state.tempMarkers.unknown = null;
            state.tempMarkers.unknown = [];
            state.tempMarkers.unknown = JSON.parse(JSON.stringify(payload));
        },

        setDroneColorMap(state, payload) {
            state.drone_infos[payload.pName].color = payload.color;
        },

        updatePosition(state, payload) {
            console.log(payload);
            console.log(state.gotoMarkers[payload.mIndex].positions[payload.pIndex].lat);
            state.gotoMarkers[payload.mIndex].positions[payload.pIndex].lat = payload.lat;
            state.gotoMarkers[payload.mIndex].positions[payload.pIndex].lng = payload.lng;
        },

        updateFillColor(state, payload) {
            console.log(payload);
            state.gotoMarkers[payload.mIndex].m_icon.fillColor = payload.fillColor;
        },

        updateLabelText(state, payload) {
            console.log(payload);
            state.gotoMarkers[payload.mIndex].positions[payload.pIndex].m_label.fontSize = '14px';
            state.gotoMarkers[payload.mIndex].positions[payload.pIndex].m_label.text = String(payload.text) + ':' + String(state.gotoMarkers[payload.mIndex].positions[payload.pIndex].alt);
        },

        initUnknownInfo(state, unknown) {
            state.unknown_info = null;
            state.unknown_info = {};
            state.unknown_info = JSON.parse(JSON.stringify(unknown));

            for (let idx in state.unknown_info.goto_positions) {
                if (Object.prototype.hasOwnProperty.call(state.unknown_info.goto_positions, idx)) {
                    let pos_arr = state.unknown_info.goto_positions[idx].split(':');

                    let pos = JSON.parse(JSON.stringify(state.defaultPosition));
                    pos.lat = parseFloat(pos_arr[0]);
                    pos.lng = parseFloat(pos_arr[1]);
                    pos.alt = parseFloat(pos_arr[2]);
                    pos.speed = parseFloat(pos_arr[3]);
                    pos.radius = parseFloat(pos_arr[4]);
                    pos.turningSpeed = parseFloat(pos_arr[5]);
                    pos.targetMavCmd = parseInt(pos_arr[6]);
                    pos.targetStayTime = parseInt(pos_arr[7]);
                    pos.elevation = parseInt(pos_arr[8]);
                    pos.color = 'grey';
                    pos.m_icon.fillColor = 'grey';
                    pos.m_label.fontSize = '14px';
                    pos.m_label.text = 'T:' + String(pos.alt);

                    state.drone_infos.unknown.color = pos.color;
                    state.tempMarkers.unknown.push(pos);
                    pos = null;
                }
            }
        },

        updateTempPosition(state, payload) {
            console.log('updateTempPosition', payload);

            // let self = this;
            let temp = JSON.parse(JSON.stringify(state.tempMarkers));
            state.tempMarkers = null;
            state.tempMarkers = JSON.parse(JSON.stringify(temp));
            temp = null;

            state.tempMarkers[payload.pName][payload.pIndex].lat = payload.lat;
            state.tempMarkers[payload.pName][payload.pIndex].lng = payload.lng;
            state.tempMarkers[payload.pName][payload.pIndex].targeted = payload.value;

            let drone = state.drone_infos[payload.pName];

            let mav_cmd = (drone.goto_positions[payload.pIndex].split(':')[6])?drone.goto_positions[payload.pIndex].split(':')[6]:16;
            let targetStayTime = (drone.goto_positions[payload.pIndex].split(':')[7])?drone.goto_positions[payload.pIndex].split(':')[7]:1;

            drone.goto_positions[payload.pIndex] = String(state.tempMarkers[payload.pName][payload.pIndex].lat) + ':' +
                String(state.tempMarkers[payload.pName][payload.pIndex].lng) + ':' +
                String(state.tempMarkers[payload.pName][payload.pIndex].alt) + ':' +
                String(state.tempMarkers[payload.pName][payload.pIndex].speed) + ':' +
                String(state.tempMarkers[payload.pName][payload.pIndex].radius) + ':' +
                String(state.tempMarkers[payload.pName][payload.pIndex].turningSpeed) + ':' + mav_cmd + ':' + targetStayTime + ':' +
                String(state.tempMarkers[payload.pName][payload.pIndex].elevation);

            let _temp = JSON.parse(JSON.stringify(state.drone_infos[payload.pName]));
            state.drone_infos[payload.pName] = null;
            state.drone_infos[payload.pName] = {};
            state.drone_infos[payload.pName] = JSON.parse(JSON.stringify(_temp));
            _temp = null;

            if (payload.pName === 'unknown') {
                state.unknown_info = null;
                state.unknown_info = {};
                state.unknown_info = JSON.parse(JSON.stringify(state.drone_infos.unknown));
            }
            else {
                // let _selected = [];
                // for (let dName in state.drone_infos) {
                //     if (Object.prototype.hasOwnProperty.call(state.drone_infos, dName)) {
                //         if (state.drone_infos[dName].selected) {
                //             _selected.push(state.drone_infos[dName]);
                //         }
                //     }
                // }

                this.commit('updateDroneInfosSelected');
            }

            axios({
                validateStatus: function (status) {
                    // 상태 코드가 500 이상일 경우 거부. 나머지(500보다 작은)는 허용.
                    return status < 500;
                },
                method: 'post',
                url: 'http://' + state.VUE_APP_MOBIUS_HOST + ':7579/Mobius/' + state.VUE_APP_MOBIUS_GCS + '/Info',
                headers: {
                    'X-M2M-RI': String(parseInt(Math.random() * 10000)),
                    'X-M2M-Origin': 'SVue',
                    'Content-Type': 'application/json;ty=4'
                },
                data: {
                    'm2m:cin': {
                        con: state.drone_infos
                    }
                }
            }).then(
                function (res) {
                    console.log('updateTempPosition-axios', res.data);
                }
            ).catch(
                function (err) {
                    console.log(err.message);
                }
            );
        },

        selectTempMarker(state, payload) {
            console.log(payload);

            state.tempMarkers[payload.pName].forEach((pos) => {
                pos.selected = false;
            });

            state.tempMarkers[payload.pName][payload.pIndex].selected = payload.selected;
        },

        setSelected(state, payload) {
            state.tempMarkers[payload.pName][payload.pIndex].selected = payload.value;
        },

        setAllTempMarker(state, value) {
            console.log(value);

            if (value) {
                for (let pName in state.tempMarkers) {
                    if (Object.prototype.hasOwnProperty.call(state.tempMarkers, pName)) {
                        state.tempMarkers[pName].forEach((pos) => {
                            if (!pos.selected) {
                                pos.selected = true;
                                let temp = JSON.parse(JSON.stringify(pos.m_icon));
                                pos.m_icon = null;
                                pos.m_icon = JSON.parse(JSON.stringify(temp));
                                temp = null;
                                pos.m_icon.strokeWeight = 5;
                                pos.m_icon.strokeColor = 'springgreen';
                            }
                        });
                    }
                }
            }
            else {
                for (let pName in state.tempMarkers) {
                    if (Object.prototype.hasOwnProperty.call(state.tempMarkers, pName)) {
                        state.tempMarkers[pName].forEach((pos) => {
                            if (pos.selected) {
                                pos.selected = false;
                                let temp = JSON.parse(JSON.stringify(pos.m_icon));
                                pos.m_icon = null;
                                pos.m_icon = JSON.parse(JSON.stringify(temp));
                                temp = null
                                pos.m_icon.strokeWeight = 1;
                                pos.m_icon.strokeColor = 'grey';
                            }
                        });
                    }
                }
            }
        },

        setTargetAllTempMarker(state, payload) {
            console.log(payload);

            if (payload.value) {
                state.tempMarkers[payload.pName].forEach((pos, pIndex) => {
                    if (!pos.selected) {
                        if (!pos.targeted) {
                            pos.targeted = true;
                            let temp = JSON.parse(JSON.stringify(pos.m_icon));
                            pos.m_icon = null;
                            pos.m_icon = JSON.parse(JSON.stringify(temp));
                            temp = null;
                            pos.m_icon.strokeWeight = 4;
                            pos.m_icon.strokeColor = '#FFFF8D';

                            state.curTargetedTempMarkerIndex[payload.pName] = pIndex;
                        }
                    }
                });
            }
            else {
                state.tempMarkers[payload.pName].forEach((pos) => {
                    if (!pos.selected) {
                        if (pos.targeted) {
                            pos.targeted = false;
                            let temp = JSON.parse(JSON.stringify(pos.m_icon));
                            pos.m_icon = null;
                            pos.m_icon = JSON.parse(JSON.stringify(temp));
                            temp = null;
                            pos.m_icon.strokeWeight = 1;
                            pos.m_icon.strokeColor = 'grey';

                            state.curTargetedTempMarkerIndex[payload.pName] = null;
                        }
                    }
                });
            }
        },

        setTempMarker(state, payload) {
            console.log(payload);

            let value = payload.value;
            let pName = payload.pName;
            let pIndex = payload.pIndex;

            let temp = JSON.parse(JSON.stringify(state.tempMarkers[pName][pIndex].m_icon));

            if (value) {
                if (!state.tempMarkers[pName][pIndex].selected) {
                    state.tempMarkers[pName][pIndex].selected = true;
                    state.tempMarkers[pName][pIndex].m_icon = null;
                    state.tempMarkers[pName][pIndex].m_icon = JSON.parse(JSON.stringify(temp));
                    temp = null;
                    state.tempMarkers[pName][pIndex].m_icon.strokeWeight = 5;
                    state.tempMarkers[pName][pIndex].m_icon.strokeColor = 'springgreen';
                }
            }
            else {
                if (state.tempMarkers[pName][pIndex].selected) {
                    state.tempMarkers[pName][pIndex].selected = false;
                    state.tempMarkers[pName][pIndex].m_icon = null;
                    state.tempMarkers[pName][pIndex].m_icon = JSON.parse(JSON.stringify(temp));
                    temp = null;
                    state.tempMarkers[pName][pIndex].m_icon.strokeWeight = 1;
                    state.tempMarkers[pName][pIndex].m_icon.strokeColor = 'grey';
                }
            }
        },

        setTargetTempMarker(state, payload) {
            console.log(payload);

            let value = payload.value;
            let pName = payload.pName;
            let pIndex = payload.pIndex;

            let temp = JSON.parse(JSON.stringify(state.tempMarkers[pName][pIndex].m_icon));

            if (value) {
                if (!state.tempMarkers[pName][pIndex].targeted) {
                    state.tempMarkers[pName][pIndex].targeted = true;
                    state.tempMarkers[pName][pIndex].m_icon = null;
                    state.tempMarkers[pName][pIndex].m_icon = JSON.parse(JSON.stringify(temp));
                    temp = null;
                    state.tempMarkers[pName][pIndex].m_icon.strokeWeight = 4;
                    state.tempMarkers[pName][pIndex].m_icon.strokeColor = '#FFFF8D';

                    state.curTargetedTempMarkerIndex[pName] = pIndex;
                }
            }
            else {
                if (state.tempMarkers[pName][pIndex].targeted) {
                    state.tempMarkers[pName][pIndex].targeted = false;
                    state.tempMarkers[pName][pIndex].m_icon = null;
                    state.tempMarkers[pName][pIndex].m_icon = JSON.parse(JSON.stringify(temp));
                    temp = null;
                    state.tempMarkers[pName][pIndex].m_icon.strokeWeight = 1;
                    state.tempMarkers[pName][pIndex].m_icon.strokeColor = 'grey';

                    state.curTargetedTempMarkerIndex[pName] = null;
                }
            }


        },

        addTempMarker(state, payload) {
            if (!Object.prototype.hasOwnProperty.call(state.tempMarkers, payload.pName)) {
                state.tempMarkers[payload.pName] = [];
            }
            else {
                let temp = JSON.parse(JSON.stringify(state.tempMarkers[payload.pName]));
                state.tempMarkers[payload.pName] = null;
                state.tempMarkers[payload.pName] = [];
                state.tempMarkers[payload.pName] = JSON.parse(JSON.stringify(temp));
                temp = null;
            }

            let marker = JSON.parse(JSON.stringify(state.defaultPosition));
            marker.lat = payload.lat;
            marker.lng = payload.lng;
            marker.alt = payload.alt;
            marker.speed = payload.speed;
            marker.radius = payload.radius;
            marker.turningSpeed = payload.turningSpeed;
            marker.elevation = payload.elevation;
            marker.targetMavCmd = payload.targetMavCmd;
            marker.targetStayTime = payload.targetStayTime;

            marker.m_icon.fillColor = payload.color;
            marker.m_label.fontSize = '14px';
            marker.m_label.text = ((payload.pName === 'unknown') ? 'T' : String(state.tempMarkers[payload.pName].length)) + ':' + String(marker.alt);

            state.tempMarkers[payload.pName].push(marker);

            marker = null;

            //console.log('addTempMarker', JSON.stringify(state.tempMarkers));
        },

        addingTempMarker(state, payload) {
            state.adding = true;
            this.commit('addTempMarker', payload);

            payload.pIndex = state.tempMarkers[payload.pName].length - 1;
            state.tempPayload = JSON.parse(JSON.stringify(payload));

            payload = null;
        },

        cancelTempMarker(state) {
            if (state.adding) {
                state.tempMarkers.unknown.pop();
                state.tempPayload = {};
            }

            state.adding = false;
        },

        confirmAddTempMarker(state) {
            let payload = state.tempPayload;

            console.log('confirmAddTempMarker', payload)
            console.log('confirmAddTempMarker', state.tempMarkers)
            console.log('confirmAddTempMarker', state.tempMarkers[payload.pName][payload.pIndex].lat)

            state.drone_infos.unknown.goto_positions[payload.pIndex] = String(state.tempMarkers[payload.pName][payload.pIndex].lat) + ':' +
                String(state.tempMarkers[payload.pName][payload.pIndex].lng) + ':' +
                String(state.tempMarkers[payload.pName][payload.pIndex].alt) + ':' +
                String(state.tempMarkers[payload.pName][payload.pIndex].speed) + ':' +
                String(state.tempMarkers[payload.pName][payload.pIndex].radius) + ':' +
                String(state.tempMarkers[payload.pName][payload.pIndex].turningSpeed) + ':' +
                String(state.tempMarkers[payload.pName][payload.pIndex].targetMavCmd) + ':' +
                String(state.tempMarkers[payload.pName][payload.pIndex].targetStayTime) + ':' +
                String(state.tempMarkers[payload.pName][payload.pIndex].elevation);

            console.log('confirmAddTempMarker', payload.pName, payload.pIndex, state.drone_infos.unknown.goto_positions[payload.pIndex]);

            state.unknown_info = null;
            state.unknown_info = {};
            state.unknown_info = JSON.parse(JSON.stringify(state.drone_infos.unknown));

            axios({
                validateStatus: function (status) {
                    // 상태 코드가 500 이상일 경우 거부. 나머지(500보다 작은)는 허용.
                    return status < 500;
                },
                method: 'post',
                url: 'http://' + state.VUE_APP_MOBIUS_HOST + ':7579/Mobius/' + state.VUE_APP_MOBIUS_GCS + '/Info',
                headers: {
                    'X-M2M-RI': String(parseInt(Math.random() * 10000)),
                    'X-M2M-Origin': 'SVue',
                    'Content-Type': 'application/json;ty=4'
                },
                data: {
                    'm2m:cin': {
                        con: state.drone_infos
                    }
                }
            }).then(
                function (res) {
                    console.log('confirmAddTempMarker-axios', res.data);
                }
            ).catch(
                function (err) {
                    console.log(err.message);
                }
            );

            state.adding = false;
        },

        deleteMarker(state, payload) {
            console.log('deleteMarker', payload);

            let oldPos = JSON.parse(JSON.stringify(state.tempMarkers[payload.pName][payload.pIndex]));

            state.tempMarkers[payload.pName].splice(payload.pIndex, 1);

            state.tempMarkers[payload.pName].forEach((pos, pIndex) => {
                pos.m_label.fontSize = '14px';
                pos.m_label.text = ((payload.pName === 'unknown') ? 'T' : String(pIndex)) + ':' + String(pos.alt);
            });

            oldPos.m_icon.fillColor = 'grey';
            oldPos.m_label.text = 'T:' + String(oldPos.alt);

            let count = state.tempMarkers.unknown.push(oldPos);

            oldPos = null;

            let _payload = {};
            _payload.pOldName = payload.pName;
            _payload.pOldIndex = payload.pIndex;
            _payload.pName = 'unknown';
            _payload.pIndex = count - 1;

            this.commit('deleteMarkerDroneInfo', _payload);

            let temp = JSON.parse(JSON.stringify(state.tempMarkers));
            state.tempMarkers = null;
            state.tempMarkers = {};
            state.tempMarkers = JSON.parse(JSON.stringify(temp));
            temp = null;

        },

        removeMarker(state, payload) {
            console.log('removeMarker', payload);

            state.tempMarkers[payload.pName].splice(payload.pIndex, 1);

            let _payload = {};
            _payload.pOldName = payload.pName;
            _payload.pOldIndex = payload.pIndex;
            _payload.pName = payload.pName;
            _payload.pIndex = payload.pName;

            this.commit('removeMarkerDroneInfo', _payload);

            let temp = JSON.parse(JSON.stringify(state.tempMarkers));
            state.tempMarkers = null;
            state.tempMarkers = {};
            state.tempMarkers = JSON.parse(JSON.stringify(temp));
            temp = null;
        },

        removeAllMarker(state, payload) {
            console.log('removeAllMarker', payload);

            let unknownMarker = JSON.parse(JSON.stringify(state.tempMarkers.unknown));
            state.tempMarkers = null;
            state.tempMarkers = {};
            state.tempMarkers.unknown = JSON.parse(JSON.stringify(unknownMarker));
            unknownMarker = null;

            let temp = JSON.parse(JSON.stringify(state.tempMarkers));
            state.tempMarkers = null;
            state.tempMarkers = {};
            state.tempMarkers = JSON.parse(JSON.stringify(temp));
            temp = null;
        },

        registerMarker(state, payload) {
            console.log('registerMarker', payload);

            state.tempMarkers[payload.pOldName][payload.pOldIndex].alt = payload.targetAlt;
            state.tempMarkers[payload.pOldName][payload.pOldIndex].speed = payload.targetSpeed;
            state.tempMarkers[payload.pOldName][payload.pOldIndex].radius = payload.targetRadius;
            state.tempMarkers[payload.pOldName][payload.pOldIndex].turningSpeed = payload.targetTurningSpeed;
            state.tempMarkers[payload.pOldName][payload.pOldIndex].targetMavCmd = payload.targetMavCmd;
            state.tempMarkers[payload.pOldName][payload.pOldIndex].targetStayTime = payload.targetStayTime;

            let oldPos = JSON.parse(JSON.stringify(state.tempMarkers[payload.pOldName][payload.pOldIndex]));

            if (payload.pOldName !== payload.pName) {
                state.tempMarkers[payload.pOldName].splice(payload.pOldIndex, 1);

                state.tempMarkers[payload.pOldName].forEach((pos, pIndex) => {
                    pos.m_label.fontSize = '14px';
                    pos.m_label.text = ((payload.pOldName === 'unknown') ? 'T' : String(pIndex)) + ':' + String(pos.alt);
                });

                state.drone_infos[payload.pName].color = (payload.pName === 'unknown') ? 'grey' : payload.targetColor;
                oldPos.m_icon.fillColor = state.drone_infos[payload.pName].color;

                let count = state.tempMarkers[payload.pName].push(oldPos);
                payload.pIndex = count - 1;

                oldPos.m_label.fontSize = '14px';
                if (payload.pName === 'unknown') {
                    oldPos.m_label.text = 'T' + ':' + String(oldPos.alt);
                }
                else {
                    oldPos.m_label.text = String(count - 1) + ':' + String(oldPos.alt);
                }

                state.drone_infos[payload.pOldName].goto_positions.splice(payload.pOldIndex, 1);
                this.commit('regMarkerNameDroneInfo', payload);
            }

            else if (payload.pOldIndex !== payload.pIndex) {
                state.tempMarkers[payload.pOldName].splice(payload.pOldIndex, 1);

                console.log(state.tempMarkers[payload.pOldName]);

                state.tempMarkers[payload.pOldName].splice(payload.pIndex, 0, oldPos);

                state.tempMarkers[payload.pOldName].forEach((pos, pIndex) => {
                    pos.m_label.fontSize = '14px';
                    pos.m_label.text = ((payload.pOldName === 'unknown') ? 'T' : String(pIndex)) + ':' + String(pos.alt);
                });

                state.drone_infos[payload.pName].goto_positions.splice(payload.pOldIndex, 1);
                this.commit('regMarkerIndexDroneInfo', payload);
            }

            else {
                this.commit('regMarkerDroneInfo', payload);
            }

            oldPos = null;
            let temp = JSON.parse(JSON.stringify(state.tempMarkers));
            state.tempMarkers = null;
            state.tempMarkers = {};
            state.tempMarkers = JSON.parse(JSON.stringify(temp));
            temp = null;

            if(payload.pOldName === payload.pName && payload.pOldName === 'unknown') {
                state.tempMarkers[payload.pOldName][payload.pOldIndex].m_label.text = 'T:' + String(state.tempMarkers[payload.pOldName][payload.pOldIndex].alt);
            }
        },

        removeMarkerDroneInfo(state, payload) {
            state.drone_infos[payload.pOldName].goto_positions.splice(payload.pOldIndex, 1);

            console.log('removeMarkerDroneInfo', payload);

            state.unknown_info = null;
            state.unknown_info = {};
            state.unknown_info = JSON.parse(JSON.stringify(state.drone_infos.unknown));

            let temp = JSON.parse(JSON.stringify(state.drone_infos[payload.pName]));
            state.drone_infos[payload.pName] = null;
            state.drone_infos[payload.pName] = {};
            state.drone_infos[payload.pName] = JSON.parse(JSON.stringify(temp));
            temp = null;

            axios({
                validateStatus: function (status) {
                    // 상태 코드가 500 이상일 경우 거부. 나머지(500보다 작은)는 허용.
                    return status < 500;
                },
                method: 'post',
                url: 'http://' + state.VUE_APP_MOBIUS_HOST + ':7579/Mobius/' + state.VUE_APP_MOBIUS_GCS + '/Info',
                headers: {
                    'X-M2M-RI': String(parseInt(Math.random() * 10000)),
                    'X-M2M-Origin': 'SVue',
                    'Content-Type': 'application/json;ty=4'
                },
                data: {
                    'm2m:cin': {
                        con: state.drone_infos
                    }
                }
            }).then(
                function (res) {
                    console.log('removeMarkerDroneInfo-axios', res.data);
                }
            ).catch(
                function (err) {
                    console.log(err.message);
                }
            );
        },

        deleteMarkerDroneInfo(state, payload) {
            let oldPos = state.drone_infos[payload.pOldName].goto_positions.splice(payload.pOldIndex, 1);

            console.log('deleteMarkerDroneInfo', payload);

            // let pos_str = String(state.tempMarkers[payload.pName][payload.pIndex].lat) + ':' +
            //     String(state.tempMarkers[payload.pName][payload.pIndex].lng) + ':' +
            //     String(state.tempMarkers[payload.pName][payload.pIndex].alt) + ':' +
            //     String(state.tempMarkers[payload.pName][payload.pIndex].speed) + ':' +
            //     String(state.tempMarkers[payload.pName][payload.pIndex].radius) + ':' +
            //     String(state.tempMarkers[payload.pName][payload.pIndex].turningSpeed);

            state.drone_infos[payload.pName].goto_positions.push(oldPos[0]);

            let temp = JSON.parse(JSON.stringify(state.drone_infos[payload.pName]));
            state.drone_infos[payload.pName] = null;
            state.drone_infos[payload.pName] = {};
            state.drone_infos[payload.pName] = JSON.parse(JSON.stringify(temp));
            temp = null;

            axios({
                validateStatus: function (status) {
                    // 상태 코드가 500 이상일 경우 거부. 나머지(500보다 작은)는 허용.
                    return status < 500;
                },
                method: 'post',
                url: 'http://' + state.VUE_APP_MOBIUS_HOST + ':7579/Mobius/' + state.VUE_APP_MOBIUS_GCS + '/Info',
                headers: {
                    'X-M2M-RI': String(parseInt(Math.random() * 10000)),
                    'X-M2M-Origin': 'SVue',
                    'Content-Type': 'application/json;ty=4'
                },
                data: {
                    'm2m:cin': {
                        con: state.drone_infos
                    }
                }
            }).then(
                function (res) {
                    console.log('deleteMarkerDroneInfo-axios', res.data);
                }
            ).catch(
                function (err) {
                    console.log(err.message);
                }
            );
        },

        regMarkerNameDroneInfo(state, payload) {
            console.log('regMarkerNameDroneInfo', payload);

            let pos_str = String(state.tempMarkers[payload.pName][payload.pIndex].lat) + ':' +
                String(state.tempMarkers[payload.pName][payload.pIndex].lng) + ':' +
                String(state.tempMarkers[payload.pName][payload.pIndex].alt) + ':' +
                String(state.tempMarkers[payload.pName][payload.pIndex].speed) + ':' +
                String(state.tempMarkers[payload.pName][payload.pIndex].radius) + ':' +
                String(state.tempMarkers[payload.pName][payload.pIndex].turningSpeed) + ':' +
                String(state.tempMarkers[payload.pName][payload.pIndex].targetMavCmd) + ':' +
                String(state.tempMarkers[payload.pName][payload.pIndex].targetStayTime) + ':' +
                String(state.tempMarkers[payload.pName][payload.pIndex].elevation);

            state.drone_infos[payload.pName].goto_positions.push(pos_str);

            let temp = JSON.parse(JSON.stringify(state.drone_infos[payload.pName]));
            state.drone_infos[payload.pName] = null;
            state.drone_infos[payload.pName] = {};
            state.drone_infos[payload.pName] = JSON.parse(JSON.stringify(temp));
            temp = null;

            // let _selected = [];
            // for(let dName in state.drone_infos) {
            //     if(Object.prototype.hasOwnProperty.call(state.drone_infos, dName)) {
            //         if(state.drone_infos[dName].selected) {
            //             _selected.push(state.drone_infos[dName]);
            //         }
            //     }
            // }

            this.commit('updateDroneInfosSelected');

            // state.dronesChecked[payload.dName] = null;
            // state.dronesChecked[payload.dName] = state.drone_infos[payload.dName];
            //
            // temp = JSON.parse(JSON.stringify(state.dronesChecked));
            // state.dronesChecked = null;
            // state.dronesChecked = JSON.parse(JSON.stringify(temp));
            // temp = null;

            EventBus.$emit('do-targetDroneMarker', payload.pName);

            axios({
                validateStatus: function (status) {
                    // 상태 코드가 500 이상일 경우 거부. 나머지(500보다 작은)는 허용.
                    return status < 500;
                },
                method: 'post',
                url: 'http://' + state.VUE_APP_MOBIUS_HOST + ':7579/Mobius/' + state.VUE_APP_MOBIUS_GCS + '/Info',
                headers: {
                    'X-M2M-RI': String(parseInt(Math.random() * 10000)),
                    'X-M2M-Origin': 'SVue',
                    'Content-Type': 'application/json;ty=4'
                },
                data: {
                    'm2m:cin': {
                        con: state.drone_infos
                    }
                }
            }).then(
                function (res) {
                    console.log('regMarkerNameDroneInfo-axios', res.data);
                }
            ).catch(
                function (err) {
                    console.log(err.message);
                }
            );
        },

        regMarkerDroneInfo(state, payload) {
            console.log('regMarkerDroneInfo', payload);

            state.drone_infos[payload.pName].goto_positions[payload.pIndex] = String(state.tempMarkers[payload.pName][payload.pIndex].lat) + ':' +
                String(state.tempMarkers[payload.pName][payload.pIndex].lng) + ':' +
                String(state.tempMarkers[payload.pName][payload.pIndex].alt) + ':' +
                String(state.tempMarkers[payload.pName][payload.pIndex].speed) + ':' +
                String(state.tempMarkers[payload.pName][payload.pIndex].radius) + ':' +
                String(state.tempMarkers[payload.pName][payload.pIndex].turningSpeed) + ':' +
                String(state.tempMarkers[payload.pName][payload.pIndex].targetMavCmd) + ':' +
                String(state.tempMarkers[payload.pName][payload.pIndex].targetStayTime) + ':' +
                String(state.tempMarkers[payload.pName][payload.pIndex].elevation);

            let temp = JSON.parse(JSON.stringify(state.drone_infos[payload.pName]));
            state.drone_infos[payload.pName] = null;
            state.drone_infos[payload.pName] = {};
            state.drone_infos[payload.pName] = JSON.parse(JSON.stringify(temp));
            temp = null;

            // let _selected = [];
            // for(let dName in state.drone_infos) {
            //     if(Object.prototype.hasOwnProperty.call(state.drone_infos, dName)) {
            //         if(state.drone_infos[dName].selected) {
            //             _selected.push(state.drone_infos[dName]);
            //         }
            //     }
            // }

            this.commit('updateDroneInfosSelected');

            // state.dronesChecked[payload.dName] = null;
            // state.dronesChecked[payload.dName] = state.drone_infos[payload.dName];
            //
            // temp = JSON.parse(JSON.stringify(state.dronesChecked));
            // state.dronesChecked = null;
            // state.dronesChecked = JSON.parse(JSON.stringify(temp));
            // temp = null;

            EventBus.$emit('do-targetDroneMarker', payload.pName);

            axios({
                validateStatus: function (status) {
                    // 상태 코드가 500 이상일 경우 거부. 나머지(500보다 작은)는 허용.
                    return status < 500;
                },
                method: 'post',
                url: 'http://' + state.VUE_APP_MOBIUS_HOST + ':7579/Mobius/' + state.VUE_APP_MOBIUS_GCS + '/Info',
                headers: {
                    'X-M2M-RI': String(parseInt(Math.random() * 10000)),
                    'X-M2M-Origin': 'SVue',
                    'Content-Type': 'application/json;ty=4'
                },
                data: {
                    'm2m:cin': {
                        con: state.drone_infos
                    }
                }
            }).then(
                function (res) {
                    console.log('regMarkerDroneInfo-axios', res.data);
                }
            ).catch(
                function (err) {
                    console.log(err.message);
                }
            );
        },

        regMarkerIndexDroneInfo(state, payload) {
            console.log('regMarkerIndexDroneInfo', payload);

            let pos_str = String(state.tempMarkers[payload.pName][payload.pIndex].lat) + ':' +
                String(state.tempMarkers[payload.pName][payload.pIndex].lng) + ':' +
                String(state.tempMarkers[payload.pName][payload.pIndex].alt) + ':' +
                String(state.tempMarkers[payload.pName][payload.pIndex].speed) + ':' +
                String(state.tempMarkers[payload.pName][payload.pIndex].radius) + ':' +
                String(state.tempMarkers[payload.pName][payload.pIndex].turningSpeed) + ':' +
                String(state.tempMarkers[payload.pName][payload.pIndex].targetMavCmd) + ':' +
                String(state.tempMarkers[payload.pName][payload.pIndex].targetStayTime) + ':' +
                String(state.tempMarkers[payload.pName][payload.pIndex].elevation);

            state.drone_infos[payload.pName].goto_positions.splice(payload.pIndex, 0, pos_str);

            let temp = JSON.parse(JSON.stringify(state.drone_infos[payload.pName]));
            state.drone_infos[payload.pName] = null;
            state.drone_infos[payload.pName] = {};
            state.drone_infos[payload.pName] = JSON.parse(JSON.stringify(temp));
            temp = null;

            // let _selected = [];
            // for(let dName in state.drone_infos) {
            //     if(Object.prototype.hasOwnProperty.call(state.drone_infos, dName)) {
            //         if(state.drone_infos[dName].selected) {
            //             _selected.push(state.drone_infos[dName]);
            //         }
            //     }
            // }

            this.commit('updateDroneInfosSelected');

            // state.dronesChecked[payload.dName] = null;
            // state.dronesChecked[payload.dName] = state.drone_infos[payload.dName];
            //
            // temp = JSON.parse(JSON.stringify(state.dronesChecked));
            // state.dronesChecked = null;
            // state.dronesChecked = {};
            // state.dronesChecked = JSON.parse(JSON.stringify(temp));
            // temp = null;

            EventBus.$emit('do-targetDroneMarker', payload.pName);

            axios({
                validateStatus: function (status) {
                    // 상태 코드가 500 이상일 경우 거부. 나머지(500보다 작은)는 허용.
                    return status < 500;
                },
                method: 'post',
                url: 'http://' + state.VUE_APP_MOBIUS_HOST + ':7579/Mobius/' + state.VUE_APP_MOBIUS_GCS + '/Info',
                headers: {
                    'X-M2M-RI': String(parseInt(Math.random() * 10000)),
                    'X-M2M-Origin': 'SVue',
                    'Content-Type': 'application/json;ty=4'
                },
                data: {
                    'm2m:cin': {
                        con: state.drone_infos
                    }
                }
            }).then(
                function (res) {
                    console.log('regMarkerIndexDroneInfo-axios', res.data);
                }
            ).catch(
                function (err) {
                    console.log(err.message);
                }
            );
        },

        resetDroneInfos(state, payload) {
            console.log('resetDroneInfos', payload);

            if (!Object.hasOwnProperty.call(payload, 'unknown')) {
                payload.unknown = {}
            }

            state.drone_infos = null;
            state.drone_infos = {};
            state.drone_infos = JSON.parse(JSON.stringify(payload));

            for(let name in state.drone_infos) {
                if(Object.hasOwnProperty.call(state.drone_infos, name)) {
                    if(name !== 'unknown') {
                        if(localStorage.getItem(name+'_selected')) {
                            state.drone_infos[name].selected = (localStorage.getItem(name + '_selected') === 'true');
                        }
                        else {
                            localStorage.setItem(name+'_selected', String(state.drone_infos[name].selected));
                        }
                    }
                }
            }

            if (!Object.hasOwnProperty.call(state.drone_infos.unknown, 'goto_positions')) {
                state.drone_infos.unknown.goto_positions = [];
            }

            if (!Array.isArray(state.drone_infos.unknown.goto_positions)) {
                state.drone_infos.unknown.goto_positions = [];
            }

            for (let i = 0; i < state.drone_infos.unknown.goto_positions.length; i) {
                if (state.drone_infos.unknown.goto_positions[i] === null) {
                    state.drone_infos.unknown.goto_positions.splice(i, 1);
                }
                else {
                    i++;
                }
            }

            console.log('resetDroneInfos', state.drone_infos);
        },

        updateDroneInfosSelected(state) {

            console.log('updateDroneInfosSelected', state.drone_infos);

            for (let dName in state.drone_infos) {
                if (Object.prototype.hasOwnProperty.call(state.drone_infos, dName)) {

                    if (!Object.prototype.hasOwnProperty.call(state.drone_infos[dName], 'color')) {
                        state.drone_infos[dName].color = 'grey';
                    }

                    if (!Object.prototype.hasOwnProperty.call(state.drone_infos[dName], 'goto_positions')) {
                        state.drone_infos[dName].goto_positions = [];
                    }

                    if (dName !== 'unknown') {
                        if (!Object.prototype.hasOwnProperty.call(state.drone_infos[dName], 'targeted')) {
                            state.drone_infos[dName].targeted = false;
                        }
                        state.drone_infos[dName].targeted = false;
                        EventBus.$emit('do-drone-selected' + dName, state.drone_infos[dName].targeted);

                        if (!Object.prototype.hasOwnProperty.call(state.drone_infos[dName], 'home_position')) {
                            state.drone_infos[dName].home_position = {lat: 37.4032072, lng: 127.1595933};
                        }

                        if (!Object.prototype.hasOwnProperty.call(state.drone_infos[dName], 'gotoType')) {
                            state.drone_infos[dName].gotoType = 'alt_first';
                        }

                        if (!Object.prototype.hasOwnProperty.call(state.drone_infos[dName], 'tagetModeSelection')) {
                            state.drone_infos[dName].tagetModeSelection = 'ALT_HOLD';
                        }

                        if (!Object.prototype.hasOwnProperty.call(state.drone_infos[dName], 'targetSpeed')) {
                            state.drone_infos[dName].targetSpeed = 5;
                        }

                        if (!Object.prototype.hasOwnProperty.call(state.drone_infos[dName], 'targetTurningSpeed')) {
                            state.drone_infos[dName].targetTurningSpeed = 5;
                        }

                        if (!Object.prototype.hasOwnProperty.call(state.drone_infos[dName], 'targetRadius')) {
                            state.drone_infos[dName].targetRadius = 50;
                        }

                        if (!Object.prototype.hasOwnProperty.call(state.drone_infos[dName], 'targetTakeoffAlt')) {
                            state.drone_infos[dName].targetTakeoffAlt = 20;
                        }

                        if (!Object.prototype.hasOwnProperty.call(state.drone_infos[dName], 'circleType')) {
                            state.drone_infos[dName].circleType = 'cw';
                        }

                        if (!Object.prototype.hasOwnProperty.call(state.drone_infos[dName], 'targetAlt')) {
                            state.drone_infos[dName].targetAlt = 20;
                        }

                        if (!Object.prototype.hasOwnProperty.call(state.drone_infos[dName], 'lastFlightTime')) {
                            state.drone_infos[dName].lastFlightTime = 0;
                        }

                        if (!Object.prototype.hasOwnProperty.call(state.drone_infos[dName], 'autoStartIndex')) {
                            state.drone_infos[dName].autoStartIndex = '0';
                        }

                        if (!Object.prototype.hasOwnProperty.call(state.drone_infos[dName], 'autoEndIndex')) {
                            state.drone_infos[dName].autoEndIndex = '0';
                        }

                        if (!Object.prototype.hasOwnProperty.call(state.drone_infos[dName], 'autoDelay')) {
                            state.drone_infos[dName].autoDelay = 1;
                        }

                        if (!Object.prototype.hasOwnProperty.call(state.drone_infos[dName], 'autoSpeed')) {
                            state.drone_infos[dName].autoSpeed = 5;
                        }

                        if (!Object.prototype.hasOwnProperty.call(state.drone_infos[dName], 'curArmStatus')) {
                            state.drone_infos[dName].curArmStatus = 'DISARMED';
                        }

                        if (!Object.prototype.hasOwnProperty.call(state.drone_infos[dName], 'targeted')) {
                            state.drone_infos[dName].targeted = false;
                        }

                        if (!Object.prototype.hasOwnProperty.call(state.drone_infos[dName], 'headingLine')) {
                            state.drone_infos[dName].headingLine = [];
                        }

                        if (!Object.prototype.hasOwnProperty.call(state.drone_infos[dName], 'client')) {

                            state.drone_infos[dName].client = {
                                connected: false,
                                loading: false
                            };
                        }

                        state.tempMarkers[dName] = null;
                        state.tempMarkers[dName] = [];
                        // state.trackingLines[dName] = null;
                        // state.trackingLines[dName] = [];

                        if (state.drone_infos[dName].selected) {
                            let drone = state.drone_infos[dName];

                            for (let idx in drone.goto_positions) {
                                if (Object.prototype.hasOwnProperty.call(drone.goto_positions, idx)) {
                                    let pos_arr = drone.goto_positions[idx].split(':');
                                    let pos = JSON.parse(JSON.stringify(state.defaultPosition));
                                    pos.lat = parseFloat(pos_arr[0]);
                                    pos.lng = parseFloat(pos_arr[1]);
                                    pos.alt = parseFloat(pos_arr[2]);
                                    pos.speed = parseFloat(pos_arr[3]);
                                    pos.radius = parseFloat(pos_arr[4]);
                                    pos.turningSpeed = parseFloat(pos_arr[5]);
                                    pos.targetMavCmd = parseFloat(pos_arr[6]);
                                    pos.targetStayTime = parseFloat(pos_arr[7]);
                                    pos.elevation = parseFloat(pos_arr[8]);
                                    pos.color = drone.color;
                                    pos.m_icon.fillColor = drone.color;
                                    pos.m_label.fontSize = '14px';
                                    pos.m_label.text = ((drone.name === 'unknown') ? 'T' : String(state.tempMarkers[drone.name].length)) + ':' + String(pos.alt);

                                    state.tempMarkers[drone.name].push(pos);
                                    pos = null;
                                }
                            }
                        }
                        else {
                            delete state.tempMarkers[dName];
                            delete state.trackingLines[dName];
                        }
                    }
                    // else {
                    //     if (!Object.prototype.hasOwnProperty.call(state.drone_infos[dName], 'targeted')) {
                    //         state.drone_infos[dName].targeted = false;
                    //     }
                    //     state.drone_infos[dName].targeted = false;
                    //
                    //     if (!Object.prototype.hasOwnProperty.call(state.drone_infos[dName], 'targetSpeed')) {
                    //         state.drone_infos[dName].targetSpeed = 5;
                    //     }
                    //
                    //     if (!Object.prototype.hasOwnProperty.call(state.drone_infos[dName], 'targetTurningSpeed')) {
                    //         state.drone_infos[dName].targetTurningSpeed = 5;
                    //     }
                    //
                    //     if (!Object.prototype.hasOwnProperty.call(state.drone_infos[dName], 'targetRadius')) {
                    //         state.drone_infos[dName].targetRadius = 50;
                    //     }
                    //
                    //     if (!Object.prototype.hasOwnProperty.call(state.drone_infos[dName], 'targetAlt')) {
                    //         state.drone_infos[dName].targetAlt = 20;
                    //     }
                    //
                    //     delete state.tempMarkers[dName];
                    //     state.tempMarkers[dName] = [];
                    //
                    //     let drone = state.drone_infos[dName];
                    //
                    //     console.log('unknown', drone);
                    //     console.log('tempMarkers[unknown]', state.tempMarkers[dName]);
                    //
                    //     for (let idx in drone.goto_positions) {
                    //         if (Object.prototype.hasOwnProperty.call(drone.goto_positions, idx)) {
                    //             let pos_arr = drone.goto_positions[idx].split(':');
                    //             let pos = JSON.parse(JSON.stringify(state.defaultPosition));
                    //             pos.lat = parseFloat(pos_arr[0]);
                    //             pos.lng = parseFloat(pos_arr[1]);
                    //             pos.alt = parseFloat(pos_arr[2]);
                    //             pos.speed = parseFloat(pos_arr[3]);
                    //             pos.radius = parseFloat(pos_arr[4]);
                    //             pos.turningSpeed = parseFloat(pos_arr[5]);
                    //             pos.color = drone.color;
                    //             pos.m_icon.fillColor = drone.color;
                    //             pos.m_label.fontSize = '14px';
                    //             pos.m_label.text = 'T';
                    //
                    //             state.tempMarkers[dName].push(pos);
                    //             pos = null;
                    //         }
                    //     }
                    // }
                }
            }

            EventBus.$emit('do-targetDrone');


            let temp = JSON.parse(JSON.stringify(state.tempMarkers));
            state.tempMarkers = null;
            state.tempMarkers = {};
            state.tempMarkers = JSON.parse(JSON.stringify(temp));
            temp = null;
        },

        addDroneInfos(state, payload) {
            state.drone_infos[payload.name] = payload;

            let temp = JSON.parse(JSON.stringify(state.drone_infos));
            state.drone_infos = null;
            state.drone_infos = {};
            state.drone_infos = JSON.parse(JSON.stringify(temp));
            temp = null;
        },

        delDroneInfo(state, name) {
            delete state.drone_infos[name];

            let temp = JSON.parse(JSON.stringify(state.drone_infos));
            state.drone_infos = null;
            state.drone_infos = {};
            state.drone_infos = JSON.parse(JSON.stringify(temp));
            temp = null;

            console.log('delDroneInfo', state.drone_infos);
        },

        updateDroneInfos(state, payload) {
            state.drone_infos[payload.name] = payload;

            let temp = JSON.parse(JSON.stringify(state.drone_infos));
            state.drone_infos = null;
            state.drone_infos = {};
            state.drone_infos = JSON.parse(JSON.stringify(temp));
            temp = null;
        },

        // setSelectedDrone(state, payload) {
        //
        //     state.selectedDrone[payload.drone_name] = payload.selected;
        //     let temp = JSON.parse(JSON.stringify(state.selectedDrone));
        //     state.selectedDrone = null;
        //     state.selectedDrone = {};
        //     state.selectedDrone = JSON.parse(JSON.stringify(temp));
        //     temp = null;
        //
        //     //EventBus.$emit('selected-drone', payload);
        // },

        setCommandTabLeftX(state, value) {
            state.command_tab_left_x = value;
        },

        setCommandTabMaxHeight(state, value) {
            state.command_tab_max_height = value;
        },

        // setSelectedDroneInfo(state, payload) {
        //     state.drone_infos[payload.dName].selected = payload.selected;
        // },

        setFlyingDroneInfo(state, payload) {
            state.drone_infos[payload.name].heading = payload.heading;
            state.drone_infos[payload.name].lat = payload.lat;
            state.drone_infos[payload.name].lng = payload.lng;

            // let temp = JSON.parse(JSON.stringify(state.drone_infos[payload.pName]));
            // state.drone_infos[payload.pName] = null;
            // state.drone_infos[payload.pName] = {};
            // state.drone_infos[payload.pName] = JSON.parse(JSON.stringify(temp));
            // temp = null;

            // state.drone_infos_selected = [];
            // for(let dName in state.drone_infos) {
            //     if(Object.prototype.hasOwnProperty.call(state.drone_infos, dName)) {
            //         if(state.drone_infos[dName].selected) {
            //             state.drone_infos_selected.push(state.drone_infos[dName]);
            //         }
            //     }
            // }

            state.countFlying++;
            if (state.countFlying >= 30) {
                state.countFlying = 0;

                // axios({
                //     validateStatus: function (status) {
                //         // 상태 코드가 500 이상일 경우 거부. 나머지(500보다 작은)는 허용.
                //         return status < 500;
                //     },
                //     method: 'post',
                //     url: 'http://' + state.VUE_APP_MOBIUS_HOST + ':7579/Mobius/' + state.VUE_APP_MOBIUS_GCS + '/Info',
                //     headers: {
                // 'X-M2M-RI': String(parseInt(Math.random()*10000)),
                //         'X-M2M-Origin': 'SVue',
                //         'Content-Type': 'application/json;ty=4'
                //     },
                //     data: {
                //         'm2m:cin': {
                //             con: state.drone_infos
                //         }
                //     }
                // }).then(
                //     function (res) {
                //         console.log('setFlyingDroneInfo-axios', res.data);
                //     }
                // ).catch(
                //     function (err) {
                //         console.log(err.message);
                //     }
                // );
            }

            payload = null;
        },

        saveCurrentDroneInfos(state) {
            if (state.MOBIUS_CONNECTION_CONNECTED) {
                axios({
                    validateStatus: function (status) {
                        // 상태 코드가 500 이상일 경우 거부. 나머지(500보다 작은)는 허용.
                        return status < 500;
                    },
                    method: 'post',
                    url: 'http://' + state.VUE_APP_MOBIUS_HOST + ':7579/Mobius/' + state.VUE_APP_MOBIUS_GCS + '/Info',
                    headers: {
                        'X-M2M-RI': String(parseInt(Math.random() * 10000)),
                        'X-M2M-Origin': 'SVue',
                        'Content-Type': 'application/json;ty=4'
                    },
                    data: {
                        'm2m:cin': {
                            con: state.drone_infos
                        }
                    }
                }).then(
                    function (res) {
                        console.log('setFlyingDroneInfo-axios', res.data);
                    }
                ).catch(
                    function (err) {
                        console.log(err.message);
                    }
                );
            }
        },
    },
    actions: {},
    modules: {}
})
