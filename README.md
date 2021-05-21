# inline-media-scss

scss mixin for scss perverts

---

### simple example

```
%test {
  display: flex;
}

.test {
  @include _(
    (
      '@extend': '%test',
      padding-top: (
        'mob': 32px,
        'md': 50px,
        'lg': 100px
      ),
      text-align: (
        'mob': center,
        'xs': left,
      ),
      margin: 12px 18px 18px,
      position: relative,
      '&:hover svg rect': (
        fill: tomato,
      ),
    )
  );
}

or

@include class(
  'test',
  (
    '@extend': '%test',
    padding-top: (
      'mob': 32px,
      'md': 50px,
      'lg': 100px
    ),
    text-align: (
      'mob': center,
      'xs': left,
    ),
    margin: 12px 18px 18px,
    position: relative,
    '&:hover svg rect': (
      fill: tomato,
    ),
  )
);
```

compile to

```
.test {
	 display: flex;
}
 .test {
	 padding-top: 1.7777777778rem;
	 text-align: center;
	 margin: 0.6666666667rem 1rem 1rem;
	 position: relative;
}
 @media only screen and (min-width: 1280px) {
	 .test {
		 padding-top: 2.7777777778rem;
	}
}
 @media only screen and (min-width: 2188px) {
	 .test {
		 padding-top: 5.5555555556rem;
	}
}
 @media only screen and (min-width: 768px) {
	 .test {
		 text-align: left;
	}
}
 .test:hover svg rect {
	 fill: tomato;
}
```

---

### installation

- you can install from npm

```
  npm i inline-media-scss -D
```

or yarn

```
  yarn add inline-media-scss --dev
```

- or you can just download repo

```
  git clone https://github.com/shibnev/inline-media-scss.git
```

and then import mixins

```
  @import 'inline-media-scss'
```

or if create-react-app

```
  @import '~inline-media-scss'
```

---

### how to use

default config:

```
$min-max: 'min';
$is-rem: true;

$breakpoints: (
  'mob': 0,
  'xs': 600px,
  'md': 1280px,
  'lg': 2188px,
);

$rem-baseline: 18px;

html {
  font-size: $rem-baseline;
}
```

1. first you can set up breakpoints. You can use any names for breakpoints and any values:

```
$breakpoints: (
  'mob': 0,
  'xs': 600px,
  'md': 1280px,
  'lg': 2188px,
);
```

If the value equals 0, then the style expression will not be wrapped in @media

2. If you need to subtract pixels in rem, set the main font-size.

```
$font-size: 18px;
```

If you don't want to subtract pixels in rem just indicate **$is-rem: false**

3. You can also specify min-width or max-width in @media:

```
$min-max: 'min';
```

or

```
$min-max: 'max';
```
