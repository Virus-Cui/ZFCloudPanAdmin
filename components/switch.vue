<script setup>
import {ref, reactive, onMounted} from "vue";
import { useOsTheme } from 'naive-ui'
import { useThemeVars } from 'naive-ui'
const isMoved = ref(useOsTheme().value != 'dark')

const emits = defineEmits(['change'])

onMounted(() => {
  console.log('theme',useOsTheme().value != 'dark')
  let mainButton = $(".main-button"); //获取按钮主体
  console.log(mainButton)
  console.log('button', mainButton)
  let daytimeBackgrond = $(".daytime-backgrond"); //获取按钮背后的虚影
  let cloud = $(".cloud"); //获取云层
  let cloudLight = $(".cloud-light"); //获取云层虚影
  let components = $(".components"); //获取最外层元素
  let moon = $(".moon"); //获取陨石坑
  let stars = $(".stars"); //获取所有星星
  isMoved.value = false; //按钮状态，判断是否白天黑夜,默认为白天
  let isClicked = false; // 新变量，用于跟踪是否刚刚发生了鼠标点击事件

  mainButton.addEventListener("click", function () {
    if (isMoved.value) {
      //白天按钮样式
      mainButton.style.transform = "translateX(0)"; //水平平移距离为0px
      mainButton.style.backgroundColor = "rgba(255, 195, 35,1)"; //按钮主体的背景颜色变为黄色(太阳)
      // 盒子阴影
      mainButton.style.boxShadow = "3px 3px 5px rgba(0, 0, 0, 0.5), inset  -3px -5px 3px -3px rgba(0, 0, 0, 0.5), inset  4px 5px 2px -2px rgba(255, 230, 80,1)";
      //云朵上升-云朵显示
      daytimeBackgrond[0].style.transform = "translateX(0)";
      daytimeBackgrond[1].style.transform = "translateX(0)";
      daytimeBackgrond[2].style.transform = "translateX(0)";
      cloud.style.transform = "translateY(10px)";
      cloudLight.style.transform = "translateY(10px)";
      components.style.backgroundColor = "rgba(70, 133, 192,1)"
      //月亮陨石坑完全透明-隐藏
      moon[0].style.opacity = "0";
      moon[1].style.opacity = "0";
      moon[2].style.opacity = "0";
      //星星上升-星星隐藏
      stars.style.transform = "translateY(-125px)";
      stars.style.opacity = "0";
      //网页背景颜色变为浅色
      document.body.style.backgroundColor = "aliceblue";
    } else {
      //黑夜按钮样式
      mainButton.style.transform = "translateX(110px)"; //水平平移距离为110px
      mainButton.style.backgroundColor = "rgba(195, 200,210,1)"; //按钮主体的背景颜色变为黄色(月亮)
      // 盒子阴影
      mainButton.style.boxShadow = "3px 3px 5px rgba(0, 0, 0, 0.5), inset  -3px -5px 3px -3px rgba(0, 0, 0, 0.5), inset  4px 5px 2px -2px rgba(255, 255, 210,1)";
      //云朵下降-云朵隐藏
      daytimeBackgrond[0].style.transform = "translateX(110px)";
      daytimeBackgrond[1].style.transform = "translateX(80px)";
      daytimeBackgrond[2].style.transform = "translateX(50px)";
      cloud.style.transform = "translateY(80px)";
      cloudLight.style.transform = "translateY(80px)";
      components.style.backgroundColor = "rgba(25,30,50,1)"
      //月亮陨石坑完全不透明-显示
      moon[0].style.opacity = "1";
      moon[1].style.opacity = "1";
      moon[2].style.opacity = "1";
      //星星下降-星星显示
      stars.style.transform = "translateY(-62.5px)";
      stars.style.opacity = "1";
      //网页背景颜色变为深色
      document.body.style.backgroundColor = "#424242";
    }
    // 检测鼠标是否点击,默认已经点击
    isClicked = true;
    // 计时器，当0.5秒后，点击状态变成非点击
    setTimeout(function () {
      isClicked = false;
    }, 500);
    isMoved.value = !isMoved.value;
  });

    const theme = useThemeVars()

  watch(()=>theme.value, ()=>{
    if (theme.value.baseColor == '#FFF') {
      //白天按钮样式
      mainButton.style.transform = "translateX(0)"; //水平平移距离为0px
      mainButton.style.backgroundColor = "rgba(255, 195, 35,1)"; //按钮主体的背景颜色变为黄色(太阳)
      // 盒子阴影
      mainButton.style.boxShadow = "3px 3px 5px rgba(0, 0, 0, 0.5), inset  -3px -5px 3px -3px rgba(0, 0, 0, 0.5), inset  4px 5px 2px -2px rgba(255, 230, 80,1)";
      //云朵上升-云朵显示
      daytimeBackgrond[0].style.transform = "translateX(0)";
      daytimeBackgrond[1].style.transform = "translateX(0)";
      daytimeBackgrond[2].style.transform = "translateX(0)";
      cloud.style.transform = "translateY(10px)";
      cloudLight.style.transform = "translateY(10px)";
      components.style.backgroundColor = "rgba(70, 133, 192,1)"
      //月亮陨石坑完全透明-隐藏
      moon[0].style.opacity = "0";
      moon[1].style.opacity = "0";
      moon[2].style.opacity = "0";
      //星星上升-星星隐藏
      stars.style.transform = "translateY(-125px)";
      stars.style.opacity = "0";
      isMoved.value = false
    } else {
      //黑夜按钮样式
      mainButton.style.transform = "translateX(110px)"; //水平平移距离为110px
      mainButton.style.backgroundColor = "rgba(195, 200,210,1)"; //按钮主体的背景颜色变为黄色(月亮)
      // 盒子阴影
      mainButton.style.boxShadow = "3px 3px 5px rgba(0, 0, 0, 0.5), inset  -3px -5px 3px -3px rgba(0, 0, 0, 0.5), inset  4px 5px 2px -2px rgba(255, 255, 210,1)";
      //云朵下降-云朵隐藏
      daytimeBackgrond[0].style.transform = "translateX(110px)";
      daytimeBackgrond[1].style.transform = "translateX(80px)";
      daytimeBackgrond[2].style.transform = "translateX(50px)";
      cloud.style.transform = "translateY(80px)";
      cloudLight.style.transform = "translateY(80px)";
      components.style.backgroundColor = "rgba(25,30,50,1)"
      //月亮陨石坑完全不透明-显示
      moon[0].style.opacity = "1";
      moon[1].style.opacity = "1";
      moon[2].style.opacity = "1";
      //星星下降-星星显示
      stars.style.transform = "translateY(-62.5px)";
      stars.style.opacity = "1";
      isMoved.value = true
    }
    //
  })

// 当鼠标挪入按钮时，按钮移动事件
  mainButton.addEventListener("mousemove", function () {
    // 当按钮为点击状态时，退出
    if (isClicked) return;

    if (isMoved.value) {
      // 当黑夜状态时，鼠标挪入按钮
      // 按钮和背后的虚影向左平移10像素
      mainButton.style.transform = "translateX(100px)";
      daytimeBackgrond[0].style.transform = "translateX(100px)";
      daytimeBackgrond[1].style.transform = "translateX(73px)";
      daytimeBackgrond[2].style.transform = "translateX(46px)";
    } else {
      // 当白天状态时，鼠标挪入按钮
      // 按钮和背后的虚影向右平移10像素
      mainButton.style.transform = "translateX(10px)";
      daytimeBackgrond[0].style.transform = "translateX(10px)";
      daytimeBackgrond[1].style.transform = "translateX(7px)";
      daytimeBackgrond[2].style.transform = "translateX(4px)";
    }
  });

// 当鼠标挪出按钮时，按钮移动事件
  mainButton.addEventListener("mouseout", function () {
    // 当按钮为点击状态时，退出
    if (isClicked) {
      return
    }
    ;
    if (isMoved.value) {
      // 当黑夜状态时，鼠标挪出按钮
      // 按钮和背后的虚影向右平移10像素
      mainButton.style.transform = "translateX(110px)";
      daytimeBackgrond[0].style.transform = "translateX(110px)";
      daytimeBackgrond[1].style.transform = "translateX(80px)";
      daytimeBackgrond[2].style.transform = "translateX(50px)";
    } else {
      // 当白天状态时，鼠标挪出按钮
      // 按钮和背后的虚影向左平移10像素
      mainButton.style.transform = "translateX(0px)";
      daytimeBackgrond[0].style.transform = "translateX(0px)";
      daytimeBackgrond[1].style.transform = "translateX(0px)";
      daytimeBackgrond[2].style.transform = "translateX(0px)";
    }
  });

// 星星闪烁js交互部分
// 获取所有星星元素，并随机排序星星数组
  let starArray = [...$('.star')].sort(_ => 0.5 - Math.random());

// 定义缩放动画时长和暂停时间
  const twinkleDuration = 0.5; // 缩放动画时长（秒）
  const pauseDuration = 2; // 暂停时间（秒）
  function twinkleStars() {
    starArray.forEach((star, index) => {
      setTimeout(() => {
        star.classList.add('twinkle');
        setTimeout(() => {
          star.classList.remove('twinkle');
          if (index === starArray.length - 1) {
            setTimeout(twinkleStars, pauseDuration * 1000); // 在每次调用之间添加 2 秒的间隔
          }
        }, twinkleDuration * 1000);
      }, (index * (twinkleDuration + pauseDuration)) * 1000);
    });
  }

  twinkleStars(); // 第一次调用函数开始闪烁

// 云层浮动动画效果
// 定义一个获取随机方向的函数，随机选择移动距离'2px'或'-2px'
  const getRandomDirection = () => {
    const directions = ['2px', '-2px'];
    return directions[Math.floor(Math.random() * directions.length)];
  }

// 定义一个将元素移动到随机方向的函数
  const moveElementRandomly = (element) => {
    const randomDirectionX = getRandomDirection(); // 获取随机的X方向
    const randomDirectionY = getRandomDirection(); // 获取随机的Y方向
    element.style.transform = `translate(${randomDirectionX}, ${randomDirectionY})`; // 将随机方向应用到元素的transform属性
  }

// 在文档加载完成后执行以下代码
  document.addEventListener('DOMContentLoaded', () => {
    const cloudSons = document.querySelectorAll('.cloud-son'); // 选择所有的.cloud-son元素

    // 每秒钟执行一次以下代码
    setInterval(() => {
      cloudSons.forEach(moveElementRandomly); // 将每一个.cloud-son元素移动到随机方向
    }, 1000);
  });
})

