/**
 * Created by zhuangye on 2017/3/5.
 */

    function Slider(options){
        //当前活动item
        var activeNum = 0,totalNum = options.data.length;
        var activeData = options.data[activeNum];
        var itemLength = 5;
        var containerId = options.parent.substr(1);
        var containerDiv = document.getElementById(containerId);
        containerDiv.className ="container";
        //当前活动item
        var activeItem = document.createElement("div");
        activeItem.className = "active";
        //创建img标签
        var activeImg = document.createElement("img");
        activeImg.src = activeData.img;

        //创建内容标签
        var activeInstruction = document.createElement("div");
        activeInstruction.className = "instruction";
        var activeH4 = document.createElement("h4");
        var activeContent = document.createElement("div");
        activeContent.className = "content";
        activeH4.innerHTML = activeData.title;
        activeContent.innerHTML = activeData.content;
        activeInstruction.appendChild(activeH4);
        activeInstruction.appendChild(activeContent);

        //创建底部导航栏
        var bottomDiv = document.createElement("div");
        bottomDiv.className = "bottom";
        var ul = document.createElement("ul");
        //判断初始化的值
        if(totalNum < 5){
            itemLength = totalNum;
        }
        for(var i= 0; i < itemLength; i++){
            (function(i){
                var bottomLi = createBottomLi(options.data[i]);
                ul.appendChild(bottomLi);
            })(i);

        }
        //自动播放
        var autoPlay = isAuto(activeNum,totalNum,itemLength,containerDiv,options);

        //左右箭头
        var bottomLeft = document.createElement("img");
        bottomLeft.src = "img/arrow_left.png";
        bottomLeft.className = "arrow left";
        bottomLeft.onclick = function(){
            if(activeNum < 1){
                activeNum = totalNum-1;
            }else{
                activeNum--;
            }
            //更新
            activeData = options.data[activeNum];
            clickLeft(containerDiv,activeNum,activeData);
            setActiveData(activeData);
            //清除自动播放
            clearAutoPlay(options.auto,autoPlay);
        };
        //右箭头
        var bottomRight = document.createElement("img");
        bottomRight.src = "img/arrow_right.png";
        bottomRight.className = "arrow right";
        bottomRight.onclick = function(){
            if(activeNum < totalNum-1){
                activeNum++;
            }else{
                activeNum = 0;
            }
            var bottomRightItem = activeNum + 4;
            if(bottomRightItem > (totalNum-1)){
                bottomRightItem = ((activeNum + 4) % (totalNum-1)) -1;
            }
            //清除自动播放
            clearAutoPlay(options.auto,autoPlay);

            clickRight(containerDiv,bottomRightItem,options);
            activeData = options.data[activeNum];
            setActiveData(activeData);

        };

        //插入img标签
        activeItem.appendChild(activeImg);
        activeItem.appendChild(activeInstruction);
        //底部标签插入
        bottomDiv.appendChild(ul);
        bottomDiv.appendChild(bottomLeft);
        bottomDiv.appendChild(bottomRight);
        //在容器中插入所有标签
        containerDiv.appendChild(activeItem);
        containerDiv.appendChild(bottomDiv);

        //清除自动播放
        activeItem.onmouseover= function(){
            clearAutoPlay(options.auto,autoPlay);
        }

    }
    //清除自动播放
    function clearAutoPlay(auto,autoInter) {
        if(auto && auto == 1){
            clearInterval(autoInter);
        }
    }
    //自动播放
    function isAuto(activeNum,totalNum,itemLength,containerDiv,options) {
        var autoPlay = null;
        if(options.auto && options.auto == 1){
            autoPlay = setInterval(function(){
//                console.log(1);
                if(activeNum < totalNum-1){
                    activeNum++;
                }else{
                    activeNum = 0;
                }
                var bottomRightItem = activeNum + 4;
                if(bottomRightItem > (totalNum-1)){
                    bottomRightItem = ((activeNum + 4) % (totalNum-1)) -1;
                }

                clickRight(containerDiv,bottomRightItem,options);
                var activeData = options.data[activeNum];
                setActiveData(activeData);
            },2000);
        }
        return autoPlay;
    }
    //点击左箭头
    function clickLeft(containerDiv,activeNum,activeData){
        var ul = containerDiv.getElementsByTagName("ul")[0];
        var lastLi = ul.getElementsByTagName("li")[4];
        var firstLi = ul.getElementsByTagName("li")[0];
        var cloneLi = lastLi.cloneNode(true);
        var cloneImg = cloneLi.getElementsByTagName("img")[0];
        cloneImg.src = activeData.img;
        var cloneH6 = cloneLi.getElementsByTagName("h6")[0];
        cloneH6.innerHTML = activeData.title;
        var cloneDiv = cloneLi.getElementsByTagName("div")[1];
//                cloneDiv.className = "active-line";
        //移除首个节点
        ul.removeChild(lastLi);
        ul.insertBefore(cloneLi,firstLi);

    }
    //点击右箭头
    function clickRight(containerDiv,bottomRightItem,options){
        //判断当前值，显示其余的data
        var ul = containerDiv.getElementsByTagName("ul")[0];
        var firstLi = ul.getElementsByTagName("li")[0];
        var cloneLi = firstLi.cloneNode(true);
        var cloneImg = cloneLi.getElementsByTagName("img")[0];
        cloneImg.src = options.data[bottomRightItem].img;
        var cloneH6 = cloneLi.getElementsByTagName("h6")[0];
        cloneH6.innerHTML = options.data[bottomRightItem].title;
        //移除首个节点
        ul.removeChild(firstLi);
        ul.appendChild(cloneLi);
    }
    //初始化底部列表
    function createBottomLi(data) {
        var bottomLi = document.createElement("li");
        var itemDiv = document.createElement("div");
        itemDiv.className = "item";
        var itemImg = document.createElement("img");
        itemImg.src = data.img;
        var itemH6 = document.createElement("h6");
        itemH6.innerHTML = data.title;
        var itemLine = document.createElement("div");
        //插入ul中
        itemDiv.appendChild(itemImg);
        itemDiv.appendChild(itemH6);
        itemDiv.appendChild(itemLine);
        bottomLi.appendChild(itemDiv);

        return bottomLi;
    }
    //设置活动图片的数据
    function setActiveData(data) {
        var containerDiv = document.getElementById("myContainer");
        var divEles = containerDiv.getElementsByTagName("div");
        var activeDiv = null;
        for(var i=0;i<divEles.length;i++){
            if(divEles[i].className== "active"){
                activeDiv = divEles[i];
            }
        }
        var activeImg = activeDiv.getElementsByTagName("img");
        activeImg[0].src = data.img;
        var activeH4 = activeDiv.getElementsByTagName("h4");
        activeH4[0].innerHTML = data.title;
        var activeContents = activeDiv.getElementsByTagName("div");
        var activeContent = null;
        for(var j=0; j <activeContents.length; j++){
            if(activeContents[j].className== "content"){
                activeContent = activeContents[j];
            }
        }
        activeContent.innerHTML = data.content;
    }
