DEBUG=false;

function Flip(bookID,pageToFlipID){

//    pageToFlipID = pageToFlipID ||
	this.bookDiv = document.getElementById(bookID);
	this.mask = document.getElementById(pageToFlipID);
	this.backPage = document.getElementById('page3content');
	this.frontPage = document.getElementById('page2content');
	this.bookTop = this.bookDiv.offsetTop;
	this.bookLeft = this.bookDiv.offsetLeft;
	this.bookWidth = this.bookDiv.clientWidth;
	this.bookHeight = this.bookDiv.clientHeight;
	this.pageWidth = this.bookWidth/2;
	this.pageHeight = this.bookHeight;
	this.maskWidth = this.mask.clientWidth;
	this.maskHeight = this.mask.clientHeight;


    this.mask.style.display = 'block';
    this.mask.style.top = (this.bookTop - this.bookHeight) + "px";
};

Flip.prototype = {

    //-------------- debug render functions ------------------
	drawXDebug: function(){
		var canvas = document.createElement('canvas');
		canvas.width = 1200;
		canvas.height = 1000;
		canvas.className = 'canv';
		canvas.id = 'debugCanvas'
		document.getElementById('body').appendChild(canvas);
		this.ctx = canvas.getContext("2d");
		this.renderScene();
		
	},
	drawCircle: function(color, label, x,y,r) {
		this.ctx.fillStyle = color;
		this.ctx.beginPath();
		this.ctx.arc(x, y, r, 0, Math.PI*2, true);
		this.ctx.closePath();
		this.ctx.fill();
		this.ctx.fillStyle = "#FFFFFF";
		this.ctx.textAlign = "center";
		this.ctx.fillText(label, x, y+4);
	},
	drawRing: function(color, x, y, r){
		this.ctx.strokeStyle = color;
		this.ctx.beginPath();
		this.ctx.arc(x, y, r, 0, Math.PI*2, true);
		this.ctx.closePath();
		this.ctx.stroke();  
	},
    drawLine: function(start, end){
        this.ctx.beginPath();
        this.ctx.moveTo(start.x,start.y);
        this.ctx.lineTo(end.x,end.y);
        this.ctx.closePath();
        this.ctx.stroke();
    },
	renderScene: function(){
		this.clearScene();
        this.drawCircle("rgba(0,255,0,0.9)", 'SP', this.startPointer.x, this.startPointer.y, 10);
        this.drawCircle("rgba(0,111,0,0.9)", 'S1', this.spinePointer1.x, this.spinePointer1.y, 10);
        this.drawCircle("rgba(0,111,0,0.9)", 'S2', this.spinePointer2.x, this.spinePointer2.y, 10);
        this.drawLine(this.startPointer, this.spinePointer1);
        this.drawLine(this.startPointer, this.spinePointer2);

        this.drawCircle("rgba(0,0,0,0.9)", 'F', this.follow.x, this.follow.y, 10);

        this.drawCircle("rgba(0,0,0,0.9)", 'R1', this.radius1.x, this.radius1.y, 10);
        this.drawCircle("rgba(0,0,0,0.9)", 'R2', this.radius2.x, this.radius2.y, 10);
        this.drawLine(this.corner, this.spinePointer1);
        this.drawLine(this.corner, this.spinePointer2);

        this.drawCircle("rgba(0,0,255,0.9)", 'T0', this.middle.x, this.middle.y, 10);
        //this.drawCircle("rgba(0,0,0,0.9)", 'F', this.follow.x, this.follow.y, 10);
        this.drawCircle("rgba(255,0,0,0.9)", 'C', this.corner.x, this.corner.y, 10);
		this.drawRing("rgba(0,0,0,0.9)", this.spinePointer1.x, this.spinePointer1.y, this.spine1Radius);
		this.drawRing("rgba(0,0,0,0.9)", this.spinePointer2.x, this.spinePointer2.y, this.spine2Radius);
	},
	clearScene: function(){
		this.ctx.clearRect(0, 0, 1200, 1000);
	},



    //  ---------------------
    mouseUp: function(event){
        //document.getElementById('maskRefl').parentNode.removeChild(document.getElementById('maskRefl'));
        //document.getElementById('maskBlur').parentNode.removeChild(document.getElementById('maskBlur'));
    },
    // устанавливает
    mouseOn: function(event){
        this.startPointer = new Point(event.pageX,event.pageY);

        // начальную точку располагаем на краю книги
        this.startPointer.x = (this.startPointer.x<this.pageWidth+this.bookLeft) ? this.bookLeft : 2*this.pageWidth+this.bookLeft ;
        this.startPointer.y = (this.startPointer.y<this.bookTop) ? this.bookTop : this.startPointer.y;
        this.startPointer.y = (this.startPointer.y>this.pageHeight+this.bookTop) ? this.pageHeight+this.bookTop : this.startPointer.y;

        // Рельеф для листаемой странички
        this.maskRefl = document.createElement('div');
        this.maskRefl.id = 'maskRefl';
        this.maskRefl.className = 'maskRefl';
        this.maskRefl.style.width = this.bookWidth/2+'px';
        this.maskRefl.style.height = this.bookHeight+'px';

        this.divRefl = document.createElement('div');
        this.divRefl.id = 'divRefl';
        this.divRefl.className = 'divRefl';
        this.divRefl.style.top = -this.bookHeight+'px';
        this.divRefl.style.height = 3*this.bookHeight+'px';
        this.divRefl.style.background = (this.startPointer.x == this.bookLeft) ? "url(resources/css/blur1.png)" : "url(resources/css/blur1.png)";
        this.divRefl.style.backgroundSize = "100% auto";
        this.divRefl.style.backgroundPosition = "0% 0%";

        this.maskRefl.appendChild(this.divRefl);
        this.bookDiv.appendChild(this.maskRefl);



        // Тень для листаемой странички
        this.maskBlur = document.createElement('div');
        this.maskBlur.id = 'maskBlur';
        this.maskBlur.className = 'maskBlur';
        this.maskBlur.style.width = this.bookWidth+'px';
        this.maskBlur.style.height = this.bookHeight+'px';

        this.divBlurBack = document.createElement('div');
        this.divBlurBack.id = 'divBlurBack';
        this.divBlurBack.className = 'divBlurBack';
        this.divBlurBack.style.top = -this.bookHeight+'px';
        this.divBlurBack.style.width = this.bookWidth+'px';
        this.divBlurBack.style.height = 3*this.bookHeight+'px';

        this.divBlurFront = document.createElement('div');
        this.divBlurFront.id = 'divBlurFront';
        this.divBlurFront.className = 'divBlurFront';
        this.divBlurFront.style.width = this.bookWidth/2+'px';
        this.divBlurFront.style.height = this.bookHeight+'px';

        this.divBlurBack.appendChild(this.divBlurFront);
        this.maskBlur.appendChild(this.divBlurBack);
        this.bookDiv.appendChild(this.maskBlur);






        this.spinePointer1 = new Point(this.pageWidth + this.bookLeft, 0 + this.bookTop);  // верхняя точка перегиба книги
        this.spinePointer2 = new Point(this.pageWidth + this.bookLeft, this.bookHeight  + this.bookTop); // нижняя точка перегиба книги
        // вычисляем радиус ограничивающих окружностей
        this.spine1Radius = Math.sqrt((this.startPointer.x - this.spinePointer1.x)*(this.startPointer.x - this.spinePointer1.x) + (this.startPointer.y - this.spinePointer1.y)*(this.startPointer.y - this.spinePointer1.y))-1;
        this.spine2Radius = Math.sqrt((this.startPointer.x - this.spinePointer2.x)*(this.startPointer.x - this.spinePointer2.x) + (this.startPointer.y - this.spinePointer2.y)*(this.startPointer.y - this.spinePointer2.y))-1;
        this.radius1 = new Point(0,0); //точка которая следует по радиусу большой окружности
        this.radius2 = new Point(0,0); //точка которая следует по радиусу большой окружности

        this.corner = new Point(0,0); //точка соответствует углу тянущегося листа
        this.follow = new Point(0,0); //точка курсора


        this.middle = {};


        function Point(x,y){
            this.x = x;
            this.y = y;
        };
        if(DEBUG){
            this.drawXDebug();
        } //нарисовать отладочную инфу
    },
    mouseMove: function(event){
        this.follow.x = event.pageX;
        this.follow.y = event.pageY;

        //граничные условия для точки листания
        var checkRadius = function(follow, spinePointer, spineRadius){
            var dx = spinePointer.x - follow.x;
            var dy = spinePointer.y - follow.y;
            var angle2follow = Math.atan2(dy, dx);
            var radius ={};
            radius.x = spinePointer.x - Math.cos(angle2follow) * spineRadius;
            radius.y = spinePointer.y - Math.sin(angle2follow) * spineRadius;

            var distanceFromTop = Math.sqrt((dy*dy) + (dx*dx));
            if(distanceFromTop > spineRadius){
                var corner = radius;
            }
            else {
                var corner = follow;
            }
            return [corner,radius];
        }

        var a = checkRadius(this.follow, this.spinePointer1, this.spine1Radius);
        this.corner = a[0];
        this.radius1 = a[1];
        a = checkRadius(this.corner, this.spinePointer2, this.spine2Radius);
        this.corner = a[0];
        this.radius2 = a[1];

        //линия перегиба листа, угол наклона
        this.middle.x = this.corner.x + .5*(this.startPointer.x - this.corner.x);
        this.middle.y = this.corner.y + .5*(this.startPointer.y - this.corner.y);
        this.middle.alfa = Math.atan((this.middle.y - this.startPointer.y)/(this.middle.x - this.startPointer.x));
        this.middle.dist2 = Math.sqrt((this.startPointer.x - this.corner.x)*(this.startPointer.x - this.corner.x) + (this.startPointer.y - this.corner.y)*(this.startPointer.y - this.corner.y));
        this.middle.dist = this.middle.dist2/2;

        this.middle.distX = (this.startPointer.x - this.middle.x);
        this.middle.distY = (this.startPointer.y - this.middle.y);
        this.middle.distX2 = (this.startPointer.x - this.corner.x);
        this.middle.distY2 = (this.startPointer.y - this.corner.y);

        //++++++++++++++++++++++++++++
        if(DEBUG){this.clearScene(); this.renderScene();}//нарисовать отладочную инфу

        this.mask.style.webkitTransformOrigin = (this.startPointer.x - this.bookLeft)+'px '+(this.startPointer.y + this.bookHeight  - 2*this.bookTop)+'px';
        this.mask.style.webkitTransform = 'translate3d('+(-this.middle.distX)+'px,'+(-this.middle.distY)+'px,0px) rotate('+this.middle.alfa+'rad)';

        var isR = true;
        if(this.startPointer.x == this.bookLeft) isR = false;

        this.backPage.style.webkitTransformOrigin = (isR ? 0:100)+'%' +(this.startPointer.y - this.bookTop)+'px';
        this.backPage.style.webkitTransform = 'translate3d('+(isR ? (this.bookWidth-this.middle.dist):(-this.bookWidth/2+this.middle.dist))+'px,'+(this.bookHeight-this.bookTop)+'px,0px) rotate('+this.middle.alfa+'rad)';

        this.frontPage.style.webkitTransformOrigin = (!isR ? 0:100)+'%' +(this.startPointer.y - this.bookTop)+'px';
        this.frontPage.style.webkitTransform = 'translate3d('+(!isR ? (-this.middle.dist):(this.bookWidth/2+this.middle.dist))+'px,'+(this.bookHeight-this.bookTop)+'px,0px) rotate('+(-this.middle.alfa)+'rad)';



        // Рельеф странички
        this.divRefl.style.width = (this.middle.dist + Math.abs(Math.sin(this.middle.alfa))*this.bookWidth/2) + 'px';


        //this.maskRefl.style.left = -this.bookWidth/2+'px';  //TODO: для клика вправо
        this.maskRefl.style.webkitTransformOrigin = (isR ? 0:100)+'%' +(this.startPointer.y - this.bookTop)+'px';
        this.maskRefl.style.webkitTransform = 'translate3d('+ (!isR ? (-this.middle.distX2-this.bookWidth/2):(this.bookWidth-this.middle.distX2))+'px,'+(-this.middle.distY2)+'px,0px) rotate('+2*this.middle.alfa+'rad)';

        this.divRefl.style.webkitTransformOrigin = (this.startPointer.x - this.bookLeft)+'px ' +(this.startPointer.y + this.bookHeight -  this.bookTop)+'px';
        this.divRefl.style.webkitTransform = 'translate3d('+(!isR ? (this.bookWidth/2-this.middle.dist):(-this.bookWidth/2 + this.middle.dist))+'px,'+(-this.middle.distY)+'px,0px) rotate('+(-this.middle.alfa)+'rad)';

        // Тень странички
        this.divBlurBack.style.webkitTransformOrigin = (this.startPointer.x - this.bookLeft)+'px '+(this.startPointer.y +  this.bookHeight  - this.bookTop)+'px';
        this.divBlurBack.style.webkitTransform = 'translate3d('+(-this.middle.distX)+'px,'+(-this.middle.distY)+'px,0px) rotate('+this.middle.alfa+'rad)';

        this.divBlurFront.style.webkitTransformOrigin = (isR ? 0:100)+'%' +(this.startPointer.y - this.bookTop)+'px';
        this.divBlurFront.style.webkitTransform = 'translate3d('+(isR ? (this.bookWidth-this.middle.dist):(-this.bookWidth/2+this.middle.dist))+'px,'+(this.bookHeight)+'px,0px) rotate('+this.middle.alfa+'rad)';




    },



	destroy: function(){
		document.getElementById('debugCanvas').parentNode.removeChild(document.getElementById('debugCanvas'));
		this.mask.style.display = 'none';
		this.clearScene();
	}

	
};