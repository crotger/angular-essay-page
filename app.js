(function() {
	var app = angular.module("crudApp", []);
	var essays = [
	{
		author: "Carlos Rotger",
		title: "Test Essay",
		contents: [
		{
			type:"paragraph", 
			show_form_default: false, 
			body:"*Paragraph in markdown format. Editable with buttons on hover.*\n\nLorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmodem tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n\n- List item 1\n- List item 2\n\n__Bold Text__\n\n[This link leads to nowhere]()\n\nCode snippet of html:\n```html\n<a><b>content</a></b>\n```"
		},
		{
			type:"paragraph",
			show_form_default:false,
			body:"In a real implementation of this, these paragraphs would be saved to a server as you edit and update them, but in this version they only exist locally and so your changes aren't saved on refresh. I've also set it up so these could be a generic content type, so one \"paragraph\" could be an image, etc. instead, rather than just text."
		}
		]
	}];

	/*
	These two functions would be filled in with AJAX calls to retrieve data.
	*/
	function get_essay () {
		return essays[0];
	}

	/*
	Update the retrieved JSON structure
	*/
	function update_essay (newValue) {
		//Fill in with ajax...
	}

	app.controller("EssayController", function(){
		this.e = get_essay();

		this.updateContent = update_essay;

		this.addParagraph = function(index) {
			if(index === -1) {
				this.e.contents.push({type:"paragraph", show_form_default:true, body:"New Paragraph"});
			} else {
				this.e.contents.splice(index + 1, 0, {type:"paragraph", show_form_default:true, body:"New Paragraph"})
			}
			this.updateContent(this.e);
		};

		this.deleteParagraph = function(index) {
			this.e.contents.splice(index, 1);
			this.updateContent(this.e);
		}

		this.updateShowForm = function(index) {
			this.e.contents[index].show_form_default = false;
			this.updateContent(this.e);
		};

	});

	app.controller("ParagraphFormController", function(){
		this.form = false;
		this.button = false;

		this.showButton = function() {
			this.button = true;
		};

		this.hideButton = function() {
			this.button = false;
		};

		this.setShow = function(val) {
			this.form = val;
		};
		
		this.showForm = function() {
			this.form = true;
		};

		this.hideForm = function() {
			this.form = false;
		};

		this.shouldShow = function(def) {
			if(def) this.form = true;
			return this.form;
		};
	});


	app.directive("markdown", function($log) {
		var showdown = new Showdown.converter();
		return {
			restrict: "AE",
			link: function(scope, element, attributes) {
				// if the md-src attribute is set, use its contents as the value of the element
				if(attributes.markdown) {
					scope.$watch(attributes.markdown, function(newVal, oldVal, scope) {
						var newHtml = newVal ? showdown.makeHtml(newVal) : "";
						element.html(newHtml);
					});
				} else {
					var newHtml = showdown.makeHtml(element.text());
					element.html(newHtml);
				}
			}
		};
	})
})();