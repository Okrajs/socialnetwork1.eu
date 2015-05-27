;(function () {
    'use strict';
    /* global Okra, document */
    
    var IS_LIKED_ID = 'isLiked_' + document.referrer;
    var likeButton = document.getElementById('like-btn');
    
    var updateLikeButton = function () {
        likeButton.innerHTML = getIsLiked() ? '✖ unlike' : 'Like';
    };
    
    var getIsLiked = function () {
        return 'true' === localStorage.getItem(IS_LIKED_ID);
    };

    var setIsLiked = function (newIsLiked) {
        var stringIsLiked = newIsLiked ? 'true' : 'false';
        localStorage.setItem(IS_LIKED_ID, stringIsLiked);
    };
    
    var likeEvent = Okra.provide('event', 'likeChanged').allowReferrer();

    likeButton.onclick = function () {
        setIsLiked(!getIsLiked());
        updateLikeButton();
        likeEvent.emit({
            isLiked: getIsLiked()
        });
    };
    
    updateLikeButton();
    
    Okra.provide('get', 'isLiked', function () {
        return getIsLiked();
    }).allowReferrer();
}());

