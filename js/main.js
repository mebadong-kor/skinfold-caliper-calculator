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
    for (let i = 0; i < 4; i++) {
        $(".result-table").find('tr:eq(' + i + ')').find('td:eq(1)').text("");
    }
}

function doCalculate(age, weigth, chest, abdominal, tricep, suprailiac, thigh) {
    let _age = parseInt(age.value);
    let _weigth = parseFloat(weigth.value);
    let _chest = parseFloat(chest.value);
    let _abdominal = parseFloat(abdominal.value);
    let _tricep = parseFloat(tricep.value);
    let _suprailiac = parseFloat(suprailiac.value);
    let _thigh = parseFloat(thigh.value);
    let gender = $('input[name="gender"]:checked').val();
    let total, fat, bodyFatClas, fatMass, leanMass;

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

function checkNumber(obj) {
    let numReg = /^[1-9][0-9]{0,2}$/g;
    let num = obj.val();
    if (!numReg.test(num)) {
        obj.val(num.replace(/[^0-9+]/g,''));
    }
}

function checkFloat(obj) {
    let numReg = /^[0-9\.]$/g;
    let num = obj.val();
    if (!numReg.test(num)) { 
        obj.val(num.replace(/[^0-9\.]/gi,''));
    }
}
