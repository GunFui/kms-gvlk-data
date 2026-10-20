# KMS GVLK Data

Windows 与 Office 的公开 GVLK（Generic Volume License Key，客户端密钥）数据表。

这些密钥由微软官方公开发布，用于 KMS 批量激活环境。本仓库只整理数据，不包含任何激活工具或破解代码。



## 数据说明

- `gvlk.json` — 223 条产品记录
  - `windows` 分类 131 条
  - `office` 分类 92 条

每条记录包含：

```json
{
  "category": "windows",
  "product": "Windows 11",
  "edition": "Windows 11 Pro",
  "gvlk": "W269N-WFGWX-YVC9B-4J6C9-T83GX"
}
```

## 数据来源

- [Microsoft - KMS client activation keys](https://learn.microsoft.com/windows-server/get-started/kms-client-activation-keys)
- [Microsoft - GVLKs for Office](https://learn.microsoft.com/office/volume-license-activation/gvlks)
- py-kms 与 vlmcsd 的公开数据

## 查询

```bash
node lookup.js "Windows 11 Pro"
node lookup.js --category office
node lookup.js --list
```

## 相关站点

- [KMS.NZ](https://kms.nz) — 在线生成 Windows / Office 激活命令

## 更新

数据来自生产环境数据库，随产品目录更新而同步。

## 许可

- 数据本身是微软公开信息
- 仓库内的脚本与格式定义采用 MIT

## 免责声明

本项目仅用于协议学习、兼容性测试与自有授权环境的实现参考。请在符合微软批量授权条款的前提下使用。
