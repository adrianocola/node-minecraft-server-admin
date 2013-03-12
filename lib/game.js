var Game = require("minecraft-runner");

exports.start = function (callback) {
    callback = callback.bind(this);
    var server = this,
        game   = new Game(this.file("server"), this.jar);

    game.start(function (err) {
        if (err) return callback(err);

        server.game = game;
        return callback(null, game);
    });
};

exports.stop = function (callback) {
    var server = this;
    callback = callback.bind(this);

    if (!this.game) return callback();

    this.game.stop(function (err) {
        if (err) return callback(err);

        delete server.game;
        callback();
    });
};

exports.restart = function (callback) {
    this.game.restart(callback.bind(this));
};