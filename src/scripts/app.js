/**
 * Created by korman on 20.11.16.
 */
//
//(function($){
//    $('document').ready(function(){
//        var redColor = [
//            '#d50000',
//            '#ef5350',
//            '#ffcdd2'
//        ];
//        var blueColor = [
//            '#2962FF',
//            '#2196F3',
//            '#BBDEFB'
//        ];
//
//
//
//        var color = [
//            redColor,
//            blueColor
//        ];
//        var randIndex = Math.floor((Math.random() * color.length) + 0);
//        var styles = [
//            'background: -webkit-radial-gradient(' + color[randIndex][0] + ', ' + color[randIndex][1] + ', ' + color[randIndex][2] + ')',
//            'background: -o-radial-gradient(' + color[randIndex][0] + ', ' + color[randIndex][1] + ', ' + color[randIndex][2] + ')',
//            'background: -moz-radial-gradient(' + color[randIndex][0] + ', ' + color[randIndex][1] + ', ' + color[randIndex][2] + ')',
//            'background: radial-gradient(' + color[randIndex][0] + ', ' + color[randIndex][1] + ', ' + color[randIndex][2] + ')'
//        ].join(';');
//
//        $('.zan-content-header h1').css('background-color', color[randIndex][0]);
//        $('.zan-content-header h1').attr('style', styles);
//        $('.zan-thumb-layout strong').css('background-color', color[randIndex][0]);
//        $('.zan-thumb-layout strong').attr('style', styles);
//    });
//})(jQuery);