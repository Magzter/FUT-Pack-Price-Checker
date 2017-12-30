$(function() {
	//Check if itemList is ready to start manipulating DOM
	$.initialize(".itemList", function() {
		//Remove existing elements
		$('.check-prices').each(function() {
			$(this).remove();
		});
		//Add custom button
		$('.list-view-header').first().append('<button class="standard section-header-btn mini call-to-action check-prices" id="check-prices">Check Prices</button>');
		//Remove button when clicked to stop duplicate pressing
		$('#check-prices').on('click', function() {
			$(this).fadeOut();
		});
		$('#check-prices').on('click', function() {
			//Each line item element in the web app from the pack opening
			$('.itemList .listFUTItem').each(function() {
				//Check to make sure the type of item is a player
				if($(this).find('.player').length < 1) {
					if($(this).find('.consumable').length > 0) {
						return;
					}
					return;
				}
				//Save price area for later manipulation
				price_area = $(this).find('.player-stats-data-component');

				player_name = $(this).find('.name').text();
				player_rating = $(this).find('.playerOverview .rating').text();
				player_position = $(this).find('.playerOverview .position').text();

				//Search player from FUTBIN
				$.ajax({
					type: 'GET',
					url: 'https://www.futbin.com/search?year=18&term=' + player_name + '&_=1514602993894',
					async: false
				}).done(function(data) {
					$.each(data, function(key, value) {
						futbin_name = value.full_name;
						futbin_id = value.id;
						futbin_position = value.position;
						futbin_rating = value.rating;
						//Get resource id from image url
						resource_id = value.image;
						resource_id = resource_id.split("/");
						resource_id = resource_id[7];
						resource_id = resource_id.split(".");
						resource_id = resource_id[0];
						//If our player matches with one of the futbin search results
						if(futbin_rating == player_rating && futbin_position == player_position) {
							$.ajax({
								type: 'GET',
								url: 'https://www.futbin.com/18/playerPrices?player=' + resource_id + '&all_versions=&_=1514605819901',
								async: false
							}).done(function(data) {
								prices = data[resource_id].prices;
								
								xbox_price = prices.xbox.LCPrice;
								xbox_min = prices.xbox.MinPrice;
								xbox_max = prices.xbox.MaxPrice;
								xbox_prp = prices.xbox.PRP;
								xbox_updated = prices.xbox.updated;

								ps_price = prices.ps.LCPrice;
								ps_min = prices.ps.MinPrice;
								ps_max = prices.ps.MaxPrice;
								ps_prp = prices.ps.PRP;
								ps_updated = prices.ps.updated;

								pc_price = prices.pc.LCPrice;
								pc_min = prices.pc.MinPrice;
								pc_max = prices.pc.MaxPrice;
								pc_prp = prices.pc.PRP;
								pc_updated = prices.pc.updated;

								price_area.append('<div id="DIV_1">\
														<div id="DIV_2">\
															<img src="https://cdn.futbin.com/design/img/l.gif" id="IMG_3" alt="" />\
														</div>\
														<div id="DIV_4">\
															<div id="DIV_5">\
																<div id="DIV_6">\
																	<img src="https://cdn.futbin.com/design/img/logos/full_small/ps_blue.png" id="IMG_7" alt="" />\
																</div>\
																<div id="DIV_8">\
																</div>\
																<div id="DIV_9">\
																	 <span id="SPAN_10"> <span id="SPAN_11">' + ps_price + '<img alt="c" src="https://cdn.futbin.com/design/img/coins_bin.png" id="IMG_12" /></span></span>\
																</div>\
																<div id="DIV_13">\
																</div>\
																<div id="DIV_14">\
																	<span id="SPAN_15">Price Updated: ' + ps_updated + '</span>\
																</div>\
																<div id="DIV_16">\
																	<span id="SPAN_17">PRP: ' + ps_prp + '%</span>\
																</div>\
																<div id="DIV_18">\
																	PR: ' + ps_min + ' - ' + ps_max + '\
																</div>\
															</div>\
														</div>\
														<div id="DIV_22">\
															<div id="DIV_23">\
																<div id="DIV_24">\
																	<img src="https://cdn.futbin.com/design/img/logos/full_small/xbox_green.png" id="IMG_25" alt="" />\
																</div>\
																<div id="DIV_26">\
																</div>\
																<div id="DIV_27">\
																	 <span id="SPAN_28"> <span id="SPAN_29">' + xbox_price + '<img alt="c" src="https://cdn.futbin.com/design/img/coins_bin.png" id="IMG_30" /></span></span>\
																</div>\
																<div id="DIV_31">\
																</div>\
																<div id="DIV_32">\
																	<span id="SPAN_33">Price Updated: ' + xbox_updated + '</span>\
																</div>\
																<div id="DIV_34">\
																	<span id="SPAN_35">PRP: ' + xbox_prp + '%</span><span id="SPAN_36"></span>\
																</div>\
																<div id="DIV_37">\
																	PR: ' + xbox_min + ' - ' + xbox_max + '\
																</div>\
															</div>\
														</div>\
														<div id="DIV_41">\
															<div id="DIV_42">\
																<div id="DIV_43">\
																	<img src="https://cdn.futbin.com/design/img/logos/full_small/pc_orange.png" id="IMG_44" alt="" />\
																</div>\
																<div id="DIV_45">\
																</div>\
																<div id="DIV_46">\
																	 <span id="SPAN_47"> <span id="SPAN_48">' + pc_price + '<img alt="c" src="https://cdn.futbin.com/design/img/coins_bin.png" id="IMG_49" /></span></span>\
																</div>\
																<div id="DIV_50">\
																</div>\
																<div id="DIV_51">\
																	<span id="SPAN_52">Price Updated: ' + pc_updated + '</span>\
																</div>\
																<div id="DIV_53">\
																	<span id="SPAN_54">PRP: ' + pc_prp + '%</span>\
																</div>\
																<div id="DIV_55">\
																	PR: ' + pc_min + ' - ' + pc_max + '\
																</div>\
															</div>\
														</div>\
													</div>\
													<button class="standard section-header-btn mini call-to-action futbin_link" link="https://www.futbin.com/18/player/' + futbin_id + '/' + futbin_name + '/">\
														<img src="https://cdn.futbin.com/design/img/small-futbin-logo.png?v=5">\
													</button>');
							});
						}
					});
				});
			});
			$('.futbin_link').on('click', function() {
				link = $(this).attr('link');
				window.open(link, '_blank');
			});	
		});
	});
});