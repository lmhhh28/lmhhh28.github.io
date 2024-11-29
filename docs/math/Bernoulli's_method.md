## **How did Bernoulli root?**

### 1.引入



### 2.Principle

对于分式线性递推：

$$x_{n+1}=\frac{ax_{n}+b}{cx_{n}+d}$$

若存在2个实不动点$\lambda{\scriptsize 1},\lambda{\scriptsize 2}$，不妨令$\lambda{\scriptsize 1}< \lambda{\scriptsize 2}$，则有：

$$\frac{x_{n+1}-\lambda _{1}}{x_{n+1}-\lambda _{2}}=\frac{a-c\lambda _{1}}{a-c\lambda _{2}}\cdot \frac{x_{n}-\lambda _{1}}{x_{n}-\lambda _{2}}$$

设：$a_{0}=\frac{x_{0}-\lambda _{1}}{x_{0}-\lambda _{2}},q=\frac{a-c\lambda _{1}}{a-c\lambda _{2}}$，则有：

$$x_{n}=\frac{\lambda _{2}-\lambda _{1}}{a_{0}q^{n}-1}+\lambda _{2}$$

当$\left | q \right | > 1$时，$\lim_{n \to +\infty} x_{n}=\lambda _{2}$，

当$\left | q \right | < 1$时，$\lim_{n \to +\infty}x_{n}=\lambda_{1}$。

设不动点$\lambda_{1},\lambda _{2}$满足方程：

$$cx^{2}+(d-a)x-b=0$$

其中：

$$\lambda _{1}=\frac{-(d-a)-\sqrt{\Delta } }{2c} ,\lambda _{2}=\frac{-(d-a)+\sqrt{\Delta } }{2c}$$

当$n$一定时，$q$越大，$\left | x_{n}-\lambda _{i} \right |$越小。所以有：

$$q=\frac{a+d+\sqrt{\Delta}}{a+d-\sqrt[]{\Delta}}$$

我们令：$a=0,b=\frac{m-\left \lfloor \sqrt{m}  \right \rfloor^{2}}{4},c=1,d=\left \lfloor \sqrt{m}  \right \rfloor$。则有：

$$x_{n+1}=\frac{m-\left \lfloor m \right \rfloor^{2} }{4(x_{n}+\left \lfloor m \right \rfloor )}$$

$$q=\frac{\left \lfloor \sqrt{m}  \right \rfloor+\sqrt{m}  }{\left \lfloor \sqrt{m}  \right \rfloor-\sqrt{m}  }$$

最后得到$\sqrt{m}$的近似值为：$2x_{n}+\left \lfloor \sqrt{m}  \right \rfloor$。实际上$2x_{n}$为$\sqrt{m}$小数部分的近似值。

不难看出：当$n$趋近于无穷时，$x_{n}$无限趋近于$\sqrt{m}$。

### 3.Example

$eg.求\sqrt{114514}近似值。$

$\sqrt{114514}$的整数部分为$338$，构造数列：

$$x_{n+1}=\frac{270}{4(x_{n}+338)}$$

选取初值条件：$x_{0}=1$

选取小数点后六位：

$$x_{1}=0.199115,2x_{1}+338=338.398230$$

$$x_{2}=0.199587,2x_{2}+338=338.399174$$

$$x_{3}=0.199586,2x_{3}+338=338.399172$$

由计算工具得：$\sqrt{114514}=338.399172$

### 4.代码实现

分式线性递推：
$$
x_{n+1}=\frac{ax_{n}+b}{cx_{n}+d}
$$
令$x_{n}=\frac{F_{n}}{F_{n-1}} $，则有：
$$
\frac{F_{n+1}}{F_{n}}=\frac{aF_{n}+bF_{n-1}}{cF_{n}+dF_{n-1}}  
$$
可写作：
$$
\begin{pmatrix}
 F_{n+1}\\F_{n}
\end{pmatrix}
=
\begin{pmatrix}
 a & b\\
 c & d
\end{pmatrix}
\cdot 
\begin{pmatrix}
 F_{n}\\F_{n-1}
\end{pmatrix}
$$
进一步地：
$$
\begin{pmatrix}
 F_{n}\\F_{n-1}
\end{pmatrix}
=
\begin{pmatrix}
 a & b\\
 c & d
\end{pmatrix}^{n}
\cdot 
\begin{pmatrix}
 F_{1}\\F_{0}
\end{pmatrix}
$$

$$

$$




