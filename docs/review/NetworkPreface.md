# **网络工程导论**

---

## **4.计算机网络基础**


### **4.1.计算机网络的用户类型和目标**

- 个人与家庭用户
- 军事网络
- 移动办公
- 城市管理
- 位置服务
- 增强现实
- ......


### **4.2.计算机网络的发展阶段**

1. 1950s：面向终端的第一代计算机网络——<u>**基于分时技术**</u>
2. <u>**1960s**</u>：以<u>**分组交换网**</u>为中心的第二代计算机网络(<u>**ARPA网络**</u>)
3. 1970s~1980s：<u>**结构体系标准化**</u>的第三代计算机网络
4. 1990s：<u>**以网络互联为核心**</u>的第四代计算机网络


### **4.3.计算机网络的定义**

凡将地理位置不同，具有<u>**独立功能**</u>的多个<u>**计算机系统**</u>(<u>**资源子网**</u>)通过<u>**通信设备和线路**</u>(<u>**通信子网**</u>)连接起来，以功能完善的<u>**网络软件**</u>（即网络的通信协议、信息交换方式及网络操作系统等)实现网络中计算机之间的<u>**数据通信**</u>和<u>**资源共享**</u>的系统，称之为<u>**计算机网络**</u>。

- 硬件：<u>**资源子网**</u>(计算机系统)，<u>**通信子网**</u>(数据通信系统)
- 软件：<u>**网络操作系统**</u>，<u>**计算机网络的通信协议**</u>

### **4.4.计算机网络的功能**

1. 资源共享(<u>**核心**</u>)
2. 均衡负载及分布处理
3. 信息快速传递和集中处理
4. 综合信息服务
5. 提高系统的性能性价比，维护方便，拓展灵活


### **4.4.计算机网络的组成**

#### **4.4.1.网络硬件**

1. 服务器(服务提供者)
2. 工作站
3. 网络接口卡(具有独一无二的mac地址)
4. 通信介质
     - 双绞线(通信距离不超过100m)(连接器为RJ-45)(<u>**价格便宜，常常使用**</u>)
     - 同轴电缆(<u>**比双绞线有更好的抗干扰能力，但是成本更高**</u>)
     - 光缆(<u>**高带宽**</u>，<u>**低衰减**</u>，<u>**安全性高**</u>，<u>**不易干扰腐蚀**</u>)(<u>**弯曲易折**</u>，<u>**接口成本高**</u>)
5. 中继器/集线器(仅放大信号)
6. 交换机：基于mac地址在同一网段内转发数据帧
7. 路由器：根据IP地址和路由表选择最佳路径转发数据包，实现NAT，将私有IP映射为公有IP
8. 网关：在不兼容的协议之间进行信息转换

#### **4.4.2.网络软件**

1. <u>**网络操作系统**</u>
2. <u>**网络协议软件**</u>


### **4.5.计算机网络的拓扑结构**

1. 星型拓扑结构：(<u>**以一个节点为中心的信息处理系统**</u>，<u>**局域网拓扑结构**</u>)
    - 可靠性高，方便服务，故障诊断容易
    - 安装费用高，扩展困难，对中央节点的依赖性强
2. 总线形拓扑结构
    - 布线容易，电缆用量小，可靠性高，易于扩充，易于安装
    - 故障诊断困难，需要配置中继器
3. 环型拓扑结构(<u>**适用于光纤**</u>)
    - 电缆长度短，适用于光纤，无差错传输
    - 可靠性差，故障诊断困难，调整网络困难
4. 树型拓扑结构(<u>**互联网拓扑结构**</u>)
    - 结构简单，成本低，网络中任意两个节点之间不产生回路，每个链路都支持双向传输，扩充方便灵活
    - 任何一个故障都会影响整个系统，对根的依赖性太大


### **4.6.计算机网络的通信技术**

1. 网络广播(多播)
2. 点到点网络(单播)
3. 一对多(<u>**组播/多播**</u>)

