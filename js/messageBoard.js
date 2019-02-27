var APP_ID = 'bPWxjDuVbLp2cMAoGuUqRBcJ-gzGzoHsz';
var APP_KEY = 'PdROH4IBuamCRa0sFQIyUOq3';

AV.init({
    appId: APP_ID,
    appKey: APP_KEY
});

let messageForm = document.querySelector('#postMessage')

//存储数据
messageForm.addEventListener('submit', function (e) {
    e.preventDefault()
    let userName = messageForm.querySelector('input[name=userName]').value
    let content = messageForm.querySelector('input[name=content]').value
    var Message = AV.Object.extend('Message');
    var message = new Message();
    message.save({
        userName: userName,
        content: content
    }).then(function (object) {
        let li = document.createElement('li')
        li.innerText = object.attributes.userName + ': ' + object.attributes.content
        let messageList = document.querySelector('#messageList')
        messageList.appendChild(li)
        messageForm.querySelector('input[name=userName]').value = ''
        messageForm.querySelector('input[name=content]').value = ''
    })
})

//拿到数据，放到ol中去

var query = new AV.Query('Message');
query.find()
    .then(function (messages) {
        let array = messages.map((item) => item.attributes)
        array.forEach((item) => {
            let li = document.createElement('li')
            li.innerText = item.userName + ':' + item.content
            let messageList = document.querySelector('#messageList')
            messageList.appendChild(li)
        })
    })