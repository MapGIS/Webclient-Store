import { BackGroundLayer } from "./background";
import { BackColorLayer } from "./backcolor";
import {
  RasterTileLayer,
  RasterLayerType,
  RasterTileStyle,
  defaultRasterTileStyle,
  RasterTileLayout,
  defaultRasterTileLayout,
} from "./rastertile";
import { GroupLayer } from './grouplayer';
import { VectorTileLayer } from "./vectortile";
import { GeoJsonLayer } from "./geojson";
import { EchartsLayer } from "./echartslayer";
import { MapvLayer } from "./mapvlayer";
import { OverLayerType, OverLayer } from "./overlayer";
import { LayoutType, LayoutLegendType, LayoutLegendDefine } from "./layout";
import {
  IgsLayerTypeDefine,
  IgsDocLayer,
  IgsTileLayer,
  IgsVectorLayer,
  IgsWmsLayer,
} from "./igserver";

import {
  PlotBaseLayer,
  PlotPointLayer,
  PlotLineLayer,
  PlotPolygonLayer,
  PlotAnnotationLayer,
  PlotPointId,
  PlotLineId,
  PlotPolygonId,
  PlotAnnotationId
} from './plot';

import {
  defaultId,
  LayerType,
  SubLayerType,
  LayerGroup,
  LayerDefine,
  SubLayerDefine,
  ILayer,
  IInfo,
  IStyle,
  IFilter,
  ILayout,
  changeLayerProperty,
  getLayerById,
  changeLayerName,
  changeLayerId,
  checkLayerVisible,
  changeLayersVisible,
  compareLayers,
} from "./baselayer";

export {
  BackGroundLayer,
  BackColorLayer,
  GroupLayer,
  RasterTileLayer,
  RasterLayerType,
  RasterTileStyle,
  defaultRasterTileStyle,
  RasterTileLayout,
  defaultRasterTileLayout,
  VectorTileLayer,
  GeoJsonLayer,
  OverLayerType,
  OverLayer,
  EchartsLayer,
  MapvLayer,
  LayoutType,
  LayoutLegendType,
  LayoutLegendDefine,
  IgsLayerTypeDefine,
  IgsDocLayer,
  IgsTileLayer,
  IgsVectorLayer,
  IgsWmsLayer,
  defaultId,
  LayerType,
  SubLayerType,
  LayerGroup,
  LayerDefine,
  SubLayerDefine,
  ILayer,
  IInfo,
  IStyle,
  IFilter,
  ILayout,
  changeLayerProperty,
  getLayerById,
  changeLayerName,
  changeLayerId,
  checkLayerVisible,
  changeLayersVisible,
  compareLayers,
  PlotBaseLayer,
  PlotPointLayer,
  PlotLineLayer,
  PlotPolygonLayer,
  PlotAnnotationLayer,
  PlotPointId,
  PlotLineId,
  PlotPolygonId,
  PlotAnnotationId
};

export default {
  BackGroundLayer,
  BackColorLayer,
  GroupLayer,
  RasterTileLayer,
  RasterLayerType,
  RasterTileStyle,
  defaultRasterTileStyle,
  RasterTileLayout,
  defaultRasterTileLayout,
  VectorTileLayer,
  GeoJsonLayer,

  OverLayerType,
  OverLayer,
  EchartsLayer,
  MapvLayer,

  LayoutType,
  LayoutLegendType,
  LayoutLegendDefine,

  IgsLayerTypeDefine,
  IgsDocLayer,
  IgsTileLayer,
  IgsVectorLayer,
  IgsWmsLayer,

  defaultId,
  LayerType,
  SubLayerType,
  LayerDefine,
  ILayer,
  IInfo,
  IStyle,
  IFilter,
  ILayout,
  changeLayerProperty,
  getLayerById,
  changeLayerName,
  changeLayerId,
  checkLayerVisible,
  changeLayersVisible,
  compareLayers,

  PlotBaseLayer,
  PlotPointLayer,
  PlotLineLayer,
  PlotPolygonLayer,
  PlotAnnotationLayer,
  PlotPointId,
  PlotLineId,
  PlotPolygonId,
  PlotAnnotationId
};
