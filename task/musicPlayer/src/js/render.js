//实现渲染操作

(function ($, root) {
  // renderInderInfo(data[0])
  var $scope = $(document.body);
  function renderInfo(info) {
    var html = '<div class="song-name">'+ info.song +'</div>' +
      '<div class="singer-name">'+ info.singer +'</div>' +
      '<div class="album-name">'+ info.album +'</div>';
    $scope.find(".song-info").html(html);
  }
  function renderImg(src) {
    var img = new Image();
    img.src = src;
    img.onload = function () {
      root.blurImg(img, $scope); //调用高斯模糊
      $scope.find(".song-img img").attr("src", src);
    }
  }

  function renderIsLove(islove) {
    if(islove) {
      $scope.find(".love-btn").addClass("loving");
    }else{
      $scope.find(".love-btn").removeClass("loving");
    }
  }

  root.render = function render(data) {
    renderInfo(data);
    renderImg(data.image);
    renderIsLove(data.isLove);
  }


})(window.Zepto, window.player || (window.player={}));
//通过window.player暴露函数