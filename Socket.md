### 1、创建protobuf对象
    与服务器之间的数据使用的ArrayBuffer
    发送消息需要通过protobuf的create方法创建message对象然后encode成buffer，接收消息需要decode成Message对象
    小程序端的protobuf会把较大的数字转成long类型，已经定义了一个LongtoNumber方法，接收消息用到
### 2、连接socket，创建一个socketTask实例
    所有指令都是protobuf定义好的协议
    小程序端对服务器的证书验证比较严格，如果多次连接不上，可以检查一下是否证书问题
### 3、发送登录指令
    登录发送1，收到101表示登录成功，如果socket直接断开，肯定是发送的消息异常
    登录成功后缓存票据 {ticket, sequence, msgId}
### 4、心跳
    20秒发送一次心跳指令3，心跳返回103
### 5、同步指令
    收到0则根据指令处理同步操作
### 6、踢端
    收到102，清空本地缓存，跳转到登录页面
### 7、消息收发
    发送消息4，消息发送成功后，更新sequence缓存
    收到消息106，将消息扔到未读列表，用户进入诊室后查看消息，循环未读列表发送回执106
    发送失败的消息会缓存起来，然后重连socket，然后循环消息列表
### 8、重连
    socket连接失败、网络重新连接、消息发送失败    