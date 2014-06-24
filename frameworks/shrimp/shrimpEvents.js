shrimp.events = {
	initialized: false,
	currentEventData: null,
	previousEventData: null,
	currentElement: null,

	init:function(){
		if(this.initialized){
			return;
		}
		var pointerType = 'ontouchstart' in window?'touch':(navigator.pointerEnabled || navigator.msPointerEnabled)?'pointer':'mouse';
		this.START_EVENT = pointerType==='mouse'?pointerType+'down':pointerType+'start';
		this.MOVE_EVENT = pointerType==='mouse'?pointerType+'move':pointerType+'move';
		this.END_EVENT = pointerType==='mouse'?pointerType+'up':pointerType+'end';
		this.EVENT_TYPE = pointerType;

		_dom(document).on(this.MOVE_EVENT,shrimp.events.watchers.watch);
		_dom(document).on(this.END_EVENT,shrimp.events.watchers.stopWatch);
		console.log(this)
		this.initialized = true;
	},
	bind:function(element){
		this.init();
		element.on(this.START_EVENT,shrimp.events.watchers.startWatch);

	},
	watchers:{
		watchEnable:false,
		startWatch:function(event){
			if(!shrimp.events.currentElement){
				return
			}
			shrimp.events.watchers.watchEnable = true;
			
		},
		watch:function(event){
			if(!shrimp.events.watchers.watchEnable){
				return
			}

			console.log('dd')
		},
		stopWatch:function(event){
			if(!shrimp.events.watchers.watchEnable){
				return
			}
			shrimp.events.watchers.watchEnable = false;
		}
	},
	utils:{
		getAllEventNames:function(){
			var arrayNames = [];
			for(var i in shrimp.events.eventsDescription){
				arrayNames.push(shrimp.events.eventsDescription[i].name);
			}
			return arrayNames;
		},
		extEventData:function(event){
			var extEvent = event;
			return extEvent;
		}
	},
	eventsDescription:{
		test:{
			name:'tap',
			defaults:{

			},
			func:function(event){

			}
		}
	}
};