/**
 * maimai_rival_inject.js
 */

if ($response && $response.body) {
    const injectedScript = `
<script>
(function(){
const buttonGroups = [...document.querySelectorAll('.friend_comment_block+div+div')];
const blank = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';
buttonGroups.forEach((group) => {
    if (group.children.length > 2) return;
    [...group.querySelectorAll('img')].forEach((img) => {
        img.classList.remove('h_40');
        img.classList.add('w_135');
    });
    const favoriteButton = group.children[1];
    const stack = document.createElement('span');
    stack.style.display = 'inline-block';
    
    const rivalOn = favoriteButton.cloneNode(true);
    rivalOn.setAttribute('action', 'https://maimai.wahlap.com/maimai-mobile/friend/rivalOn/');
    rivalOn.querySelector('img').setAttribute('src', blank);
    stack.appendChild(rivalOn);
    
    const rivalOff = favoriteButton.cloneNode(true);
    rivalOff.setAttribute('action', 'https://maimai.wahlap.com/maimai-mobile/friend/rivalOff/');
    rivalOff.querySelector('img').setAttribute('src', blank);
    
    setTimeout(()=>{
        rivalOn.querySelector('img').setAttribute('src', 'https://maimaidx.jp/maimai-mobile/img/btn_friend_rival_on.png');
        rivalOff.querySelector('img').setAttribute('src', 'https://maimaidx.jp/maimai-mobile/img/btn_friend_rivaldrop.png');
    }, 100);
    
    stack.appendChild(rivalOff);
    group.appendChild(stack);
});
})();
</script>
`;

    const newBody = $response.body.replace('</body>', injectedScript + '</body>');
    $done({ body: newBody });
} else {
    $done({});
}