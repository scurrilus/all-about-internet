SCURRILUS - One Page scroll
==================

This is a framework for a one page scroll with snap function.
Based on jquery. It is a hybrid and use normal and scnap scrolling in one framework. The framework is completely responsive.

Here is a demo. http://scurrilus.de/scurrilus-github/scurrilus-onepage-scroll/index.html

How to use?
------------------


### Required resourches: ###

```html
<link rel="stylesheet" href="stylesheets/scurrilus-onepage.css">
<script src="javascripts/jquery-1.10.2.min.js"></script>
<script src="javascripts/jquery.easing.1.3.min.js"></script>
<script src="javascripts/jquery.easing.compatibility.js"></script>
<script src="javascripts/scurrilus-onepage.js"></script>
```

### Required HTML structure for page navigation

The label of the navigation links (HTML tag: nav) will be generated automatically based on the data-title of sections.

```html
<div id="menuIcon">
	//Menue Icon defined scurrilus-onepage.css
</div>
<nav>
	<ul>
	<!--Navigation <li>data-title</li> buttons autoload by Framework.      
	    Labels for buttons use data-title tag from section. You only have to edit   
	    the data-title tag on each section-->
	</ul>
</nav>
<div id="bullets">
	<ul>
	<!--Bullet points autoload by Framework. CSS styled pagination points. -->
	</ul>
</div>
```

### Required HTML structure for sections

The framework differs according to the length of the contents of a section. If the browser height is greater than the content in one section, the page will snap to the next section by scrolling. If the browser height is smaler than the content of one section, the page will scroll in standard mode. In the end of the active section it snap to the next section.

The data-title is used as the label for navigation.


```html
<section data-title='Section 1'>
	<!--Edit section data-title for display section name on navigation button-->
	<!--Enter here your section content-->
</section>

<section data-title='Section 2'>
	<!--Edit section data-title for display section name on navigation button-->
	<!--Enter here your section content-->
</section>
```


### initialize the framework

You have to initialize the script at the end of your page after the footer tag.  

```javascript
$( document ).ready(function() {
	scurrilus_onepagescroll();
});
			
$(window).load(function() {
	scurrilus_onepagescroll();
});

```