- <u>**小的网络采用广播，大的网络采用点到点**</u>


### **4.7.计算机网络的交换方式**

1. <u>**电路交换**</u>(主要应用于<u>**电话通信网**</u>中，<u>**通过建立预留的物理线路**</u>实现电话交换)
    - 独占性，实时性，可靠性
    - 建立连接慢，资源利用率低，兼容性差
2. <u>**报文交换**</u>(在交换结点采用<u>**储存转发**</u>的传输方式)
    - 无连接建立时延，可切换路径，兼容性好，提供多目标服务，允许建立数据传输的优先级，提高了通信线路的利用率
    - 转发时延长，缓冲需求大，实时性差，错误开销大，容错率低
3. <u>**分组交换**</u>(仍采用储存转发传输方式，将一个长报文先分割为若干个较短的分组，然后把这些分组逐个地发送给出去，<u>**互联网采用**</u>)
    - 分组的转发和储存并行，提高速度，简化了储存管理，提高容错率，减少重发数据量
    - 仍存在转发时延，增加了5%~10%的冗余信息，需要额外的时序，丢失和重复分组处理


### **4.8.计算机网络的体系结构**

1. <u>**计算机网络的分层结构**</u>
    - 用层次结构构建复杂系统——<u>**服务**</u>
    - 垂直调用和逐层封装——<u>**接口**</u>
    - 两端每一层之间有相应的约定——<u>**协议**</u>
2. 分层的优点
     - <u>**各层之间是独立的**</u>
     - 灵活性好
     - <u>**结构上可分割开**</u>
     - 易于实现和维护
     - 能促进标准化工作
3. <u>**分层体系结构**</u>
     - ($\text{De}\ \text{jure}$)<u>**ISO发布(OSI/RM)**</u>参考模型：应用层，表示层，会话层，传输层，网络层，数据链路层，物理层——<u>**7层**</u>
     - ($\text{De}\ \text{facto}$)TCP/IP体系结构：应用层，传输层，网际层，网络接口层——<u>**4层**</u>

<table class="transparent-table" style="width: 100%; text-align: center; margin: 0 auto; border-collapse: collapse;">
  <thead>
    <tr style="background-color: var(--md-primary-fg-color); color: var(--md-primary-bg-color);">
      <th style="border: 1px solid var(--md-typeset-table-color); text-align: center !important; padding: 8px;">OSI参考模型</th>
      <th style="border: 1px solid var(--md-typeset-table-color); text-align: center !important; padding: 8px;">TCP/IP体系结构</th>
      <th style="border: 1px solid var(--md-typeset-table-color); text-align: center !important; padding: 8px;">TCP/IP协议集</th>
    </tr>
  </thead>
  <tbody>
    <tr style="background-color: var(--md-default-bg-color);">
      <td style="border: 1px solid var(--md-typeset-table-color); text-align: center !important; padding: 8px;">应用层</td>
      <td style="border: 1px solid var(--md-typeset-table-color); text-align: center !important; padding: 8px;" rowspan="3">应用层</td>
      <td style="border: 1px solid var(--md-typeset-table-color); text-align: center !important; padding: 8px;">Telnet、FTP、SMTP、DNS、HTTP等</td>
    </tr>
    <tr style="background-color: var(--md-default-bg-color);">
      <td style="border: 1px solid var(--md-typeset-table-color); text-align: center !important; padding: 8px;">表示层</td>
      <td style="border: 1px solid var(--md-typeset-table-color); text-align: center !important; padding: 8px;"></td>
    </tr>
    <tr style="background-color: var(--md-default-bg-color);">
      <td style="border: 1px solid var(--md-typeset-table-color); text-align: center !important; padding: 8px;">会话层</td>
      <td style="border: 1px solid var(--md-typeset-table-color); text-align: center !important; padding: 8px;"></td>
    </tr>
    <tr style="background-color: var(--md-default-bg-color);">
      <td style="border: 1px solid var(--md-typeset-table-color); text-align: center !important; padding: 8px;">传输层</td>
      <td style="border: 1px solid var(--md-typeset-table-color); text-align: center !important; padding: 8px;">传输层</td>
      <td style="border: 1px solid var(--md-typeset-table-color); text-align: center !important; padding: 8px;">TCP、UDP等</td>
    </tr>
    <tr style="background-color: var(--md-default-bg-color);">
      <td style="border: 1px solid var(--md-typeset-table-color); text-align: center !important; padding: 8px;">网络层</td>
      <td style="border: 1px solid var(--md-typeset-table-color); text-align: center !important; padding: 8px;">网际层</td>
      <td style="border: 1px solid var(--md-typeset-table-color); text-align: center !important; padding: 8px;">TP、ARP、RARP、DCMP等</td>
    </tr>
    <tr style="background-color: var(--md-default-bg-color);">
      <td style="border: 1px solid var(--md-typeset-table-color); text-align: center !important; padding: 8px;">数据链路层</td>
      <td style="border: 1px solid var(--md-typeset-table-color); text-align: center !important; padding: 8px;" rowspan="2">网络接口层</td>
      <td style="border: 1px solid var(--md-typeset-table-color); text-align: center !important; padding: 8px;" rowspan="2">各种通信网络接口（以太网、令牌环、帧中继、ATM等）</td>
    </tr>
    <tr style="background-color: var(--md-default-bg-color);">
      <td style="border: 1px solid var(--md-typeset-table-color); text-align: center !important; padding: 8px;">物理层</td>
    </tr>
  </tbody>
