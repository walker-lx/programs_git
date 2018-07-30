export default function checkCountry(text, countrylist) { // 匹配搜到的国家
    console.log(text);
    let marryname = '';
    let marrytop;
    if (text.indexOf('丹') > -1 || text.indexOf('麦') > -1) {
      marryname = '丹麦';
      marrytop = countrylist.filter(function(el) { // eslint-disable-line
        return el.text.indexOf(marryname) > -1;
      });
    } else if (text.indexOf('法国') > -1 || text.indexOf('法') > -1) {
      marryname = '法国';
      marrytop = countrylist.filter(function(el) { // eslint-disable-line
        return el.text.indexOf(marryname) > -1;
      });
    } else if (text.indexOf('西') > -1 || text.indexOf('巴') > -1) {
      marryname = '西班牙' || '巴西';
      marrytop = countrylist.filter(function(el) { // eslint-disable-line
        return el.text.indexOf(marryname) > -1;
      });
    } else if (text.indexOf('比利时') > -1 || text.indexOf('比') > -1 || text.indexOf('利') > -1 || text.indexOf('时') > -1) {
      marryname = '比利时';
      marrytop = countrylist.filter(function(el) { // eslint-disable-line
        return el.text.indexOf(marryname) > -1;
      });
    } else if (text.indexOf('日本') > -1 || text.indexOf('日') > -1 || text.indexOf('本') > -1) {
      marryname = '日本';
      marrytop = countrylist.filter(function(el) { // eslint-disable-line
        return el.text.indexOf(marryname) > -1;
      });
    } else if (text.indexOf('哥伦比亚') > -1 || text.indexOf('哥') > -1 || text.indexOf('伦') > -1 || text.indexOf('亚') > -1) {
      marryname = '哥伦比亚';
      marrytop = countrylist.filter(function(el) { // eslint-disable-line
        return el.text.indexOf(marryname) > -1;
      });
    } else if (text.indexOf('瑞典') > -1 || text.indexOf('瑞') > -1 || text.indexOf('典') > -1) {
      marryname = '瑞典';
      marrytop = countrylist.filter(function(el) { // eslint-disable-line
        return el.text.indexOf(marryname) > -1;
      });
    } else if (text.indexOf('俄罗斯') > -1 || text.indexOf('俄') > -1 || text.indexOf('罗') > -1 || text.indexOf('斯') > -1) {
      marryname = '俄罗斯';
      marrytop = countrylist.filter(function(el) { // eslint-disable-line
        return el.text.indexOf(marryname) > -1;
      });
    } else if (text.indexOf('墨西哥') > -1 || text.indexOf('墨') > -1 || text.indexOf('西') > -1 || text.indexOf('哥') > -1) {
      marryname = '墨西哥';
      marrytop = countrylist.filter(function(el) { // eslint-disable-line
        return el.text.indexOf(marryname) > -1;
      });
    } else if (text.indexOf('克罗地亚') > -1 || text.indexOf('罗') > -1 || text.indexOf('地') > -1 || text.indexOf('亚') > -1) {
      marryname = '克罗地亚';
      marrytop = countrylist.filter(function(el) { // eslint-disable-line
        return el.text.indexOf(marryname) > -1;
      });
    } else if (text.indexOf('英格兰') > -1 || text.indexOf('英') > -1 || text.indexOf('格') > -1 || text.indexOf('兰') > -1) {
      marryname = '英格兰';
      marrytop = countrylist.filter(function(el) { // eslint-disable-line
        return el.text.indexOf(marryname) > -1;
      });
    } else if (text.indexOf('葡萄牙') > -1 || text.indexOf('葡') > -1 || text.indexOf('萄') > -1 || text.indexOf('牙') > -1) {
      marryname = '葡萄牙';
      marrytop = countrylist.filter(function(el) { // eslint-disable-line
        return el.text.indexOf(marryname) > -1;
      });
    } else if (text.indexOf('德国') > -1 || text.indexOf('德') > -1) {
      marryname = '德国';
      marrytop = countrylist.filter(function(el) { // eslint-disable-line
        return el.text.indexOf(marryname) > -1;
      });
    } else if (text.indexOf('西班牙') > -1 || text.indexOf('西') > -1 || text.indexOf('班') > -1) {
      marryname = '西班牙';
      marrytop = countrylist.filter(function(el) { // eslint-disable-line
        return el.text.indexOf(marryname) > -1;
      });
    }
    return marrytop ? marrytop : []; // eslint-disable-line
  }