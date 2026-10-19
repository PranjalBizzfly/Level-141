/**
 * Inline <head> script: resolves the stored or system theme before first
 * paint so there is no flash. Without JS the site renders in light.
 */
export const themeScript = `(function(){try{var d=document.documentElement,s=localStorage.getItem("theme"),m=window.matchMedia("(prefers-color-scheme: dark)");d.dataset.theme=s||(m.matches?"dark":"light");m.addEventListener("change",function(e){if(!localStorage.getItem("theme"))d.dataset.theme=e.matches?"dark":"light"})}catch(e){}})()`;
