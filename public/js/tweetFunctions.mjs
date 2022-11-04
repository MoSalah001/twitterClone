export function deleteTweet(){
    let data = 
    {
        userName : document.cookie,
        tweetID : this.parentNode.id
    }
    let confirmation = confirm("Are you sure you want to delete this tweet?" + "\n" + "You won't be able to undo this action")
    if(confirmation) 
    {
        let http = new XMLHttpRequest()
        http.open("post","/delete")
        http.setRequestHeader("content-type","application/json")
        http.send(JSON.stringify(data))
        http.onreadystatechange = ()=>
        {
            if(http.readyState == 4 && http.status == 200) 
            {
                window.location.reload();
            }
        }
    }
    if(!confirmation) 
    {
        return null;
    }
}
