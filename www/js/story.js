class Story {
  constructor(selector) {
    this._stories = [];
    this._el = selector ? $(selector) : this._findElements();
    if (this._el === null) {
      return;
    }
    this._init();
  }

  _init() {
    this._changeIcon('start');
    this._startStories();
    this._getCoords();
    this._getDimensions();
    this._getIntros();
    this._getTipPositions();
    this._getTipCoords();
    this._getParents();
    this._placeStories();
  }

  _changeIcon(action) {
    if (action === 'start') {
      $('.fa-play-circle').removeClass('fa-play-circle').addClass('fa-stop-circle');
    } else {
      $('.fa-stop-circle').removeClass('fa-stop-circle').addClass('fa-play-circle');
    }
  }

  _startStories() {
    for (let story of this._el) {
      this._stories.push({
        el: story,
        coords: {},
        tipCoords: {}
      })
    }
  }

  _getDimensions() {
    for (let story of this._stories) {
      story.width = $(story.el).outerWidth();
      story.height = $(story.el).outerHeight();
    }
  }

  _getCoords() {
    for (let story of this._stories) {
      story.coords.top = $(story.el).children().first().offset().top - $(story.el).offset().top;
      story.coords.left = $(story.el).children().first().offset().left - $(story.el).offset().left;
    }
  }

  _getIntros() {
    for (let story of this._stories) {
      story.intro = $(story.el).data('intro');
    }
  }

  _getParents() {
    for (let story of this._stories) {
      story.parent = $(story.el).parent();
    }
  }

  _getTipPositions() {
    for (let story of this._stories) {
      story.position = $(story.el).data('position');
    }
  }

  _getTipCoords() {
    for (let story of this._stories) {
      switch (story.position) {
        case 'right':
          story.tipCoords.top = story.coords.top;
          story.tipCoords.left = story.coords.left + story.width + 25;
        break;
      }
    }
  }

  _findElements() {
    return $('[data-intro]').length > 0 ? $('[data-intro]') : null;
  }

  _placeStories() {
    let first = this._stories[0];
    let top = first.coords.top - 25;
    let left = first.coords.left - 25;
    let width = first.width + 25;
    let height = first.height + 25;
    $(first.el).css('z-index', '1000');

    let story = '<div class="story-overlay story-overlay-0" style="top:' + top + 'px;left:' + left + 'px;width:' + width + 'px;height:' + height + 'px;">' + 
                  '<span class="story-number story-number-0"></span>' + 
                '</div>' + 
                '<div class="story-intro story-intro-0" style="top:' + first.tipCoords.top + 'px;left:' + first.tipCoords.left + 'px;width:200px;">' + 
                  first.intro + 
                  '<div class="story-intro-bottom">' +
                    '<span class="story-intro-button story-intro-prevbutton story-intro-button--disabled"><i class="fa fa-chevron-left" aria-hidden="true"></i> Back</span>' + 
                    '<span class="story-intro-button story-intro-nextbutton">Next <i class="fa fa-chevron-right" aria-hidden="true"></i></span>' +
                  '</div>' +
                '</div>';
    $(first.parent).append(story);

    let overlay = '<div class="story-bg-overlay story-bg-overlay-0"></div>';
    $('.code-container').append(overlay)

    this._currentStoryIndex = 0;
    this._registerButtonActions();
  }

  _registerButtonActions() {
    if (this._currentStoryIndex > 0) {
      $('.story-intro-' + this._currentStoryIndex + ' .story-intro-prevbutton').click((e) => {
        this._showStory('prev');
      })
    }
    if (this._currentStoryIndex + 1 < this._stories.length) {
      $('.story-intro-' + this._currentStoryIndex + ' .story-intro-nextbutton').click((e) => {
        this._showStory('next');
      })
    }
    $('.story-bg-overlay-' + this._currentStoryIndex).click((e) => {
      this._stopStories();
    })
  }

  _showStory(direction) {
    this._removeStory();
    let nextStoryIndex = direction === 'next' ? this._currentStoryIndex + 1 : this._currentStoryIndex - 1;
    let nextStory = this._stories[nextStoryIndex];
    let top = nextStory.coords.top - 25;
    let left = nextStory.coords.left - 25;
    let width = nextStory.width + 25;
    let height = nextStory.height + 25;
    $(this._stories[this._currentStoryIndex].el).css('z-index', 'unset');
    $(nextStory.el).css('z-index', '1000');

    let storyHTML = '<div class="story-overlay story-overlay-' + nextStoryIndex + '" style="top:' + top + 'px;left:' + left + 'px;width:' + width + 'px;height:' + height + 'px;">' + 
                  '<span class="story-number story-number-' + nextStoryIndex + '"></span>' + 
                '</div>' + 
                '<div class="story-intro story-intro-' + nextStoryIndex + '" style="top:' + nextStory.tipCoords.top + 'px;left:' + nextStory.tipCoords.left + 'px;width:200px;">' + 
                  nextStory.intro + 
                  '<div class="story-intro-bottom">';

                    if (nextStoryIndex !== 0) {
                      storyHTML += '<span class="story-intro-button story-intro-prevbutton"><i class="fa fa-chevron-left" aria-hidden="true"></i> Back</span>';
                    } else {
                      storyHTML += '<span class="story-intro-button story-intro-prevbutton story-intro-button--disabled"><i class="fa fa-chevron-left" aria-hidden="true"></i> Back</span>';
                    }
                    if (nextStoryIndex + 1 !== this._stories.length) {
                      storyHTML += '<span class="story-intro-button story-intro-nextbutton">Next <i class="fa fa-chevron-right" aria-hidden="true"></i></span>';
                    } else {
                      storyHTML += '<span class="story-intro-button story-intro-nextbutton story-intro-button--disabled">Next <i class="fa fa-chevron-right" aria-hidden="true"></i></span>';
                    }
                  '</div>' +
                '</div>';
    $(nextStory.parent).append(storyHTML);

    let overlay = '<div class="story-bg-overlay story-bg-overlay-' + nextStoryIndex + '"></div>';
    $('.code-container').append(overlay)

    this._currentStoryIndex = nextStoryIndex;
    this._registerButtonActions();
  }

  _removeStory() {
    $('.story-overlay-' + this._currentStoryIndex).remove();
    $('.story-intro-' + this._currentStoryIndex).remove();
    $('.story-bg-overlay-' + this._currentStoryIndex).remove();
  }

  _stopStories() {
    $(this._stories[this._currentStoryIndex].el).css('z-index', 'unset');
    $('.story-overlay-' + this._currentStoryIndex).remove();
    $('.story-intro-' + this._currentStoryIndex).remove();
    $('.story-bg-overlay-' + this._currentStoryIndex).remove();
    this._changeIcon('stop');
  }

  stop() {
    this._stopStories();
  }
}