</table>
    
    


### **4.9.局域网基础**

1. 局域网特点：
    - 共享传输信道
    - 范围有限，覆盖范围一般在几公里范围内
    - 传输速率高
    - 工作可靠，误码率低
2. 局域网的拓扑结构：常用星型，环型，总线型。<u>**星型拓扑结构在局域网被广泛采用**</u>
3. 局域网的体系结构
    - 使用一系列IEEE 802标准
    - IEEE 802.3(有线局域网，以太网)，IEEE 802.11(无线局域网)，IEEE 802.15(蓝牙)，IEEE 802.16(无线城域网)
    - 体系结构由物理层，介质层，逻辑链路控制子层组成
4. 介质访问控制技术(Media Access Control——MAC)
    - <u>**载波侦听多路访问/冲突避免**</u>(Carrier Sense Multiple Access with Collision Avoidance)
        1. 侦听信道(Carrier Sense)：在发送数据之前，设备首先会侦听信道，检测是否有其他设备正在发送数据。如果信道被占用，设备将等待一段时间再次尝试
        2. 随机等待时间：如果信道忙碌，设备会等待一段随机生成的时间。这个随机等待时间的目的是避免多个设备同时尝试发送数据，从而减少碰撞的可能性。每个设备会选择不同的等待时间，以增加公平性
        3. 清空信道：一旦设备完成了随机等待时间，它会再次侦听信道。如果信道仍然忙碌，设备将继续等待和随机等待。如果信道变为空闲，设备将发送数据
        4. 数据发送：一旦设备确定信道空闲，它将发送数据。其他设备在接收到数据之前会继续侦听信道，以确保不会发生碰撞
        5. 确认和重传：接收设备会发送确认信号来确认接收到的数据。如果发送设备没有收到确认，它将认为数据丢失，并尝试重新发送
    - 作用：用于局域网、无线局域网及其它网络中。它通过侦听信道、随机等待时间和数据发送等步骤，确保多个设备之间的公平竞争和数据传输的可靠性，<u>**保证每个节点能够将信息发送到介质上去**</u>
    
---

## **5.Internet基础**

### **5.1.Internet地址**

1. Internet为联网的每个网络和每台主机分配了唯一一个逻辑地址，称为IP地址
2. IP地址反应拓扑结构，由Internet机构管理。mac地址由设备厂商确定，不宜用于反应网络结构

