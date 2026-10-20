#!/usr/bin/env node
// 按产品族查询 GVLK
//
// 用法：
//   node lookup.js "Windows 11"
//   node lookup.js "Windows 11 Pro"
//   node lookup.js --category office
//   node lookup.js --list
//
// 数据来源：同目录 gvlk.json

const fs = require('fs')
const path = require('path')

const data = JSON.parse(fs.readFileSync(path.join(__dirname, 'gvlk.json'), 'utf8'))
const all = data.products

const args = process.argv.slice(2)

if (args.length === 0 || args[0] === '--help' || args[0] === '-h') {
  console.log(`用法:
  node lookup.js "<产品名或版本名>"     精确/模糊查询
  node lookup.js --category <windows|office>   按分类列出
  node lookup.js --list                  列出所有产品族
  node lookup.js --json                  以 JSON 输出匹配结果`)
  process.exit(0)
}

if (args[0] === '--list') {
  const groups = {}
  for (const p of all) {
    const key = `${p.category} / ${p.product}`
    groups[key] = (groups[key] || 0) + 1
  }
  for (const [k, n] of Object.entries(groups)) {
    console.log(`${k}  (${n} 个版本)`)
  }
  process.exit(0)
}

if (args[0] === '--category') {
  const cat = (args[1] || '').toLowerCase()
  const rows = all.filter((p) => p.category === cat)
  if (!rows.length) {
    console.error(`没有找到分类: ${cat}`)
    process.exit(1)
  }
  for (const p of rows) {
    console.log(`${p.product}\t${p.edition}\t${p.gvlk}`)
  }
  process.exit(0)
}

const query = args.join(' ').toLowerCase()
const matches = all.filter(
  (p) =>
    p.product.toLowerCase().includes(query) || p.edition.toLowerCase().includes(query)
)

if (!matches.length) {
  console.error(`没有找到匹配 "${args.join(' ')}" 的产品`)
  process.exit(1)
}

if (args.includes('--json')) {
  console.log(JSON.stringify(matches, null, 2))
  process.exit(0)
}

for (const p of matches) {
  console.log(`${p.edition}\n  GVLK: ${p.gvlk}\n  分类: ${p.category} / ${p.product}\n`)
}
console.log(`共 ${matches.length} 条`)
