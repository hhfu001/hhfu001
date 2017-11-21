class modA {}
class modB {}

// 门面模式实例
class Facade {
    init() {
        modA.initialize();
        modB.init();
    }
    run() {
        modA.start();
        modB.run();
    }
}