- IP地址
     1. 格式：网络地址+主机地址
     2. 记法：采用32位点分十进制，可容纳约40亿台计算机同时上网
     3. 类型：
         1. A类：前8位网络号，001.x.y.z~126.x.y.z
         2. B类：前16位网络号，128.x.y.z~191.x.y.z
         3. C类：前24位网络号，192.x.y.z~223.x.y.z

- IP分配指南
     1. 网络号不能为127，该标识号被保留作回路及诊断功能
     2. 不能将网络号和主机号的各位均置1或0
     3. 对于本网络来说主机号应该是唯一的

- IPv6地址
     - IPv6使用128位IP编址方案，共有$2^{128}$个IP地址，采用冒号十六进制表示

### **5.2.Internet基本服务**

1. WWW：浏览器＋Web服务器＋HTTP协议(<u>**不是普通意义上的物理网络**</u>，是一种信息服务器的集合标准，<u>**是Internet的基础服务**</u>)(<u>**提供网页浏览的分布式应用系统**</u>)
2. 电子邮件：SMTP(<u>**发送协议**</u>)，POP3(<u>**接收协议**</u>)，IMAP(<u>**接收协议**</u>)

### **5.2.1.http协议**

1. http(Browser/Server架构)(应用层协议)客户端(浏览器)与web服务器的http端口(80)建立tcp连接
2. 发送请求报文
    - <u>**数据组成**</u>：请求行，请求头部，空行，请求数据
    - 数据内容：请求方法，URL，协议版本，请求头部，请求数据
3. 服务器接受请求并返回http响应
    - 响应：状态行，响应头部，空行，响应数据
4. 释放tcp连接
5. 客户端浏览器解析html内容

- <u>**无状态协议**</u>：http协议自身不对请求和响应之间的通信状态进行保存
- <u>**无连接协议**</u>：http协议限制每次连接只能处理一个请求

- http状态码(响应——状态行)
    1. 1xx：接收的请求正在处理
    2. 2xx：请求正常处理完成
    3. 3xx：重定向
    4. <u>**4xx**</u>：<u>**请求错误**</u>
    5. 5xx：服务器错误

---

## **6.HTML、CSS、JS**

### **6.1.HTML**


1. head元素(不会显示在浏览器的文档窗口)
     - title: 定义HTML文档的标题
     - meta: 标记搜索引擎显示的关键词，标记文档的作者，标记页面的解码方式，自动刷新网页
2. body元素
     - bgcolor: 标志HTML文档的背景颜色
     - background: 标志HTML文档的背景图片
     - bgproperties=fixed: 使背景图片成水印效果，不随滚动条的滚动而滚动
     - text: 标志HTML文档的正文文字颜色
     - leftmargin和topmargin: 设置主题内容距离左端和顶端的距离
3. 文字属性标志
     - 文字颜色
     - 文字字体
     - 文字大小
     - 文字标题: h#, /h#
4. 文字布局
     - 段落: p, \p
     - 空白占位符: &nbsp
     - 换行: br
5. 超链接: a
6. 表格: table
     - 定义行: <u>**tr**</u>
     - 定义表头: <u>**th**</u>
     - 定义单元格：<u>**td**</u>
     - 单元格宽: width
     - 单元格高: height
     - 表格边缘粗细: border
     - 对齐: valign -> top, middle, bottom, baseline
7. <u>**表单: form**</u>
     - 按钮: <u>**submit**</u>, reset
     - 复选框: <u>**checkbox**</u>
     - 单选框: <u>**radio**</u>
     - 下拉列表: select
8. 框架: frameset
     - 行: cols
     - 列: rows

### **6.2.CSS**

CSS：层叠样式表，定义如何显示HTML元素，解决了内容与表现分离的问题。多个样式定义可层叠为一个。

- 组成：
    - <u>**选择器**</u>：需要改变样式的HTML元素
    - <u>**多条声明**</u>：属性，值

- <u>**选择器**</u>——**2种**
    - **id选择器**：可以为标有特定id的HTML元素指定特定的样式
    - **class选择器**：可以在多个元素中使用
  
