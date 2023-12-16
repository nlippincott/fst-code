// wait-0.1.js - Wait spinner, w/ optional message
//	Calling page must include these scripts:
//	- //cdnjs.cloudflare.com/ajax/libs/spin.js/2.0.1/spin.min.js
//	- //cdnjs.cloudflare.com/ajax/libs/spin.js/2.0.1/jquery.spin.min.js


jQuery(document).ready(function () {
	// Set up and style wait overlay
	jQuery('body').append('<div id="wait-overlay" />');
	jQuery('#wait-overlay').append('<div class="msg-container" />');
	jQuery('#wait-overlay .msg-container').append('<div class="msg" />');

	jQuery('#wait-overlay').hide();
	jQuery('#wait-overlay').css({
			'position': 'fixed',
			'left': 0, 'top': 0, 'bottom': 0, 'right': 0,
			'z-index': 1000000,
			'color': 'black',
			'background-color': 'rgba(0, 0, 0, 0.25)'
		});

	jQuery('#wait-overlay .msg-container').css({
			'position': 'absolute',
			'width': '100%',
			'top': '50%', 'left': 0,
			'z-index': 1000001,
			'padding-top': '32px',
			'text-align': 'center'
		});

	jQuery('#wait-overlay .msg').css({
			'display': 'inline-block',
			'border': '2px solid black',
			'padding': '4px',
			'font': 'bold italic 85% sans-serif',
			'color': 'black', 'background-color': '#ffc',
			'border-radius': '4px'
		});
});

// wait - Causes an overlay to cover the page with a spinner shown in the
//	middle of the viewport. If msg is provided, the message appears under
//	the spinner. If no msg is provided, only the spinner is shown.
function wait (msg) {
	if (msg === undefined)
		jQuery('#wait-overlay .msg-container').hide();
	else {
		jQuery('#wait-overlay .msg').html(msg);
		jQuery('#wait-overlay .msg-container').show();
	}
	jQuery('#wait-overlay').show().spin();
}

// wait_msg - Updates the message shown under the spinner of the wait overlay.
//	Note that the message is shown only if the wait function was called with
//	the msg parameter. If msg was not provided to the wait function, this
//	function will have no effect to the end user.
function wait_msg (msg) { jQuery('#wait-overlay .msg').html(msg); }

// wait_off - Removes the overlay created by the wait function.
function wait_off () { $('#wait-overlay').hide().spin(false); }
