jQuery(function( $ ){

	$(document).ready(function(e){

		var map,
			myLatlng = new google.maps.LatLng(39.691457, -89.761232);

		function initialize() {
			var mapOptions = {
				zoom: 8,
				center: myLatlng,
				mapTypeId: google.maps.MapTypeId.ROADMAP
			};
			map = new google.maps.Map(document.getElementById('map-canvas'),
			  mapOptions);

			var marker = new google.maps.Marker({
				position: myLatlng,
				map: map,
				title: 'Jim and Jamiefest'
			});

		}

		google.maps.event.addDomListener(window, 'load', initialize);

	});

	// Scroll initially if there's a hash (#something) in the url
	$.localScroll.hash({
		queue:true,
		duration:1500
	});

	/**
	 * NOTE: I use $.localScroll instead of $('#navigation').localScroll() so I
	 * also affect the >> and << links. I want every link in the page to scroll.
	 */
	$.localScroll({
		queue:true,
		duration:1000,
		hash:true,
		onBefore:function( e, anchor, $target ){
			// The 'this' is the settings object, can be modified
		},
		onAfter:function( anchor, settings ){
			// The 'this' contains the scrolled element (#content)
		}
	});

	var windowHeight = $(window).outerHeight();

	if( $(window).width() > 768 && $(window).height() > 509 )
		$("#announcement,#registry").css('min-height',windowHeight);

	// Cache selectors
	var lastId,
    topMenu = $("#nav"),
    topMenuHeight = topMenu.outerHeight(),
    // All list items
    menuItems = topMenu.find("a"),
    // Anchors corresponding to menu items
    scrollItems = menuItems.map(function(){
      var item = $($(this).attr("href"));
      if (item.length) { return item; }
    });

	// Bind click handler to menu items
	// so we can get a fancy scroll animation
	menuItems.click(function(e){
	  var href = $(this).attr("href"),
	      offsetTop = href === "#" ? 0 : $(href).offset().top-topMenuHeight+1;
	  $('html, body').stop().animate({
	      scrollTop: offsetTop
	  }, 300);
	  e.preventDefault();
	});

	// Bind to scroll
	$(window).scroll(function(){
	   // Get container scroll position
	   var fromTop = $(this).scrollTop()+topMenuHeight;

	   // Get id of current scroll item
	   var cur = scrollItems.map(function(){
	     if ($(this).offset().top < fromTop)
	       return this;
	   });
	   // Get the id of the current element
	   cur = cur[cur.length-1];
	   var id = cur && cur.length ? cur[0].id : "";

	   if (lastId !== id) {
	       lastId = id;
	       // Set/remove active class
	       menuItems
	         .parent().removeClass("selected")
	         .end().filter("[href=#"+id+"]").parent().addClass("selected");
	   }
	});

});