- <u>**插入方式**</u>——**3种**
    1. 外部样式
    2. 内部样式
    3. 内联样式

### **6.3.JavaScript**

- JavaScript：是一种轻量级的<u>**解释型**</u>编程语言，可插入HTML页面，可由所有的现代浏览器执行。

- 输出流函数：document.write()
- <u>**对事件的反应：alert()**</u>
- 改变HTML内容：getElementByld()，element.src.match()

### **6.4.动态网页**

- 使用HEML+ASP，HTML+PHP，HTML+JSP来实现
- 需要web应用服务器支持其编译运行，将编译结果提交给浏览器来显示
- 动态网页以数据库技术为基础，大大降低来网站维护的工作量
- 采用动态网页技术的网站可以实现更多的功能，如用户注册，登录，搜索等。

---

## **7.语义网基础**

### **7.1.智能的定义**

- AI的两条途径
    1. <u>**基于符号表示的途径**</u>
    2. <u>**基于统计表示的途径**</u>
  
1. <u>**符号主义**</u>：智能即符号计算(慢速思考)
    - 计划制定，推理，语言生成
    - 数据越多性能越差，少量数据即可工作，<u>**可解释**</u>，<u>**易干扰**</u>
2. <u>**连接主义**</u>：智能即神经元连接(快速思考——<u>**深度学习**</u>)
    - 模式识别，深度学习，神经网络，肢体动作，语音生成
    - 数据越多性能越好，依赖大量数据，<u>**不可解释**</u>，<u>**抗干扰**</u>
3. 行为主义：智能即行为反应

**Web 1.0**(HTTP, HTML, URL)——(<u>**静态页面**</u>)$\to$**Web 2.0**(CGI, ASP, JSP, PHP)——(<u>**用户生成式内容**</u>)$\to$**Web 3.0**(语义网，发明者：<u>**Tim Berners-Lee**</u>)(RDF, RDFS, OWL)

### **7.2.知识描述语言**

- RDF(<u>**不具备推理能力**</u>)：使用<u>**三元组**</u>描述语义空间
    - 命名资源(I)，未命名资源(B)，自解释资源(数据)(L)
    - 主语(I, B)+谓语(I)$\to$(I, B, L)
    - W3C标准：RDF是一个(拥有XML语法，能表达语义的)图形化的表示，使用RDF statement把资源描述成(属性，值)集合，以三元组形式表示，包含主谓宾(S, P, O)
  
- RDFS(<u>**具有类型推理能力**</u>)：扩展了RDF，来表示资源的类型，以及类型的属性，为模型添加了约束，拥有额外的推导规则
    - 表达能力依然有限：没有定义域和值域的条件化限制，没有存在/基数限制，没有完整的逻辑运算符，没有传递性，自反或者对称性属性描述。
  
- OWL(<u>**具有属性推理能力**</u>)：用于高级概念表达的语言组件，有基于数量的表示(全称/存在两次)，有表达限制和约束的公理。
    - 查询语言与协议：<u>**SPARQL**</u>
  
---

## **9.无线网络概述**

### **9.1.无线网络分类**

- 覆盖范围
     1. 无线个域网
     2. 无线局域网(WLAN，IEEE 802.11)
     3. 无线城域网(WiMax，IEEE 802.16)
     4. 卫星网络

- 应用类型

### **9.2.无线通信**

- 无线电频谱特点
     1. 有限性
     2. 排它性
     3. 复用性
     4. 非耗尽性
     5. 传播性
     6. 易干扰性

- 无线频谱划分
     - 国际上将无线电波频谱分为**12**个频段，通常的无线电通信只使用其中第4－12频段
     - ITU规定ISM(Industrial Scientific Medical，工业科学医疗)频段开放给三类机构使用，无需许可证授权，可免费使用
     - ISM频段：美国(908－928MHz，2.4－2.4835GHz，5.725－5.850GHz)，欧洲(868MHz，433MHz)，2.4GHz为各国通用。使用需遵守一定发射功率(<1W)，不能干扰其它频段。许多无线网络工作于ISM频段
     - <u>**300MHz－300GHz频段**</u>，1m－1mm波长(分米波，厘米波，毫米波)为<u>**微波**</u>

