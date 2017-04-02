import $ from 'jquery';

$(document).ready(() => {
    $('.rc-time-picker-input').on('focus', (e) => {
        console.log(e);
    });
});