const $ = s => {
  let dom = document.querySelectorAll(s)
  return dom.length == 1 ? dom[0] : dom
}

const test = () => {
  emits("change", {
    mode: isMoved.value
  })
}
</script>

<template>
  <div class="components" @click="test">
    <!-- 组件所有元素 -->
    <div class="main-button">
      <!-- 按钮主体(圆) -->
      <div class="moon"></div>
      <div class="moon"></div>
      <div class="moon"></div>
      <!-- 月亮上的陨石坑 -->
    </div>
    <div class="daytime-backgrond"></div>
    <div class="daytime-backgrond"></div>
    <div class="daytime-backgrond"></div>
    <!-- 按钮底层的三个虚影 -->
    <div class="cloud">
      <!-- 所有的云 -->
      <div class="cloud-son"></div>
      <div class="cloud-son"></div>
      <div class="cloud-son"></div>
      <div class="cloud-son"></div>
      <div class="cloud-son"></div>
      <div class="cloud-son"></div>
    </div>
    <div class="cloud-light cloud-float">
      <!-- 云的虚影 -->
      <div class="cloud-son"></div>
      <div class="cloud-son"></div>
      <div class="cloud-son"></div>
      <div class="cloud-son"></div>
      <div class="cloud-son"></div>
      <div class="cloud-son"></div>
    </div>
    <div class="stars">
      <!-- 所有星星，每一个星星由四个div拼合而成 -->
      <div class="star big">
        <div class="star-son"></div>
        <div class="star-son"></div>
        <div class="star-son"></div>
        <div class="star-son"></div>
      </div>
      <div class="star big">
        <div class="star-son"></div>
        <div class="star-son"></div>
        <div class="star-son"></div>
        <div class="star-son"></div>
      </div>
      <div class="star medium">
        <div class="star-son"></div>
        <div class="star-son"></div>
        <div class="star-son"></div>
        <div class="star-son"></div>
      </div>
      <div class="star medium">
        <div class="star-son"></div>
        <div class="star-son"></div>
        <div class="star-son"></div>
        <div class="star-son"></div>
      </div>
      <div class="star medium">
        <div class="star-son"></div>
        <div class="star-son"></div>
        <div class="star-son"></div>
        <div class="star-son"></div>
      </div>
      <div class="star small">
        <div class="star-son"></div>
        <div class="star-son"></div>
        <div class="star-son"></div>
        <div class="star-son"></div>
      </div>
      <div class="star small">
        <div class="star-son"></div>
        <div class="star-son"></div>
        <div class="star-son"></div>
        <div class="star-son"></div>
      </div>
      <div class="star small">
        <div class="star-son"></div>
        <div class="star-son"></div>
        <div class="star-son"></div>
        <div class="star-son"></div>
      </div>
      <div class="star small">
        <div class="star-son"></div>
        <div class="star-son"></div>
        <div class="star-son"></div>
        <div class="star-son"></div>
      </div>
      <div class="star small">
        <div class="star-son"></div>
        <div class="star-son"></div>
        <div class="star-son"></div>
        <div class="star-son"></div>
      </div>
      <div class="star small">
        <div class="star-son"></div>
        <div class="star-son"></div>
        <div class="star-son"></div>
        <div class="star-son"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  transition: 0.7s;
}

