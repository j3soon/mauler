var Minotauro = Minotauro || {};

Minotauro.ControlsView = function(options) {
    this.controller = options.controller;
    this.div = document.createElement("div");
    this.initButtons();
    this.addListeners();
};

Minotauro.ControlsView.prototype = {

    constructor: Minotauro.ControlsView,

    initButtons: function() {
        this.buttons = {
            start: document.createElement("button"),
            prev: document.createElement("button"),
            next: document.createElement("button"),
            end: document.createElement("button")
        };

        this.buttons.start.innerHTML = "|&#60;";
        this.buttons.prev.innerHTML = "&#60;";
        this.buttons.next.innerHTML = "&#62;";
        this.buttons.end.innerHTML = "&#62;|";

        this.div.appendChild(this.buttons.start);
        this.div.appendChild(this.buttons.prev);
        this.div.appendChild(this.buttons.next);
        this.div.appendChild(this.buttons.end);
    },

    addListeners: function () {
        this.buttons.start.addEventListener("click", function() {
            this.controller.start();
        }.bind(this));
        this.buttons.prev.addEventListener("click", function() {
            this.controller.prev();
        }.bind(this));
        this.buttons.next.addEventListener("click", function() {
            this.controller.next();
        }.bind(this));
        this.buttons.end.addEventListener("click", function() {
            this.controller.end();
        }.bind(this));
    },

    render: function() {
        return this.div;
    },

    update: function() {
        this.buttons.start.disabled = !this.controller.isStart();
        this.buttons.prev.disabled = !this.controller.isPrev();
        this.buttons.next.disabled = !this.controller.isNext();
        this.buttons.end.disabled = !this.controller.isEnd();
    }

};

//startButton.addEventListener('click', match.start);
//prevButton.addEventListener('click', match.prev);
//playButton.addEventListener('click', match.play);
//nextButton.addEventListener('click', match.next);
//endButton.addEventListener('click', match.end);
//curPlayerDiv.addEventListener('click', match.curPlayerDiv);
//resetButton.addEventListener('click', match.reset);

//var robles = function(matchController) {
//    startButton.disabled = !matchController.isStart();
//    prevButton.disabled = !matchController.isPrev();
//    nextButton.disabled = !matchController.isNext();
//    endButton.disabled = !matchController.isEnd();
//    index.innerHTML = (matchController.getCurrentIndex() + 1) + ' / ' + matchController.getSize();
//    curPlayerDiv.innerHTML = matchController.getGame().curPlayer() + 1;
//    drawTicTacToe(ctx, matchController.getGame());
//};