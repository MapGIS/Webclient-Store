export enum ViewState {
    Map = "map",
    Edit = "edit",
    MeasureArea = "measurearea",
    MeasureLength = "measurelength",
    Query = "query",
    Print = "print",
    Layout = "layout",
}

/**
 * @see https://github.com/mapbox/mapbox-gl-draw/blob/master/docs/API.md
 */
export enum EditState {
    SIMPLE = "simple_select",
    DIRECT = "direct_select",
    /**画点模式 */
    POINT = "draw_point",
    /**画线模式 */
    LINE_STRING = "draw_line_string",
    /**画区模式 */
    POLYGON = "draw_polygon",
    /**仿照上面DRAW_POINT的模式，实际上是 画点模式 */
    TEXT = "draw_text",
    /** 仿照上面DRAW_POLYGON的模式，实际上是调用map.trash()方法 */
    TRASH = "draw_trash",
    NONE = "none",
}

export enum QueryState {
    Point = "Point",
    Rect = "Rect",
    Properties = "Properties"
}

export enum ZoomState {
    ZoomIn = "zoomin",
    ZoomOut = "zoomout",
    None = "none"
}

export enum HighLight {
    Single = "single",
    Multi = "multi",
    None = "none",
}

export enum LayerType {
    GroupLayer = "GroupLayer",
    BackGround = "BackGround",
    BackColor = "BackColor",
    RasterTile = "RasterTile",
    VectorTile = "VectorTile",
    DemWMS = "DemWMS",
    GeoJSON = "GeoJSON",
    ShapeFile = "ShapeFile",
    UnKnow = "UnKnow",
}

// export { ViewState, EditState, HighLight, LayerType };

export default {
    ViewState,
    EditState,
    ZoomState,
    QueryState,
    HighLight,
    LayerType,
};
