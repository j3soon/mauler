(function() {

    for (var i = 0; i < 200; i++) {
        var tic = new mauler.games.tic.TicTacToe();
        tic.move();
        tic.move();
        tic.move();
        var view = new mauler.games.tic.CanvasView({
            model: tic,
            width: 80,
            height: 80
        });
        document.body.appendChild(view.render());
    }

}());