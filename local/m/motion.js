if (window.DeviceMotionEvent) {
	//window.addEventListener('devicemotion', deviceMotionHandler, false);
	$('#content').html('Supported DeviceMotionEvent!');

	$(window).bind('devicemotion', deviceMotionHandler);

}

var SHAKE_THRESHOLD = 800;
var last_update = 0;
var x, y, z, last_x, last_y, last_z;

var tmp= '';
var count = 0;

function deviceMotionHandler(eventData) {
	var acceleration = eventData.accelerationIncludingGravity;

	var curTime = new Date().getTime();

	if ((curTime - last_update) > 100) {

		var diffTime = curTime - last_update;
		last_update = curTime;

		x = acceleration.x;
		y = acceleration.y;
		z = acceleration.z;

		var speed = Math.abs(x + y + z - last_x - last_y - last_z) / diffTime * 10000;

		if (speed > SHAKE_THRESHOLD) {
			count++ ;
			tmp += '<p>' + count + ': </br>x ='+ x +'</br>y ='+ y +'</br> z ='+ z +'</p>';
			$('#content').html(tmp);
		}
		last_x = x;
		last_y = y;
		last_z = z;
	}
}



$('#clean').bind('click', function(){
	$('#content').html('');
})