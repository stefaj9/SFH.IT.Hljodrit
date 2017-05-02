import $ from 'jquery';

$(document).ready(() => {
    $('.rc-time-picker-input').attr('tabindex', 2);
    $('body').on('focusin', '.rc-time-picker-input', () => {
        setTimeout(() => {
            $('.rc-time-picker-panel-input').focus();
        }, 200);
    });
});