body {
  background-color: aliceblue; /* 白天默认背景颜色 */
}

/* 最外层元素样式 */
.components {
  //position:fixed;/* 固定定位 */
  //top: 50%;
  //left:50%;
  //margin-left:-90px;
  //margin-top: -35px;/* 按钮在页面中居中 */
  width: 180px;
  height: 70px;
  background-color: rgba(70, 133, 192, 1); /* 按钮背景颜色 */
  border-radius: 100px;
  box-shadow: inset 0 0 5px 3px rgba(0, 0, 0, 0.5); /* 按钮的内阴影,实现立体感 */
  overflow: hidden;
  transition: 0.7s;
  transition-timing-function: cubic-bezier(0, 0.5, 1, 1); /* 过渡时间贝塞尔曲线,实现非线性动画 */
  zoom: 0.3;
}

/* 主要按钮样式 */
.main-button {
  margin: 7.5px 0 0 7.5px;
  width: 55px;
  height: 55px;
  background-color: rgba(255, 195, 35, 1);
  border-radius: 50%;
  box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.5), inset -3px -5px 3px -3px rgba(0, 0, 0, 0.5), inset 4px 5px 2px -2px rgba(255, 230, 80, 1);
  cursor: pointer;
  transition: 1.0s;
  transition-timing-function: cubic-bezier(0.56, 1.35, 0.52, 1.00); /* 加入回弹动画 */
}

