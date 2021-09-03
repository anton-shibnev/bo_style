import fetch from 'node-fetch';
import fs from 'fs';

class FillCommonMixin {
  constructor({ fileName }) {
    this.url = 'https://www.w3.org/Style/CSS/all-properties.en.json';

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
        if (index === 0) {
          result.push(this.mixinTemplate(item.property));
        } else if (index !== 0 && item.property !== list[index - 1].property) {
          result.push(this.mixinTemplate(item.property));
        }
      });

      return result;
    });
  }

  async createJSONFile() {
    const result = await this.fillList();
    const stringResult = result.join('');

    fs.writeFile(`${this.fileName}`, stringResult, (err) => {
      if (err) throw err;

      console.log(`create file ${this.fileName}.json`);
    });
  }
}

new FillCommonMixin({ fileName: './src/mixins/common.sass' });
