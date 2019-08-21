Object.assign(pc, (function () {
    /**
     * @private
     * @constructor
     * @name pc.Timer
     * @description Create a new Timer instance.
     * @classdesc A Timer counts milliseconds from when start() is called until when stop() is called.
     */
    var Timer = function Timer() {
        this._isRunning = false;
        this._a = 0;
        this._b = 0;
    };

    Object.assign(Timer.prototype, {
        /**
         * @private
         * @function
         * @name pc.Timer#start
         * @description Start the timer
         */
        start: function () {
            this._isRunning = true;
            this._a = pc.now();
        },

        /**
         * @private
         * @function
         * @name pc.Timer#stop
         * @description Stop the timer
         */
        stop: function () {
            this._isRunning = false;
            this._b = pc.now();
        },

        /**
         * @private
         * @function
         * @name pc.Timer#getMilliseconds
         * @description Get the number of milliseconds that passed between start() and stop() being called
         * @returns {Number} The elapsed milliseconds.
         */
        getMilliseconds: function () {
            return this._b - this._a;
        }
    });

    // Returns most suitable high-performance timestamp function available on current platform
    var getHighPerfTimeFunction = function () {
        // First, check if node.js API is available, since it offers highest resolution
        if (typeof process !== 'undefined' && process.hrtime) {
            return function () {
                var time = process.hrtime();
                return time[0] * 1e3 + time[1] * 1e-6;
            };
        }
        // Secondly, check if browser performance.now (or older variants) available
        if (typeof window !== 'undefined' && window.performance) {
            var names = ['now', 'webkitNow', 'msNow', 'mozNow', 'oNow'];
            for (var i = 0; i < names.length; i++) {
                var func = window.performance[name];
                if (func) return func.bind(window.performance);
            }
        }
        // If all fails, fallback on using Date object
        return Date.now || function () {
            return new Date().getTime();
        };
    };

    return {
        Timer: Timer,

        /**
         * @private
         * @function
         * @name pc.now
         * @description Get current time in milliseconds. Use it to measure time difference. Reference time may differ on different platforms.
         * @returns {Number} The time in milliseconds
         */
        now: getHighPerfTimeFunction()
    };
}()));
