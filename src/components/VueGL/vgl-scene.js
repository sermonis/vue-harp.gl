import VglObject3d from './core/vgl-object3d.js';
import * as THREE from 'three';

/**
 * This is where you place objects,
 * corresponding [THREE.Scene](https://threejs.org/docs/index.html#api/scenes/Scene).
 *
 * Properties of [VglObject3d](vgl-object3d) are also available as mixin.
 */
export default {

    mixins: [ VglObject3d ],
    computed: {

        inst: () => new THREE.Scene(),

    },

    watch: {

        inst: {

            handler ( inst ) { this.vglWorld.scenes[ this.name ] = inst; },
            immediate: true,

        },

        name ( name, oldName ) {

            const { vglWorld: { scenes }, inst } = this;
            if ( scenes[ oldName] === inst ) delete scenes[ oldName ];
            scenes[ name ] = inst;

        },

    },

    beforeDestroy () {

        const { vglWorld: { scenes }, inst } = this;
        if ( scenes[ this.name ] === inst ) delete scenes[ this.name ];

    },

};