/* 陨石坑样式 */
.moon {
  position: absolute;
  background-color: rgba(150, 160, 180, 1);
  box-shadow: inset 0px 0px 1px 1px rgba(0, 0, 0, 0.3);
  border-radius: 50%;
  transition: 0.5s;
  opacity: 0;
}

/* 第一个陨石坑 */
.moon:nth-child(1) {
  top: 7.5px;
  left: 25px;
  width: 12.5px;
  height: 12.5px;
}

/* 第二个陨石坑 */
.moon:nth-child(2) {
  top: 20px;
  left: 7.5px;
  width: 20px;
  height: 20px;
}

/* 第三个陨石坑 */
.moon:nth-child(3) {
  top: 32.5px;
  left: 32.5px;
  width: 12.5px;
  height: 12.5px;
}

/* 按钮背后的虚影 */
.daytime-backgrond {
  position: absolute;
  border-radius: 50%;
  transition: 1.0s;
  transition-timing-function: cubic-bezier(0.56, 1.35, 0.52, 1.00); /* 加入回弹动画 */
}

/* 按钮背后的第一个虚影 */
.daytime-backgrond:nth-child(2) {
  top: -20px;
  left: -20px;
  width: 110px;
  height: 110px;
  background-color: rgba(255, 255, 255, 0.2);
  z-index: -2;
}

/* 按钮背后的第二个虚影 */
.daytime-backgrond:nth-child(3) {
  top: -32.5px;
  left: -17.5px;
  width: 135px;
  height: 135px;
  background-color: rgba(255, 255, 255, 0.1);
  z-index: -3;
}

/* 按钮背后的第三个虚影 */
.daytime-backgrond:nth-child(4) {
  top: -45px;
  left: -15px;
  width: 160px;
  height: 160px;
  background-color: rgba(255, 255, 255, 0.05);
  z-index: -4;
}

/* 云和云层虚影的初始位置 */
.cloud, .cloud-light {
  transform: translateY(10px);
  transition: 1.0s;
  transition-timing-function: cubic-bezier(0.56, 1.35, 0.52, 1.00); /* 加入回弹动画 */
}

