/*
    定义一系列算法、把它们一个个封装起来，并且是他们可以相互替换
*/

// 反模式
function calculateBouns(preformance, salary) {
    if (preformance === 's') {
        return salary * 4
    }

    if (preformance === 'a') {
        return salary * 3
    }

    if (preformance === 'b') {
        return salary * 2
    }
}


// 策略类 （策略类封装了具体的方法）
const Strategies = {
    'S': function (salary) {
        return salary * 4;
    },
    'A': function (salary) {
        return salary * 3;
    },
    'B': function (salary) {
        return salary * 2;
    }
}

// 环境类Context，接受请求，委托给某个策略
const calculateBouns2 = function (level, salary) {
    return Strategies[level](salary);
}

// 其它策略类如 缓动动画算子