// ==UserScript==
// @name			Youtube PiP Button
// @author			ACTCD
// @version			20220311.3
// @namespace		https://t.me/ACTCD
// @description		Youtube Enable Picture-in-Picture
// @match			*://*.youtube.com/*
// @grant			none
// @run-at			document-start
// ==/UserScript==

(function () {
    'use strict';

    // Create PiP Button
    const i1 = 'url("data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2221%22%20height%3D%2225%22%3E%3Ctitle%3Epip_reduced%401x%3C%2Ftitle%3E%3Crect%20width%3D%2221%22%20height%3D%2225%22%20fill%3D%22none%22%2F%3E%3Cpath%20d%3D%22M2.5%2C17A1.5%2C1.5%2C0%2C0%2C1%2C1%2C15.5v-9A1.5%2C1.5%2C0%2C0%2C1%2C2.5%2C5h13A1.5%2C1.5%2C0%2C0%2C1%2C17%2C6.5V10h1V6.5A2.5%2C2.5%2C0%2C0%2C0%2C15.5%2C4H2.5A2.5%2C2.5%2C0%2C0%2C0%2C0%2C6.5v9A2.5%2C2.5%2C0%2C0%2C0%2C2.5%2C18H7V17Z%22%20fill%3D%22%23fff%22%2F%3E%3Cpath%20d%3D%22M18.5%2C11h-8A2.5%2C2.5%2C0%2C0%2C0%2C8%2C13.5v5A2.5%2C2.5%2C0%2C0%2C0%2C10.5%2C21h8A2.5%2C2.5%2C0%2C0%2C0%2C21%2C18.5v-5A2.5%2C2.5%2C0%2C0%2C0%2C18.5%2C11Z%22%20fill%3D%22%23fff%22%2F%3E%3C%2Fsvg%3E")';
    const i2 = 'url("data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2221%22%20height%3D%2225%22%3E%3Ctitle%3Epip.fill_reduced%401x%3C%2Ftitle%3E%3Crect%20width%3D%2221%22%20height%3D%2225%22%20fill%3D%22none%22%2F%3E%3Cpath%20d%3D%22M18.5%2C11H18v1h.5A1.5%2C1.5%2C0%2C0%2C1%2C20%2C13.5v5A1.5%2C1.5%2C0%2C0%2C1%2C18.5%2C20h-8A1.5%2C1.5%2C0%2C0%2C1%2C9%2C18.5V18H8v.5A2.5%2C2.5%2C0%2C0%2C0%2C10.5%2C21h8A2.5%2C2.5%2C0%2C0%2C0%2C21%2C18.5v-5A2.5%2C2.5%2C0%2C0%2C0%2C18.5%2C11Z%22%20fill%3D%22%23fff%22%2F%3E%3Cpath%20d%3D%22M14.5%2C4H2.5A2.5%2C2.5%2C0%2C0%2C0%2C0%2C6.5v8A2.5%2C2.5%2C0%2C0%2C0%2C2.5%2C17h12A2.5%2C2.5%2C0%2C0%2C0%2C17%2C14.5v-8A2.5%2C2.5%2C0%2C0%2C0%2C14.5%2C4Z%22%20fill%3D%22%23fff%22%2F%3E%3C%2Fsvg%3E")';
    const pip_button = document.createElement("button");
    pip_button.title = "Picture-in-Picture";
    pip_button.style.width = "50px";
    pip_button.style.height = "50px";
    if (location.hostname == "m.youtube.com") {
        pip_button.style.setProperty("position", "absolute");
        pip_button.style.setProperty("z-index", "100");
    } else {
        pip_button.className = "ytp-button";
    }
    pip_button.style.setProperty("background-repeat", "no-repeat");
    pip_button.style.setProperty("background-position", "50% 50%");
    pip_button.style.setProperty("background-image", i1);
    const onEnterPip = e => pip_button.style.setProperty("background-image", i2);
    const onExitPip = e => pip_button.style.setProperty("background-image", i1);
    if (document.pictureInPictureEnabled) {
        pip_button.addEventListener("click", event => {
            if (document.pictureInPictureElement) {
                document.exitPictureInPicture();
            } else {
                document.querySelector("video[src]")?.requestPictureInPicture();
            }
            event.preventDefault();
            event.stopImmediatePropagation();
        });
    } else {
        pip_button.style.setProperty("opacity", "0.5");
        console.log('Your browser cannot use picture-in-picture right now');
    }

    // Insert PiP Button (desktop) // Fixed once for Safari
    let b = document.querySelector(".ytp-miniplayer-button");
    if (b) b.parentNode.insertBefore(pip_button, b);

    // Video element initialization
    const pip_init = video => {
        video.addEventListener('webkitpresentationmodechanged', e => e.stopPropagation(), true); // PiP Fix
        video.addEventListener("leavepictureinpicture", onExitPip);
        video.addEventListener('enterpictureinpicture', onEnterPip);
    }
    let v = document.querySelector('video[src]'); if (v) pip_init(v); // Fixed once for Safari

    // Dynamic adjustment
    new MutationObserver(mutationList => {
        mutationList.forEach((mutation) => {
            if (mutation.type == 'childList') {
                mutation.addedNodes.forEach(node => {
                    if (node.nodeType != Node.ELEMENT_NODE) return;
                    if (node.nodeName == 'VIDEO' && node.hasAttribute("src")) pip_init(node);
                    if (node.id == "player-control-overlay") { // Insert PiP Button (mobile)
                        new MutationObserver(() => {
                            if (node.classList.contains("fadein")) {
                                node.append(pip_button);
                            }
                        }).observe(node, { attributes: true });
                    }
                    if (node.classList.contains("ytp-miniplayer-button")) { // Insert PiP Button (desktop)
                        node.parentNode.insertBefore(pip_button, node);
                    }
                })
            }
            if (mutation.type == 'attributes') { // Enter video from the homepage
                if (mutation.target.nodeName == 'VIDEO' && mutation.attributeName == 'src' && mutation.target.hasAttribute("src")) {
                    pip_init(mutation.target);
                }
            }
        });
    }).observe(document, { subtree: true, childList: true, attributes: true });

})();
