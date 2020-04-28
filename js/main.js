$(document).ready(function() {
    $('#age').inputmask('integer',{min:0, max:150, rightAlign: false});
    $('#weigth').inputmask('decimal',{min:0, max:200, rightAlign: false, digits: 2});
    $('#chest').inputmask('decimal',{min:0, max:70, rightAlign: false, digits: 2});
    $('#abdominal').inputmask('decimal',{min:0, max:70, rightAlign: false, digits: 2});
    $('#tricep').inputmask('decimal',{min:0, max:70, rightAlign: false, digits: 2});
    $('#suprailiac').inputmask('decimal',{min:0, max:70, rightAlign: false, digits: 2});
    $('#thigh').inputmask('decimal',{min:0, max:70, rightAlign: false, digits: 2});
});

function genderChange(obj) {
    if (obj.val() == "male") {
        $('.female-div').hide();
        $('.male-div').show()
        $('.female-clas').hide();
        $('.male-clas').show();
    } else {
        $('.male-div').hide();
        $('.female-div').show();
        $('.male-clas').hide();
        $('.female-clas').show();
    }
    $('input:not(":radio")').val('');
}

function doClear() {
    $('input:not(":radio")').val('');
    for (var i = 0; i < 4; i++) {
        $(".result-table").find('tr:eq(' + i + ')').find('td:eq(1)').text("");
    }
}

function doCalculate(age, weigth, chest, abdominal, tricep, suprailiac, thigh) {
    var _age = parseInt(age.value);
    var _weigth = parseFloat(weigth.value);
    var _chest = parseFloat(chest.value);
    var _abdominal = parseFloat(abdominal.value);
    var _tricep = parseFloat(tricep.value);
    var _suprailiac = parseFloat(suprailiac.value);
    var _thigh = parseFloat(thigh.value);
    var gender = $('input[name="gender"]:checked').val();
    var total, fat, bodyFatClas, fatMass, leanMass;

    if (gender === "male") {
        total = _chest + _abdominal + _thigh;
        fat = 495 / (1.10938 - (0.0008267 * total) + (0.0000016 * Math.pow(total, 2)) - (0.0002574 * _age)) - 450;
        if (fat <= 5) {
            bodyFatClas = "저체지방 위험";
        } else if (5 < fat && fat <= 8) {
            bodyFatClas = "매우 마름";
        } else if (8 < fat && fat <= 12) {
            bodyFatClas = "마름";
        } else if (12 < fat && fat <= 20) {
            bodyFatClas = "보통";
        } else if (20 < fat && fat < 30) {
            bodyFatClas = "과지방";
        } else if (fat >= 30) {
            bodyFatClas = "고도비만";
        }
    } else if (gender === "female") {
        total = _tricep + _suprailiac + _thigh;
        fat = 495 / (1.0994921 - (0.0009929 * total) + (0.0000023 * Math.pow(total, 2)) - (0.0001392 * _age)) - 450;
        if (fat <= 15) {
            bodyFatClas = "저체지방 위험";
        } else if (15 < fat && fat <= 18) {
            bodyFatClas = "매우 마름";
        } else if (18 < fat && fat <= 22) {
            bodyFatClas = "마름";
        } else if (22 < fat && fat <= 30) {
            bodyFatClas = "보통";
        } else if (30 < fat && fat < 40) {
            bodyFatClas = "과지방";
        } else if (fat >= 40) {
            bodyFatClas = "고도비만";
        }
    }
    
    fatMass = (fat * _weigth) / 100.0;
    leanMass = _weigth - fatMass;

    showResult(fat, bodyFatClas, fatMass, leanMass);
}

function showResult(fat, bodyFatClas, fatMass, leanMass) {
    $(".result-table").find('tr:eq(0)').find('td:eq(1)').text(fat.toFixed(1));
    $(".result-table").find('tr:eq(1)').find('td:eq(1)').text(bodyFatClas);
    $(".result-table").find('tr:eq(2)').find('td:eq(1)').text(fatMass.toFixed(1));
    $(".result-table").find('tr:eq(3)').find('td:eq(1)').text(leanMass.toFixed(1));
}
