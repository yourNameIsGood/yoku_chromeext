if (!chrome.cookies) {
    chrome.cookies = chrome.experimental.cookies;
}
function extractDomain(url) {
    var hostname
    if (url.indexOf("//") > -1) {
        hostname = url.split('/')[2];
    } else {
        hostname = url.split('/')[0];
    }
    hostname = hostname.split(':')[0];
    domain = hostname.split('?')[0];
    if (domain.split('.').length > 2) { //has also subdomain 
        var splitArr = domain.split('.'); 
        domain = splitArr[splitArr.length - 2] + '.' + splitArr[splitArr.length - 1]; 
    }
    return domain;
}
chrome.tabs.query({'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT},
    function(tabs){
        var debugname = "_xdebugrpc"
        var current_url = (tabs[0].url);
        // init switch btn context
        let target = {
            "url": current_url,
            "name": debugname
        }
        chrome.cookies.get(target, function(c){
            if(c !== null && c !== "undefined"){
                $(".debug-btn").val("DEL debug")
            }else{
                $(".debug-btn").val("ADD debug")
            }
        })
        $(".mannual-btn-add").on("click", function(){
            var url = $(".input-url").val()
            let target = {
                "url": url,
                "name": debugname,
                "value": "cprgubedx"
            } 
            chrome.cookies.set(target,function(c){
                var res = "Done adding debug for " + url 
                $(".result").html(res)
            })
        })
        $(".mannual-btn-del").on("click", function(){
            var url = $(".input-url").val()
            let target = {
                "url": url,
                "name": debugname
            } 
            chrome.cookies.remove(target,function(c){
                var res  = "Done removing debug for " + url
                $(".result").html(res)
            })
        })

        // Do not work as expected
        $(".del-sub-verify-btn").on("click", function(){
            console.log(tabs, tabs[0])
            var cookie_name = "_sub_verify"
            var current_url = "https://*.nexusbyte.net" // do not work
            let target = {
                "url": current_url,
                "name": cookie_name
            } 
            chrome.cookies.remove(target,function(c){
                var res  = "Done removing " + cookie_name + " for " + current_url
                $(".result").html(res)
            })
        }) 

        // auto-decition-making-switch-on-off-cookie
        $(".debug-btn").on("click",function(){
            var current_url = (tabs[0].url);
            var domain = extractDomain(current_url)
            chrome.cookies.get(target,
                function(c){
                    if(c !== null && c !== "undefined"){
                        var res = JSON.stringify(c)
                        $(".result").html(res)
                        let target = {
                            "url": current_url,
                            "name": debugname
                        }
                        chrome.cookies.remove(target,function(c){
                            var res = 'Done removing debug'
                            $(".result").html(res)
                            $(".debug-btn").val("ADD debug")
                        })
                         
                    }else{
                        let target = {
                            "url": current_url,
                            "domain": domain,
                            "name": debugname,
                            "value": debugname.split("").reverse().join("")
                        }
                        chrome.cookies.set(target,function(c){
                            var res = "Done adding debug"
                            $(".result").html(res)
                            $(".debug-btn").val("DEL debug")
                        })
                    }
                }
            )
        });
   }
);
