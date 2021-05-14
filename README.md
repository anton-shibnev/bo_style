# inline-media-scss

scss mixin for scss perverts

### simple example

```
.test {
  @include _(
    (
      padding-top: (
        'mob': 32px,
        'md': 50px,
        'lg': 100px
      ),
      padding-bottom: (
        'mob': 45px,
        'xs': 50px,
        'lg': 100px,
      ),
      text-align: (
        'mob': center,
        'xs': left,
      ),
      position: relative,
      z-index: 10,
      display: flex,
      flex-direction: column,
      align-items: (
        'mob': center,
        'xs': flex-start,
      ),
    )
  );
}
```

compile to

```
.test {
  padding-top: 1.7777777778rem;
  padding-bottom: 2.5rem;
  text-align: center;
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
}

@media only screen and (min-width: 600px) {
  .test {
    padding-bottom: 2.7777777778rem;
    text-align: left;
    align-items: flex-start;
  }
}

@media only screen and (min-width: 1280px) {
  .test {
    padding-top: 2.7777777778rem;
  }
}

@media only screen and (min-width: 2188px) {
  .test {
    padding-top: 5.5555555556rem;
    padding-bottom: 5.5555555556rem;
  }
}

```

---

### installation

- you can install from npm

```
  npm i inline-media-scss -D
```

- or you can just download repo

```
  git clone https://github.com/shibnev/inline-media-scss.git
```

and then import mixins

```
  @import 'inline-media'
```

---

### how to use

1. first you have to set up breakpoints in file config.scss. You can use any names for breakpoints and any values:

```
$breakpoints: (
  'mob': 0,
  'xs': 600px,
  'md': 1280px,
  'lg': 2188px,
);
```

If the value equals 0, then the style expression will not be wrapped in @media

2. If you need to subtract pixels in rem, set the main font-size in file config.scss.

```
$font-size: 18px;
```

If you don't want to subtract pixels in rem just indicate **$is-rem: false**

3. You can also specify min-width or max-width in @media. Also in config.scss file:

```
$min-max: 'min';
```

or

```
$min-max: 'max';
```
