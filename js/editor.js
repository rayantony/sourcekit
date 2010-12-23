var Editor = function(editorElement, dropbox) {
	var _dropbox = dropbox;
	var _editorElement = editorElement;
	var _editor;
	
	return {
		path: "",
		notification: null,
		initialize: function() {
			_editor = _editorElement.bespin.editor;
			
			
			$(this).bind('editor.save', function() {			  
				if (this.path == "" || !this.path) {
					this.path = prompt("Choose a file name to save");
				}
				
				_dropbox.putFileContents(this.path, _editor.value, (function() {
					this.notification = webkitNotifications.createNotification("images/check.png", "Save File Notification", "File Saved As " + this.path + "!");
					this.notification.show();
					
					window.setTimeout((function() { this.notification.cancel() }).bind(this), 5000);
				}).bind(this));
			});
			
			this.onLoad = (function(path) {
				this.path = path;
				_dropbox.getFileContents(this.path, (function(data) {
					_editor.value = data;
				}).bind(this));
			}).bind(this);
		
			this.onCreate = (function() {
			
			}).bind(this);
		
			this.onLogoffDropbox = (function() {
				_dropbox.logOutDropbox();
			}).bind(this);
		
			this.onDrawerToggle = (function() {
			
			}).bind(this);
		
			this.onWindowResized = (function() {
				$("#pad").height($(window).height());
				$("#editor").width($("#pad").width());
				$("#editor").height($("#pad").height());
				$("#editor").offset({top:0});
				
				$("#toolbar").offset({top:$("#pad").height() - 19});
				$("#toolbar").width($("#pad").width());
				
				_editorElement.bespin.dimensionsChanged();
			}).bind(this);
		
			this.onPaneResized = (function(pane, element, state, options, name) {
				$("#editor").width($("#pad").width());				
				$("#toolbar").width($("#pad").width());				
				_editorElement.bespin.dimensionsChanged();
			}).bind(this);
			
			this.changeTheme = (function(themeName) {
				_editorElement.bespin.settings.set("theme", themeName);
			}).bind(this);
			
			this.getDirectoryContents = (function(path) {
				_dropbox.getDirectoryContents(path, function(data) {
	        		$.each(data.contents, function(index, file) {
			            if (!file.is_dir) {
			                $("<li>" + file.path +"</li>").appendTo('#fileList');
			            }
			        });
			    });
			}).bind(this);
		}
	};
}
