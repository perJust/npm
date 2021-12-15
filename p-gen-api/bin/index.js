const http = require('http');
const fs = require('fs');

const httpGetApiOptions = {
    hostname: '172.27.16.36',
    port: 8080,
    path: '/v2/api-docs?group=%E9%BB%98%E8%AE%A4%E6%8E%A5%E5%8F%A3',
    method: 'GET',
    headers: {
        'Content-Type': 'application/json;charset=UTF-8'
    }
}
export default function startGetApi () {

    const getApi = http.request(httpGetApiOptions, res => {
        let data = '';
        res.on('data', chunk => {
            data += chunk
        })
        res.on('end', () => {
            const resObj = eval('('+data+')');
            performDataAnalysis(resObj);
        })
    })
    getApi.on('error', err => {
        console.log('err:',err);
    })
    getApi.end();
}

// 完成文件内内容的包裹
function connectHeadEnd(str, name) {
return `import request from '@/service/funcRequest';
class ${name}{${str}
}

export default new ${name}();
`
}

// 创建归属文件夹
function createFsDir(dir) {
    if(!fs.existsSync(process.cwd + dir)) {
        fs.mkdirSync();
    }
}

// 分析paths结构  并返回tag-req_list的map映射与ts声明文件
function performPathsAnalysis({paths, definitions = {}}, tagsMap) {    // definitions 描述信息
    let pathUrlList = Object.keys(paths);

    let tagToReqMap = {[otherTag]: ''};
    for(let item of pathUrlList) {
        let curr = paths[item], currMth = Object.keys(curr);
        let name = item.replace(/(.)?\/(.)/g, function($0,$1,$2){return $1?$1+$2.toUpperCase():$2.toLowerCase()});
        for(let mth of currMth) {
            let c = curr[mth],tag = c.tags && c.tags[0];
            let rowReqParaFor = 'params';
            if(mth === 'post' && c.parameters && c.parameters[0] && c.parameters[0].in === 'query') { // 暂时由第一个传参类型决定放body还是query
                rowReqParaFor = 'data';
            }
            let content = `
    /**
     * @name ${c.summary}
     */
    public ${name+mth.replace(mth[0], mth[0].toUpperCase())}(paramConfig) {
        return request({
            url: "${item}",
            method: "${mth}",
            ${rowReqParaFor}: paramConfig,
          });
    }
            `
            if(tag) {
                tagToReqMap[tag] = (tagToReqMap[tag] || '') +content
            } else {
                tagToReqMap[otherTag] = tagToReqMap[otherTag] +content
            }
        }
    }

    return [tagToReqMap];
}

const otherTag = '其余无分类的请求集合', other = {[otherTag]:'other'}; // 文件名  存无tag标注的请求
// 分析数据
function performDataAnalysis(data) {
    let tags = {...other};
    // 存tag的中英文映射
    for(let item of data.tags) {
        tags[item.name] = item.description.replace(/ /g, '');
    }

    let [tagToReqMap] = performPathsAnalysis(data, tags);
    
    let dir = '/modules';
    createFsDir(dir);

    // 将map结构解析  产出文件
    let all = Object.keys(tagToReqMap);
    for(let item of all) {
        fs.writeFile(process.cwd+`${dir}/${tags[item]}.ts`, connectHeadEnd(tagToReqMap[item], tags[item]), err => {
            if(err) {
                console.log(err);
            }
        })
    }
}