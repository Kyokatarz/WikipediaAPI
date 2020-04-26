

document.addEventListener('keydown',function(e){
    if (e.keyCode == 13){
        handleClick();
    }
})



function handleClick(){
    const input = document.getElementById('input-field').value;
    const regex = /^\s+$/g;
    console.log(input);
    
    if (regex.test(input) || input == ''){
        return alert('Input is empty or contains only spaces.');
    }
     
    document.getElementById('random').classList.add('goToTop');
    const url = 'https://en.wikipedia.org/w/api.php?action=query&format=json&prop=info&list=search&titles=Main%20Page&srsearch=' + input;
    console.log('url: ', url);
    const previousSearch = document.getElementById('searches');
    
    while (previousSearch.hasChildNodes() ){
        previousSearch.removeChild(previousSearch.firstChild)
    }
    
    getJson(url)
}
    
    
function getJson(url){
    const req = new XMLHttpRequest();
    req.open('GET',url,true);
    req.send();
    req.onload = function(){
        handleJson(JSON.parse(req.responseText))
    }
}

function handleJson(json){
        console.log(json);
    const searchArray = json.query.search;
    console.log(searchArray);
    
    if (searchArray.length == 0){
        document.getElementById('searches').innerHTML = 'NOTHING FOUND';
    } else for(let i=0;i<10;i++){
        addElementToHTML(i);
    }
    
    function addElementToHTML(i){ 
        setTimeout(function(){
            var div = document.createElement('div')
            div.className = 'article hidden';
            
            var title = document.createElement('p');
            title.className = 'title';
            title.appendChild(document.createTextNode(searchArray[i].title));

            var snippet = document.createElement('p');
            snippet.className = 'snippet';
            snippet.innerHTML = searchArray[i].snippet;

            div.appendChild(title);
            div.appendChild(snippet);
            div.addEventListener('click',function(){
                window.open('https://en.wikipedia.org/w/index.php?curid=' + searchArray[i].pageid)
            })
            document.getElementById('searches').appendChild(div);
            document.getElementsByClassName('article')[i].classList.add('appear')
            },i * 100)
    }
}

function handleRandom(){
    window.open('https://en.wikipedia.org/wiki/Special:Random')
}