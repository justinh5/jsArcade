// require('normalize.css/normalize.css');
require('@/styles/main.css');
require('@/styles/index.css');
import img from "../assets/img/background.jpg";
import $ from 'jquery';


$(document).on('keypress', function(e) {
    window.location.replace("menu.html");
});

$(document).click(function() {
    window.location.replace("menu.html");
});
