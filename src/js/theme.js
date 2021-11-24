function queryRefs() {
    return {
      checkbox: document.getElementById('theme-switch-toggle'),
      body: document.querySelector('body'),
      footer:document.querySelector('footer'),
      movieWrap: document.querySelector('.lightbox__content'),
    };
  }
  const Theme = {
    LIGHT: 'light-theme',
    DARK: 'dark-theme',
  };
  const themeRefs = queryRefs();
  themeRefs.body.classList.add(Theme.LIGHT);
  themeRefs.footer.classList.add(Theme.LIGHT);
  themeRefs.movieWrap.classList.add(Theme.LIGHT);
  
  themeRefs.checkbox.addEventListener('change', onClickCheckbox);
  
  function onClickCheckbox(e) {
    themeRefs.body.classList.toggle(Theme.LIGHT);
    themeRefs.body.classList.toggle(Theme.DARK);
    themeRefs.footer.classList.toggle(Theme.LIGHT);
    themeRefs.footer.classList.toggle(Theme.DARK);
    themeRefs.movieWrap.classList.toggle(Theme.LIGHT);
    themeRefs.movieWrap.classList.toggle(Theme.DARK);
  
    if (e.currentTarget.checked) {
      localStorage.setItem('theme', Theme.DARK);
    } else {
      localStorage.setItem('theme', Theme.LIGHT);
    }
  }

  const saveTheme = localStorage.getItem('theme');
  if (saveTheme === Theme.DARK) {
    themeRefs.checkbox.checked = true;
    themeRefs.body.classList.add(Theme.DARK);
    themeRefs.footer.classList.add(Theme.DARK);
    themeRefs.movieWrap.classList.toggle(Theme.DARK);
  }