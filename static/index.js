document.addEventListener('DOMContentLoaded',function (){
    let name=prompt("Enter your name");
    let ch_name;

    let socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port);
    
    socket.on('connect', () => {
    if(!localStorage.getItem("ch_name"))
    {
        console.log(localStorage.getItem("ch_name"))
    }
    else
    {
        console.log(localStorage.getItem("ch_name"))
        document.querySelector("#chatbox").style.visibility="visible";
        ch_name=localStorage.getItem("ch_name");
        selectCh(ch_name);
    }
    document.querySelector("#greet").innerHTML="Hello "+"<b>"+name+"</b>";
    socket.emit('get_channels');
    console.log("after get_channel")
    
    document.querySelector("#createCh").onsubmit=function(){
        if(ch_name!=document.querySelector("#Cchannel").value)
        {
            ch_name=document.querySelector("#Cchannel").value;
            let channels=document.querySelector("#Schannel").options;
            console.log("channels: "+channels);
            for(i=0;i<channels.length;i++){
                if(ch_name.value==channels[i].value){
                    selectCh(ch_name);
                    localStorage.setItem("ch_name",ch_name);
                    return false;
                }
            }
            socket.emit('add_channel',{'ch_name':ch_name});
            console.log("afte add_channel:")
            selectCh(ch_name);
            console.log("afte selectCh:")
            localStorage.setItem("ch_name",ch_name);
            ch_name.innerHTML="";
        }
        return false;
    };

    document.querySelector("#selectCh").onsubmit=function(){
        console.log("selectCh called");
        if(ch_name!=document.querySelector("#Schannel").value)
        {
            ch_name=document.querySelector("#Schannel").value;
            selectCh(ch_name);
            console.log("selected chname: "+ch_name)
            localStorage.setItem("ch_name",ch_name.value);
        }
        return false;
    };

    document.querySelector("#send_msg").onsubmit=function(){
        let today=new Date();
        let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        let msg=document.querySelector("#msg");
        if(msg.value=="")
            return false;
        let message={'user':name,'msg':msg.value,'time':time};
        socket.emit('send',{'message':message,'ch_name':ch_name});
        let scroller=document.querySelector("#chatbox");
        scroller.scrollTop = scroller.scrollHeight;
        msg.value="";
        return false;
    };

    function selectCh(ch_name){

        document.querySelector("#ch_name").innerHTML=ch_name;
        document.querySelector("#chatbox").style.visibility="visible";
        document.querySelector("#msgs").innerHTML="";
        socket.emit('get_chat',{'ch_name':ch_name});
        console.log("afte get_chat:")

    };

});


    socket.on('display_msg',function(data){
        let div=CreateTextMsg(data['message']);
        if(ch_name==data['ch_name']){
            document.querySelector('#msgs').append(div);
            let scroller=document.querySelector("#chatbox");
            scroller.scrollTop = scroller.scrollHeight;
            msg.value="";
        }
    });

    socket.on('load_chat',function(data){
        let div;
        let i;
        for(i=0;i<data.length;i++){
            div=CreateTextMsg(data[i]);
            document.querySelector('#msgs').append(div);
        }
        console.log("afte load_chat:")
    
    });

    socket.on('load_channel',function(data){
            let option=document.createElement("option");
            option.setAttribute('value',data['ch_name']);
            option.innerHTML=data['ch_name'];
            document.querySelector("#Schannel").append(option);
    });

    socket.on('load_channels',function(data){
            for(i=0;i<data.length;i++){
                let option=document.createElement("option");
                option.setAttribute('value',data[i]);
                option.innerHTML=data[i];
                console.log(data[i])
                document.querySelector("#Schannel").append(option);
            };

    });

    function CreateTextMsg(data){
        let div=document.createElement("div");
        let pm = document.createElement("p");
        let pu = document.createElement("p");
        let tim=document.createElement("small");
        if(data['user']==name){
            div.setAttribute("class","right_text_box");
            div.setAttribute("id","right_text_box");
        }
        else{
            div.setAttribute("class","left_text_box");
            div.setAttribute("id","left_text_box");
        };
        pu.setAttribute("class","disp_name");
        pm.setAttribute("class","disp_msg");
        div.appendChild(pu);
        div.appendChild(pm);
        div.appendChild(tim);
        tim.innerHTML=data['time'];
        pu.innerHTML=data['user']
        pm.innerHTML=data['msg'];
        return div;
    };
});