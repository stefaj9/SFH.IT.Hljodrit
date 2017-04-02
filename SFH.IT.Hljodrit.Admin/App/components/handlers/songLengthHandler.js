import $ from 'jquery';

$(document).ready(() => {
    $('.rc-time-picker-input').attr('tabindex', 2);
    $('.rc-time-picker-input').on('focusin', () => {
        $('.rc-time-picker-input').trigger('click');
        setTimeout(() => {
            $('.rc-time-picker-panel-input').select();
        }, 200);
    });
    $('body').on('focusin', '.rc-time-picker-panel-input', () => {
        $('.rc-time-picker-panel-input').attr('tabindex', 2);
    });
    $('body').on('focusout', '.rc-time-picker-panel-input', () => {
        $('.rc-time-picker-input').trigger('click');
    });
});