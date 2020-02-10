document.addEventListener('DOMContentLoaded',function (){
    let name=prompt("Enter your name");
    let ch_name;
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
            ch_name=document.querySelector("#Cchannel");
            let channels=document.querySelector("#Schannel").options;
            for(i=0;i<channels.length;i++){
                if(ch_name.value==channels[i].value){
                    selectCh(ch_name.value);
                    return false;
                }
            }
            let option=document.createElement("option");
            option.setAttribute('value',ch_name.value);
            option.innerHTML=ch_name.value;
            document.querySelector("#Schannel").append(option);
            selectCh(ch_name.value);
            ch_name.innerHTML="";
        }
        return false;
    };
    document.querySelector("#selectCh").onsubmit=function(){
        if(ch_name!=document.querySelector("#Schannel").value)
        {
            ch_name=document.querySelector("#Schannel").value;
            selectCh(ch_name);
        }
        return false;
    };
    document.querySelector("#send_msg").onsubmit=function(){
        let msg=document.querySelector("#msg");
        let today=new Date();
        let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        if(msg=="")
            return false;
        let div=document.createElement("div");
        let pm = document.createElement("p");
        let pu = document.createElement("p");
        div.setAttribute("class","text_box");
        div.setAttribute("id","text_box");
        pu.setAttribute("class","disp_name");
        pm.setAttribute("class","disp_msg");
        div.appendChild(pu);
        div.appendChild(pm);
        pu.innerHTML=name
        pm.innerHTML=msg.value+"<small>"+" "+time+"</small>";
        document.querySelector("#msgs").appendChild(div);
        let scroller=document.querySelector("#chatbox");
        msg.value="";
        scroller.scrollTop = scroller.scrollHeight;
        return false;
    };

    function selectCh(ch_name){

            document.querySelector("#ch_name").innerHTML=ch_name;
            document.querySelector("#chatbox").style.visibility="visible";
            document.querySelector("#msgs").innerHTML="";

    };
});