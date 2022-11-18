let govde = document.querySelector(".govde");
let d1 = document.querySelector(".d1");
let d2 = document.querySelector('.d2');
let d1p = document.querySelector('.d1p');
let d2p = document.querySelector('.d2p');
let d1b = document.querySelector('.d1b');
let d2b = document.querySelector('.d2b');
let from, to;
eventListener();
function eventListener() {
    govde.addEventListener('click', valyuta);
    d1.addEventListener('keyup', d1f);
    d2.addEventListener('keyup', d2f);
}
function valyuta(e) {
    let targetm = e.target;
    Array.from(targetm.parentElement.children).forEach((x) => x.removeAttribute('style'));
    if (targetm.parentElement.className.indexOf("d1b") !== -1) {
        targetm.setAttribute('style', 'background: #833AE0; color: #fff');
        from = targetm.textContent;
        d1f();
    }
    else if (targetm.parentElement.className.indexOf("d2b") !== -1) {
        targetm.setAttribute('style', 'background: #833AE0; color: #fff');
        to = targetm.textContent;
        d2f();
    }
}
async function d1f() {
    const res = await fetch(`https://api.exchangerate.host/lates?base=${from}&symbols=${to}`);
    const data = await res.json();
    d2.value = (Object.values(data.rates)[0] * d1.value.replace(',', ".")).toFixed(4);
    if (from && to) {
        d1p.textContent = `1 ${data.base} = ${Object.values(data.rates)[0].toFixed(2)} ${Object.keys(data.rates)}`;
        d2p.textContent = `1 ${Object.keys(data.rates)} = ${(1 / Object.values(data.rates)[0]).toFixed(2)} ${data.base}`;
    }
}
async function d2f() {
    const res = await fetch(`https://api.exchangerate.host/lates?base=${from}&symbols=${to}`);
    const data = await res.json();
    d2.value = (Object.values(data.rates)[0] * d1.value.replace(',', ".")).toFixed(4);
    if (from && to) {
        d1p.textContent = `1 ${data.base} = ${Object.values(data.rates)[0].toFixed(2)} ${Object.keys(data.rates)}`;
        d2p.textContent = `1 ${Object.keys(data.rates)} = ${(1 / Object.values(data.rates)[0]).toFixed(2)} ${data.base}`;
    }
}