- 无线信号的损耗: [<u>**主要**</u>]<u>**衰减**</u>(有线介质衰减，无线介质衰减——放大器或中继器)和<u>**衰减失真**</u>(放大器放大高频部分)，<u>自由空间损耗，噪声，大气吸收，多径，折射。</u>**（其它损耗）**

### **9.3.无线传输介质和方式**

- 无线传输空间：地球大气层和外层空间
- 无线传输介质
    - 导向传输介质：有线通信
    - 非导向传输介质：无线电波，微波，红外线
  
- 微波通信
    - 频率高，波长短，视距通信，频率范围2～40GHz
    - <u>**衰减慢**</u>：微波损耗随距离平方而变化。而双绞线和同轴电缆损耗随距离呈指数变化。微波系统中继器或放大器可彼此相距很远
    - 容量大，质量好，<u>**可沿直线传至很远距离**</u>，<u>**易受电磁干扰**</u>
    - <u>**主要损耗来源于衰减**</u>
    - 地面微波天线：更长距离需要使用多个中继站，微波链路两两串联
    - 卫星微波通信：范围大，距离远，不受地面灾害影响，易广播，多址通信，信号传输时延

- <u>**红外线通信**</u>：收发器距离均不能超过视线范围，不易发现和截获，保密性强，几乎不受电磁和人为干扰，抗干扰性强，不易发现和截获，保密性强，<u>**传播易受天气影响**</u>

- 蓝牙技术

- 近场通信(NFC)

- 信号的调制：将输入信息变换为适于信道传输形式
    - 信号源信息：基带信号→已调信号
    - 常用调制方式：模拟，数字，脉冲
  
- 信号的扩频
    - 利用传输信息无关的码对被传输信号扩展频谱，使之占有远远超过被传送信息所必须的最小带宽
    - 对各种类型噪声和多径失真具有免疫性
    - 隐藏和加密信号。接收方必须知道扩展代码，才可恢复原始信息
  
- 复用和多址(<u>**复用是实现多址的前提**</u>)
    - 信道复用：两点间信道中同时传输互不干扰的多个信号
    - 多址接入：多点间实现互不干扰多边通信
    - 复用方式：频分复用，时分复用，码分复用，空分复用，极化复用，波分复用
    - 多址复用：频分多址，时分多址，码分多址，空分多址
  
1. 时分复用多址：给定频带最高数据传输速率，传递时间划分为若干个时隙，各用户使用某一时隙，突发脉冲序列方式接受和发送信号
2. 频分复用多址：传输频带划分为若干较窄且互不重叠子频带，各用户分配一个固定子频带
3. 码分复用多址
4. 空分复用多址：利用空间特征区分不同用户

---

## **10.名词解释**

- TCP: Transmisson Control Protocol 传输控制协议
- IP: Internet Protocol 网际协议
- UDP: User Datagram Protocol 用户数据包协议
- WWW: World Wide Web 万维网
- HTTP: Hyper Text Transfer Protocol 超文本传输协议
- FTP: File Transfer Protocol 文件传输协议
- DNS: Domain Name System 域名系统
- MAC: Media Access Control 媒介访问控制
- CSMA/CA: Carrier Sense Multiple Access with Collision Avoidance 载波侦听多路访问/冲突检测协议
- P2P: Point to Point 点对点
- NAT: Network Address Translation 网络地址转换
- LAN: Local Area Network 局域网
- WAN: Wide Area Network 广域网
- WLAN: Wireless Local Area Network 无线局域网
- ISO: International Standard Organization 国际标准化组织

<u>**网站的设计流程**</u>：

- 确定内容
- 确定表现形式
- 确定设计方案

---



