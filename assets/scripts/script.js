window.onload = async () => {
    placeGrayBoars();
    fixBottomMargin();
    history.pushState('', document.title, window.location.pathname + window.location.search);

    fixNavBar();
    setTimeout(() => {
        showContent();
    }, 300);

    window.onscroll = fixNavBar;
    window.onresize = () => {
        fixBottomMargin();
        fixNavMenu();
    };
};
window.onhashchange = () => {
    history.pushState('', document.title, window.location.pathname + window.location.search);
};

let menuOpen = false;
let inDesktop = window.innerWidth >= 1000;

function openMenu(ev, menuState) {
    const navBar = document.getElementsByTagName('nav')[0];
    const menuBtn = document.getElementById('hamburger-menu').children[0];
    const menu = document.getElementById('nav-items');

    if (menuState !== undefined) {
        menuOpen = !menuState;
    }

    if (!menuOpen) {
        menuBtn.classList.add('open');
        menuOpen = true;

        navBar.style.backgroundColor = '#151518bb';
        navBar.style.height = '75px';
        menu.style.display = 'flex';

        if (window.scrollY <= 100) {
            setTimeout(() => {
                menu.style.opacity = '100%';
            }, 500);
        } else {
            menu.style.opacity = '100%';
        }
    } else {
        menuBtn.classList.remove('open');
        menuOpen = false;

        menu.style.opacity = '0';

        setTimeout(() => {
            menu.style.display = 'none';
            if (window.scrollY <= 100) {
                navBar.style.backgroundColor = '#15151800';
                navBar.style.height = '100px';
            }
        }, 333);
    }
}

function placeGrayBoars() {
    const body = document.getElementsByTagName('body')[0];
    const boarSpacing = window.innerHeight;

    const grayBoarDiv = document.createElement('div');
    grayBoarDiv.className = 'gray-boars';
    grayBoarDiv.style.height = Math.max(body.clientHeight, window.innerHeight) + 'px';

    for (let i=0; i<10; i++) {
        const grayBoarElement = document.createElement('img');
        grayBoarElement.className = 'gray-boar';
        grayBoarElement.src = '/assets/images/BoarBotMascotGray.png';
        grayBoarElement.style.top = (i * boarSpacing - 150) + 'px';
        grayBoarDiv.appendChild(grayBoarElement);
    }

    body.appendChild(grayBoarDiv);
}

function fixNavBar() {
    const navBar = document.getElementsByTagName('nav')[0];

    if (window.scrollY > 100) {
        navBar.style.backgroundColor = '#151518bb';
        navBar.style.height = '75px';
    } else if (!menuOpen || inDesktop) {
        navBar.style.backgroundColor = '#15151800';
        navBar.style.height = '100px';
    }
}

function showContent() {
    const body = document.getElementsByTagName('body')[0];
    const navBar = document.getElementsByTagName('nav')[0];
    const main = document.getElementsByTagName('main')[0];
    const grayBoarDiv = document.getElementsByClassName('gray-boars')[0];

    navBar.style.display = 'flex';
    main.style.display = 'flex';
    grayBoarDiv.style.display = 'flex';

    grayBoarDiv.style.height = Math.max(body.clientHeight, window.innerHeight) + 'px';
}

function fixBottomMargin() {
    const main = document.getElementsByTagName('main')[0];
    if (window.innerWidth < 1000) {
        main.style.marginBottom = Math.min(175, 50 + Math.max(0, window.innerWidth - 500) / 2) + 'px';
    } else {
        main.style.marginBottom = '175px';
    }
}

function fixNavMenu() {
    const navBar = document.getElementsByTagName('nav')[0];
    const menu = document.getElementById('nav-items');
    
    if (window.scrollY <= 100 && (!menuOpen || inDesktop)) {
        navBar.style.backgroundColor = '#15151800';
        navBar.style.height = '100px';
    } else {
        navBar.style.backgroundColor = '#151518bb';
        navBar.style.height = '75px';
    }

    if (window.innerWidth >= 1000 && !inDesktop) {
        inDesktop = true;
        menu.style.display = 'flex';
        menu.style.opacity = '100%';
    } else if (window.innerWidth < 1000 && inDesktop) {
        inDesktop = false;
        menu.style.display = 'none';
        menu.style.opacity = 0;
        setTimeout(() => openMenu(undefined, menuOpen), 10);
    }
}