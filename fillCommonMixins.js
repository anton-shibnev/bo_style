import fetch from 'node-fetch';
import fs from 'fs';

const IGNORED_PROPERTIES = ['--*'];
const MISSING_PROPERTIES = ['grid-gap', 'grid-column-gap', 'grid-row-gap'];

class FillCommonMixin {
  constructor({ fileName }) {
    // this.url = 'https://www.w3.org/Style/CSS/all-properties.en.json';
    this.url =
      'https://gist.githubusercontent.com/davidhund/3bd6757d6a36a283b0a2933666bd1976/raw/4ccc47ed835c1be6bf0bfe00a32f427874da917c/all-css-properties.json';

    this.fileName = fileName;

    this.createJSONFile();
  }

  mixinTemplate(property) {
    return `@mixin ${property}($n)\n  +_((${property}: $n))\n`;
  }

  getData() {
    return fetch(this.url).then((response) => response.json());
  }

  fillList() {
    return this.getData().then((list) => {
      const result = [];

      list.forEach((item, index) => {
        if (!IGNORED_PROPERTIES.includes(item.property)) {
          if (index === 0) {
            result.push(this.mixinTemplate(item.property));
          } else if (
            index !== 0 &&
            item.property !== list[index - 1].property
          ) {
            result.push(this.mixinTemplate(item.property));
          }
        }
      });

      MISSING_PROPERTIES.forEach((item) => {
        result.push(this.mixinTemplate(item));
      });

      return result;
    });
  }

  async createJSONFile() {
    const result = await this.fillList();
    const stringResult = result.join('');

    fs.writeFile(`${this.fileName}`, stringResult, (err) => {
      if (err) throw err;

      console.log(`create file ${this.fileName}`);
    });
  }
}

new FillCommonMixin({ fileName: './src/mixins/common.sass' });
