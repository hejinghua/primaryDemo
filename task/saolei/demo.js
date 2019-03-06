//点击开始游戏 -》动态生成100格 -》100div
//鼠标leftClick 没有雷 -》显示数字（当前格为中心周围八个格的雷数）扩散（当前八个格没有雷显示0）
//               有雷 -》gameOver
//右击rightClick 没有标记 -》进行标记 有标记-》 取消标记 -》标记是否正确，10全正确，提示成功
//已经出现数字 -》无效果

var startBtn = document.getElementById('btn');
var box = document.getElementById('box');
var flagBox = document.getElementById('flagBox');
var minesNum;
var mineOver;
var block;
var mineMap = [];
var alertBox = document.getElementById('alertBox');
var alertImg = document.getElementById('alertImg');
var closeBtn = document.getElementById('close');
var score = document.getElementById('score');
var startGameBool = true;
bindEvent();
function bindEvent() {
  startBtn.onclick = function () {
    if (startGameBool) {
      box.style.display = 'block';
      flagBox.style.display = 'block';
      init();
      score.innerHTML = mineOver;
      startGameBool = false;
    }
  }
  box.oncontextmenu = function () {
    return false;
  }
  box.onmousedown = function (e) {
    var event = e.target;//获取当前点击的格子
    if (e.which == 1) { //点击左键时
      leftClick(event);
    } else if(e.which == 3){
      rightClick(event);
    }
  }
  closeBtn.onclick = function () {
    alertBox.style.display = 'none';
    flagBox.style.display = 'none';
    box.style.display = 'none';
    box.innerHTML = '';
    startGameBool = true;
  }
}

function init() {
  minesNum = 10;
  mineOver = 10; //剩余的雷数
  for(var i = 0; i<10; i++){
    for(var j = 0; j<10;j++){
      var con = document.createElement('div');
      con.classList.add('block');
      con.setAttribute('id', i + '-' + j);
      box.appendChild(con);
      mineMap.push({mine:0});
    }
  }
  block = document.getElementsByClassName('block');
  while (minesNum) {
    var mineIndex = Math.floor(Math.random() * 100);//雷出现的位置
    if (mineMap[mineIndex].mine === 0) {
      mineMap[mineIndex].mine = 1;
      block[mineIndex].classList.add('isLei');
      minesNum--;
    }
  }

}

function leftClick(dom) {
  if (dom.classList.contains('flag')) {
    return;
  }
  var isLei = document.getElementsByClassName('isLei');
  if (dom && dom.classList.contains('isLei')) {//dom存在并且dom是雷
    console.log('gameOver');
    for(var i = 0; i < isLei.length; i++){
      isLei[i].classList.add('show');
    }
    setTimeout(function () {
      alertBox.style.display = 'block';
      alertImg.style.backgroundImage = 'url("img/over.jpg")';
    },800)
  }else {
    var n = 0;
    var posArr = dom && dom.getAttribute('id').split('-');
    var posX = posArr && +posArr[0];
    var posY = posArr && +posArr[1];
    dom && dom.classList.add('num');
    for(var i = posX - 1;i <= posX + 1; i++){
      for(var j = posY - 1; j <= posY + 1; j++){
        var aroundBox = document.getElementById(i + '-' + j);
        if (aroundBox && aroundBox.classList.contains('isLei')) {
          n++;
        }
      }
    }
    dom && (dom.innerHTML = n);
    if (n == 0) {
      for (var i = posX - 1; i  <= posX + 1; i++) {
        for (var j = posY - 1; j <= posY + 1; j++) {
           var nearBox = document.getElementById(i + '-' + j);
           if (nearBox && nearBox.length != 0) {
             if (!nearBox.classList.contains('check')) {
               nearBox.classList.add('check');
               leftClick(nearBox);
             }
           }
        }
      }
    }
  }
}

function rightClick(dom) {
  if (dom.classList.contains('num')) {
    return;
  }
  dom.classList.toggle('flag');//切换flag
  if (dom.classList.contains('isLei') && dom.classList.contains('flag')) {
    mineOver --;
  }
  if (dom.classList.contains('isLei') && !dom.classList.contains('flag')) {
    mineOver ++;
  }
  score.innerHTML = mineOver;
  if (mineOver == 0) {
    alertBox.style.display = 'block';
    alertImg.style.backgroundImage = 'url("img/success.jpg")';
  }
}