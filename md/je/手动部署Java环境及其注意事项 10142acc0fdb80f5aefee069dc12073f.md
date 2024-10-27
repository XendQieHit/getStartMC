# 手动部署Java环境及其注意事项

---

*本篇为 [MC游戏下载](MC%E6%B8%B8%E6%88%8F%E4%B8%8B%E8%BD%BD%20fd720475881740aa961934c2658074b0.md) 的衍生教程

# 一、Java版本的选择

---

一台电脑可以安装多个Java版本，按惯例是安装最新版的Java。

不同Minecraft版本对Java版本的最低要求也有所不同，有些过于古老的版本也有可能无法运行Java 8以上的版本。

* 下表数据更新至2024年9月

| MC版本 | 1.12~1.16.5 | 1.17~1.17.1 | 1.18~1.20.4 | 1.20.5~ |
| --- | --- | --- | --- | --- |
| 最低Java版本 | Java 8（jre8） | Java 16（jdk16） | Java 17（jdk17） | Java 21（jdk21） |

# 二、Java的下载与安装

---

确定我们要游玩的mc版本之后，就开始来下载Java吧

Java 8下载地址：[Download Java](https://www.java.com/zh-CN/download/)

Java 17及其之后的下载地址：[Java Downloads | Oracle](https://www.oracle.com/java/technologies/downloads/#jdk21-windows)

如果是手动下载 Java 8版本，该网站会根据你的设备和系统来自动选择适配的 Java 8版本。但如果下载的版本仍然不对，可以在网站最下面的 [查看适用于桌面用户的所有 Java 8 下载。](https://www.java.com/zh-CN/download/manual.jsp)查找正确的版本。

如果是手动下载 Java 17及其之后的版本，你可能需要根据你自己电脑设备的 系统类型 来选择下载。

与其他软件不同，Java最好安装在 安装程序**默认**给的位置，也就是 C:\Program Files\Java 的目录之下。

之后的安装步骤就跟着安装程序就可以了~

### 如何查看自己电脑设备的 系统类型？

打开文件管理器，右键点击 此电脑，点击 属性，找到系统类型这一栏。

![GIF 2024-9-15 13-57-18.gif](%E6%89%8B%E5%8A%A8%E9%83%A8%E7%BD%B2Java%E7%8E%AF%E5%A2%83%E5%8F%8A%E5%85%B6%E6%B3%A8%E6%84%8F%E4%BA%8B%E9%A1%B9%2010142acc0fdb80f5aefee069dc12073f/GIF_2024-9-15_13-57-18.gif)

如果你是Windows的 64位系统，也就是x64 处理器，那么就选择Windows → x64 Installer。

![K4HR)5XYS~TM)Y_Y_H6%9D8.png](%E6%89%8B%E5%8A%A8%E9%83%A8%E7%BD%B2Java%E7%8E%AF%E5%A2%83%E5%8F%8A%E5%85%B6%E6%B3%A8%E6%84%8F%E4%BA%8B%E9%A1%B9%2010142acc0fdb80f5aefee069dc12073f/K4HR)5XYSTM)Y_Y_H69D8.png)

# 三、Java路径的检索和定位

---

下载安装完Java后，我们还需要检索和定位刚安装的Java的路径。

在PCL2启动器里，点开 设置 → 游戏 → 启动选项 → 游戏Java，点击 自动搜索，PCL2会检查电脑上所有的Java。搜索完毕后，你可以在 游戏Java 里找到你所安装的Java。

![GIF 2024-9-15 15-35-35.gif](%E6%89%8B%E5%8A%A8%E9%83%A8%E7%BD%B2Java%E7%8E%AF%E5%A2%83%E5%8F%8A%E5%85%B6%E6%B3%A8%E6%84%8F%E4%BA%8B%E9%A1%B9%2010142acc0fdb80f5aefee069dc12073f/GIF_2024-9-15_15-35-35.gif)

