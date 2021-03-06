document.addEventListener('DOMContentLoaded',function (){
    let name=prompt("Enter your name");
    let ch_name;
    let socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port);

    socket.on('connect', () => {
    if(!localStorage.getItem("ch_name"))
    {
    }
    else
    {
        document.querySelector("#chatbox").style.visibility="visible";
        ch_name=localStorage.getItem("ch_name");
        selectCh(ch_name);
    }
    document.querySelector("#greet").innerHTML="Hello "+"<b>"+name+"</b>";
    
    document.querySelector("#createCh").onsubmit=function(){
        if(ch_name!=document.querySelector("#Cchannel").value)
        {
            ch_name=document.querySelector("#Cchannel").value;
            let channels=document.querySelector("#Schannel").options;
            for(i=0;i<channels.length;i++){
                if(ch_name.value==channels[i].value){
                    selectCh(ch_name.value);
                    localStorage.setItem("ch_name",ch_name);
                    return false;
                }
            }
            let option=document.createElement("option");
            option.setAttribute('value',ch_name.value);
            option.innerHTML=ch_name.value;
            document.querySelector("#Schannel").append(option);
            selectCh(ch_name.value);
            localStorage.setItem("ch_name",ch_name);
            ch_name.innerHTML="";
        }
        return false;
    };
    document.querySelector("#selectCh").onsubmit=function(){
        if(ch_name!=document.querySelector("#Schannel").value)
        {
            ch_name=document.querySelector("#Schannel").value;
            selectCh(ch_name);
            localStorage.setItem("ch_name",ch_name.value);
        }
        return false;
    };
    document.querySelector("#send_msg").onsubmit=function(){
        let today=new Date();
        let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        let msg=document.querySelector("#msg");
        if(msg=="")
            return false;
        let message={'user':name,'msg':msg.value,'time':time};
        socket.emit('send',{'message':message,'ch_name':ch_name});
        let scroller=document.querySelector("#chatbox");
        scroller.scrollTop = scroller.scrollHeight;
        msg.value="";
        return false;
    };

});

    function selectCh(ch_name){

            document.querySelector("#ch_name").innerHTML=ch_name;
            document.querySelector("#chatbox").style.visibility="visible";
            document.querySelector("#msgs").innerHTML="";

    };
    function CreateTextMsg(name,msg){
        let today=new Date();
        let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        let div=document.createElement("div");
        let pm = document.createElement("p");
        let pu = document.createElement("p");
        let tim=document.createElement("small");
        div.setAttribute("class","text_box");
        div.setAttribute("id","text_box");
        pu.setAttribute("class","disp_name");
        pm.setAttribute("class","disp_msg");
        div.appendChild(pu);
        div.appendChild(pm);
        div.appendChild(tim);
        tim.innerHTML=time;
        pu.innerHTML=name
        pm.innerHTML=msg.value;
        return div;
    };
});