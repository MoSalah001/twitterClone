function footer(){
    let style = document.createElement('style');
    let css = `
    .footer {
        display:flex;
        place-content:center;
        position:fixed;
        text-align:center;
        bottom:0.1em;
        width:100%;
        height:5vh;
        overflow:hidden;
        max-height:max-content;
        background-color:black;
        opacity:0.7; 
        transition: 0.25s linear
    }

    .footer:hover {
        opacity:1;
    }


    .footer--p {
        height:100%;
        width:95%;
        max-width:95%;
        text-align:center;
        padding:0;
        font-size:1.5em;
        color:lime;
        margin:0 auto;
    }
    
    .footer--link , .footer--link:visited {
        color:red; 
        text-decoration:none;
        font-size:1em;
    }

    .footer--link:hover {
        color:goldenrod;
        font-size:1.05em;
    }
    .footer--div {
        cursor:pointer;
        display:flex;
        max-width:fit-content;
        padding: 0 1em;
        height:100%;
        border-radius:5em;
        background-color:blue;
        place-content:center;
        line-height:2.2em;
        margin: auto;
        white-space:nowrap;
        color:lime;
        font-size:1.2em;
        transition:0.25s linear;
    }

    .footer--div:hover {
        padding: 0.2em 1.2em;
        line-height:1.7em;
        font-size:1.3em;
        box-shadow:-0.6em 0em 1.5em yellow, -1.2em 0em 1.5em blue;
        background-color:grey;
    }

    @media only screen and (max-width : 600px){
        .footer{
            opacity:1;
            height:6vh;
        }
        .footer--p {
            max-width:70vw;
            font-size:1.15em;
        }
        .footer--div , .footer--div:hover {
            width:max-content;
            max-width:30vw;
            line-height:2.5em;
            font-size:1.2em;
            background-color:grey;
            color:yellow;
            padding: 0 1em;
            box-shadow:0em 0.5em 1.5em blue, 0em -0.5em 1.5em red;
        }
    }

    `
    let footer = document.createElement('footer');
    let footerP = document.createElement('p');
    let back = document.createElement('div');
    footer.setAttribute('class','footer');
    footerP.setAttribute('class','footer--p');
    back.setAttribute('class','footer--div');
    back.textContent = "Portfolio"
    footerP.innerHTML=`
    This project is made by <a class="footer--link" href="https://mosalah001.netlify.app">Mohamed Salah Eldin</a> ,
    ${new Date().getFullYear()}©.
    `
    footer.appendChild(footerP);
    footer.appendChild(back);
    document.getElementsByTagName('body')[0].appendChild(footer);
    style.appendChild(document.createTextNode(css));
    document.getElementsByTagName('head')[0].appendChild(style);

    back.addEventListener('click',goToPortfolio);

    function goToPortfolio(){
        window.location = "https://mosalah001.netlify.app";
    }
}
footer();