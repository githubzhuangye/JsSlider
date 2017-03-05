/**
 * Created by zhuangye on 2017/3/5.
 */

    function Slider(options){
        //��ǰ�item
        var activeNum = 0,totalNum = options.data.length;
        var activeData = options.data[activeNum];
        var itemLength = 5;
        var containerId = options.parent.substr(1);
        var containerDiv = document.getElementById(containerId);
        containerDiv.className ="container";
        //��ǰ�item
        var activeItem = document.createElement("div");
        activeItem.className = "active";
        //����img��ǩ
        var activeImg = document.createElement("img");
        activeImg.src = activeData.img;

        //�������ݱ�ǩ
        var activeInstruction = document.createElement("div");
        activeInstruction.className = "instruction";
        var activeH4 = document.createElement("h4");
        var activeContent = document.createElement("div");
        activeContent.className = "content";
        activeH4.innerHTML = activeData.title;
        activeContent.innerHTML = activeData.content;
        activeInstruction.appendChild(activeH4);
        activeInstruction.appendChild(activeContent);

        //�����ײ�������
        var bottomDiv = document.createElement("div");
        bottomDiv.className = "bottom";
        var ul = document.createElement("ul");
        //�жϳ�ʼ����ֵ
        if(totalNum < 5){
            itemLength = totalNum;
        }
        for(var i= 0; i < itemLength; i++){
            (function(i){
                var bottomLi = createBottomLi(options.data[i]);
                ul.appendChild(bottomLi);
            })(i);

        }
        //�Զ�����
        var autoPlay = isAuto(activeNum,totalNum,itemLength,containerDiv,options);

        //���Ҽ�ͷ
        var bottomLeft = document.createElement("img");
        bottomLeft.src = "img/arrow_left.png";
        bottomLeft.className = "arrow left";
        bottomLeft.onclick = function(){
            if(activeNum < 1){
                activeNum = totalNum-1;
            }else{
                activeNum--;
            }
            //����
            activeData = options.data[activeNum];
            clickLeft(containerDiv,activeNum,activeData);
            setActiveData(activeData);
            //����Զ�����
            clearAutoPlay(options.auto,autoPlay);
        };
        //�Ҽ�ͷ
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
            //����Զ�����
            clearAutoPlay(options.auto,autoPlay);

            clickRight(containerDiv,bottomRightItem,options);
            activeData = options.data[activeNum];
            setActiveData(activeData);

        };

        //����img��ǩ
        activeItem.appendChild(activeImg);
        activeItem.appendChild(activeInstruction);
        //�ײ���ǩ����
        bottomDiv.appendChild(ul);
        bottomDiv.appendChild(bottomLeft);
        bottomDiv.appendChild(bottomRight);
        //�������в������б�ǩ
        containerDiv.appendChild(activeItem);
        containerDiv.appendChild(bottomDiv);

        //����Զ�����
        activeItem.onmouseover= function(){
            clearAutoPlay(options.auto,autoPlay);
        }

    }
    //����Զ�����
    function clearAutoPlay(auto,autoInter) {
        if(auto && auto == 1){
            clearInterval(autoInter);
        }
    }
    //�Զ�����
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
    //������ͷ
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
        //�Ƴ��׸��ڵ�
        ul.removeChild(lastLi);
        ul.insertBefore(cloneLi,firstLi);

    }
    //����Ҽ�ͷ
    function clickRight(containerDiv,bottomRightItem,options){
        //�жϵ�ǰֵ����ʾ�����data
        var ul = containerDiv.getElementsByTagName("ul")[0];
        var firstLi = ul.getElementsByTagName("li")[0];
        var cloneLi = firstLi.cloneNode(true);
        var cloneImg = cloneLi.getElementsByTagName("img")[0];
        cloneImg.src = options.data[bottomRightItem].img;
        var cloneH6 = cloneLi.getElementsByTagName("h6")[0];
        cloneH6.innerHTML = options.data[bottomRightItem].title;
        //�Ƴ��׸��ڵ�
        ul.removeChild(firstLi);
        ul.appendChild(cloneLi);
    }
    //��ʼ���ײ��б�
    function createBottomLi(data) {
        var bottomLi = document.createElement("li");
        var itemDiv = document.createElement("div");
        itemDiv.className = "item";
        var itemImg = document.createElement("img");
        itemImg.src = data.img;
        var itemH6 = document.createElement("h6");
        itemH6.innerHTML = data.title;
        var itemLine = document.createElement("div");
        //����ul��
        itemDiv.appendChild(itemImg);
        itemDiv.appendChild(itemH6);
        itemDiv.appendChild(itemLine);
        bottomLi.appendChild(itemDiv);

        return bottomLi;
    }
    //���ûͼƬ������
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