这样就成功定位到Java了！

### 找不到Java？尝试手动搜索

如果你还记得你安装的Java路径，同样在 游戏Java 旁，点击 手动导入，找到你安装Java的目录，找到并选择 javaw.exe 文件。这样也能成功导入Java文件。

![GIF 2024-9-15 16-31-57.gif](%E6%89%8B%E5%8A%A8%E9%83%A8%E7%BD%B2Java%E7%8E%AF%E5%A2%83%E5%8F%8A%E5%85%B6%E6%B3%A8%E6%84%8F%E4%BA%8B%E9%A1%B9%2010142acc0fdb80f5aefee069dc12073f/GIF_2024-9-15_16-31-57.gif)

# 四、Java环境变量设置（可选）

---

<aside>
ℹ️

> 正常情况下，你不需要进行接下来的步骤。该操作主要是保证可以通过 命令行 来编译和运行jar文件。这主要是解决无法直接双击运行一些**使用 jar 文件作为模组加载器的 手动安装包** 的问题。你可以直接在绝大多数的启动器上直接安装模组加载器。
> 
</aside>

在电脑中，打开 设置，选择 系统 → 系统信息 → 高级系统设置，找到 高级 → 环境变量，进入 环境变量 的设置。

![GIF 2024-9-22 22-48-59.gif](%E6%89%8B%E5%8A%A8%E9%83%A8%E7%BD%B2Java%E7%8E%AF%E5%A2%83%E5%8F%8A%E5%85%B6%E6%B3%A8%E6%84%8F%E4%BA%8B%E9%A1%B9%2010142acc0fdb80f5aefee069dc12073f/GIF_2024-9-22_22-48-59.gif)

接下来的步骤分别在 **用户变量** 和 **系统变量** 里对这些变量进行操作。若没有接下来的变量，则新建一个：

![新建变量的步骤](%E6%89%8B%E5%8A%A8%E9%83%A8%E7%BD%B2Java%E7%8E%AF%E5%A2%83%E5%8F%8A%E5%85%B6%E6%B3%A8%E6%84%8F%E4%BA%8B%E9%A1%B9%2010142acc0fdb80f5aefee069dc12073f/GIF_2024-9-22_23-11-28.gif)

新建变量的步骤

## 1. JAVA_HOME

将 JAVA_HOME 变量的 值 改成 你所安装Java的路径，例：`C:\Program Files\Java\jdk-17`。

## 2. Path

选中 Path 变量，点击编辑，打开的界面会是一个列表的。点击 新建，输入**`%JAVA_HOME%\bin`（没有分号；）** ，然后将其 上移 至 **最上面** 即可。

![GIF 2024-9-22 23-07-11.gif](%E6%89%8B%E5%8A%A8%E9%83%A8%E7%BD%B2Java%E7%8E%AF%E5%A2%83%E5%8F%8A%E5%85%B6%E6%B3%A8%E6%84%8F%E4%BA%8B%E9%A1%B9%2010142acc0fdb80f5aefee069dc12073f/GIF_2024-9-22_23-07-11.gif)

如果在修改过程中，打开的界面并不是一个列表的，那么就在最前面添加：`%JAVA_HOME%\bin;`**。**

![GIF 2024-9-22 23-29-14.gif](%E6%89%8B%E5%8A%A8%E9%83%A8%E7%BD%B2Java%E7%8E%AF%E5%A2%83%E5%8F%8A%E5%85%B6%E6%B3%A8%E6%84%8F%E4%BA%8B%E9%A1%B9%2010142acc0fdb80f5aefee069dc12073f/GIF_2024-9-22_23-29-14.gif)

所有操作完成后点击 确定，即可保存设置。

---

仍有不理解的地方或问题？在文章的相应位置评论留言↑↑↑

或在[Github](https://github.com/XendQieHit/getStartAboutMC/issues)上反馈文章问题。