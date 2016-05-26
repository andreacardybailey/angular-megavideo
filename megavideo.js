// DIRECTIVE DEFINITION
var app = angular.module('megaVideoDemo', []);
app.directive('megaVideo', function($sce){
  // Runs during compile
  return {
    templateUrl: 'megavideo.html',
    restrict: 'E',
    scope: true, // create 'new scope' for each directive instance (copy of the parent scope)
    link: function(scope, element, attrs) {
      // set the scope variables required by the directive template
      scope.sources = [];
      function processSources() {
        var sourceTypes = {
          webm: { 
            type: 'video/webm'
          },
          mp4: { 
            type: 'video/mp4'
          },
          ogg: { 
            type: 'video/ogg'
          }
          // etc...
        };
        for (source in sourceTypes) {
          if (attrs.hasOwnProperty(source)) {
            scope.sources.push({
              type: sourceTypes[source].type,
              src: $sce.trustAsResourceUrl(attrs[source])
            });
          }
        }
      }
      processSources();

      // width and click behavior 
      // use attrs property of width and assign it to a scope variable to be used in the dirctive template
      var videoPlayer = element.find('video')[0];

      scope.video =  {
        play: function() {
          videoPlayer.play();
          scope.video.status = 'play';
        },
        pause: function() {
          videoPlayer.pause();
          scope.video.status = 'pause';
        },
        stopPlay: function() {
          videoPlayer.pause();
          videoPlayer.currentTime = 0;
          scope.video.status = 'stop'
        },
        togglePlay: function() {
          scope.video.status == 'play' ? this.pause() : this.play();
        },
        width: attrs.width
      }
    }
  }
});



// You should be able to specify the width and height of the video element in directive instances in your HTML templates. 

// When a user clicks on the element, if the video is not playing, it should play.

// If it's already playing and the user clicks on it, it should pause.

// If the user double clicks on it, it should stop playing and reset to the beginning.