/*
 * Red agent
 * http://red-agent.com/
 *  
 * Copyright (c) Francois-Xavier Aeberhard <fx@red-agent.com>
 * Licensed under the MIT License
 */
jQuery(function($) {

    var currentStage, currentLevel, cfg;

    var App = {
        /**
         * 
         */
        init: function() {

            $.getJSON('levels.json').done(function(data) {
                cfg = data;
            });

            $('section.title').click(showIntroduction);

            var playStarted = false;
            // $('video').get(0).play();

            $('video').click(function() {
                $('video').get(0).play();
            });

            $('video').on('ended', showIntroduction);
            $('video').on('play', function() {
                playStarted = true;
                $('section.title .play').hide();
                // $('video').get(0).muted = false;
            });

            $('section.instructions').click(function() {
                $('section.instructions').fadeOut();
                $('section.levels').fadeIn();
            });

            function showIntroduction() {
                if (playStarted) {
                    $('section.title').fadeOut().html('');
                    $('section.instructions').fadeIn();
                } else {
                    $('video').get(0).play();
                }
            }

            $('section.levels button').click(function() {

                currentLevel = $(this).index() - 1;

                if (currentLevel < 0) return;
                // $('section.map').fadeIn();
                // $('section.title').fadeOut();
                $('section.levels').fadeOut();

                currentStage = 0;
                $('body').removeClass('level0').removeClass('level1').removeClass('level2').addClass('level' + currentLevel);
                var level = cfg.levels[currentLevel];
                $('section.levelend2 span').html(level.endScreen);

                showStage();
            });

            $('section.map .point').click(function() {
                $('section.map').fadeOut();
                currentStage = $(this).index() - 1;
                showStage();
            });

            $('section.stage button').click(function() {
                $('section.stage').hide();
                $('section.stagereply').show();
            });

            // $('section.stage .reply button:nth-child(2)').click(function() {
            //     $('section.stage').fadeOut();
            //     $('.owl').animate({
            //         x: $('.owl')
            //     });
            // });

            $('section.stage, section.stagereply').on('click', '.fa-back', function() {
                $('section.stage, section.stagereply').hide();
                $('section.levels').fadeIn();
            });

            $('section.stagereply input').on('keyup change', function() {
                var c = cfg.levels[currentLevel].stages[currentStage],
                    input = $(this).val();

                if (input === c.reply) {
                    $(this).val('');

                    nextStage();

                    $('section.map div').eq(currentStage + 2).addClass('active');
                    $('section.stagereply').fadeOut();
                    // $('.owl').animate({
                    //     left: currentStage * 150
                    // });
                    var audio = new Audio('assets/son/victoire.mp3');
                    audio.play();

                } else if (input.length >= c.reply.length) {
                    $(this).val('');
                    var audio = new Audio('assets/son/defaite.mp3');
                    audio.play();
                    $('section.stagereply .feedback').show();
                    setTimeout(function() {
                        $('section.stagereply .feedback').fadeOut();
                    }, 1000);
                }
                // if ($(this).val() === '756' && currentStage === 0 || $(this).val() === '436' && currentStage === 1 || $(this).val() === '832' && currentStage === 2 || $(this).val() === '614' && currentStage === 3 || $(this).val() === '10' && currentStage === 4 || $(this).val() === '756' && currentStage === 5) {

                // $('section.stage').fadeOut();
                // currentStage++;
                // $('section.map div')
                // }
            });

            function nextStage() {
                currentStage++;
                showStage();
            }
            $('section.levelend1').click(function() {
                $('section.levelend1').fadeOut();
                $('section.levelend2').fadeIn();
            });

            $('section.levelend2').click(function() {
                $('section.levelend2').fadeOut();
                $('section.levels').fadeIn();
            });

            function showStage() {
                var stage = cfg.levels[currentLevel].stages[currentStage];
                if (stage) {
                    $('section.stage').fadeIn();

                    $('section.stage .pic').css({ 'background-image': 'url(assets/stages/stage' + (currentLevel + 1) + currentStage + '.jpg)' });

                    $('section.stage .text .main').html(stage.text);
                    $('section.stagereply .text .main').html(stage.text2);
                    // $('section.stage .text .main').html('<h5><i class="fa fa-blind"></i> Etape ' + (currentStage + 1) + '</h5>' + stage.text);
                    // $('section.stagereply .text .main').html('<h5><i class="fa fa-lightbulb-o"></i> Etape ' + (currentStage + 1) + '</h5>' + stage.text2);

                    $('section.stage .top').html('<i class="fa fa-back fa-chevron-left pull-left"></i> Etape ' + (currentStage + 1));
                    $('section.stagereply .top').html('<i class="fa fa-back fa-chevron-left pull-left"></i> Etape ' + (currentStage + 1));

                    $('section.stagereply input').attr('type', $.isNumeric(stage.reply) ? 'number' : 'text');
                } else {
                    $('section.levels').children().eq(currentLevel + 1).addClass("active");
                    $('section.levelend1').fadeIn();
                    var audio = new Audio('assets/son/Intro.mp3');
                    audio.play();
                }
            }

            $('section.title').show();
            // $('section.title').click();
            // $('section.levels button:first-child').click();
        }
    };

    // $(window).on('load', App.init);
    App.init();
});
