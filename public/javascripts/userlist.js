YUI().use(
	'aui-base',
	'aui-io',
	function(A) {
		var userlist = A.one('.userlist');

		userlist.delegate(
			'click',
			function(event) {
				var target = event.currentTarget;
				var username = target.attr('data-username');

				var confirmRemoveUser = confirm('Are you certain you would like to remove this user?');

				if (confirmRemoveUser) {
					A.io.request(
						'/removeuser',
						{
							data: {
								username: username
							},
							method: 'post',
							on: {
								success: function() {
									target.ancestor('li').remove();
								}
							}
						}
					);
				}
			},
			'.delete-user'
		);
	}
);