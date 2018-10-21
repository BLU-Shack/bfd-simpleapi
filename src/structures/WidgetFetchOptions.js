/**
 * The Fetch Options when fetching for a widget.
 * @class
 */
class WidgetFetchOptions {
    /**
     * @constructor
     * @param {Object} options The Fetch Options for Widgets.
     */
    constructor(options) {
        /**
         * Sets the width of the widget.
         * @type {Number}
         */
        this.width = `?width=${options.width || 400}`;

        /**
         * Sets the height of the widget.
         * @type {Number}
         */
        this.height = `?height=${options.height || 180}`;
    }
}

exports.WidgetFetchOptions = WidgetFetchOptions;