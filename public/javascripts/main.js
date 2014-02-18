YUI().use(
	'aui-node',
	'transition',
	'aui-io',
	function(A) {
		var container = A.one('.nav-container');
		var slider = A.one('.nav-slider');
		var selected = A.one('.selected');
		var content = A.one('.content');
		var win = A.getWin();

		var CONTENT_TPL = '<div class="content-new">{data}</div>';

		var MainPage = {
			setNavSliderStyles: function(target, speed) {
				var targetY = target.get('offsetLeft').toString() + 'px';
				var targetWidth = target.get('offsetWidth').toString() + 'px';

				slider.toggleClass('active');

				slider.transition(
					{
						left: targetY,
						width: targetWidth,
						duration: speed != null ? speed : 0.25
					},
					function() {
						target.toggleClass('selected');
						slider.toggleClass('active');
					}
				);
			},

			getIOData: function(navId) {
				var data;

				A.io.request(
					navId,
					{
						on: {
							success: function() {
								data = this.get('responseData');

								MainPage.slideNewContent(data)
							}
						}
					}
				);

			},

			slideNewContent: function(data) {
				var left = window.innerWidth;

				var newContent = A.Node.create(data);
				var wrapper = A.one('.content-wrapper');
				var oldContent = A.one('.content');
				var contentContainer = A.one('.content-container');

				contentContainer.appendChild(newContent);

				contentContainer.transition(
					{
						left: '-600px'
					},
					function() {
						this.setStyle('left', 0);

						oldContent.remove();
					}
				);
			},

			handleClick: function(target) {
				var selected = A.one('.selected');
				var navId = target.attr('data-navid');

				if (navId != '') {
					if (selected) {
						selected.removeClass('selected');
					}

					MainPage.getIOData(navId);
					MainPage.setNavSliderStyles(target);
				}
				else {
					window.location = target.one('a').attr('href');
				}
			}
		};

		MainPage.setNavSliderStyles(selected, 0);

		container.delegate(
			'click',
			function(event) {
				var target = event.currentTarget;

				MainPage.handleClick(target);
			},
			'.nav-item'
		);
	}
);