L.TileLayer.include({
  getTileUrl: function (coords) {
    var d = 20037508.342787;
    var z = this._getZoomForUrl();
    var w = d / Math.pow(2, z - 1);
    var minx = -d + coords.x * w;
    var miny = d - (coords.y + 1) * w;

    var data = {
      r: L.Browser.retina ? '@2x' : '',
      s: this._getSubdomain(coords),
      x: coords.x,
      y: coords.y,
      z: z,
      minx: minx,
      miny: miny,
      maxx: minx + w,
      maxy: miny + w
    };

    if (this._map && !this._map.options.crs.infinite) {
      var invertedY = this._globalTileRange.max.y - coords.y;

      if (this.options.tms) {
        data['y'] = invertedY;
      }

      data['-y'] = invertedY;
    }

    return L.Util.template(this._url, L.extend(data, this.options));
  }
});
