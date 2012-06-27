Knockout-MultiModels
====================

Plugin for Knockout JS library which allows to use few view models for single view.

Usage
------

Just use <code>ko.attach("<name>", viewModel)</code> and <code>ko.detach("<name>")</code> methods instead of <code>ko.applyBindings()</code>.

To assign HTML element with view model use **data-model** attribute with name of view model.

**Attaching view model**
<pre>var model = { Text: ko.observable("Some text") };
ko.attach("FirstModel", model);</pre>

**Detaching view model**
<pre>ko.detach("FirstModel");</pre>

**HTML**
<pre>&lt;div data-model=&quot;FirstModel&quot;&gt;
	&lt;p data-bind=&quot;text: Text&quot;&gt;&lt;/p&gt;
&lt;/div&gt;</pre>

Dependencies
------------

* Jquery 1.7.1+
* Livequery 1.1.1+
* Knockout JS 2.1.0+

Live demo
---------

Please, use **examples/knockout.multimodels.htm** to see live demo.


Links:
------

* [Knockout JS](http://knockoutjs.com/)
* [Knockout JS (github)](https://github.com/SteveSanderson/knockout/)

License: MIT [http://www.opensource.org/licenses/mit-license.php](http://www.opensource.org/licenses/mit-license.php)