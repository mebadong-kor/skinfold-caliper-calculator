function genderChange(obj) {
    if (obj.val() == "male") {
        $('.female-div').hide();
        $('.male-div').show()
    } else {
        $('.male-div').hide();
        $('.female-div').show();
    }
}

function doClear() {
    $('input:not(":radio")').val('');
}
