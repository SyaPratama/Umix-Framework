const moon = document.querySelector(".moon");
const sun = document.querySelector(".sun");

(function(){
    const theme = localStorage.getItem('theme');
    if(theme === 'dark')
    {
        setDark(theme);
    } else {
        setDark(theme);
    }
})();

function setDark(val) {
  if (val === "dark") {
    document.documentElement.classList.add("dark");
    localStorage.setItem('theme',val);
    moon.classList.add("hidden");
    sun.classList.remove("hidden");
  } else {
    document.documentElement.classList.remove("dark");
    localStorage.setItem('theme',val);
    sun.classList.add("hidden");
    moon.classList.remove("hidden");
  }
}   