/* 云和虚影统一样式 */
.cloud-son {
  position: absolute;
  background-color: #fff;
  border-radius: 50%;
  z-index: -1;
  transition-property: transform;
  transition-duration: 6s; /* 云层浮动动画效果，过渡时间6s */
}


/* 云和虚影由6个圆形组成，第1个圆形和第7个圆形大小相同 */
.cloud-son:nth-child(6n+1) {
  right: -20px;
  bottom: 10px;
  width: 50px;
  height: 50px;
}

/* 云和虚影由6个圆形组成，第2个圆形和第8个圆形大小相同 */
.cloud-son:nth-child(6n+2) {
  right: -10px;
  bottom: -25px;
  width: 60px;
  height: 60px;
}

/* 云和虚影由6个圆形组成，第3个圆形和第9个圆形大小相同 */
.cloud-son:nth-child(6n+3) {
  right: 20px;
  bottom: -40px;
  width: 60px;
  height: 60px;
}

/* 云和虚影由6个圆形组成，第4个圆形和第10个圆形大小相同 */
.cloud-son:nth-child(6n+4) {
  right: 50px;
  bottom: -35px;
  width: 60px;
  height: 60px;
}

/* 云和虚影由6个圆形组成，第5个圆形和第11个圆形大小相同 */
.cloud-son:nth-child(6n+5) {
  right: 75px;
  bottom: -60px;
  width: 75px;
  height: 75px;
}

/* 云和虚影由6个圆形组成，第6个圆形和第12个圆形大小相同 */
.cloud-son:nth-child(6n+6) {
  right: 110px;
  bottom: -50px;
  width: 60px;
  height: 60px;
}

/* 云层在-2层 */
.cloud {
  z-index: -2;
}

/* 云层虚影在云层下方,并且整体上移,逆时针旋转5度 */
.cloud-light {
  position: absolute;
  right: 0px;
  bottom: 25px;
  opacity: 0.5;
  z-index: -3;
  /*transform: rotate(-5deg);*/
}


/* 所有星星样式 */
.stars {
  transform: translateY(-125px);
  z-index: -2;
  transition: 1.0s;
  transition-timing-function: cubic-bezier(0.56, 1.35, 0.52, 1.00); /* 加入回弹动画 */
}

/* 大星星的宽高 */
.big {
  --size: 7.5px;
}

/* 中星星的宽高 */
.medium {
  --size: 5px;
}

/* 小星星的宽高 */
.small {
  --size: 3px;
}

/* 星星绝对定位 */
.star {
  position: absolute;
  width: calc(2 * var(--size));
  height: calc(2 * var(--size));
}

/* 所有星星的位置 */
.star:nth-child(1) {
  top: 10px;
  left: 40px;
}

.star:nth-child(2) {
  top: 20px;
  left: 95px;
}

.star:nth-child(3) {
  top: 20px;
  left: 20px;
}

.star:nth-child(4) {
  top: 35px;
  left: 50px;
}

.star:nth-child(5) {
  top: 50px;
  left: 80px;
}

.star:nth-child(6) {
  top: 50px;
  left: 20px;
}

.star:nth-child(7) {
  top: 40px;
  left: 27.5px;
}

.star:nth-child(8) {
  top: 55px;
  left: 45px;
}

.star:nth-child(9) {
  top: 20px;
  left: 75px;
}

.star:nth-child(10) {
  top: 32.5px;
  left: 67.5px;
}

.star:nth-child(11) {
  top: 40px;
  left: 95px;
}

/* 每一个星星由四个div向左浮动,拼合而成 */
.star-son {
  float: left;
}

.star-son:nth-child(1) {
  --pos: left 0;
}

.star-son:nth-child(2) {
  --pos: right 0;
}

.star-son:nth-child(3) {
  --pos: 0 bottom;
}

.star-son:nth-child(4) {
  --pos: right bottom;
}

/* 星星样式 */
.star-son {
  width: var(--size);
  height: var(--size);
  background-image: radial-gradient(circle var(--size) at var(--pos), transparent var(--size), #fff);
}

/* 将星星闪烁动画应用于所有的star元素 */
.star {
  transform: scale(1);
  transition: transform 0.5s;
}

/* 添加星星闪烁动画 */
.twinkle {
  transform: scale(0);
}

</style>