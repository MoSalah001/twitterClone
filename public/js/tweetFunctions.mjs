export function deleteTweet(){
    let data = {
        userID : window.localStorage.getItem("ID"),
        tweetID : this.parentNode.id
    }
    let confirmation = confirm("Are you sure you want to delete this tweet?" + "\\n" + "You won't be able to undo this action")
    if(confirmation) {
        console.log('yes');
    }
    if(!confirmation) {
        return null;
    }
}
