const BUTTON1 = document.getElementById("ajax1");
const BUTTON2 = document.getElementById("ajax2");
const BUTTON3 = document.getElementById("ajax3");
const BUTTON4 = document.getElementById("ajax4");

const httpClientInstance = httpClient.create({
    baseURL: "https://baseUrl",
    headers: {
        customHeader: 'customHeader'
    }
})

// 测试接口调用
BUTTON1.addEventListener('click', () => {
    httpClientInstance.post('/name', {
        test: "test"
    }, {
        openLoadingMethod: () => { console.log("open loading..."); },
        closeLoadingMethod: () => { console.log("close loading..."); }
    }).then(res => {
        console.log("res", res);
    }).catch(e => {
        console.log("err", e);
    })
}, false);

// 测试多个接口调用
BUTTON2.addEventListener('click', () => {
    httpClientInstance.post('/name', {
        test: "test"
    }).then(res => {
        console.log("res", res);
    }).catch(e => {
        console.log("err", e);
    })
    httpClientInstance.post('/name', {
        test: "test"
    }).then(res => {
        console.log("res", res);
    }).catch(e => {
        console.log("err", e);
    })
    httpClientInstance.post('/name', {
        test: "test"
    }).then(res => {
        console.log("res", res);
    }).catch(e => {
        console.log("err", e);
    })
}, false);

// 测试链式接口调用
BUTTON3.addEventListener('click', () => {
    httpClientInstance.post('/name', {
        test: "test"
    }, {
        chainStart: true
    }).then(res => {
        return httpClientInstance.post('/name', {
            test: "test"
        });
    }).then(res => {
        return httpClientInstance.post('/name', {
            test: "test"
        });
    }).then(res => {
        return httpClientInstance.post('/name', {
            test: "test"
        }, {
            chainFinish: true
        });
    }).catch(e => {
        console.log("err", e);
    })
}, false);

// 测试主状态异常接口调用
BUTTON4.addEventListener('click', () => {
    httpClientInstance.post('/name', {
        test: "test"
    }, {
        effectMainProcess: true
    }).then(res => {
        console.log("res", res);
    }).catch(e => {
        console.log("err", e);
    })
}, false);