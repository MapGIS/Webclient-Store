import * as turf from "@turf/turf";
import { MapRender } from "../document";

export let FeatureCollection =  {
    type: 'geojson',
    data: {
        type: 'FeatureCollection',
        features: []
    }
};

export class GeojsonFeature {
    private feature = undefined;
    private bounds: any = undefined;

    constructor() {
        // constructor
    }

    createFeature(feature) {
        this.feature = feature;
    }

    createGeomtry(geometry) {
        this.feature = {
            geometry
        };
    }

    createProperties(properties) {
        this.feature = {
            properties
        };
    }

    getFeature() {
        return this.feature;
    }

    getBounds(maprender?: MapRender | string) {
        this.bbox();
        const { bounds } = this;
        if (maprender === MapRender.MapBoxGL || maprender === "mapboxgl") {
            return [
                [bounds[0], bounds[1]],
                [bounds[2], bounds[3]],
            ];
        } else if (maprender === MapRender.Cesium || maprender === "cesium") {
            // cesium bounds
        }
        return bounds;
    }

    bbox() {
        this.bounds = turf.bbox(this.feature);
        return this.bounds;
    }
}

export class GeojsonCollection {
    public bounds: any = undefined;

    private data = {
        type: "FeatureCollection",
        features: [],
    };

    constructor(features?: GeojsonFeature[] | object[]) {
        if (features instanceof Array) {
            this.data.features = features || [];
        } else {
            this.data.features = [features];
        }
    }

    addFeature(feature: GeojsonFeature | any) {
        if (feature instanceof GeojsonFeature) {
            this.data.features.push(feature.getFeature());
        } else {
            this.data.features.push(feature);
        }
    }

    setFeatures(features) {
        this.data.features = features;
    }

    getData() {
        return this.data;
    }

    getBounds(maprender?: MapRender | string) {
        this.bbox();
        const { bounds } = this;
        if (maprender === MapRender.MapBoxGL || maprender === "mapboxgl") {
            return [
                [bounds[0], bounds[1]],
                [bounds[2], bounds[3]],
            ];
        } else if (maprender === MapRender.Cesium || maprender === "cesium") {
            // cesium bounds
        }
        return bounds;
    }

    bbox() {
        this.bounds = turf.bbox(this.data);
        return this.bounds;
    }
}
